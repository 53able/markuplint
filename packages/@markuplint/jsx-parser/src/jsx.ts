import { AST_NODE_TYPES, parse } from '@typescript-eslint/typescript-estree';
import type {
	AssignmentPattern,
	BindingName,
	ClassElement,
	Expression,
	JSXAttribute,
	JSXChild,
	JSXElement,
	JSXExpressionContainer,
	JSXFragment,
	JSXIdentifier,
	JSXNamespacedName,
	JSXSpreadAttribute,
	JSXTagNameExpression,
	ObjectLiteralElementLike,
	Statement,
	TSEmptyBodyFunctionExpression,
	VariableDeclarator,
} from '@typescript-eslint/types/dist/ts-estree';

export type { JSXAttribute } from '@typescript-eslint/types/dist/ts-estree';

export type JSXNode = JSXChild | JSXElementHasSpreadAttribute;

export type JSXElementHasSpreadAttribute = JSXElement & { __hasSpreadAttribute?: true };

export default function jsxParser(jsxCode: string): JSXNode[] {
	const ast = parse(jsxCode, {
		comment: true,
		errorOnUnknownASTType: false,
		jsx: true,
		loc: true,
		// loggerFn: undefined,
		range: true,
		tokens: false,
		useJSXTextNode: true,
	});

	return recursiveSearchJSXElements(ast.body);
}

export function getName(tagName: JSXTagNameExpression): string {
	switch (tagName.type) {
		case 'JSXIdentifier': {
			return tagName.name;
		}
		case 'JSXMemberExpression': {
			let name = tagName.property.name;
			if (tagName.object) {
				const parentName = getName(tagName.object);
				name = parentName + '.' + name;
			}
			return name;
		}
		case 'JSXNamespacedName': {
			return `${tagName.namespace.name}:${tagName.name.name}`;
		}
		default: {
			return '';
		}
	}
}

export function getAttr(attributes: (JSXAttribute | JSXSpreadAttribute)[]) {
	let hasSpreadAttr = false;
	const attrs: JSXAttribute[] = [];
	for (const attr of attributes) {
		if (attr.type === 'JSXAttribute') {
			attrs.push(attr);
		} else {
			hasSpreadAttr = true;
		}
	}

	return {
		attrs,
		hasSpreadAttr,
	};
}

export function getAttrName(name: JSXIdentifier | JSXNamespacedName): string {
	if (typeof name.name === 'string') {
		return name.name;
	}
	return name.name.name;
}

function recursiveSearchJSXElements(
	tree: (
		| JSXElement
		| Statement
		| VariableDeclarator
		| Expression
		| ObjectLiteralElementLike
		| ClassElement
		| AssignmentPattern
		| BindingName
		| TSEmptyBodyFunctionExpression
		| JSXChild
	)[],
) {
	const jsxList: (JSXElement | JSXFragment)[] = [];
	for (const node of tree) {
		switch (node.type) {
			case AST_NODE_TYPES.JSXElement: {
				jsxList.push(node);
				jsxList.push(...recursiveSearchJSXElements(node.children));
				if (node.openingElement) {
					let hasSpreadAttr = false;
					const expressions = node.openingElement.attributes
						.map(attr => {
							if (
								attr.type === AST_NODE_TYPES.JSXAttribute &&
								attr.value?.type === AST_NODE_TYPES.JSXExpressionContainer
							) {
								return attr.value;
							}
							if (attr.type === AST_NODE_TYPES.JSXSpreadAttribute) {
								hasSpreadAttr = true;
							}
						})
						.filter((e): e is JSXExpressionContainer => !!e);
					jsxList.push(...recursiveSearchJSXElements(expressions));
					if (hasSpreadAttr) {
						(node as JSXElementHasSpreadAttribute).__hasSpreadAttribute = true;
					}
				}
				continue;
			}
			case AST_NODE_TYPES.JSXFragment: {
				jsxList.push(node);
				continue;
			}
			case AST_NODE_TYPES.VariableDeclarator: {
				if (node.init) {
					jsxList.push(...recursiveSearchJSXElements([node.init]));
				}
				continue;
			}
			case AST_NODE_TYPES.VariableDeclaration: {
				jsxList.push(...recursiveSearchJSXElements(node.declarations));
				continue;
			}
			case AST_NODE_TYPES.FunctionDeclaration:
			case AST_NODE_TYPES.FunctionExpression:
			case AST_NODE_TYPES.ArrowFunctionExpression: {
				jsxList.push(...recursiveSearchJSXElements([node.body]));
				continue;
			}
			case AST_NODE_TYPES.ExportDefaultDeclaration:
			case AST_NODE_TYPES.ExportNamedDeclaration: {
				if (node.declaration) {
					jsxList.push(...recursiveSearchJSXElements([node.declaration]));
				}
				continue;
			}
			case AST_NODE_TYPES.ObjectExpression: {
				jsxList.push(...recursiveSearchJSXElements(node.properties));
				continue;
			}
			case AST_NODE_TYPES.BlockStatement: {
				jsxList.push(...recursiveSearchJSXElements(node.body));
				continue;
			}
			case AST_NODE_TYPES.ReturnStatement: {
				if (node.argument) {
					jsxList.push(...recursiveSearchJSXElements([node.argument]));
				}
				continue;
			}
			case AST_NODE_TYPES.JSXExpressionContainer:
			case AST_NODE_TYPES.ExpressionStatement: {
				jsxList.push(...recursiveSearchJSXElements([node.expression]));
				continue;
			}
			case AST_NODE_TYPES.CallExpression: {
				jsxList.push(...recursiveSearchJSXElements(node.arguments));
				continue;
			}
			case AST_NODE_TYPES.ClassDeclaration: {
				jsxList.push(...recursiveSearchJSXElements(node.body.body));
				continue;
			}
			case AST_NODE_TYPES.Property:
			case AST_NODE_TYPES.ClassProperty:
			case AST_NODE_TYPES.MethodDefinition: {
				if (node.value) {
					jsxList.push(...recursiveSearchJSXElements([node.value]));
				}
				continue;
			}
		}
		// console.log(node);
	}
	return jsxList;
}