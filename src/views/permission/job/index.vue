<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="岗位管理" :columns="columns" :requestApi="getJobList" :pagination="true">
			<!-- 表格 header 按钮 -->
			<template #tableHeader="">
				<el-button type="primary" :icon="CirclePlus" @click="openDialog('新增')" v-action="'job@save'">新增岗位</el-button>
			</template>
			<template #status="scope">
				<el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="0" @click="changeStatus(scope.row)" />
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDialog('查看', scope.row)"> 查看 </el-button>
				<el-button
					type="primary"
					link
					:icon="EditPen"
					@click="openDialog('编辑', scope.row)"
					v-if="scope.row.id !== 1"
					v-action="'job@update'"
				>
					编辑
				</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteDept(scope.row)" v-action="'job@delete'">删除</el-button>
			</template>
		</ProTable>
		<JobForm ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="PermissionJob">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { addJob, editJob, deleteJob, getJobList } from "@/api/modules/permissions";
import JobForm from "@/views/permission/job/components/JobForm.vue";
import { Job } from "@/api/interface/permissions";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ prop: "id", label: "#", width: 80 },
	{ prop: "job_name", label: "岗位名称", search: { el: "input" } },
	{ prop: "coding", label: "编码", search: { el: "input" } },
	{ prop: "description", label: "描述" },
	{
		prop: "status",
		label: "状态",
		enum: [
			{ label: "启用", value: 1 },
			{ label: "禁用", value: 0 }
		],
		isShow: true,
		search: { el: "select", props: { filterable: true } }
	},
	{ prop: "created_at", label: "创建时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 300 }
];

// 改变部门状态
const changeStatus = async (params: Job.ResJobList) => {
	await useHandleData(editJob, { id: params.id, status: params.status == 1 ? 0 : 1 }, `切换【${params.job_name}】部门状态`);
	proTable.value.getTableList();
};

// 删除部门信息
const deleteDept = async (params: Job.ResJobList) => {
	await useHandleData(deleteJob, { id: params.id }, `删除【${params.job_name}】岗位`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref();
const openDialog = (title: string, rowData: Partial<Job.ResJobList> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addJob : title === "编辑" ? editJob : "",
		getTableList: proTable.value.getTableList
	};
	dialogRef.value.acceptParams(params);
};
</script>
