import Terminal from '$lib/state/terminal.svelte.js';
import FileSystem, { type FileSystemInput } from '$lib/state/file_system.svelte.js';
import Commands from '$lib/state/commands.svelte.js';
import changeDirectoryCommand from '$lib/commands/change_directory.svelte.js';
import clearCommand from '$lib/commands/clear.svelte.js';
import listDirectoryCommand from '$lib/commands/list_directory.svelte.js';
import testCommand from '$lib/commands/test.svelte.js';
import printCommand from '$lib/commands/print.svelte.js';

const fileSystemMap: FileSystemInput = {
	home: {
		'test.txt': {
			contents: 'this is a file'
		},
		projects: {
			terminal: {},
			kienan: {
				'file.txt': {
					contents: 'wow, another file'
				}
			}
		}
	}
};

export const fileSystem = new FileSystem(fileSystemMap);
export const terminal = new Terminal('Kienan@Terminal', {
	path: '/home',
	value: ''
});
const allCommands = [
	changeDirectoryCommand,
	clearCommand,
	listDirectoryCommand,
	testCommand,
	printCommand
];
export const commands = new Commands(terminal);
commands.addCommands(allCommands);
