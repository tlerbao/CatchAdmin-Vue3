<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="数据字典" :columns="columns" :requestApi="getDatabaseList" :pagination="true">
			<!-- 表格 header 按钮 -->
			<template #tableHeader=""> </template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="handleView(scope.row)"> 查看 </el-button>
			</template>
		</ProTable>
		<el-dialog title="表结构" v-model="visable">
			<el-table :data="fields" tooltip-effect="dark" style="width: 100%" border fit>
				<el-table-column label="字段名称" prop="name" />
				<el-table-column prop="type" label="类型" width="150" />
				<el-table-column prop="notnull" label="NULL" width="150">
					<template #default="field">
						<el-tag type="info">{{ field.row.notnull === true ? "是" : "否" }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="default" label="默认值" width="150" />
				<el-table-column prop="comment" label="注释" />
			</el-table>
		</el-dialog>
	</div>
</template>

<script setup lang="tsx" name="SystemDatabase">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { View } from "@element-plus/icons-vue";
import { getDatabaseList, getDatabaseDetail } from "@/api/modules/system";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();
const visable = ref(false);
const fields = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ prop: "name", label: "表名" },
	{ prop: "engine", label: "引擎" },
	{ prop: "collation", label: "字符集" },
	{ prop: "rows", label: "数据行数" },
	{ prop: "data_length", label: "数据大小" },
	{ prop: "index_length", label: "索引大小" },
	{ prop: "comment", label: "注释" },
	{ prop: "create_time", label: "创建时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 100 }
];

const handleView = async (row: any) => {
	const res = await getDatabaseDetail(row.name);
	fields.value = res.data;
	visable.value = true;
};
</script>
