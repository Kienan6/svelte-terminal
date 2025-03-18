import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter, TerminalOutput } from '$lib/types.js';
import { formatOutput } from '$lib/commands/helpers.js';

function invalidParameterCommandFn(state: Terminal, parameters: Parameter[]) {
	const output: TerminalOutput = {
		output: formatOutput(state.current.value, 'Invalid Parameter ' + parameters[0].name),
		path: state.current.path
	};

	state.pushHistory(output);
}

const invalidParameterCommand = {
	name: 'notFound',
	description: 'Not Found',
	alias: [],
	parameters: [],
	fn: invalidParameterCommandFn
} as Command;

export default invalidParameterCommand;
