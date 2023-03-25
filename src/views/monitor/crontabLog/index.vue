<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="定时任务" :columns="columns" :requestApi="getTaskLogList" :pagination="true">
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="Delete" @click="deleteData(scope.row)">删除</el-button>
			</template>
		</ProTable>
	</div>
</template>

<script setup lang="tsx" name="Crontab">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { Delete } from "@element-plus/icons-vue";
import { getTaskLogList, deleteTaskLog } from "@/api/modules/crontab";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

const shortcuts = [
	{
		text: "Last week",
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			return [start, end];
		}
	},
	{
		text: "本年度",
		value: () => {
			// 获取当前日期时间
			const now = new Date();
			// 计算本年度开始和结束时间
			const startOfYear = new Date(now.getFullYear(), 0, 1);
			const endOfYear = new Date(now.getFullYear(), 11, 31);

			return [startOfYear, endOfYear];
		}
	},
	{
		text: "本月",
		value: () => {
			const now = new Date();
			// 计算本月开始和结束时间
			const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
			const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

			return [startOfMonth, endOfMonth];
		}
	},
	{
		text: "本周",
		value: () => {
			// 获取当前日期时间和星期几
			const [now, dayOfWeek] = [new Date(), new Date().getDay()];

			// 计算本周一和本周日的日期
			const [startOfWeek, endOfWeek] = [
				new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + 1),
				new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + 7)
			];

			return [startOfWeek, endOfWeek];
		}
	}
];

// 表格配置项
const columns: ColumnProps[] = [
	{ prop: "id", label: "#", width: 80 },
	{ prop: "name", label: "名称", search: { el: "input" } },
	{ prop: "task", label: "调用目标类", search: { el: "input" } },
	{ prop: "used_time", label: "耗时/ms" },
	{ prop: "error_message", label: "错误日志" },
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
	{
		prop: "created_at",
		label: "创建时间",
		search: { el: "date-picker", span: 2, props: { type: "daterange", valueFormat: "YYYY-MM-DD", shortcuts: shortcuts } }
	},
	{ prop: "operation", label: "操作", fixed: "right", width: 300 }
];

// 删除部门信息
const deleteData = async (params: any) => {
	await useHandleData(deleteTaskLog, { id: params.id }, `删除【${params.name}】日志`);
	proTable.value.getTableList();
};
</script>
