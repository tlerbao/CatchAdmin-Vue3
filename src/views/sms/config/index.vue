<template>
	<div class="card">
		<el-divider content-position="left"><h2>短信配置</h2></el-divider>
		<el-tabs v-model="activeName" type="border-card" class="mt-10">
			<el-tab-pane label="阿里云" name="aliyun">
				<aliyun />
			</el-tab-pane>
			<el-tab-pane label="腾讯云" name="tencent">
				<tencent />
			</el-tab-pane>
			<el-tab-pane label="Ucloud" name="ucloud">
				<ucloud />
			</el-tab-pane>
			<el-tab-pane label="Submail" name="submail">
				<submail />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import aliyun from "@/views/sms/config/components/aliyun.vue";
import tencent from "@/views/sms/config/components/tencent.vue";
import ucloud from "@/views/sms/config/components/ucloud.vue";
import submail from "@/views/sms/config/components/submail.vue";
const activeName = ref("aliyun");
</script>
<style></style>
