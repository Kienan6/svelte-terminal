<script lang="ts">
	import type { DefaultProps } from '$lib/types.ts';
	import { twMerge } from 'tailwind-merge';
	import { handleArrowDown, handleArrowUp, handleEnter } from '$lib/handlers/keys.js';
	import type Commands from './state/commands.svelte.js';
	import type Terminal from './state/terminal.svelte.js';

	type Props = DefaultProps & {
		commands: Commands;
		terminal: Terminal;
	};

	let { commands, terminal, class: _class, children }: Props = $props();

	function handleKeyDown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				handleArrowDown(terminal);
				break;
			case 'ArrowUp':
				e.preventDefault();
				handleArrowUp(terminal);
				break;
			// case 'ArrowLeft':
			// 	break;
			// case 'ArrowRight':
			// 	break;
			case 'Enter':
				e.preventDefault();
				handleEnter(terminal, commands);
				break;
			// case 'Control':
			// 	break;
			default:
		}
	}

	const defaultClass =
		'border border-1 border-slate-200 rounded-lg min-h-64 min-w-64 bg-slate-900 text-white overflow-y-scroll';

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
