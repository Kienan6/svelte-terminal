import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter } from '$lib/types.js';
import { fileSystem } from '$lib/state.svelte.js';

//TODO - only current dir for now
function listDirectoryCommandFn(state: Terminal, parameters: Parameter[]) {
	const files = fileSystem.listFiles(state.current.path);
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
	parameters: [],
	fn: listDirectoryCommandFn
} as Command;

export default listDirectoryCommand;
