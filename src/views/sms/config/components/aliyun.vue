<template>
	<div class="">
		<el-form :model="aliyun" :rules="rules" ref="configForm" label-width="100px">
			<el-form-item label="accessKey" prop="access_key_id">
				<el-input v-model="aliyun.access_key_id"></el-input>
			</el-form-item>
			<el-form-item label="secretKey" prop="access_key_secret">
				<el-input v-model="aliyun.access_key_secret"></el-input>
			</el-form-item>
			<el-form-item label="短信签名" prop="sign_name">
				<el-input v-model="aliyun.sign_name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit">保 存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getSmsConfig, saveSmsConfig } from "@/api/modules/sms";
import { ElMessage, FormInstance } from "element-plus";

const aliyun = ref<{ [key: string]: string }>({
	name: "aliyun",
	access_key_id: "",
	access_key_secret: "",
	sign_name: ""
});

const getConfig = async () => {
	const response: any = await getSmsConfig("aliyun");
	Object.keys(aliyun.value).forEach(key => {
		if (response.data[key] !== undefined) {
			aliyun.value[key] = response.data[key];
		}
	});
};

const rules = ref({
	access_key_id: [{ required: true, message: "accessKey 必须填写", trigger: "blur" }],
	access_key_secret: [{ required: true, message: "accessSecret 必须填写", trigger: "blur" }],
	sign_name: [{ required: true, message: "短信签名必须填写", trigger: "blur" }]
});

const configForm = ref<FormInstance>();
const submit = () => {
	configForm.value!.validate(async valid => {
		if (!valid) return;
		try {
			await saveSmsConfig(aliyun.value);
			ElMessage.success({ message: `操作成功！` });
		} catch (error) {
			console.log(error);
		}
	});
};

onMounted(() => {
	getConfig();
});
</script>
<style></style>
