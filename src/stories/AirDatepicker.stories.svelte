<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { AirDatepicker } from '$lib';
	import './AirDatepicker.css';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'AirDatepicker',
		component: AirDatepicker,
		tags: ['autodocs'],
		argTypes: {},
		args: {}
	});

	let div = $state<HTMLDivElement>();
	let input = $state<HTMLInputElement>();
	let inlineInput = $state<HTMLInputElement>();
	let mobileInput = $state<HTMLInputElement>();

	let tailwindDiv = $state<HTMLDivElement>();
	let normalDiv = $state<HTMLDivElement>();
</script>

<Story name="Default" />

<Story name="With Passed Input Element">
	<input bind:this={input} />
	<AirDatepicker el={input} />
</Story>

<Story name="With Passed Div Element">
	<div bind:this={div}><AirDatepicker el={div} /></div>
</Story>

<Story name="Inline">
	<input bind:this={inlineInput} />
	<AirDatepicker el={inlineInput} inline />
</Story>

<Story name="Select date on initialization" args={{ inline: true, selectedDates: [new Date()] }} />

<Story
	name="Month selection"
	args={{
		inline: true,
		view: 'months',
		minView: 'months',
		dateFormat: 'MMMM yyyy'
	}}
/>

<Story name="Mobile devices mode">
	<input bind:this={mobileInput} />
	<AirDatepicker el={mobileInput} isMobile autoClose />
</Story>

<Story name="With TailwindCSS">
	<div class="flex gap-2">
		<div bind:this={normalDiv}><AirDatepicker el={normalDiv} /></div>
		<div bind:this={tailwindDiv}>
			<AirDatepicker
				el={tailwindDiv}
				class={[
					'adp-bg-zinc-800',
					'adp-bg-hover-zinc-700',
					'adp-bg-active-zinc-600',
					'adp-cell-bg-selected-rose-500',
					'adp-cell-bg-selected-hover-rose-400',
					'adp-bg-som-rose-500',
					'adp-bg-som-focused-rose-400',
					'adp-primary-zinc-200',
					'adp-secondary-zinc-400',
					'adp-accent-rose-500',
					'adp-om-zinc-500',
					'adp-day-name-purple-400',
					'adp-text-lg',
					'adp-rounded-lg',
					'adp-ptr-bg-zinc-800',
					'adp-ptr-size-2'
				].join(' ')}
			/>
		</div>
	</div>
</Story>
