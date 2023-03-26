import http from "@/api";
import { ResPage, ResultData } from "@/api/interface";
import { User, Role, Rule, Department, Job } from "@/api/interface/permissions";

// 用户列表
export const getUserList = (params: User.ReqUserParams = {}) => {
	return http.get<ResPage<User.ResUserList>>(`/users`, params);
};

// 新增用户
export const addUser = (params: User.ResUserList) => {
	return http.post(`/users`, params);
};

// 编辑用户
export const editUser = (params: any) => {
	return http.put(`/users/` + params.id, params);
};

// 删除用户
export const deleteUser = (params: { id: number }) => {
	return http.delete(`/users/` + params.id);
};

// 重置密码
export const resetPassword = (params: { id: number }) => {
	return http.put(`/users/reset-password/` + params.id);
};

// 角色列表
export const getRoleList = (params: Role.ReqRoleParams = {}) => {
	return http.get<ResultData<Role.ResRoleList>>(`/roles`, params);
};

// 角色权限
export const getRolePermissions = (params: { id: number }) => {
	return http.get(`/role/permissions/` + params.id);
};

// 新增角色
export const addRole = (params: Role.ResRoleList) => {
	return http.post(`/roles`, params);
};

// 编辑角色
export const editRole = (params: Role.ResRoleList) => {
	return http.put(`/roles/` + params.id, params);
};

// 删除角色
export const deleteRole = (params: { id: number }) => {
	return http.delete(`/roles/` + params.id);
};

// 菜单列表
export const getRuleList = (params: Rule.ReqRuleParams = {}) => {
	return http.get<ResultData<Rule.ResRuleList>>(`/permissions`, params);
};

// 获取菜单列表 For 选择器
export const getRuleOptions = (params: any = {}) => {
	return http.get(`/permissions/options`, params);
};

// 获取模块列表 For 选择器
export const getModuleOptions = (params: any = {}) => {
	return http.get(`/permissions/modules`, params);
};

// 新增菜单
export const addRule = (params: Rule.ResRuleList) => {
	return http.post(`/permissions`, params);
};

// 编辑菜单
export const editRule = (params: Rule.ResRuleList) => {
	return http.put(`/permissions/` + params.id, params);
};

// 删除菜单
export const deleteRule = (params: { id: number }) => {
	return http.delete(`/permissions/` + params.id);
};

// 部门列表
export const getDepartmentList = (params: Department.ReqDepartmentParams = {}) => {
	return http.get<ResultData<Department.ResDepartmentList>>(`/departments`, params);
};

// 新增部门
export const addDepartment = (params: Department.ResDepartmentList) => {
	return http.post(`/departments`, params);
};

// 编辑部门
export const editDepartment = (params: Department.ResDepartmentList) => {
	return http.put(`/departments/` + params.id, params);
};

// 删除部门
export const deleteDepartment = (params: { id: number }) => {
	return http.delete(`/departments/` + params.id);
};

// 岗位列表
export const getJobList = (params: Job.ReqJobParams = {}) => {
	return http.get<ResPage<Job.ResJobList>>(`/jobs`, params);
};

// 所有岗位
export const getAllJobList = () => {
	return http.get(`/jobs/all`, {});
};

// 新增岗位
export const addJob = (params: any) => {
	return http.post(`/jobs`, params);
};

// 编辑岗位
export const editJob = (params: any) => {
	return http.put(`/jobs/` + params.id, params);
};

// 删除岗位
export const deleteJob = (params: { id: number }) => {
	return http.delete(`/jobs/` + params.id);
};
