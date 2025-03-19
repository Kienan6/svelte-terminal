interface IFileType {
	getContents: () => string;
	execute: () => void;
}

type File = {
	name: string;
	contents: string;
	directory: boolean;
	children: File[];
};

type FileInput = {
	name: string;
	contents: string;
};
const isFileInput = (f: object): f is FileInput => 'contents' in f;
export type FileSystemInput = FileInput | { [key: string]: FileSystemInput };

class FileSystem {
	root: File;

	private buildTree(node: File, map: FileSystemInput) {
		if (Object.keys(map).length === 0) {
			return null;
		}

		if (isFileInput(map)) {
			const f: File = {
				name: map.name,
				children: [],
				directory: false,
				contents: map.contents
			};
			node.children?.push(f);
		} else {
			for (const key of Object.keys(map)) {
				const f: File = {
					name: key,
					children: [],
					directory: true,
					contents: ''
				};
				node.children?.push(f);
				this.buildTree(f, (map as { [key: string]: FileSystemInput })[key]);
			}
		}
	}

	constructor(map: FileSystemInput) {
		const _root: File = {
			name: '',
			contents: '',
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
	private getFileByPath(path: string): File | null {
		if (path === '') {
			return null;
		}
		return this._getFileByPath(this.root, path);
	}

	validDirectory(path: string): boolean {
		const f = this.getFileByPath(path);
		return f?.directory ?? false;
	}

	// takes absolute path ie . /root/user/home to a dir
	listFiles(path: string): File[] | null {
		const file = this.getFileByPath(path);
		if (file && file.directory) {
			return file.children;
		}
		return null;
	}

	print() {
		//this.printFromNode(this.root);
		//this.log();
		const test = this.listFiles('/root/dir1/dir2');
		console.log(test);
	}

	private log() {
		console.log(this.root);
	}
}

export default FileSystem;
