<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			rowKey="id"
			title="部门管理"
			:columns="columns"
			:requestApi="getDepartmentList"
			:pagination="false"
			:default-expand-all="true"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="">
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增部门</el-button>
			</template>
			<template #department_name="scope">
				{{ scope.row.department_name }} <span class="text-gray-300 font-mono">({{ scope.row.id }})</span>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)" v-if="scope.row.id !== 1"
					>编辑</el-button
				>
				<el-button type="primary" link :icon="Delete" @click="deleteDept(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<DepartmentDrawer ref="drawerRef" />
	</div>
</template>

<script setup lang="tsx" name="PermissionDepartment">
import { ref } from "vue";
import { Department } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { addDepartment, editDepartment, deleteDepartment, getDepartmentList } from "@/api/modules/permissions";
import DepartmentDrawer from "@/views/permission/department/components/DepartmentForm.vue";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "index", label: "#", width: 80 },
	{ prop: "department_name", label: "部门名称", align: "left" },
	{ prop: "principal", label: "负责人" },
	{ prop: "mobile", label: "联系电话" },
	{ prop: "created_at", label: "创建时间" },
	{ prop: "updated_at", label: "更新时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 300 }
];

// 删除部门信息
const deleteDept = async (params: Department.ResDepartmentList) => {
	await useHandleData(deleteDepartment, { id: params.id }, `删除【${params.department_name}】部门`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
const openDrawer = (title: string, rowData: Partial<Department.ResDepartmentList> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addDepartment : title === "编辑" ? editDepartment : "",
		getTableList: proTable.value.getTableList
	};
	drawerRef.value.acceptParams(params);
};
</script>
