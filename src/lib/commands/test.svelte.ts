import type { Command, Parameter, TerminalOutput } from '$lib/types.js';
import { formatOutput } from '$lib/commands/helpers.js';
import type Terminal from '$lib/state/terminal.svelte.js';

function testCommandFn(state: Terminal, parameters: Parameter[]) {
	const paramsAsOutput = parameters.reduce((p, c) => {
		p += c.name + ' = ' + c.value + '\n';
		return p;
	}, '');
	const output: TerminalOutput = {
		output: formatOutput(state.current.value, 'Test Command Ran with Params -\n' + paramsAsOutput),
		path: state.current.path
	};

	state.pushHistory(output);
}

const testCommand = {
	name: 'test',
	description: 'Test output',
	alias: ['test', 'ts'],
	parameters: [
		{
			name: 'name'
		}
	],
	fn: testCommandFn
} as Command;

export default testCommand;
