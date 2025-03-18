import type { TerminalOutput } from '$lib/types.js';
import Terminal from '$lib/state/terminal.svelte.js';

const fakeOutput: TerminalOutput = {
	output: 'cd \ntest output',
	path: '~/test'
};
const fakeOutput_2: TerminalOutput = {
	output: 'cd\ntest output\ntesting',
	path: '~/test/another'
};

export const terminal = new Terminal(
	'Kienan@Terminal',
	{
		path: '~',
		value: ''
	},
	[fakeOutput, fakeOutput_2]
);

// runtime generated map of alias -> command name
export const aliasMap = $state<{ generated: boolean; map: Record<string, string> }>({
	generated: false,
	map: {}
});
