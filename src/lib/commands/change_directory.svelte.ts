import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter, TerminalOutput } from '$lib/types.js';
import { formatOutput } from '$lib/commands/helpers.js';

function changeDirectoryCommandFn(state: Terminal, parameters: Parameter[]) {
	if (parameters.length < 1) {
		const output: TerminalOutput = {
			output: formatOutput(state.current.value, 'Requires path'),
			path: state.current.path
		};
		state.pushHistory(output);
		return;
	}
	//TODO - generalize this pattern
	state.pushHistory({
		path: state.current.path,
		output: state.current.value
	});

	state.setCurrent({
		path: parameters[0].value,
		value: ''
	});
}

const changeDirectoryCommand = {
	name: 'changeDirectory',
	description: 'Change Directory',
	alias: ['cd'],
	parameters: [
		{
			name: 'path'
		}
	],
	fn: changeDirectoryCommandFn
} as Command;

export default changeDirectoryCommand;
