<template>
	<div class="main-box">
		<TreeFilter id="id" label="department_name" title="部门列表" :requestApi="getDepartmentList" @change="changeTreeFilter" />
		<div class="table-box">
			<ProTable ref="proTable" title="用户列表" :columns="columns" :initParam="initParam" :requestApi="getUserList">
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" :icon="CirclePlus" @click="opendialog('新增')" v-action="'user@save'">新增用户</el-button>
				</template>
				<template #status="scope">
					<el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="0" @click="changeStatus(scope.row)" />
				</template>
				<template #avatar="scope">
					<div class="flex items-center justify-center">
						<avatar v-if="!scope.row.avatar" :name="String(scope.row.username)" :size="50"></avatar>
						<el-avatar v-else :size="50" :src="scope.row.avatar" />
					</div>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link :icon="View" @click="opendialog('查看', scope.row)">查看</el-button>
					<el-button type="primary" link :icon="EditPen" @click="opendialog('编辑', scope.row)" v-action="'user@update'">
						编辑
					</el-button>
					<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
					<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)" v-action="'user@delete'"
						>删除</el-button
					>
				</template>
			</ProTable>
			<UserForm ref="dialogRef" />
		</div>
	</div>
</template>
<script setup lang="ts" name="PermissionUser">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import UserForm from "./components/UserForm.vue";
import { CirclePlus, Delete, EditPen, View, Refresh } from "@element-plus/icons-vue";
import { getUserList, getDepartmentList, addUser, editUser, deleteUser, resetPassword } from "@/api/modules/permissions";
import { User } from "@/api/interface/permissions";
import Avatar from "vue3-avatar";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// // 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	department_id: ""
});

// 树形筛选切换
const changeTreeFilter = (val: any) => {
	proTable.value.pageable.current = 1;
	initParam.department_id = val;
};

// 表格配置项
const columns: ColumnProps<User.ResUserList>[] = [
	{ type: "index", label: "#", width: 80 },
	{ prop: "username", label: "用户名", width: 120, search: { el: "input" } },
	{ prop: "avatar", label: "头像" },
	{ prop: "email", label: "邮箱", align: "center", search: { el: "input" } },
	{
		prop: "status",
		label: "状态",
		search: { el: "select" },
		enum: [
			{ label: "启用", value: 1 },
			{ label: "禁用", value: 0 }
		]
	},
	{ prop: "createTime", label: "创建时间", width: 180 },
	{ prop: "operation", label: "操作", width: 330, fixed: "right" }
];

// 切换用户状态
const changeStatus = async (params: User.ResUserList) => {
	await useHandleData(editUser, { id: params.id, status: params.status == 1 ? 0 : 1 }, `切换【${params.username}】部门状态`);
	proTable.value.getTableList();
};

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
	await useHandleData(deleteUser, { id: params.id }, `删除【${params.username}】用户`);
	proTable.value.getTableList();
};

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
	await useHandleData(resetPassword, { id: params.id }, `重置【${params.username}】用户密码`);
	proTable.value.getTableList();
};

// 打开 dialog(新增、查看、编辑)
const dialogRef = ref();
const opendialog = (title: string, rowData: Partial<User.ResUserList> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addUser : title === "编辑" ? editUser : "",
		getTableList: proTable.value.getTableList
	};
	dialogRef.value.acceptParams(params);
};
</script>
