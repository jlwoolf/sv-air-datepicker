import plugin from 'tailwindcss/plugin';
import type { CSSRuleObject, PluginAPI, ThemeConfig } from 'tailwindcss/types/config';
import {
	ADP_COLOR_VARIABLES,
	ADP_FONT_SIZE_VARIABLES,
	ADP_PADDING_VARIABLES,
	ADP_WIDTH_VARIABLES,
	ADP_HEIGHT_VARIABLES,
	ADP_BORDER_RADIUS_VARIABLES
} from './variables';
import {
	recursiveMapping,
	fontSizeMapping,
	recordMapping,
	addParentRule,
	parentMatching
} from './functions';
import {
	isAdpThemeVariable,
	type AdpThemeItem,
	type AdpThemeMap,
	type AdpThemeValueFunction,
	type AdpThemeVariable,
	type AdpThemeVariableProperties,
	type AdpThemeVariables
} from './types';

const defaultMatchFunction = parentMatching('&.air-datepicker');

const ADP_THEME_MAPPING: AdpThemeMap = {
	colors: {
		valueFn: (...args: Parameters<AdpThemeValueFunction<'colors'>>) =>
			recursiveMapping(...args, (value) => value.replace('<alpha-value>', '1')),
		matchFn: defaultMatchFunction,
		matchOptions: {
			type: 'color'
		},
		variables: ADP_COLOR_VARIABLES
	},
	fontSize: {
		valueFn: fontSizeMapping,
		matchFn: defaultMatchFunction,
		variables: ADP_FONT_SIZE_VARIABLES
	},
	padding: {
		valueFn: recordMapping,
		matchFn: defaultMatchFunction,
		variables: ADP_PADDING_VARIABLES
	},
	width: {
		valueFn: recordMapping,
		matchFn: defaultMatchFunction,
		variables: ADP_WIDTH_VARIABLES
	},
	height: {
		valueFn: recordMapping,
		matchFn: defaultMatchFunction,
		variables: ADP_HEIGHT_VARIABLES
	},
	borderRadius: {
		valueFn: recordMapping,
		matchFn: defaultMatchFunction,
		variables: ADP_BORDER_RADIUS_VARIABLES
	}
};

/**
 * Utility function to create entries array of specified key value pairs
 * @param obj an object
 * @returns Object.entries(obj)
 */
const entries = <K = any, V = any>(obj: object) => Object.entries(obj) as [K, V][];

/**
 * Processes a key value of the AdpThemeMap
 * @param api the plugin api
 */
const processThemeItem =
	(api: PluginAPI) =>
	<K extends keyof ThemeConfig>([key, { variables, ...properties }]: [K, AdpThemeItem<K>]) => {
		if (key !== 'colors') return;

		const record: ThemeConfig[K] = api.theme(key);
		if (!record) return;

		Object.entries(variables as AdpThemeVariables).forEach(([p, v]) => {
			const applyUtilities = (
				variable: AdpThemeVariable,
				{ valueFn, matchFn, matchOptions }: AdpThemeVariableProperties<K>
			) => {
				if (matchFn) {
					api.matchUtilities(
						{
							[p]: matchFn(api, record, p, variable)
						},
						matchOptions
					);
				}

				if (valueFn) {
					api.addUtilities(
						addParentRule(
							valueFn(api, record, `.${p}`, variable),
							'.air-datepicker',
							(k) => `&${k}`
						)
					);
				}
			};

			if (!isAdpThemeVariable(v)) {
				applyUtilities(v.variable, v);
			} else {
				applyUtilities(v, properties);
			}
		});
	};

export default plugin((api) => {
	entries<keyof ThemeConfig, AdpThemeItem>(ADP_THEME_MAPPING).forEach(processThemeItem(api));
});
