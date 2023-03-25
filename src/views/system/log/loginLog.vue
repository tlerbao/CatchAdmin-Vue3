<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="登陆日志" :columns="columns" :requestApi="getLoginLogList" :pagination="true">
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button
					v-action="'loginlog@empty'"
					type="danger"
					:icon="Delete"
					plain
					@click="batchDelete(scope.selectedListIds)"
					:disabled="!scope.isSelected"
				>
					批量删除日志
				</el-button>
			</template>
			<template #status="scope">
				<el-tag v-if="scope.row.status === 1" type="success">成功</el-tag>
				<el-tag v-else type="danger">失败</el-tag>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button v-action="'loginlog@empty'" type="primary" link :icon="Delete" @click="deleteData(scope.row)">
					删除
				</el-button>
			</template>
		</ProTable>
	</div>
</template>

<script setup lang="tsx" name="SystemLoginLog">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { Delete } from "@element-plus/icons-vue";
import { getLoginLogList, deleteLoginLog } from "@/api/modules/system";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "selection", fixed: "left", width: 80 },
	{ prop: "id", label: "#", width: 80 },
	{ prop: "login_name", label: "登陆用户" },
	{ prop: "login_ip", label: "登陆IP" },
	{ prop: "browser", label: "客户端" },
	{
		prop: "status",
		label: "登陆状态"
	},
	{
		prop: "login_at",
		label: "登陆时间",
		search: {
			el: "date-picker",
			span: 2,
			props: { type: "daterange", valueFormat: "YYYY-MM-DD" }
		}
	},
	{ prop: "operation", label: "操作", fixed: "right", width: 200 }
];

// 删除部门信息
const deleteData = async (params: any) => {
	await useHandleData(deleteLoginLog, { id: params.id }, `删除【${params.login_name}】日志`);
	proTable.value.getTableList();
};

// 批量删除用户信息
const batchDelete = async (id: any) => {
	await useHandleData(deleteLoginLog, { id: id.join(",") }, "删除所选日志信息");
	proTable.value.clearSelection();
	proTable.value.getTableList();
};
</script>
