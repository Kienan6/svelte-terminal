import type { Command, Parameter } from '$lib/types.js';
import type Terminal from '$lib/state/terminal.svelte.js';

function testCommandFn(state: Terminal, parameters: Parameter[]) {
	const paramsAsOutput = parameters.reduce((p, c) => {
		p += c.name + ' = ' + c.value + '\n';
		return p;
	}, '');
	state.createMessage('Test Command Ran with Params -\n' + paramsAsOutput);
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
