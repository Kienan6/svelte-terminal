import type Commands from '$lib/state/commands.svelte.js';
import type Terminal from '$lib/state/terminal.svelte.js';

export function handleEnter(terminal: Terminal, commands: Commands) {
	commands.run();
	terminal.historyPointer = 0;
}

export function handleArrowUp(terminal: Terminal) {
	terminal.historyPointer++;
}

export function handleArrowDown(terminal: Terminal) {
	terminal.historyPointer--;
}
