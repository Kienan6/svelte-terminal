import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter } from '$lib/types.js';
import { resolveAbsolutePath } from '$lib/commands/helpers.js';

//TODO - only current dir for now
function listDirectoryCommandFn(state: Terminal, parameters: Parameter[]) {
	let path = state.current.path;
	if (parameters.length > 0) {
		const pathParam = parameters[0].value;
		path = resolveAbsolutePath(path, pathParam);
	}

	const files = state.fileSystem.listFiles(path);

	if (files) {
		const message = files.reduce((p, c) => {
			p += c.name + '\n';
			return p;
		}, '');
		state.createMessage(message);
	} else {
		state.createMessage('Invalid Path');
	}
}

const listDirectoryCommand = {
	name: 'listDirectory',
	description: 'List Directory',
	alias: ['ls'],
	parameters: [
		{
			name: '',
			optional: true
		}
	],
	fn: listDirectoryCommandFn
} as Command;

export default listDirectoryCommand;
