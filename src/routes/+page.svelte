<script lang="ts">
	import { AirDatepicker } from '$lib';

	let input = $state<HTMLInputElement>();
</script>

<div class="p-4">
	<input bind:this={input} class="border-2 border-zinc-500" />
	<AirDatepicker el={input} />
</div>

<style>
</style>
