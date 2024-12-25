import type {
	CSSRuleObject,
	PluginAPI,
	RecursiveKeyValuePair,
	ResolvableTo,
	ThemeConfig
} from 'tailwindcss/types/config';
import type { AdpThemeMappingFunction } from './types';

export const multiVariable = <T>(variable: string | string[], value: T): Record<string, T> => {
	if (!Array.isArray(variable)) variable = [variable];
	return variable.reduce((acc, v) => ({ ...acc, [v]: value }), {});
};

export const recursiveMapping = (
	api: PluginAPI,
	record: ResolvableTo<RecursiveKeyValuePair<string, string>>,
	prefix: string,
	variable: string | string[]
): CSSRuleObject => {
	const { e } = api;
	if (typeof record === 'function') return {};

	return Object.entries(record).reduce((acc, [key, value]) => {
		if (typeof value === 'string') {
			return {
				...acc,
				[`${prefix}-${e(key)}`]: multiVariable(variable, value)
			};
		}

		return {
			...acc,
			...recursiveMapping(api, value, `${prefix}-${e(key)}`, variable)
		};
	}, {});
};

export const fontSizeMapping: AdpThemeMappingFunction<'fontSize'> = (
	{ e },
	record,
	prefix,
	variable
) => {
	if (typeof record === 'function') return {};

	return Object.entries(record).reduce((acc, [key, value]) => {
		let size = typeof value === 'string' ? value : value[0];
		return {
			...acc,
			[`${prefix}-${e(key)}`]: multiVariable(variable, size)
		};
	}, {});
};

export const recordMapping = (
	{ e }: PluginAPI,
	record: ResolvableTo<Record<string, string>>,
	prefix: string,
	variable: string | string[]
): CSSRuleObject => {
	if (typeof record === 'function') return {};

	return Object.entries(record).reduce((acc, [key, value]) => {
		return {
			...acc,
			[`${prefix}-${e(key)}`]: multiVariable(variable, value)
		};
	}, {});
};

export const addParentRule = (
	rules: CSSRuleObject | CSSRuleObject[],
	parent: string,
	transform: (key: string) => string
) => {
	if (!Array.isArray(rules)) rules = [rules];

	return rules.map((rule) => ({
		[parent]: Object.entries(rule).reduce((acc, [key, value]) => {
			return {
				...acc,
				[transform(key)]: value
			};
		}, {} as CSSRuleObject)
	}));
};

export const addChildRule = (rules: CSSRuleObject, child: string) => {
	return Object.entries(rules).reduce((acc, [key, value]) => {
		return {
			...acc,
			[key]: {
				[child]: value
			}
		};
	}, {} as CSSRuleObject);
};
