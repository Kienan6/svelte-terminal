<script lang="ts">

	import type { DefaultProps } from '$lib/types.ts';

	type Props = DefaultProps & {
		user: string;
		path: string;
	};

	const { user, path }: Props = $props();

</script>

<div class="inline-flex">
	<span class="bg-slate-700 pr-4 pl-2">{user}</span>
	<span class="bg-green-400 px-4">{path}</span>
</div>
