<script lang="ts">

	import type { DefaultProps } from '$lib/types.ts';
	import { twMerge } from 'tailwind-merge';

	type Props = DefaultProps & {
		disabled?: boolean;
		value: string;
	};

	let ref: HTMLDivElement;

	let { disabled, value = $bindable(), class: _class }: Props = $props();

	const defaultClass = '  whitespace-pre-wrap inline outline-none';

	const style = twMerge(defaultClass, _class);

	export function focus() {
		if (ref) {
			ref.focus();
		}
	}

</script>

{#if disabled}
	<div contenteditable="false"
			 class={style} bind:textContent={value}></div>
{:else}
	<div bind:this={ref} bind:textContent={value} contenteditable
			 class={style}></div>
{/if}
