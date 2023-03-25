<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="菜单管理"
			:columns="columns"
			:requestApi="getRuleList"
			:init-param="initParam"
			:default-expand-all="true"
			:pagination="false"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="">
				<el-button type="primary" :icon="CirclePlus" @click="openDialog('新增')">新增菜单</el-button>
			</template>
			<template #is_hidden="scope">
				<el-tag v-if="scope.row.is_hidden === 0" effect="dark" size="small">显示</el-tag>
				<el-tag v-else type="danger" effect="dark" size="small">隐藏</el-tag>
			</template>
			<template #icon="scope">
				<el-icon size="20px">
					<component :is="scope.row.icon"></component>
				</el-icon>
			</template>
			<template #actionList="scope">
				<el-dropdown v-if="scope.row.actionList.length > 0">
					<el-button size="small" plain>权限列表</el-button>
					<template #dropdown>
						<div class="flex flex-col p-2 divide-y-1">
							<div class="py-1" v-for="item in scope.row.actionList" :key="item">
								<el-tag>
									{{ item.permission_name }}
								</el-tag>
								<el-button-group class="ml-2">
									<el-button type="primary" :icon="EditPen" size="small" @click="openDialog('编辑', item)" />
									<el-button type="primary" :icon="Delete" size="small" @click="deleteDept(scope.row)" />
								</el-button-group>
							</div>
						</div>
					</template>
				</el-dropdown>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDialog('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteDept(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<RuleForm ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="PermissionRule">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { addRule, editRule, deleteRule, getRuleList } from "@/api/modules/permissions";
import RuleForm from "@/views/permission/rule/components/RuleForm.vue";
import { Rule } from "@/api/interface";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

const initParam = reactive({
	actionList: "actionList"
});

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "index", label: "#", width: 80 },
	{ prop: "permission_name", label: "菜单名称", search: { el: "input" }, align: "center" },
	{ prop: "icon", label: "图标" },
	{ prop: "actionList", label: "Action" },
	{ prop: "route", label: "Path", align: "left" },
	{ prop: "is_hidden", label: "状态" },
	{ prop: "created_at", label: "创建时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 300 }
];

// 删除部门信息
const deleteDept = async (params: Rule.ResRuleList) => {
	await useHandleData(deleteRule, { id: params.id }, `删除【${params.permission_name}】菜单`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref();
const openDialog = (title: string, rowData: Partial<Rule.ResRuleList> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addRule : title === "编辑" ? editRule : "",
		getTableList: proTable.value.getTableList
	};
	dialogRef.value.acceptParams(params);
};
</script>
