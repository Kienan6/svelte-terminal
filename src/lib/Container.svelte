<script lang="ts">

	import type { DefaultProps } from '$lib/types.ts';
	import { twMerge } from 'tailwind-merge';
	import { handleEnter } from '$lib/handlers/keys.svelte.js';

	type Props = DefaultProps & {}

	let { class: _class, children }: Props = $props();


	function handleKeyDown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				break;
			case 'ArrowUp':
				break;
			case 'ArrowLeft':
				break;
			case 'ArrowRight':
				break;
			case 'Enter':
				e.preventDefault();
				handleEnter();
				break;
			case 'Control':
				break;
			default:
		}
	}

	const defaultClass = 'border border-1 border-slate-200 rounded-lg min-h-64 min-w-64 bg-slate-900 text-white overflow-y-scroll';

	const style = twMerge(defaultClass, _class);
</script>

<svelte:window onkeydown={handleKeyDown} />
<div class={style}>
	{@render children?.()}
</div>
<style>
    :global(body) {
        font-family: 'IBM Plex Mono', serif;
    }
</style>
