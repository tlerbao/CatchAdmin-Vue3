<template>
	<div class="card">
		<el-tabs v-model="activeName" type="card">
			<el-alert type="warning">TODO：日后实现可动态管理配置的功能</el-alert>
			<el-tab-pane :label="item.name" :name="item.component" v-for="item in tabs" :key="item.id">
				<component :is="components[item.component]"></component>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup lang="tsx" name="SystemConfig">
import { onMounted, ref } from "vue";
import { getSystemConfig } from "@/api/modules/system";
import Upload from "./components/upload.vue";
import Basic from "./components/basic.vue";

const tabs = ref();
const activeName = ref("");
const components = {
	upload: Upload,
	basic: Basic
};

const getSystemConfigList = async () => {
	const { data } = await getSystemConfig();
	tabs.value = data;
	activeName.value = tabs.value[0].component;
};

onMounted(() => {
	getSystemConfigList();
});
</script>
