import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter } from '$lib/types.js';
import { resolveAbsolutePath } from '$lib/commands/helpers.js';

function printCommandFn(state: Terminal, parameters: Parameter[]) {
	if (parameters.length === 0) {
		return state.createMessage('Requires path');
	}
	const pathParam = parameters[0].value;
	const path = resolveAbsolutePath(state.current.path, pathParam);

	const file = state.fileSystem.getFileByPath(path);
	if (file && !file.directory) {
		state.createMessage(file._contents);
	} else {
		state.createMessage('Invalid file');
	}
}

const printCommand = {
	name: 'print',
	description: 'print file',
	alias: ['cat'],
	parameters: [
		{
			name: ''
		}
	],
	fn: printCommandFn
} as Command;

export default printCommand;
