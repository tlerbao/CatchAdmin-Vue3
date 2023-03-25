<template>
	<el-dialog v-model="dialogVisible" :destroy-on-close="true" width="600px" :title="`${dialogProps.title}角色`">
		<el-form
			ref="formRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="dialogProps.isView"
			:model="dialogProps.rowData"
			:hide-required-asterisk="dialogProps.isView"
		>
			<el-form-item label="父级角色" prop="parent_id">
				<el-cascader
					class="w-full"
					@change="selectParentRoles"
					v-model="dialogProps.rowData.parent_id"
					clearable
					:options="roleOptions"
					:props="roleProps"
				/>
			</el-form-item>
			<el-form-item label="角色名称" prop="role_name">
				<el-input v-model="dialogProps.rowData.role_name" placeholder="请填写角色名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="角色标识" prop="identify">
				<el-input v-model="dialogProps.rowData.identify" placeholder="请填写角色标识" clearable></el-input>
			</el-form-item>
			<el-form-item label="角色描述" prop="description">
				<el-input type="textarea" v-model="dialogProps.rowData.description" placeholder="请填写角色描述" clearable></el-input>
			</el-form-item>
			<el-form-item label="角色权限" prop="_permissions" class="permission">
				<el-tree
					ref="treeRef"
					node-key="id"
					:default-checked-keys="dialogProps.rowData._permissions"
					:props="permissionProps"
					:data="permissionOptions"
					@check-change="handleCheckChange"
					show-checkbox
				/>
			</el-form-item>
			<el-form-item label="数据权限" prop="data_range">
				<el-select
					v-model="dialogProps.rowData.data_range"
					filterable
					:reserve-keyword="false"
					placeholder="请选择数据权限"
					class="w-full"
				>
					<el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="自定义权限" prop="departments" v-if="dialogProps.rowData.data_range === 2">
				<el-cascader
					class="w-full"
					:show-all-levels="false"
					v-model="dialogProps.rowData.departments"
					:options="departmentOptions"
					:props="departmentProps"
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" v-show="!dialogProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="PermissionRoleForm">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { getRoleList, getDepartmentList, getRuleList, getRolePermissions } from "@/api/modules/permissions";
import { dataRange } from "@/utils/serviceDict";

const treeRef = ref();

const roleProps = {
	value: "id",
	label: "role_name",
	checkStrictly: true,
	emitPath: false
};

const departmentProps = {
	value: "id",
	label: "department_name",
	multiple: true,
	emitPath: false
};

const permissionProps = {
	label: "permission_name"
};

const roleOptions = ref();
const getRoleOptions = async () => {
	const res = await getRoleList();
	roleOptions.value = res.data;
};

const departmentOptions = ref();
const getDepartmentOptions = async () => {
	const res = await getDepartmentList();
	departmentOptions.value = res.data;
};

const permissionOptions = ref();
const getPermissionOptions = async () => {
	const res = await getRuleList();
	permissionOptions.value = res.data;
};

const handleCheckChange = () => {
	dialogProps.value.rowData!.permissions = treeRef.value.getCheckedKeys().concat(treeRef.value.getHalfCheckedKeys());
};

const selectParentRoles = async (value: any) => {
	const res = value == null ? await getRuleList() : await getRolePermissions({ id: value });
	permissionOptions.value = res.data;
};

// 表单验证
const rules = reactive({
	job_name: [{ required: true, message: "请填写角色名称" }]
});

interface dialogProps {
	title: string;
	isView: boolean;
	rowData?: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

// dialog框状态
const dialogVisible = ref(false);
const dialogProps = ref<dialogProps>({
	isView: false,
	title: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: dialogProps): void => {
	// 打开弹层再调用一次，更新新添加的数据
	getRoleOptions();
	getDepartmentOptions();
	getPermissionOptions();
	params.rowData = {
		...params.rowData,
		permissions: params.rowData._permissions ?? []
	};
	dialogProps.value = params;
	dialogVisible.value = true;
};

// 提交数据（新增/编辑）
const formRef = ref<FormInstance>();
const handleSubmit = () => {
	formRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			await dialogProps.value.api!(dialogProps.value.rowData);
			ElMessage.success({ message: `${dialogProps.value.title}角色成功！` });
			await dialogProps.value.getTableList!();
			dialogVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

defineExpose({
	acceptParams
});
</script>
<style>
.permission .el-form-item__content {
	display: block;
}
</style>
