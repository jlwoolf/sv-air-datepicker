import type { Config } from 'tailwindcss';
import adpPlugin from './src/lib/tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [adpPlugin]
} satisfies Config;
