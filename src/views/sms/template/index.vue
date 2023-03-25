<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="模板管理" :columns="columns" :requestApi="getSmsTemplateList" :pagination="false">
			<!-- 表格 header 按钮 -->
			<template #tableHeader="">
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增模板</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteDept(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<TemplateDreawer ref="drawerRef" />
	</div>
</template>

<script setup lang="tsx" name="SmsTemplateList">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getSmsTemplateList, addSmsTemplate, editSmsTemplate, deleteSmsTemplate } from "@/api/modules/sms";
import TemplateDreawer from "@/views/sms/template/components/templateDrawer.vue";
import { smsDriver } from "@/utils/serviceDict";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "index", label: "#", width: 80 },
	{ prop: "name", label: "模版名称", align: "left", search: { el: "input" } },
	{
		prop: "operator",
		label: "服务商",
		search: { el: "select" },
		enum: smsDriver
	},
	{ prop: "identify", label: "模版标识" },
	{ prop: "code", label: "模版CODE" },
	{ prop: "created_at", label: "创建时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 300 }
];

// 删除部门信息
const deleteDept = async (params: any) => {
	await useHandleData(deleteSmsTemplate, { id: params.id }, `删除【${params.name}】模板`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
const openDrawer = (title: string, rowData: any = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addSmsTemplate : title === "编辑" ? editSmsTemplate : "",
		getTableList: proTable.value.getTableList
	};
	drawerRef.value.acceptParams(params);
};
</script>
