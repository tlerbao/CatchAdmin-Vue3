<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}部门`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="父级菜单" prop="parent_id">
				<el-cascader v-model="drawerProps.rowData!.parent_id" :options="cascaderOptions" :props="cascaderProps" />
			</el-form-item>
			<el-form-item label="部门标题" prop="department_name">
				<el-input v-model="drawerProps.rowData!.department_name" placeholder="请填写部门名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="负责人" prop="principal">
				<el-input v-model="drawerProps.rowData!.principal" placeholder="请填写负责人" clearable></el-input>
			</el-form-item>
			<el-form-item label="联系方式" prop="mobile">
				<el-input v-model="drawerProps.rowData!.mobile" placeholder="请填写联系方式" clearable></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="drawerProps.rowData!.email" placeholder="请填写邮箱" clearable></el-input>
			</el-form-item>
			<!--			状态-->
			<el-form-item label="状态" prop="status">
				<el-switch v-model="drawerProps.rowData!.status" :active-value="1" :inactive-value="2" />
			</el-form-item>
			<!--			排序-->
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="drawerProps.rowData!.sort" :min="1" :max="10000" :step="1" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="DepartmentDreawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { getDepartmentList } from "@/api/modules/permissions";

// 表单验证
const rules = reactive({
	parent_id: [{ required: true, message: "请选择父级部门" }],
	department_name: [{ required: true, message: "请填写部门名称" }]
});

// 级联选择器配置
const cascaderProps = {
	value: "id",
	label: "department_name",
	checkStrictly: true,
	emitPath: false
};

// 级联选择器数据
const cascaderOptions = ref();
const getDeptList = async () => {
	const res = await getDepartmentList();
	cascaderOptions.value = res.data;
};

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
	getDeptList();
	params.rowData = {
		...params.rowData,
		parent_id: params.rowData?.parent_id ?? 1,
		sort: params.rowData?.sort ?? 100,
		status: params.rowData?.status ?? 1
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
			ElMessage.success({ message: `${drawerProps.value.title}部门成功！` });
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
