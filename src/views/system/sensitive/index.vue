<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="敏感词库" :columns="columns" :requestApi="getSensitiveList" :pagination="true">
			<!-- 表格 header 按钮 -->
			<template #tableHeader="">
				<el-button type="primary" :icon="CirclePlus" @click="openDialog('新增')">新增敏感词</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDialog('查看', scope.row)"> 查看 </el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)"> 编辑 </el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteData(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<WordForm ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="SystemSensitiveWord">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import WordForm from "@/views/system/sensitive/components/WordForm.vue";
import { getSensitiveList, editSensitive, addSensitive, deleteSensitive } from "@/api/modules/system";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ prop: "id", label: "#", width: 80 },
	{ prop: "word", label: "敏感词", search: { el: "input" } },
	{ prop: "creator", label: "创建人" },
	{ prop: "created_at", label: "创建时间" },
	{ prop: "updated_at", label: "创建时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 300 }
];

// 删除信息
const deleteData = async (params: any) => {
	await useHandleData(deleteSensitive, { id: params.id }, `删除【${params.word}】敏感词`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref();
const openDialog = (title: string, rowData: any = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addSensitive : title === "编辑" ? editSensitive : "",
		getTableList: proTable.value.getTableList
	};
	dialogRef.value.acceptParams(params);
};
</script>
