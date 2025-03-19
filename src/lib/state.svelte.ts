import Terminal from '$lib/state/terminal.svelte.js';
import FileSystem, { type FileSystemInput } from '$lib/state/file_system.svelte.js';

const fileSystemMap: FileSystemInput = {
	root: {
		file: {
			contents: 'test',
			name: 'test'
		},
		dir1: {
			dir2: {},
			dir3: {
				file2: {
					contents: 'test2',
					name: 'test2'
				}
			}
		}
	}
};

export const fileSystem = new FileSystem(fileSystemMap);

export const terminal = new Terminal('Kienan@Terminal', {
	path: '~',
	value: ''
});

// runtime generated map of alias -> command name
export const aliasMap = $state<{ generated: boolean; map: Record<string, string> }>({
	generated: false,
	map: {}
});
