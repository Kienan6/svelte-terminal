type File = {
	name: string;
	_contents: string;
	directory: boolean;
	children: File[];
};

type FileInput = {
	_contents: string;
};
const isFileInput = (f: object): f is FileInput => '_contents' in f;
export type FileSystemInput = { [key: string]: FileSystemInput | FileInput };

class FileSystem {
	root: File;

	private buildTree(node: File, map: FileSystemInput) {
		if (Object.keys(map).length === 0) {
			return null;
		}
		for (const key of Object.keys(map)) {
			if (isFileInput(map[key])) {
				const f: File = {
					name: key,
					children: [],
					directory: false,
					_contents: map[key]._contents
				};
				node.children?.push(f);
			} else {
				const f: File = {
					name: key,
					children: [],
					directory: true,
					_contents: ''
				};
				node.children?.push(f);
				this.buildTree(f, map[key] as FileSystemInput);
			}
		}
	}

	constructor(map: FileSystemInput) {
		const _root: File = {
			name: '',
			_contents: '',
			directory: true,
			children: []
		};
		this.buildTree(_root, map);
		this.root = _root;
	}

	// single level find
	getFileInFolder(folder: File, name: string): File | null {
		for (const file of folder.children) {
			if (file.name === name && !file.directory) {
				return file;
			}
		}
		return null;
	}

	// TODO - refactor
	private _getFileByPath(file: File, path: string): File | null {
		const paths = path.split('/');
		const current = paths[0];
		if (file.name === current) {
			//success
			if (paths.length === 1) {
				return file;
			}
			paths.shift();
			for (const child of file.children) {
				const res = this._getFileByPath(child, paths.join('/'));
				if (res) {
					return res;
				}
			}
		}
		return null;
	}

	//absolute path
	public getFileByPath(path: string): File | null {
		if (path === '') {
			return null;
		}
		return this._getFileByPath(this.root, path);
	}

	validDirectory(path: string): boolean {
		const f = this.getFileByPath(path);
		return Boolean(f?.directory);
	}

	// takes absolute path ie . /root/user/home to a dir
	listFiles(path: string): File[] | null {
		const file = this.getFileByPath(path);
		if (file && file.directory) {
			return file.children;
		}
		return null;
	}
}

export default FileSystem;
