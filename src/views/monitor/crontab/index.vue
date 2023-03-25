<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="定时任务" :columns="columns" :requestApi="getTaskList" :pagination="true">
			<template #tableHeader="">
				<el-button type="primary" :icon="CirclePlus" @click="openDialog('新增')">新增任务</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDialog('查看', scope.row)"> 查看 </el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)"> 编辑 </el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteData(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<CrontabForm ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="MonitorCrontabList">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { Delete, View, EditPen, CirclePlus } from "@element-plus/icons-vue";
import { getTaskList, addTask, editTask, deleteTask } from "@/api/modules/crontab";
import CrontabForm from "@/views/monitor/crontab/components/crontabForm.vue";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ prop: "id", label: "#", width: 80 },
	{ prop: "name", label: "名称", search: { el: "input" } },
	{ prop: "group", label: "分组" },
	{ prop: "task", label: "指令" },
	{ prop: "cron", label: "cron表达式" },
	{
		prop: "status",
		label: "状态",
		enum: [
			{ label: "启用", value: 1 },
			{ label: "禁用", value: 2 }
		],
		isShow: true,
		search: { el: "select", props: { filterable: true } }
	},
	{
		prop: "created_at",
		label: "创建时间"
	},
	{ prop: "operation", label: "操作", fixed: "right", width: 300 }
];

// 删除信息
const deleteData = async (params: any) => {
	await useHandleData(deleteTask, { id: params.id }, `删除【${params.name}】任务`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref();
const openDialog = (title: string, rowData: any = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addTask : title === "编辑" ? editTask : "",
		getTableList: proTable.value.getTableList
	};
	dialogRef.value.acceptParams(params);
};
</script>
