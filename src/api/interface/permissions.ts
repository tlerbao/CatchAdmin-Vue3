export namespace Role {
	export interface ReqRoleParams {
		role_name?: string;
	}
	export interface ResRoleList {
		id: number;
		role_name: string;
		identify: string;
		parent_id: number;
		description: string;
		data_range: number;
		creator_id: number;
		created_at: string;
		updated_at: string;
		deleted_at: number;
		_permissions: any[];
		departments: any[];
	}
}

export namespace User {
	export interface ReqUserParams {
		username?: string;
	}
	export interface ResUserList {
		id: number;
		username: string;
		email: string;
		avatar: string;
		creator_id: number;
		department_id: number;
		status: number;
		last_login_ip: string;
		last_login_time: number;
		created_at: string;
		department_name: string;
		jobs: number[];
		roles: number[];
	}
}

export namespace Department {
	export interface ReqDepartmentParams {
		department_name?: string;
	}
	export interface ResDepartmentList {
		id: number;
		department_name: string;
		parent_id: number;
		principal: string;
		mobile: string;
		email: string;
		creator_id: number;
		status: number;
		sort: number;
		created_at: string;
		updated_at: string;
		deleted_at: number | null;
	}
}

export namespace Job {
	export interface ReqJobParams {
		job_name?: string;
		coding?: string;
		status?: number;
	}
	export interface ResJobList {
		id: number;
		job_name: string;
		coding: string;
		creator_id: number;
		status: number;
		sort: number;
		description: string;
		created_at: string;
		updated_at: string;
		deleted_at: number;
	}
}

export namespace Rule {
	export interface ReqRuleParams {
		permission_name?: string;
	}
	export interface ResRuleList {
		id: number;
		permission_name: string;
		parent_id: number;
		level: string;
		route: string;
		icon: string;
		module: string;
		permission_mark: string;
		component: string;
		redirect: string;
		type: number;
		is_link: number;
		is_full: number;
		is_hidden: number;
		is_affix: number;
		is_keepalive: number;
		sort: number;
		creator_id: number;
		created_at: null | string;
		updated_at: null | string;
		deleted_at: number;
		actionList: any[];
	}
}
