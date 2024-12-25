import type {
	ThemeConfig,
	CSSRuleObject,
	PluginAPI,
	ResolvableTo,
	PluginUtils
} from 'tailwindcss/types/config';

export type AdpThemeMappingVariable = string | string[];
export type AdpThemeMappingVariables<K extends keyof ThemeConfig = keyof ThemeConfig> = Record<
	string,
	| AdpThemeMappingVariable
	| { variable: AdpThemeMappingVariable; function: AdpThemeMappingFunction<K> }
>;

export type AdpThemeMappingFunction<K extends keyof ThemeConfig> = (
	api: PluginAPI,
	record: ThemeConfig[K],
	prefix: string,
	variable: AdpThemeMappingVariable
) => CSSRuleObject;

export interface AdpThemeMappingItem<K extends keyof ThemeConfig> {
	function: AdpThemeMappingFunction<K>;
	variables: AdpThemeMappingVariables<K>;
}

export type AdpThemeMapping = {
	[K in keyof ThemeConfig]?: AdpThemeMappingItem<K>;
};
