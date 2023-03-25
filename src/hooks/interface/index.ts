export namespace Table {
	export interface Pageable {
		current: number;
		limit: number;
		count: number;
	}
	export interface TableStateProps {
		tableData: any[];
		pageable: Pageable;
		searchParam: {
			[key: string]: any;
		};
		searchInitParam: {
			[key: string]: any;
		};
		totalParam: {
			[key: string]: any;
		};
		icon?: {
			[key: string]: any;
		};
	}
}

export namespace HandleData {
	export type MessageType = "" | "success" | "warning" | "info" | "error";
}
