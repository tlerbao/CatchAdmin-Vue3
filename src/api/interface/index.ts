// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	message: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

// * 分页响应参数
export interface ResPage<T> {
	data: T[];
	current: number;
	limit: number;
	count: number;
}

// * 分页请求参数
export interface ReqPage {
	current: number;
	limit: number;
}

// * 文件上传模块
export namespace Upload {
	export interface ResFileUrl {
		fileUrl: string;
	}
}

// * 登录模块
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		token: string;
		user: {
			id: number;
			username: string;
			password: string;
			email: string;
			avatar: string;
			remember_token: string;
			creator_id: number;
			department_id: number;
			status: number;
			last_login_ip: string;
			last_login_time: number;
			created_at: string;
			updated_at: string;
			deleted_at: number;
		};
	}
	export interface ResAuthButtons {
		[key: string]: string[];
	}
}

// * 用户管理模块
export namespace User {
	export interface ReqUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
	export interface ResUserList {
		id: string;
		username: string;
		gender: number;
		user: {
			detail: {
				age: number;
			};
		};
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		photo: any[];
		children?: ResUserList[];
	}
	export interface ResStatus {
		userLabel: string;
		userValue: number;
	}
	export interface ResGender {
		genderLabel: string;
		genderValue: number;
	}
	export interface ResDepartment {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
	export interface ResRole {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
}
