<template>
	<el-dialog v-model="drawerVisible" :destroy-on-close="true" width="600px" :title="`${drawerProps.title}岗位`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="岗位名称" prop="job_name">
				<el-input v-model="drawerProps.rowData!.job_name" placeholder="请填写岗位名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="编码" prop="coding">
				<el-input v-model="drawerProps.rowData!.coding" placeholder="请填写岗位编码" clearable></el-input>
			</el-form-item>
			<el-form-item label="岗位描述" prop="description">
				<el-input type="textarea" v-model="drawerProps.rowData!.description" placeholder="请填写岗位描述" clearable></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-switch v-model="drawerProps.rowData!.status" :active-value="1" :inactive-value="0" />
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="drawerProps.rowData!.sort" :min="1" :max="10000" :step="1" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="PermissionJobForm">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";

const rules = reactive({
	job_name: [{ required: true, message: "请填写岗位名称" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
	params.rowData = {
		...params.rowData,
		sort: params.rowData.sort ?? 1,
		status: params.rowData.status ?? 1
	};
	drawerProps.value = params;
	drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			await drawerProps.value.api!(drawerProps.value.rowData);
			ElMessage.success({ message: `${drawerProps.value.title}岗位成功！` });
			drawerProps.value.getTableList!();
			drawerVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

defineExpose({
	acceptParams
});
</script>
