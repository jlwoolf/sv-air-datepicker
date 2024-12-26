# Svelte Air Datepicker

This library is an adaptation of the Air Datepicker library for working with Svelte and TailwindCSS. The goal was to keep the original implementation as untouched as possible, wrapping it for easier usage and customization.

> Because english is my first language, the default locale is set to `en`. This can be changed by passing a different locale prop.

## Usage

To use the Air Datepicker, simply import the component from the library and use it in your svelte components and pages!

```svelte
<script>
	import { AirDatepicker } from 'sv-air-datepicker';
</script>

<AirDatepicker />
```

By default, the datepicker will be bound to a div element unless provided an `el` property.

```svelte
<script lang="ts">
	import { AirDatepicker } from 'sv-air-datepicker';

	let input = $state<HTMLInputElement>();
</script>

<input bind:this={input} />
<AirDatepicker el={input} />
```

### TailwindCSS

To use TailwindCSS stylings with the Air Datepicker, first import the plugin and add it to your tailwind config.

e.g. `tailwind.config.ts`

```ts
import plugin from 'sv-air-datepicker/tailwindcss';

export default {
	//...
	plugins: [plugin]
};
```

Then add your desired classes to the component

```svelte
<script lang="ts">
	import { AirDatepicker } from 'sv-air-datepicker';

	let input = $state<HTMLInputElement>();
</script>

<input bind:this={input} />
<AirDatepicker el={input} class="adp-bg-red-500" />
```

## Building

To build the library:

```bash
npm run package
```
