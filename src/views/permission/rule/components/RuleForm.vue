<template>
	<el-dialog v-model="dialogVisible" :destroy-on-close="true" width="800px" :title="`${dialogProps.title}菜单`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="dialogProps.isView"
			:model="dialogProps.rowData"
			:hide-required-asterisk="dialogProps.isView"
		>
			<el-row>
				<el-col :span="12">
					<el-form-item label="父级菜单" prop="parent_id">
						<el-cascader
							v-model="dialogProps.rowData!.parent_id"
							:options="parentIdOptions"
							:props="parentIdProps"
							class="w-full"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单类型" prop="type">
						<el-radio-group v-model="dialogProps.rowData!.type">
							<el-radio-button :label="1">菜单</el-radio-button>
							<el-radio-button :label="2">按钮</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="dialogProps.rowData!.type === 1 ">
					<el-form-item label="菜单名称" prop="permission_name">
						<el-input v-model="dialogProps.rowData!.permission_name" placeholder="菜单标题" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="dialogProps.rowData!.type === 2 ">
					<el-form-item label="按钮名称" prop="permission_name">
						<el-select
							v-model="dialogProps.rowData!.permission_name"
							filterable
							allow-create
							default-first-option
							:reserve-keyword="false"
							placeholder="输入或选择想要的按钮(Action)名称"
							class="w-full"
						>
							<el-option v-for="item in permissionName" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="dialogProps.rowData!.type === 1 ">
					<el-form-item label="权限标识" prop="permission_mark">
						<el-input v-model="dialogProps.rowData!.permission_mark" placeholder="输入或选择想要的权限标识" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="dialogProps.rowData!.type === 2 ">
					<el-form-item label="权限标识" prop="permission_mark">
						<el-select
							v-model="dialogProps.rowData!.permission_mark"
							filterable
							allow-create
							default-first-option
							:reserve-keyword="false"
							placeholder="输入或选择想要的权限标识"
							class="w-full"
						>
							<el-option v-for="item in permissionMark" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-show="dialogProps.rowData!.type === 1">
					<el-form-item label="菜单路径" prop="route">
						<el-input
							v-model="dialogProps.rowData!.route"
							placeholder="菜单路径（如果是外联此字段为外联Url）"
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-show="dialogProps.rowData!.type === 1">
					<el-form-item label="所属模块" prop="module">
						<el-select v-model="dialogProps.rowData!.module" placeholder="所属模块" class="w-full">
							<el-option v-for="item in modulesOptions" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-show="dialogProps.rowData!.type === 1">
					<el-form-item label="菜单图标" prop="icon">
						<SelectIcon v-model:iconValue="dialogProps.rowData!.icon" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-show="dialogProps.rowData!.type === 1">
					<el-form-item label="前端组件" prop="component">
						<el-input
							v-model="dialogProps.rowData!.component"
							placeholder="前端组件（如 /system/user/index）"
							clearable
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="dialogProps.rowData!.type === 1">
					<el-form-item label="Redirect" prop="redirect">
						<el-input v-model="dialogProps.rowData!.redirect" placeholder="Redirect" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="排序" prop="sort">
						<el-input-number v-model="dialogProps.rowData!.sort" :min="1" :max="10000" :step="1" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-show="dialogProps.rowData!.type === 1">
					<el-form-item label="Keepalive" prop="is_keepalive">
						<el-switch v-model="dialogProps.rowData!.is_keepalive" :active-value="1" :inactive-value="0" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-show="dialogProps.rowData!.type === 1">
					<el-form-item label="是否全屏" prop="is_full">
						<el-switch v-model="dialogProps.rowData!.is_full" :active-value="1" :inactive-value="0" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-show="dialogProps.rowData!.type === 1">
					<el-form-item label="是否外联" prop="is_link">
						<el-switch v-model="dialogProps.rowData!.is_link" :active-value="1" :inactive-value="0" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-show="dialogProps.rowData!.type === 1">
					<el-form-item label="是否固定" prop="is_affix">
						<el-switch v-model="dialogProps.rowData!.is_affix" :active-value="1" :inactive-value="0" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-show="dialogProps.rowData!.type === 1">
					<el-form-item label="Restful 路由" prop="restful">
						<el-radio-group v-model="dialogProps.rowData!.restful">
							<el-radio :label="1">生成</el-radio>
							<el-radio :label="0">不生成</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否启用" prop="is_hidden">
						<el-radio-group v-model="dialogProps.rowData!.is_hidden">
							<el-radio :label="0">启用</el-radio>
							<el-radio :label="1">隐藏</el-radio>
						</el-radio-group>
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

<script setup lang="ts" name="PermissionRuleForm">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import SelectIcon from "@/components/SelectIcon/index.vue";
import { getRuleOptions, getModuleOptions } from "@/api/modules/permissions";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { permissionMark, permissionName } from "@/utils/serviceDict";

// 表单验证
const rules = reactive({
	permission_name: [{ required: true, message: "请填写菜单标题" }],
	module: [
		{
			validator: (rule: any, value: any, callback: any) => {
				if (dialogProps.value.rowData.type !== 1) {
					callback();
				} else {
					if (!value) {
						callback(new Error("模块不能为空"));
					} else {
						callback();
					}
				}
			}
		}
	],
	permission_mark: [{ required: true, message: "权限标识必须填写" }]
});

const parentIdOptions = ref();
const modulesOptions = ref();
// 级联选择器配置
const parentIdProps = {
	value: "id",
	label: "permission_name",
	checkStrictly: true,
	emitPath: false
};

// 获取级联选择器数据
const getCascaderOptions = async () => {
	const { data } = await getRuleOptions();
	parentIdOptions.value = data;
};

// 级联选择器数据
const getMudulesOptions = async () => {
	const res = await getModuleOptions();
	modulesOptions.value = res.data;
};

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
	getCascaderOptions();
	getMudulesOptions();
	params.rowData = {
		...params.rowData,
		type: params.rowData.type ?? 1,
		is_hidden: params.rowData.is_hidden ?? 0,
		is_keepalive: params.rowData.is_keepalive ?? 1,
		sort: params.rowData.sort ?? 100,
		restful: params.rowData.restful ?? 0
	};
	dialogProps.value = params;
	dialogVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			await dialogProps.value.api!(dialogProps.value.rowData);
			ElMessage.success({ message: `${dialogProps.value.title}菜单成功！` });
			dialogProps.value.getTableList!();
			await initDynamicRouter();
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
