<script>
	import Container from '$lib/Container.svelte';
	import LineManager from '$lib/LineManager.svelte';
	import MacBar from '$lib/MacBar.svelte';
</script>

<div class="flex h-full w-full items-center justify-center bg-slate-800">
	<Container class="h-1/2 w-3xl">
		<MacBar />
		<LineManager />
	</Container>
</div>
