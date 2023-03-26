import http from "@/api";
import { ResPage, ResultData } from "@/api/interface";

// 附件列表
export const getAttachmentList = (params: any) => {
	return http.get<ResPage<any>>(`/attachments`, params);
};

// 删除附件
export const deleteAttachment = (params: any) => {
	return http.delete(`/attachments/` + params.id);
};

// 数据字典列表
export const getDatabaseList = (params: any) => {
	return http.get<ResPage<any>>(`/tables`, params);
};

// 查看数据表详情
export const getDatabaseDetail = (tableName: any) => {
	return http.get(`/table/view/` + tableName);
};

// 上传图片
export const uploadImage = (params: any) => {
	return http.post(`/upload/image`, params);
};

//上传文件
export const uploadFile = (params: any) => {
	return http.post(`/upload/file`, params);
};

// 登陆日志
export const getLoginLogList = (params: any) => {
	return http.get<ResPage<any>>(`/log/login`, params);
};

// 删除登陆日志
export const deleteLoginLog = (params: any) => {
	return http.delete(`/log/login/` + params.id);
};

// 操作日志
export const getOperationLogList = (params: any) => {
	return http.get<ResPage<any>>(`/log/operate`, params);
};

// 删除操作日志
export const deleteOperationLog = (params: any) => {
	return http.delete(`/log/operate/` + params.id);
};

// 模块管理
export const getModuleList = (params: any) => {
	return http.get<ResPage<any>>(`/modules`, params);
};

// 启用禁用模块
export const updateModuleStatus = (params: any) => {
	return http.put(`/modules/` + params.alias);
};

// 缓存模块
export const cacheModule = (params: any) => {
	return http.put(`/cache/modules`, params);
};

// 清理缓存
export const clearCache = (params: any) => {
	return http.delete(`/clear/modules`, params);
};

// 获取系统配置
export const getSystemConfig = () => {
	return http.get(`config/parent`, {});
};

// 读取配置
export const getConfig = (params: { name: string }) => {
	return http.get(`config/` + params.name, {});
};

// 保存配置
export const saveConfig = (params: any) => {
	return http.post(`config`, params);
};

// 开发者列表
export const getDeveloperList = (params: any) => {
	return http.get<ResPage<any>>(`/developer`, params);
};

// 编辑开发者
export const editDeveloper = (params: any) => {
	return http.put(`/developer` + params.id, params);
};

// 删除开发者
export const deleteDeveloper = (params: any) => {
	return http.delete(`/developer/` + params.id);
};

// 敏感词列表
export const getSensitiveList = (params: any) => {
	return http.get<ResPage<any>>(`/sensitive/word`, params);
};

// 新增敏感词
export const addSensitive = (params: any) => {
	return http.post(`/sensitive/word`, params);
};

// 编辑敏感词
export const editSensitive = (params: any) => {
	return http.put(`/sensitive/word/` + params.id, params);
};

// 删除敏感词
export const deleteSensitive = (params: any) => {
	return http.delete(`/sensitive/word/` + params.id);
};

// 预览代码
export const previewCode = (params: any) => {
	return http.post<ResultData<any | string>>(`/generate/preview`, params);
};

// 创建模块
export const createModule = (params: any) => {
	return http.post(`/generate/create/module`, params);
};

// 生成代码
export const generateCode = (params: any) => {
	return http.post(`/generate`, params);
};
