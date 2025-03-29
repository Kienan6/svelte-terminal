import type { Command, Parameter, ParsedCommand } from '$lib/types.js';
import notFoundCommand from '$lib/commands/not_found.svelte.js';
import invalidParameterCommand from '$lib/commands/invalid_paramenter.svelte.js';
import type Terminal from '$lib/state/terminal.svelte.js';

type CommandParameters = {
	commandDefaults?: {
		notFound?: Command;
		invalidParameters?: Command;
	};
};

class Commands {
	commands = $state<Command[]>([]);
	aliasMap = $state<Record<string, string>>({});
	terminal: Terminal;
	notFoundCommand: Command;
	invalidParametersCommand: Command;

	constructor(terminal: Terminal, parameters?: CommandParameters) {
		this.terminal = terminal;
		this.notFoundCommand = parameters?.commandDefaults?.notFound ?? notFoundCommand;
		this.invalidParametersCommand =
			parameters?.commandDefaults?.invalidParameters ?? invalidParameterCommand;
	}

	addCommands(commands: Command[]) {
		commands.forEach((command) => {
			this.addCommand(command);
		});
	}

	addCommand(command: Command) {
		for (const alias of command.alias) {
			this.aliasMap[alias] = command.name;
		}
		this.commands.push(command);
	}

	getCommand(name: string): Command | undefined {
		return this.commands.find((command) => command.name === name);
	}

	getCommandByAlias(alias: string): Command | undefined {
		const commandName = this.aliasMap[alias] as string;
		return this.getCommand(commandName);
	}

	private parseParametersFromLine(params: string[]): Parameter[] {
		const out: Parameter[] = [];
		const paramRegex = /--[A-Za-z]+/g;

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
	private parseLine(line: string): ParsedCommand | null {
		const strs = line.split(' ');
		if (strs.length < 1) {
			return null;
		}

		return {
			alias: strs.shift() ?? '',
			parameters: this.parseParametersFromLine(strs)
		};
	}

	//TODO - kind of awkward
	run() {
		const input = this.terminal.current.value;
		const parsedCommand = this.parseLine(input);

		//TODO - standard error
		if (!parsedCommand) {
			return '';
		}

		const params = parsedCommand.parameters;
		const alias = parsedCommand.alias;
		const command = this.getCommandByAlias(alias);

		if (!command) {
			return this.notFoundCommand.fn(this.terminal, []);
		}
		//check parameters against found command parameters
		for (const param of params) {
			if (!command.parameters.find((v) => v.name === param.name)) {
				return this.invalidParametersCommand.fn(this.terminal, [param]);
			}
		}

		command.fn(this.terminal, params);
	}
}

export default Commands;
