import type {
	ThemeConfig,
	CSSRuleObject,
	PluginAPI,
	ResolvableTo,
	PluginUtils
} from 'tailwindcss/types/config';

export type AdpThemeVariable = string | string[];
export interface AdpThemeVariableProperties<K extends keyof ThemeConfig = keyof ThemeConfig> {
	valueFn?: AdpThemeValueFunction<K>;
	matchFn?: AdpThemeMatchFunction<K>;
	matchOptions?: Parameters<PluginAPI['matchUtilities']>[1];
}
export type AdpThemeVariables<K extends keyof ThemeConfig = keyof ThemeConfig> = Record<
	string,
	AdpThemeVariable | ({ variable: AdpThemeVariable } & AdpThemeVariableProperties<K>)
>;

export type AdpThemeValueFunction<K extends keyof ThemeConfig = keyof ThemeConfig> = (
	api: PluginAPI,
	record: ThemeConfig[K],
	prefix: string,
	variable: AdpThemeVariable
) => CSSRuleObject;

export type AdpThemeMatchFunction<K extends keyof ThemeConfig = keyof ThemeConfig> = (
	api: PluginAPI,
	record: ThemeConfig[K],
	prefix: string,
	variable: AdpThemeVariable
) => <T = string, U = string>(
	value: T | string,
	extra: { modifier: U | string | null }
) => CSSRuleObject | null;

export interface AdpThemeItem<K extends keyof ThemeConfig = keyof ThemeConfig>
	extends AdpThemeVariableProperties<K> {
	variables: AdpThemeVariables<K>;
}

export type AdpThemeMap = {
	[K in keyof ThemeConfig]?: AdpThemeItem<K>;
};

export const isString = (x: unknown): x is string => typeof x === 'string';
export const isAdpThemeVariable = (x: unknown): x is AdpThemeVariable =>
	isString(x) || (Array.isArray(x) && x.every((y) => isString(y)));
export const isPluginFunction = <T>(x: ResolvableTo<T>): x is (utils: PluginUtils) => T =>
	typeof x === 'function';
