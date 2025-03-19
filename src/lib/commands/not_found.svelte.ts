import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter } from '$lib/types.js';

function notFoundCommandFn(state: Terminal, parameters: Parameter[]) {
	state.createMessage('Command Not Found');
}

const notFoundCommand = {
	name: 'notFound',
	description: 'Not Found',
	alias: [],
	parameters: [],
	fn: notFoundCommandFn
} as Command;

export default notFoundCommand;
