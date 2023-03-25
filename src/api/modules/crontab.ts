import http from "@/api";

// 任务列表
export const getTaskList = (params: any) => {
	return http.get(`/monitor/crontab`, params);
};

// 新增任务
export const addTask = (params: any) => {
	return http.post(`/monitor/crontab`, params);
};

// 修改任务
export const editTask = (params: any) => {
	return http.put(`/monitor/crontab`, params);
};

// 删除任务
export const deleteTask = (params: any) => {
	return http.delete(`/monitor/crontab`, params);
};
//任务日志
export const getTaskLogList = (params: any) => {
	return http.get(`/monitor/crontab/log/list`, params);
};

// 删除任务日志
export const deleteTaskLog = (params: any) => {
	return http.delete(`/monitor/crontab/log`, params);
};
