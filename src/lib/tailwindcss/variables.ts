import { addChildRule, multiVariable, recursiveMapping } from './functions';
import type { AdpThemeMappingVariables } from './types';

export const ADP_COLOR_VARIABLES = {
	'adp-bg': '--adp-background-color',
	'adp-bg-hover': '--adp-background-color-hover',
	'adp-bg-active': '--adp-background-color-active',
	'adp-bg-ir': '--adp-background-color-in-range',
	'adp-bg-ir-focused': '--adp-background-color-in-range-focused',
	'adp-bg-som': '--adp-background-color-selected-other-month',
	'adp-bg-som-focused': '--adp-background-color-selected-other-month-focused',
	'adp-primary': '--adp-color',
	'adp-disabled': '--adp-color-disabled',
	'adp-disabled-ir': '--adp-color-disabled-in-range',
	'adp-secondary': '--adp-color-secondary',
	'adp-accent': '--adp-accent-color',
	'adp-current-date': '--adp-color-current-date',
	'adp-om': '--adp-color-other-month',
	'adp-om-hover': '--adp-color-other-month-hover',
	'adp-border': '--adp-border-color',
	'adp-border-inner': '--adp-border-color-inner',
	'adp-border-inline': '--adp-border-color-inline',
	'adp-day-name': '--adp-day-name-color',
	'adp-day-name-hover': '--adp-day-name-color-hover',
	'adp-nav-arrow': '--adp-nav-arrow-color',
	'adp-nav-secondary': '--adp-nav-color-secondary',
	'adp-cell-bg-hover': '--adp-cell-background-color-hover',
	'adp-cell-bg-selected': '--adp-cell-background-color-selected',
	'adp-cell-bg-selected-hover': '--adp-cell-background-color-selected-hover',
	'adp-cell-bg-ir': '--adp-cell-background-color-in-range',
	'adp-cell-bg-ir-hover': '--adp-cell-background-color-in-range-hover',
	'adp-cell-border-ir': '--adp-cell-border-color-in-range',
	'adp-btn': '--adp-btn-color',
	'adp-btn-hover': '--adp-btn-color-hover',
	'adp-btn-bg-hover': '--adp-btn-background-color-hover',
	'adp-btn-bg-active': '--adp-btn-background-color-active',
	'adp-time-track': '--adp-time-track-color',
	'adp-time-track-hover': '--adp-time-track-color-hover',
	'adp-time-day-period': '--adp-time-day-period-color',
	'adp-ptr-bg': {
		variable: 'background',
		function: (e, colors, prefix, variable) => {
			return addChildRule(
				recursiveMapping(e, colors, `.${prefix}`, variable),
				'& > .air-datepicker--pointer:after'
			);
		}
	}
} satisfies AdpThemeMappingVariables<'colors'>;

export const ADP_FONT_SIZE_VARIABLES: AdpThemeMappingVariables<'fontSize'> = {
	'adp-text': '--adp-font-size',
	'adp-text-mbl': '--adp-mobile-font-size'
};

export const ADP_PADDING_VARIABLES = {
	'adp-p': '--adp-padding',
	'adp-time-p': '--adp-time-padding-inner',
	'adp-ptr-size': {
		variable: '--adp-pointer-size',
		function: ({ matchUtilities }, record, prefix, variable) => {
			const pointerSize = {
				[prefix]: (value: string) => ({
					'&.air-datepicker': multiVariable(variable, value)
				})
			};

			const values =
				typeof record === 'function'
					? {}
					: Object.fromEntries(
							Object.entries(record).filter(([k, v]) => !Number.isNaN(k) && Number(k) < 9)
						);

			matchUtilities(pointerSize, { values });

			return {};
		}
	}
} satisfies AdpThemeMappingVariables<'padding'>;

export const ADP_WIDTH_VARIABLES = {
	'adp-w': '--adp-width',
	'adp-day-cell-w': '--adp-day-cell-width',
	'adp-mbl-w': '--adp-mobile-width'
} satisfies AdpThemeMappingVariables<'width'>;

export const ADP_HEIGHT_VARIABLES = {
	'adp-nav-h': '--adp-nav-height',
	'adp-day-cell-h': '--adp-day-cell-height',
	'adp-month-cell-h': '--adp-month-cell-height',
	'adp-year-cell-h': '--adp-year-cell-height',
	'adp-btn-h': '--adp-btn-height',
	'adp-time-track-h': '--adp-time-track-height',
	'adp-mbl-nav-h': '--adp-mobile-nav-height',
	'adp-mbl-day-cell-h': '--adp-mobile-day-cell-height',
	'adp-mbl-month-cell-h': '--adp-mobile-month-cell-height',
	'adp-mbl-year-cell-h': '--adp-mobile-year-cell-height'
} satisfies AdpThemeMappingVariables<'height'>;

export const ADP_BORDER_RADIUS_VARIABLES = {
	'adp-rounded': '--adp-border-radius',
	'adp-ptr-rounded': ['--adp-poiner-border-radius', '--adp-pointer-border-radius'],
	'adp-cell-rounded': '--adp-cell-border-radius',
	'adp-btn-rounded': '--adp-btn-border-radius'
} satisfies AdpThemeMappingVariables<'borderRadius'>;
