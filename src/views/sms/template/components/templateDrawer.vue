<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}模板`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
			class="text-"
		>
			<el-form-item label="服务商" prop="operator">
				<el-select v-model="drawerProps.rowData!.operator">
					<el-option v-for="item in smsDriver" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="模板名称" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写模板名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="模板标识" prop="identify">
				<el-input v-model="drawerProps.rowData!.identify" placeholder="请填写模板标识" clearable></el-input>
			</el-form-item>
			<el-form-item label="模版CODE" prop="code">
				<el-input v-model="drawerProps.rowData!.code" placeholder="请填写模板CODE" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="SmsTemplateDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { smsDriver } from "@/utils/serviceDict";

// 表单验证
const rules = reactive({
	operator: [{ required: true, message: "请选择驱动" }],
	name: [{ required: true, message: "请填写模板名称" }]
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
		operator: params.rowData?.operator ?? ""
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
			ElMessage.success({ message: `${drawerProps.value.title} 模板成功！` });
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
