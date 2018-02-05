# Rule Customization

## Creation

**Recommended to develop in TypeScript**

```js
import CustomRule from 'markuplint/lib/rule/custom-rule';
import { VerifyReturn } from 'markuplint/lib/rule';

export default CustomRule.create({
	name: 'rule-name',
	defaultValue: null,
	defaultOptions: null,
	async verify (document, locale) {

		/* verfiy... */

		if (/* result is bad */) {
			return [
				{
					level: [ERROR_LEVEL],
					message: [ERROR_MESSAGE],
					line: [LOCATION_LINE_NUMBER],
					col: [LOCATION_COLUMN_NUMBER],
					raw: [CODE_RAW_STRING],
				}
			];
		}
	},
});
```

### Steps

1. [required] Default import `CustomRule` class*.
2. [optional] If using _TypeScript_, import `VerifyReturn` interface**.
3. [required] Set paramater as `Object`.
4. [required] Set `name` property.
5. [required] Set `defaultValue` property.
6. [required] Set `defaultOptions` property.
7. [optional] Set `defaultLevel` property to `"error"` or `"warning"`.
8. [required] Define async `verify` method to return Promise of `VerifyReturn`** array.

- *`CustomRule` is a **class** that has the static main method `create` and other static helper methods.
- **`VerifyReturn` is an **interface** in _TypeScript_.

### Types

```js
CustomRule.create<T = null, O = {}>({
	name: string,
	defaultValue: T,
	defaultOptions: O,
	async verify (document: Document<T, O>, locale: string): Promise<VerifyReturn[]> {
		return [
			{
				level: 'error' | 'warning',
				message: string,
				line: number,
				col: number,
				raw: string,
			}
		];
	}
});
```

`T` and `O` are generic. `T` is the type of the base setting value, and `O` is the type of the optional settings. Each defaults are `null` and `{}`.

`document` that 1st argument on `verify` method is `Document` class instance. `Document` is not `Document` on HTML standard DOM API. It is Node tree for find to  location at source code that had created by HTML parser of markuplint.

`locale` is locale language ID on user's OS.

`VerifyReturn` is structed by `level`, `message`, `line`, `col` and `raw`.

WIP