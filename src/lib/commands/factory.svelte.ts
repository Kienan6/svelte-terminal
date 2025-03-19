import type { Command, Parameter } from '$lib/types.js';
import testCommand from '$lib/commands/test.svelte.js';
import { aliasMap } from '$lib/state.svelte.js';
import type Terminal from '$lib/state/terminal.svelte.js';
import notFoundCommand from '$lib/commands/not_found.svelte.js';
import invalidParameterCommand from '$lib/commands/invalid_paramenter.svelte.js';
import clearCommand from '$lib/commands/clear.svelte.js';
import changeDirectoryCommand from '$lib/commands/change_directory.svelte.js';
import listDirectoryCommand from '$lib/commands/list_directory.svelte.js';

type ParsedCommand = {
	alias: string;
	parameters: Parameter[];
};

//command name -> command
const commandMap: Record<string, Command> = {
	test: testCommand,
	clear: clearCommand,
	changeDirectory: changeDirectoryCommand,
	listDirectory: listDirectoryCommand
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
	const paramRegex = /--[A-Za-z]+/g;
	console.log(params);

	//TODO - very simple
	for (let i = 0; i < params.length; i++) {
		const param = params[i];
		const isParam = param.match(paramRegex);
		if (isParam) {
			out.push({
				name: params[i].substring(2),
				value: params[i + 1] ?? 'true' //TODO - this doesnt seem right, but works - thanks js
			});
		} else {
			//just a value
			out.push({
				name: '',
				value: params[i]
			});
		}
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

//TODO - kind of awkward
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
