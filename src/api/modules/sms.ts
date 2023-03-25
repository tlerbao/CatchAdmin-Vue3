import http from "@/api";

// 获取短信配置
export const getSmsConfig = (name: string) => {
	return http.get(`/sms/config/` + name, {}, { headers: { noLoading: true } });
};

// 保存短信配置
export const saveSmsConfig = (params: any) => {
	return http.post(`/sms/config`, params, { headers: { noLoading: true } });
};

// 获取短信模板
export const getSmsTemplateList = (params: any) => {
	return http.get(`/sms/template`, params, { headers: { noLoading: true } });
};

// 新增短信模板
export const addSmsTemplate = (params: any) => {
	return http.post(`/sms/template`, params);
};

// 编辑短信模板
export const editSmsTemplate = (params: any) => {
	return http.put(`/sms/template/` + params.id, params);
};

// 删除短信模板
export const deleteSmsTemplate = (params: any) => {
	return http.delete(`/sms/template/` + params.id);
};
