import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter, TerminalOutput } from '$lib/types.js';
import { formatOutput } from '$lib/commands/helpers.js';

function notFoundCommandFn(state: Terminal, parameters: Parameter[]) {
	const output: TerminalOutput = {
		output: formatOutput(state.current.value, 'Command Not Found'),
		path: state.current.path
	};

	state.pushHistory(output);
}

const notFoundCommand = {
	name: 'notFound',
	description: 'Not Found',
	alias: [],
	parameters: [],
	fn: notFoundCommandFn
} as Command;

export default notFoundCommand;
