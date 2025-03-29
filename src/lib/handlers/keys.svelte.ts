import type Commands from '$lib/state/commands.svelte.js';

export function handleEnter(commands: Commands) {
	commands.run();
}
