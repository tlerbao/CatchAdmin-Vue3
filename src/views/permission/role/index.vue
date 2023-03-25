<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			rowKey="id"
			title="角色管理"
			:columns="columns"
			:requestApi="getRoleList"
			:pagination="false"
			default-expand-all
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="">
				<el-button type="primary" :icon="CirclePlus" @click="openDialog('新增')" v-action="'role@save'">新增角色</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link disabled v-if="scope.row.id === 1"> 超级管理角色禁止编辑、删除 </el-button>
				<el-button type="primary" link :icon="View" @click="openDialog('查看', scope.row)" v-if="scope.row.id !== 1">
					查看
				</el-button>
				<el-button
					type="primary"
					link
					:icon="EditPen"
					@click="openDialog('编辑', scope.row)"
					v-action="'role@update'"
					v-if="scope.row.id !== 1"
				>
					编辑
				</el-button>
				<el-button
					type="primary"
					link
					:icon="Delete"
					@click="delRole(scope.row)"
					v-action="'role@delete'"
					v-if="scope.row.id !== 1"
					>删除</el-button
				>
			</template>
		</ProTable>
		<RoleForm ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="PermissionRole">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { addRole, editRole, deleteRole, getRoleList } from "@/api/modules/permissions";
import RoleForm from "@/views/permission/role/components/RoleForm.vue";
import { Role } from "@/api/interface/permissions";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ prop: "role_name", label: "角色名称", search: { el: "input" }, align: "left" },
	{ prop: "identify", label: "角色标识" },
	{ prop: "description", label: "描述" },
	{ prop: "created_at", label: "创建时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 280 }
];

// 删除部门信息
const delRole = async (params: Role.ResRoleList) => {
	await useHandleData(deleteRole, { id: params.id }, `删除【${params.role_name}】角色`);
	proTable.value.getTableList();
};

// 打开 (新增、查看、编辑)
const dialogRef = ref();
const openDialog = (title: string, rowData: Partial<Role.ResRoleList> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addRole : title === "编辑" ? editRole : "",
		getTableList: proTable.value.getTableList
	};
	dialogRef.value.acceptParams(params);
};
</script>
