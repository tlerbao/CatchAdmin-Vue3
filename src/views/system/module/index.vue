<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="模块管理" :columns="columns" :requestApi="getModuleList" :pagination="false">
			<!-- 表格 header 按钮 -->
			<template #tableHeader="">
				<el-button type="primary" :icon="Delete" @click="handelClear"> 清理缓存 </el-button>
				<el-button :icon="BrushFilled" @click="handelCache"> 缓存模块 </el-button>
			</template>
			<template #enable="scope">
				<el-switch v-if="isDefaultModule(scope.row.alias)" disabled :model-value="scope.row.enable" />
				<el-switch v-else :model-value="scope.row.enable" @click="changeEnable(scope.row)" />
			</template>
		</ProTable>
	</div>
</template>

<script setup lang="tsx" name="SystemModule">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { Delete, BrushFilled } from "@element-plus/icons-vue";
import { getModuleList, cacheModule, clearCache, updateModuleStatus } from "@/api/modules/system";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "index", label: "#", width: 80 },
	{ prop: "name", label: "模块名称" },
	{ prop: "alias", label: "模块别名" },
	{ prop: "description", label: "模块描述" },
	{ prop: "version", label: "版本" },
	{ prop: "enable", label: "模块状态" },
	{ prop: "order", label: "排序" }
];

// 是否是默认模块
const isDefaultModule = (alias: string) => {
	return ["permissions", "system", "login"].includes(alias);
};

// 启用/禁用模块
const changeEnable = async (params: any) => {
	await useHandleData(updateModuleStatus, { alias: params.alias }, `修改【${params.name}】模块状态`);
	proTable.value.getTableList();
	// 更新路由
	await initDynamicRouter();
};

// 清理缓存
const handelClear = async () => {
	await useHandleData(clearCache, {}, "清理缓存");
};

// 缓存模块
const handelCache = async () => {
	await useHandleData(cacheModule, {}, "缓存模块");
};
</script>
