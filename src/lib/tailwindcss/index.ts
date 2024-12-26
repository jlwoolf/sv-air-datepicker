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
import { recursiveMapping, fontSizeMapping, recordMapping, addParentRule } from './functions';
import type { AdpThemeMapping, AdpThemeMappingVariables } from './types';

const ADP_THEME_MAPPING = {
	colors: {
		function: recursiveMapping,
		variables: ADP_COLOR_VARIABLES
	},
	fontSize: {
		function: fontSizeMapping,
		variables: ADP_FONT_SIZE_VARIABLES
	},
	padding: {
		function: recordMapping,
		variables: ADP_PADDING_VARIABLES
	},
	width: {
		function: recordMapping,
		variables: ADP_WIDTH_VARIABLES
	},
	height: {
		function: recordMapping,
		variables: ADP_HEIGHT_VARIABLES
	},
	borderRadius: {
		function: recordMapping,
		variables: ADP_BORDER_RADIUS_VARIABLES
	}
} satisfies AdpThemeMapping;

export default plugin((api) => {
	const { theme, addUtilities, matchUtilities } = api;

	const rules: CSSRuleObject[] = [];
	Object.entries(ADP_THEME_MAPPING).forEach(([key, { function: f, variables }]) => {
		const record = theme(key);
		if (!record) return;

		Object.entries(variables as AdpThemeMappingVariables).forEach(([p, v]) => {
			if (typeof v === 'string' || Array.isArray(v)) {
				rules.push(f(api, record, `.${p}`, v));
			} else {
				rules.push(v.function(api, record, p, v.variable));
			}
		});
	});

	// wrap them all with .air-datepicker class so the tailwind classes
	// will have higher specificity than the default
	addUtilities(addParentRule(rules, '.air-datepicker', (k) => `&${k}`));
});
