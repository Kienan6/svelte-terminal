import type { Command, Parameter } from '$lib/types.js';
import testCommand from '$lib/commands/test.svelte.js';
import { aliasMap } from '$lib/state.svelte.js';
import type Terminal from '$lib/state/terminal.svelte.js';
import notFoundCommand from '$lib/commands/not_found.svelte.js';
import invalidParameterCommand from '$lib/commands/invalid_paramenter.svelte.js';
import clearCommand from '$lib/commands/clear.svelte.js';

type ParsedCommand = {
	alias: string;
	parameters: Parameter[];
};

//command name -> command
const commandMap: Record<string, Command> = {
	test: testCommand,
	clear: clearCommand
};

//runtime generation of alias -> command name
function generateAliasMap() {
	for (const name of Object.keys(commandMap)) {
		const command = commandMap[name];
		for (const alias of command.alias) {
			aliasMap.map[alias] = command.name;
		}
	}
	aliasMap.generated = true;
}

function getCommandByAlias(alias: string): Command | undefined {
	if (!aliasMap.generated) {
		generateAliasMap();
	}
	const commandName = aliasMap.map[alias] as string;
	return commandMap[commandName] ?? undefined;
}

function parseParametersFromLine(params: string[]): Parameter[] {
	const out: Parameter[] = [];
	console.log(params);

	//TODO - very simple
	for (let i = 0; i < params.length; i++) {
		out.push({
			name: params[i],
			value: params[i + 1] ?? 'true' //TODO - this doesnt seem right, but works - thanks js
		});
		i++;
	}

	return out;
}

//TODO - nested parameters
function parseLine(line: string): ParsedCommand | null {
	const strs = line.split(' ');
	if (strs.length < 1) {
		return null;
	}

	return {
		alias: strs.shift() ?? '',
		parameters: parseParametersFromLine(strs)
	};
}

export function commandFactory(state: Terminal) {
	const input = state.current.value;
	const parsedCommand = parseLine(input);

	console.log(parsedCommand);

	//TODO - standard error
	if (!parsedCommand) {
		return '';
	}

	const params = parsedCommand.parameters;
	const alias = parsedCommand.alias;
	const command = getCommandByAlias(alias);

	if (!command) {
		return notFoundCommand.fn(state, []);
	}
	//check parameters against found command parameters
	for (const param of params) {
		if (!command.parameters.find((v) => v.name === param.name)) {
			return invalidParameterCommand.fn(state, [param]);
		}
	}

	command.fn(state, params);
}
