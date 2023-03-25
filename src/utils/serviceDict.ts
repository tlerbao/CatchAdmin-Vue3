// * 系统全局字典

export const permissionName = [
	{
		value: "列表",
		label: "列表"
	},
	{
		value: "创建",
		label: "创建"
	},
	{
		value: "更新",
		label: "更新"
	},
	{
		value: "删除",
		label: "删除"
	}
];

export const permissionMark = [
	{
		value: "index",
		label: "index"
	},
	{
		value: "save",
		label: "save"
	},
	{
		value: "update",
		label: "update"
	},
	{
		value: "delete",
		label: "delete"
	}
];

export const dataRange = [
	{
		value: 1,
		label: "全部数据权限"
	},
	{
		value: 2,
		label: "自定义数据权限"
	},
	{
		value: 3,
		label: "仅本人数据权限"
	},
	{
		value: 4,
		label: "本部门数据权限"
	},
	{
		value: 5,
		label: "本部门以及以下数据权限"
	}
];

export const operationType = [
	{ label: "GET", value: "GET" },
	{ label: "POST", value: "POST" },
	{ label: "PUT", value: "PUT" },
	{ label: "DELETE", value: "DELETE" }
];

// MysqlIndex
export const mysqlIndex = ["unique", "index", "fulltext"];

// MysqlType
export const mysqlType = [
	{
		label: "数字",
		options: [
			{ value: "tinyint" },
			{ value: "smallint" },
			{ value: "mediumint" },
			{ value: "int" },
			{ value: "bigint" },
			{ value: "decimal" },
			{ value: "float" },
			{ value: "uuid" },
			{ value: "boolean" }
		]
	},
	{
		label: "日期与时间",
		options: [{ value: "date" }, { value: "datetime" }, { value: "timestamp" }, { value: "time" }]
	},
	{
		label: "文本",
		options: [
			{ value: "char" },
			{ value: "varchar" },
			{ value: "tinyText" },
			{ value: "text" },
			{ value: "mediumText" },
			{ value: "longText" },
			{ value: "binary" },
			{ value: "varbinary" },
			{ value: "tinyblob" },
			{ value: "blob" },
			{ value: "mediumblob" },
			{ value: "longblob" },
			{ value: "enum" },
			{ value: "set" }
		]
	},
	{
		label: "json",
		options: [{ value: "json" }]
	}
];

export const smsDriver = [
	{ label: "阿里云", value: "aliyun" },
	{ label: "腾讯云", value: "tencent" },
	{ label: "Ucloud", value: "ucloud" },
	{ label: "Submail", value: "submail" }
];

/**
 * @description：用户性别
 */
export const genderType = [
	{ label: "男", value: 1 },
	{ label: "女", value: 2 }
];

/**
 * @description：用户状态
 */
export const userStatus = [
	{ label: "启用", value: 1 },
	{ label: "禁用", value: 0 }
];
