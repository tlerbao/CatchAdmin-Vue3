<template>
	<div class="mx-4">
		<div class="my-8">
			<el-divider content-position="left"><h3>基础配置</h3></el-divider>
		</div>
		<el-form ref="formRef" label-width="100px" label-suffix=" :" :rules="rules" :model="form">
			<el-form-item label="系统名称" prop="system.name">
				<el-input v-model="form.system.name" placeholder="请填写系统名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="系统简介" prop="">
				<el-input v-model="form.system.description" type="textarea" placeholder="请填写系统名称" clearable></el-input>
			</el-form-item>
			<div class="my-8">
				<el-divider content-position="left"><h3>其他配置</h3></el-divider>
			</div>
			<el-form-item label="黑名单IP" prop="">
				<el-input
					v-model="form.other.blacklist"
					type="textarea"
					placeholder="请填写黑名单IP，使用半角逗号隔开。"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSubmit">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts" setup name="SystemConfigBasic">
import { ref, reactive, onMounted } from "vue";
import { getConfig, saveConfig } from "@/api/modules/system";
import { ElMessage, FormInstance } from "element-plus";

const form = reactive<any>({
	system: {
		name: "",
		description: ""
	},
	other: {
		blacklist: ""
	},
	parent: "basic"
});

const rules = reactive({
	system: {
		name: [{ required: true, message: "请填写系统标题" }]
	}
});

const getBasicConfig = async () => {
	const { data }: { data: any } = await getConfig({ name: "basic" });
	Object.keys(data).forEach(k => {
		Object.keys(data[k]).forEach(key => {
			form[k][key] = data[k][key];
		});
	});
};

const formRef = ref<FormInstance>();
const handleSubmit = () => {
	formRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			await saveConfig(form);
			ElMessage.success("保存配置成功");
		} catch (error) {
			console.log(error);
		}
	});
};

onMounted(() => {
	getBasicConfig();
});
</script>
