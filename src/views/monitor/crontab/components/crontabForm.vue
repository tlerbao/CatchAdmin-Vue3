<template>
	<el-dialog v-model="drawerVisible" :destroy-on-close="true" width="600px" :title="`${drawerProps.title}任务`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="任务名称" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写任务名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="分组" prop="group">
				<el-select v-model="drawerProps.rowData!.group" placeholder="请选择分组" clearable class="w-full">
					<el-option label="默认" :value="1"></el-option>
					<el-option label="系统" :value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="指令" prop="task">
				<el-input v-model="drawerProps.rowData!.task" placeholder="请填写command指令" clearable></el-input>
			</el-form-item>
			<el-form-item label="cron表达式" prop="cron">
				<el-input v-model="drawerProps.rowData!.cron" placeholder="请填写cron表达式" clearable></el-input>
			</el-form-item>
			<el-form-item label="执行策略" prop="tactics">
				<el-radio-group v-model="drawerProps.rowData!.tactics">
					<el-radio :label="1">立即执行</el-radio>
					<el-radio :label="2">执行一次</el-radio>
					<el-radio :label="3">正常执行</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-switch v-model="drawerProps.rowData!.status" :active-value="1" :inactive-value="2" />
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input type="textarea" v-model="drawerProps.rowData!.remark" placeholder="请填写任务备注" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="MonitorCrontabForm">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";

const rules = reactive({
	name: [{ required: true, message: "请填写任务名称" }]
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
		group: params.rowData.group ?? 1,
		tactics: params.rowData.tactics ?? 1,
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
