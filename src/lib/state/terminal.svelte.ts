import type { TerminalCurrentState, TerminalOutput } from '$lib/types.js';

// Singleton
class Terminal {
	static _instance: Terminal;
	_user: string = $state('');
	_current: TerminalCurrentState = $state({
		path: '',
		value: ''
	});
	_history: TerminalOutput[] = $state([]);

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

	setHistory = (history: TerminalOutput[]) => {
		this._history = history;
	};

	pushHistory = (history: TerminalOutput) => {
		this._current.value = '';
		this._history.push(history);
	};
}

export default Terminal;
