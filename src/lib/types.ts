import type { Snippet } from 'svelte';
import type Terminal from '$lib/state/terminal.svelte.js';

export type DefaultProps = {
	class?: string;
	children?: Snippet;
};

export type ParameterConfig = {
	name: string;
	optional?: boolean;
};

export type Parameter = {
	name: string;
	value: string;
};

//TODO - no object literal
export type CommandFunction = (state: Terminal, parameters: Parameter[]) => void;

export type Command = {
	name: string;
	alias: string[];
	description: string;
	parameters: ParameterConfig[];
	fn: CommandFunction;
};

export type ParsedCommand = {
	alias: string;
	parameters: Parameter[];
};

export type TerminalOutput = {
	output: string;
	path: string;
};

export type TerminalCurrentState = {
	path: string;
	value: string;
};

export type TerminalState = {
	user: string;
	current: TerminalCurrentState;
	history: TerminalOutput[];
};
