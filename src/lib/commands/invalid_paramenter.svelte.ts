import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter } from '$lib/types.js';

function invalidParameterCommandFn(state: Terminal, parameters: Parameter[]) {
	state.createMessage('Invalid Parameter ' + parameters[0].name);
}

const invalidParameterCommand = {
	name: 'notFound',
	description: 'Not Found',
	alias: [],
	parameters: [],
	fn: invalidParameterCommandFn
} as Command;

export default invalidParameterCommand;
