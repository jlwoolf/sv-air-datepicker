import type {
	CSSRuleObject,
	PluginAPI,
	RecursiveKeyValuePair,
	ResolvableTo
} from 'tailwindcss/types/config';
import {
	type AdpThemeValueFunction,
	type AdpThemeMatchFunction,
	isAdpThemeVariable,
	isPluginFunction,
	isString
} from './types';

/**
 * Takes a variable or array of variables and maps them to a provided value
 * @param variable variable name(s)
 * @param value the value to assign to the variable(s)
 * @returns A object of variable -> value
 */
export const multiVariable = <T>(variable: string | string[], value: T): Record<string, T> => {
	if (!Array.isArray(variable)) variable = [variable];
	return variable.reduce((acc, v) => ({ ...acc, [v]: value }), {});
};

/**
 * Maps a recursive key value record to specific css variables
 * @param api the plugin api
 * @param record key value pair record to recurse through
 * @param prefix the prefix applied to the tailwind name
 * @param variable the variable name(s)
 * @param preprocess optional preprocess function to apply to the value
 * @returns the CSSRuleObject mapping
 */
export const recursiveMapping = (
	api: PluginAPI,
	record: ResolvableTo<RecursiveKeyValuePair<string, string>>,
	prefix: string | null,
	variable: string | string[],
	preprocess?: (value: string) => string
): CSSRuleObject => {
	const { e } = api;
	if (isPluginFunction(record)) return {};

	return Object.entries(record).reduce((acc, [key, value]) => {
		if (isString(value)) {
			if (preprocess) value = preprocess(value);

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

/**
 * Maps font sizes to css variables
 * @param api the plugin api
 * @param record the font size record
 * @param prefix the prefix applied to the tailwind variable name
 * @param variable the variable name(s)
 * @returns the CSSRuleObject mapping
 */
export const fontSizeMapping: AdpThemeValueFunction<'fontSize'> = (
	api,
	record,
	prefix,
	variable
) => {
	const { e } = api;
	if (isPluginFunction(record)) return {};

	return Object.entries(record).reduce((acc, [key, value]) => {
		let size = isString(value) ? value : value[0];
		return {
			...acc,
			[`${prefix}-${e(key)}`]: multiVariable(variable, size)
		};
	}, {});
};

/**
 * Maps a generic key value record to css variables
 * @param api the plugin api
 * @param record the string -> string record
 * @param prefix the prefix applied to the tailwind variable name
 * @param variable the variable name(s)
 * @returns the CSSRuleObject mapping
 */
export const recordMapping = (
	api: PluginAPI,
	record: ResolvableTo<Record<string, string>>,
	prefix: string | null,
	variable: string | string[]
): CSSRuleObject => {
	const { e } = api;
	if (isPluginFunction(record)) return {};

	return Object.entries(record).reduce((acc, [key, value]) => {
		return {
			...acc,
			[`${prefix}-${e(key)}`]: multiVariable(variable, value)
		};
	}, {});
};

export const simpleMatching: AdpThemeMatchFunction =
	(_api, _record, _prefix, variable) => (value) => {
		if (!isString(value)) return null;

		if (isAdpThemeVariable(variable)) {
			return multiVariable(variable, value);
		} else {
			return null;
		}
	};

export const parentMatching =
	(parent: string): AdpThemeMatchFunction =>
	(_api, _record, _prefix, variable) =>
	(value) => {
		if (!isString(value)) return null;

		if (isAdpThemeVariable(variable)) {
			return {
				[parent]: multiVariable(variable, value)
			};
		} else {
			return null;
		}
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
