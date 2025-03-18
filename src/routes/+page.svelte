<script>
	import Container from '$lib/Container.svelte';
	import LineManager from '$lib/LineManager.svelte';
	import MacBar from '$lib/MacBar.svelte';
</script>
<div class="flex items-center justify-center h-full w-full">
	<Container class="w-3xl h-1/2">
		<MacBar />
		<LineManager />
	</Container>
</div>
