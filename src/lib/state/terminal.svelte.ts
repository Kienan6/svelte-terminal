import type { TerminalCurrentState, TerminalOutput } from '$lib/types.js';
import { formatOutput } from '$lib/commands/helpers.js';

// Singleton
class Terminal {
	static _instance: Terminal;
	_user: string = $state('');
	_history: TerminalOutput[] = $state([]);
	private _history_pointer: number = 0;
	_current: TerminalCurrentState = $state({
		path: '',
		value: ''
	});

	constructor(user: string, current?: TerminalCurrentState, history?: TerminalOutput[]) {
		if (Terminal._instance) {
			console.log('Terminal instance already created');
			return Terminal._instance;
		}
		Terminal._instance = this;

		this._user = user;
		this._current = current ?? this._current;
		this._history = history ?? this._history;
	}

	get user(): string {
		return this._user;
	}

	setUser = (user: string) => {
		this._user = user;
	};

	get current(): TerminalCurrentState {
		return this._current;
	}

	setCurrent = (current: TerminalCurrentState) => {
		this._current = current;
	};

	get history(): TerminalOutput[] {
		return this._history;
	}

	get historyPointer(): number {
		return this._history_pointer;
	}

	set historyPointer(val: number) {
		if (this._history.length >= val && val >= 0) {
			this._history_pointer = val;
		}
		if (this._history_pointer > 0) {
			this._current = {
				path: this._current.path,
				value: this._history[this._history.length - this._history_pointer].input
			};
		} else {
			this._current = {
				path: this._current.path,
				value: ''
			};
		}
	}

	setHistory = (history: TerminalOutput[]) => {
		this._history = history;
	};

	pushHistory = (history: TerminalOutput) => {
		this._current.value = '';
		this._history.push(history);
	};

	createMessage = (message: string) => {
		const output: TerminalOutput = {
			input: this._current.value,
			output: formatOutput(this._current.value, message),
			path: this._current.path
		};

		this.pushHistory(output);
	};
}

export default Terminal;
