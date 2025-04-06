<script lang="ts">
	import { ChangeDirectory, Clear, ListDirectory, Print } from '$lib/commands/index.js';
	import { Commands, Terminal, Container, LineManager, MacBar, FileSystem } from '$lib/index.js';
	import type { FileSystemInput } from '$lib/index.js';

	const fileSystemMap: FileSystemInput = {
		home: {
			'test.txt': {
				_contents: 'this is a file'
			},
			projects: {
				terminal: {},
				kienan: {
					'file.txt': {
						_contents: 'wow, another file'
					}
				}
			}
		}
	};

	const fileSystem = new FileSystem(fileSystemMap);
	const terminal = new Terminal('Kienan@Terminal', fileSystem, {
		path: '/home',
		value: ''
	});
	const allCommands = [ChangeDirectory, Clear, ListDirectory, Print];
	export const commands = new Commands(terminal);
	commands.addCommands(allCommands);
</script>

<div class="flex h-full w-full items-center justify-center bg-slate-800">
	<Container class="h-1/2 w-3xl" {terminal} {commands}>
		<MacBar />
		<LineManager {terminal} />
	</Container>
</div>
