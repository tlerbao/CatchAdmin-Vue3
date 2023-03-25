<template>
	<el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="data">
		<el-form-item label="模块名称" prop="name">
			<el-input v-model="data.name" placeholder="请输入模块名称" clearable></el-input>
		</el-form-item>
		<el-form-item label="模块目录" prop="alias">
			<el-input v-model="data.alias" placeholder="请输入模块目录" clearable></el-input>
		</el-form-item>
		<el-form-item label="模块描述" prop="description">
			<el-input type="textarea" v-model="data.description" placeholder="请填写模块描述" clearable></el-input>
		</el-form-item>
		<el-form-item label="模块关键词" prop="keywords">
			<el-input v-model="data.keywords" placeholder="请输入模块关键词" clearable></el-input>
		</el-form-item>
		<el-form-item label="目录安装" prop="dirs">
			<el-checkbox-group v-model="data.dirs">
				<el-checkbox label="controller">Controller 目录</el-checkbox>
				<el-checkbox label="model">Model 目录</el-checkbox>
				<el-checkbox label="database">Database 目录</el-checkbox>
				<el-checkbox label="request">Request 目录</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
	</el-form>
	<div class="text-center">
		<el-button @click="handleClose">取消</el-button>
		<el-button type="primary" @click="handleSubmit">确定</el-button>
	</div>
</template>

<script setup lang="ts" name="SystemGenerateCreateModule">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { createModule } from "@/api/modules/system";

// 模块信息
const data = reactive({
	name: "",
	alias: "",
	description: "",
	keywords: "",
	dirs: ["controller", "model", "database"]
});

// 表单验证
const rules = reactive({
	name: [{ required: true, message: "请输入模块名称" }],
	alias: [{ required: true, message: "请输入模块目录" }]
});

// 关闭弹窗
const emit = defineEmits(["close"]);
const handleClose = () => {
	emit("close");
};

// 创建模块
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			const post = { ...data, dirs: data.dirs.join(",") };
			await createModule(post);
			ElMessage.success({ message: `创建模块成功！` });
			handleClose();
		} catch (error) {
			console.log(error);
		}
	});
};
</script>
