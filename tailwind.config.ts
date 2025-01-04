import type { Config } from 'tailwindcss';
import adpPlugin from './src/lib/tailwindcss';
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [adpPlugin, daisyui]
} satisfies Config;
