export function formatOutput(input: string, output: string) {
	return input + '\n' + output;
}

export function resolveAbsolutePath(currentPath: string, param: string): string {
	let absolutePath = '';

	//shortcut
	if (param.startsWith('..')) {
		const temp = currentPath.split('/');
		temp.pop();
		absolutePath = temp.join('/');
		//absolute
	} else if (param.startsWith('/')) {
		absolutePath = param;
		//relative
	} else {
		absolutePath = currentPath + '/' + param;
	}

	return absolutePath;
}
