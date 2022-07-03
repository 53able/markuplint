import type { MLElement } from '../node/element';
import type { MLNode } from '../node/node';
import type { RuleConfigValue } from '@markuplint/ml-config';

import { toHTMLCollection } from '../node/node-list';

export function getChildren<T extends RuleConfigValue, O = null>(
	node: MLNode<T, O>,
): HTMLCollectionOf<MLElement<T, O>> {
	return toHTMLCollection(
		Array.from(node.childNodes).filter((child): child is MLElement<T, O> => {
			return child.nodeType === child.ELEMENT_NODE;
		}),
	);
}