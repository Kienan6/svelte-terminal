import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter } from '$lib/types.js';
import { resolveAbsolutePath } from '$lib/commands/helpers.js';

function changeDirectoryCommandFn(state: Terminal, parameters: Parameter[]) {
	if (parameters.length === 0) {
		return state.createMessage('Requires path');
	}
	const pathParam = parameters[0].value;
	const path = resolveAbsolutePath(state.current.path, pathParam);
	if (state.fileSystem.validDirectory(path)) {
		state.createMessage('');

		state.setCurrent({
			path: path,
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
