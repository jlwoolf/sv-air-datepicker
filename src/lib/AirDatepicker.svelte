<script lang="ts">
	import AirDatepicker, { type AirDatepickerOptions } from 'air-datepicker';
	import localeEn from 'air-datepicker/locale/en';
	import 'air-datepicker/air-datepicker.css';

	interface AirDatePickerProps extends AirDatepickerOptions {
		/** an html element to bind the picker to */
		el?: HTMLElement;
		class?: string;
	}

	let { el, class: classNames, ...opts }: AirDatePickerProps = $props();
	let div = $state<HTMLDivElement>();
	let picker: AirDatepicker | undefined;

	$effect(() => {
		if (picker) picker.destroy();

		if (el) {
			picker = new AirDatepicker(el as HTMLInputElement, {
				locale: localeEn,
				classes: classNames,
				...opts
			});
		} else if (div) {
			picker = new AirDatepicker(div as HTMLInputElement, {
				locale: localeEn,
				classes: classNames,
				...opts
			});
		}
	});
</script>

{#if !el}
	<div bind:this={div} ></div>
{/if}

<style>
</style>
