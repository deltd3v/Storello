export interface boardI {
	id?: string;
	no?: number;
	title?: string;
	tasks?: tasksI[];
}

export interface tasksI {
	description?: string;
	label?: 'purple' | 'green' | 'yellow' | 'blue' | 'gray' | 'red';
}
