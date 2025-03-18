<script lang="ts">
	import type { DefaultProps } from '$lib/types.ts';
	import { twMerge } from 'tailwind-merge';

	type Props = DefaultProps & {}

	const { class: _class }: Props = $props();

	const buttonClasses: Record<string, string> = {
		default: 'rounded-full w-4 h-4 hover:brightness-90',
		'close': 'bg-red-400',
		'minimize': 'bg-amber-300',
		'maximize': 'bg-green-500'
	};

	const defaultClass = 'z-40 bg-slate-600 p-2 flex items-center rounded-t-lg gap-2 sticky top-0';

	const style = twMerge(defaultClass, _class);
</script>

{#snippet button(t)}
	<button class={twMerge(buttonClasses['default'], buttonClasses[t])} aria-label="Close"></button>
{/snippet}

<div class={style}>
	{@render button("close")}
	{@render button("minimize")}
	{@render button("maximize")}
</div>
