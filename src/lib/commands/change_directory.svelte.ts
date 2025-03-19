import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter } from '$lib/types.js';
import { fileSystem } from '$lib/state.svelte.js';

function changeDirectoryCommandFn(state: Terminal, parameters: Parameter[]) {
	if (parameters.length < 1) {
		return state.createMessage('Requires path');
	}
	const path = parameters[0].value;
	if (fileSystem.validDirectory(path)) {
		state.createMessage('');

		state.setCurrent({
			path: parameters[0].value,
			value: ''
		});
	} else {
		state.createMessage('Invalid directory');
	}
}

const changeDirectoryCommand = {
	name: 'changeDirectory',
	description: 'Change Directory',
	alias: ['cd'],
	parameters: [
		{
			name: ''
		}
	],
	fn: changeDirectoryCommandFn
} as Command;

export default changeDirectoryCommand;
