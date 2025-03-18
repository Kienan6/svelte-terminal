import type Terminal from '$lib/state/terminal.svelte.js';
import type { Command, Parameter } from '$lib/types.js';

function clearCommandFn(state: Terminal, parameters: Parameter[]) {
	state.setCurrent({
		path: state.current.path,
		value: ''
	});
	state.setHistory([]);
}

const clearCommand = {
	name: 'clear',
	description: 'Test output',
	alias: ['clear'],
	parameters: [],
	fn: clearCommandFn
} as Command;

export default clearCommand;
