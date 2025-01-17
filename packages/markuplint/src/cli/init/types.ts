export type Langs =
	| 'jsx'
	| 'vue'
	| 'svelte'
	| 'astro'
	| 'pug'
	| 'php'
	| 'smarty'
	| 'erb'
	| 'ejs'
	| 'mustache'
	| 'nunjucks'
	| 'liquid';

export type Category = 'validation' | 'a11y' | 'naming-convention' | 'style' | 'maintainability';

export type RuleSettingMode =
	// Customize
	| readonly Category[]
	// Otherwise
	| 'recommended'
	| 'none';

export type DefaultRules = Readonly<Record<string, Rule>>;

export type Rule = {
	readonly category: Category;
	readonly defaultValue: boolean | string | number;
};
