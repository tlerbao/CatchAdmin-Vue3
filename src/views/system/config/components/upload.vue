<template>
	<div class="mx-4">
		<div class="my-8">
			<el-divider content-position="left"><h3>上传驱动</h3></el-divider>
			<el-form label-width="140px" label-suffix=" :">
				<el-form-item label="驱动设置" prop="prefix">
					<el-select v-model="basic.system.upload" placeholder="请选择上传驱动">
						<el-option v-for="(item, key) in dirverList" :key="item" :label="item" :value="key" />
					</el-select>
				</el-form-item>
			</el-form>
		</div>

		<el-form ref="formRef" label-width="140px" label-suffix=" :" :model="upload">
			<div class="my-10" v-if="basic.system.upload === 'oss'">
				<el-divider content-position="left"><h3>阿里 OSS 配置</h3></el-divider>
				<el-form-item label="prefix" prop="prefix">
					<el-input v-model="upload.oss.prefix" placeholder="prefix" clearable></el-input>
				</el-form-item>
				<el-form-item label="access_key" prop="">
					<el-input v-model="upload.oss.access_key" placeholder="access_key" clearable></el-input>
				</el-form-item>
				<el-form-item label="secret_key" prop="">
					<el-input v-model="upload.oss.secret_key" placeholder="secret_key" clearable></el-input>
				</el-form-item>
				<el-form-item label="bucket" prop="">
					<el-input v-model="upload.oss.bucket" placeholder="bucket" clearable></el-input>
				</el-form-item>
				<el-form-item label="end_point" prop="">
					<el-input v-model="upload.oss.end_point" placeholder="end_point" clearable></el-input>
				</el-form-item>
				<el-form-item label="is_cname">
					<el-radio v-model="upload.oss.is_cname" :label="1">是</el-radio>
					<el-radio v-model="upload.oss.is_cname" :label="2">否</el-radio>
				</el-form-item>
			</div>

			<div class="my-8" v-if="basic.system.upload === 'qcloud'">
				<el-divider content-position="left"><h3>腾讯云配置</h3></el-divider>
				<el-form-item label="region">
					<el-input v-model="upload.qcloud.region" placeholder="region" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="app_id">
					<el-input v-model="upload.qcloud.app_id" placeholder="app_id" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="secret_id">
					<el-input v-model="upload.qcloud.secret_id" placeholder="secret_id" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="secret_key">
					<el-input v-model="upload.qcloud.secret_key" placeholder="secret_key" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="bucket">
					<el-input v-model="upload.qcloud.bucket" placeholder="bucket" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="timeout">
					<el-input v-model="upload.qcloud.timeout" placeholder="timeout" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="connect_timeout">
					<el-input v-model="upload.qcloud.connect_timeout" placeholder="connect_timeout" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="cdn">
					<el-input v-model="upload.qcloud.cdn" placeholder="cdn" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="scheme">
					<el-input v-model="upload.qcloud.scheme" placeholder="scheme" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="read_from_cdn">
					<el-radio v-model="upload.qcloud.read_from_cdn" :label="1">是</el-radio>
					<el-radio v-model="upload.qcloud.read_from_cdn" :label="2">否</el-radio>
				</el-form-item>
			</div>

			<div class="my-8" v-if="basic.system.upload === 'qiniu'">
				<el-divider content-position="left"><h3>七牛云配置</h3></el-divider>
				<el-form-item label="access_key">
					<el-input v-model="upload.qiniu.access_key" placeholder="access_key" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="secret_key">
					<el-input v-model="upload.qiniu.secret_key" placeholder="secret_key" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="bucket">
					<el-input v-model="upload.qiniu.bucket" placeholder="bucket" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="domain">
					<el-input v-model="upload.qiniu.domain" placeholder="domain" autocomplete="off" clearable />
				</el-form-item>
			</div>
			<el-form-item>
				<el-button type="primary" @click="handleSubmit">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts" setup name="SystemConfigUpload">
import { ref, reactive, onMounted } from "vue";
import { getConfig, saveConfig } from "@/api/modules/system";
import { ElMessage, FormInstance } from "element-plus";

const basic = reactive<any>({
	system: {
		upload: "local"
	},
	parent: "basic"
});

const dirverList = reactive({
	local: "本地上传",
	oss: "阿里OSS",
	qcloud: "腾讯云上传",
	qiniu: "七牛云上传"
});

const upload = reactive<any>({
	// oss 配置
	oss: {
		prefix: "",
		access_key: "",
		secret_key: "",
		bucket: "",
		end_point: "",
		is_cname: 1
	},
	// 腾讯云配置
	qcloud: {
		region: "",
		app_id: "",
		secret_id: "",
		secret_key: "",
		bucket: "",
		timeout: 60,
		connect_timeout: 60,
		cdn: "",
		scheme: "",
		read_from_cdn: 1
	},
	// 七牛配置
	qiniu: {
		access_key: "",
		secret_key: "",
		bucket: "",
		domain: ""
	},
	parent: "upload"
});

const getUploadConfig = async (type: string) => {
	const { data }: { data: any } = await getConfig({ name: type });
	Object.keys(data).forEach(k => {
		Object.keys(data[k]).forEach(key => {
			if (type === "upload") {
				upload[k][key] = data[k][key];
			} else {
				if (key === "upload") basic[k][key] = data[k][key];
			}
		});
	});
};

const formRef = ref<FormInstance>();
const handleSubmit = () => {
	formRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			await saveConfig(basic);
			await saveConfig(upload);
			ElMessage.success("保存配置成功");
		} catch (error) {
			console.log(error);
		}
	});
};

onMounted(() => {
	getUploadConfig("basic");
	getUploadConfig("upload");
});
</script>
