<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="岗位管理" :columns="columns" :requestApi="getDeveloperList" :pagination="true">
			<template #status="scope">
				<el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="2" @click="changeStatus(scope.row)" />
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDialog('查看', scope.row)"> 查看 </el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)" v-if="scope.row.id !== 1">
					编辑
				</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteData(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<JobForm ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="SystemDeveloper">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { Delete, EditPen, View } from "@element-plus/icons-vue";
import { deleteDeveloper, editDeveloper, getDeveloperList } from "@/api/modules/system";
import JobForm from "@/views/permission/job/components/JobForm.vue";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ prop: "id", label: "#", width: 80 },
	{ prop: "username", label: "用户名", search: { el: "input" } },
	{ prop: "mobile", label: "手机号", search: { el: "input" } },
	{ prop: "id_card", label: "身份证" },
	{ prop: "alipay_account", label: "支付宝账户" },
	{ prop: "mobile", label: "手机号" },
	{ prop: "description", label: "描述" },
	{
		prop: "status",
		label: "状态",
		enum: [
			{ label: "已认证", value: 1 },
			{ label: "待认证", value: 2 }
		],
		isShow: true,
		search: { el: "select", props: { filterable: true } }
	},
	{ prop: "created_at", label: "创建时间" },
	{ prop: "updated_at", label: "更新时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 300 }
];

// 改变部门状态
const changeStatus = async (params: any) => {
	await useHandleData(
		editDeveloper,
		{ id: params.id, status: params.status == 1 ? 0 : 1 },
		`切换【${params.job_name}】开发者状态`
	);
	proTable.value.getTableList();
};

// 删除部门信息
const deleteData = async (params: any) => {
	await useHandleData(deleteDeveloper, { id: params.id }, `删除【${params.username}】开发者`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref();
const openDialog = (title: string, rowData: Partial<Job.ResJobList> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? editDeveloper : title === "编辑" ? editDeveloper : "",
		getTableList: proTable.value.getTableList
	};
	dialogRef.value.acceptParams(params);
};
</script>
