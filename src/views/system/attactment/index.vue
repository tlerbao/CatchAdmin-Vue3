<template>
	<div class="table-box">
		<ProTable ref="proTable" rowKey="id" title="附件管理" :columns="columns" :requestApi="getAttachmentList" :pagination="true">
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">
					批量删除附件
				</el-button>
			</template>
			<template #preview="scope">
				<el-image preview-teleported class="w-10 h-10 rounded" :src="scope.row.url" :preview-src-list="[scope.row.url]" />
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="Delete" @click="deleteAttactment(scope.row)" v-action="'attachments@delete'">
					删除
				</el-button>
			</template>
		</ProTable>
	</div>
</template>

<script setup lang="tsx" name="SystemAttactment">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { Delete } from "@element-plus/icons-vue";
import { getAttachmentList, deleteAttachment } from "@/api/modules/system";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "selection", fixed: "left", width: 80 },
	{ prop: "id", label: "#", width: 80 },
	{ prop: "filename", label: "文件名" },
	{ prop: "preview", label: "预览" },
	{ prop: "path", label: "路径" },
	{ prop: "file_ext", label: "后缀" },
	{ prop: "file_size", label: "文件大小" },
	{ prop: "mime_type", label: "MimeType" },
	{ prop: "driver", label: "驱动" },
	{ prop: "created_at", label: "创建时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 100 }
];

// 删除部门信息
const deleteAttactment = async (params: any) => {
	await useHandleData(deleteAttachment, { id: params.id }, `删除【${params.filename}】附件`);
	proTable.value.getTableList();
};

// 批量删除用户信息
const batchDelete = async (id: any) => {
	await useHandleData(deleteAttachment, { id: id.join(",") }, "删除所选附件信息");
	proTable.value.clearSelection();
	proTable.value.getTableList();
};
</script>
