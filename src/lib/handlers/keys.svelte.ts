import { commandFactory } from '$lib/commands/factory.svelte.js';
import { terminal } from '$lib/state.svelte.js';

export function handleEnter() {
	commandFactory(terminal);
}
