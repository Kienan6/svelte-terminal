<script lang="ts">
	import PathDisplay from '$lib/PathDisplay.svelte';
	import Input from '$lib/Input.svelte';
	import type { DefaultProps } from '$lib/types.ts';

	type Props = DefaultProps & {
		user: string;
		path: string;
		historic?: boolean;
		value?: string;
	}

	let input: Input;

	let { historic, user, path, value = $bindable('') }: Props = $props();

	function handleMouseUp() {
		input.focus();
	}

</script>

<svelte:window onmouseup={handleMouseUp}></svelte:window>
<div>
	<PathDisplay user={user} path={path} />
	<Input bind:this={input} disabled={historic} bind:value={value} />
	<!--	<Cursor />-->
</div>
