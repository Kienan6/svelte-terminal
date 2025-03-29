import type { Command, Parameter, TerminalState } from '$lib/types.js';

type ParsedCommand = {
	alias: string;
	parameters: Parameter[];
};

class Commands {
	commandMap: Record<string, Command> = $state({});
	terminalState: TerminalState;

	constructor(terminalState: TerminalState) {
		this.terminalState = terminalState;
	}

	addCommand(name: string, command: Command) {
		this.commandMap[name] = command;
	}

	getCommand(name: string) {
		return this.commandMap[name];
	}

	private parseParametersFromLine(params: string[]): Parameter[] {
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
	private parseLine(line: string): ParsedCommand | null {
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
	commandFactory() {
		const input = this.terminalState.current.value;
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
}

export default Commands;
