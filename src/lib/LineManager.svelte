<script lang="ts">
	import Line from '$lib/Line.svelte';
	import type Terminal from './state/terminal.svelte.js';
	type Props = {
		terminal: Terminal;
	};

	let { terminal }: Props = $props();
</script>

<div class="flex flex-col gap-2">
	{#each terminal.history as command, index (index)}
		<Line historic user={terminal.user} path={command.path} value={command.output} />
	{/each}
	<Line user={terminal.user} path={terminal.current.path} bind:value={terminal.current.value} />
</div>
