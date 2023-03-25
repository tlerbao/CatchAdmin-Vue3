<template>
	<el-dialog v-model="dialogVisible" :destroy-on-close="true" width="800px" :title="`${dialogProps.title}用户`">
		<el-form
			ref="formRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="dialogProps.isView"
			:model="dialogProps.rowData"
			:hide-required-asterisk="dialogProps.isView"
		>
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="dialogProps.rowData.username" placeholder="请填写用户名" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="所属部门" prop="department_id">
						<el-cascader
							class="w-full"
							v-model="dialogProps.rowData.department_id"
							clearable
							:options="departmentOptions"
							:props="departmentProps"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="dialogProps.rowData.email" placeholder="请填写用户邮箱" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="所属岗位" prop="jobs">
						<el-select
							v-model="dialogProps.rowData.jobs"
							clearable
							filterable
							multiple
							collapse-tags
							collapse-tags-tooltip
							placeholder="请选择所属岗位"
							class="w-full"
						>
							<el-option v-for="item in jobOptions" :key="item.id" :label="item.job_name" :value="item.id" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="密码" prop="password">
						<el-input v-model="dialogProps.rowData.password" placeholder="请填写用户密码" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="角色" prop="roles" class="role">
						<el-tree
							default-expand-all
							check-strictly
							ref="treeRef"
							node-key="id"
							:default-checked-keys="dialogProps.rowData.roles"
							:props="roleProps"
							:data="roleOptions"
							@check-change="handleCheckChange"
							show-checkbox
						/>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="用户头像" prop="avatar">
						<UploadImg
							v-model:imageUrl="dialogProps.rowData.avatar"
							:api="uploadImage"
							width="135px"
							height="135px"
							:file-size="3"
						>
							<template #empty>
								<el-icon><Avatar /></el-icon>
								<span>请上传头像</span>
							</template>
							<template #tip> 头像大小不能超过 3M </template>
						</UploadImg>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" v-show="!dialogProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="PermissionUserForm">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { getAllJobList, getRoleList, getDepartmentList } from "@/api/modules/permissions";
import { uploadImage } from "@/api/modules/system";
import UploadImg from "@/components/Upload/Img.vue";

const treeRef = ref();

// 岗位
const jobOptions = ref();
const getJobOptions = async () => {
	const res = await getAllJobList();
	jobOptions.value = res.data;
};

// 角色
const roleProps = {
	value: "id",
	label: "role_name"
};
const roleOptions = ref();
const getRoleOptions = async () => {
	const res = await getRoleList();
	roleOptions.value = res.data;
};

// 部门
const departmentProps = {
	value: "id",
	label: "department_name",
	emitPath: false,
	checkStrictly: true
};
const departmentOptions = ref();
const getDepartmentOptions = async () => {
	const res = await getDepartmentList();
	departmentOptions.value = res.data;
};

// 角色选择
const handleCheckChange = () => {
	dialogProps.value.rowData!.roles = treeRef.value.getCheckedKeys();
};

// 表单验证
const rules = reactive({
	username: [{ required: true, message: "请填写用户名" }]
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
	getJobOptions();
	getRoleOptions();
	getDepartmentOptions();
	params.rowData = {
		...params.rowData
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
			ElMessage.success({ message: `${dialogProps.value.title}用户成功！` });
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
<style scoped>
.role .el-form-item__content {
	display: block;
}
</style>
