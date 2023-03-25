<template>
	<div class="gap-4">
		<div class="card">
			<el-divider><h3>Setp 1：模块、表、模型和控制器设置</h3></el-divider>
			<el-form ref="coding" :model="generate" :rules="rules" label-width="80px" label-suffix=" :">
				<el-form-item label="模块" prop="module">
					<el-input v-model="generate.module" placeholder="请输入模块名称" autocomplete="off" clearable @change="moduleChange">
						<template #append>
							<el-button @click="moduleCreateVisible = true"> 创建模块 </el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item label="表名" prop="table">
					<el-input v-model="generate.table" placeholder="请输入表名" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="模型" prop="model">
					<el-input v-model="generate.model" placeholder="请输入模型" class="input-with-select">
						<template #append> <el-button :icon="Search" @click="preview('model')" /> </template>
					</el-input>
				</el-form-item>
				<el-form-item label="控制器" prop="controller">
					<el-input v-model="generate.controller" placeholder="Please input" class="input-with-select">
						<template #append> <el-button :icon="Search" @click="preview('controller')" /> </template>
					</el-input>
					<el-tooltip
						class="item"
						effect="dark"
						content="restful路由会自动生成 {index, save, read, update, delete} 五个方法"
						placement="top-start"
					>
						<el-checkbox v-model="generate.restful">RESTFUL 路由</el-checkbox>
					</el-tooltip>
				</el-form-item>
			</el-form>
			<el-divider><h3>创建表结构</h3></el-divider>
			<el-table :data="fields" tooltip-effect="dark" border>
				<el-table-column label="字段名称">
					<template #default="field">
						<el-input v-model="field.row.field" placeholder="字段名称" autocomplete="off" clearable />
					</template>
				</el-table-column>
				<el-table-column prop="type" label="类型">
					<template #default="field">
						<el-select v-model="field.row.type" filterable placeholder="请选择" prop="type">
							<el-option-group v-for="group in mysqlTypes" :key="group.label" :label="group.label">
								<el-option v-for="(item, key) in group.options" :key="key" :label="item.value" :value="item.value"> </el-option>
							</el-option-group>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="unsigned" label="unsigned" width="110" align="center">
					<template #default="field">
						<el-checkbox v-model="field.row.unsigned"></el-checkbox>
					</template>
				</el-table-column>
				<el-table-column prop="length" label="长度" width="200" align="center">
					<template #default="field">
						<el-input-number v-model="field.row.length" :min="0" :max="1000000" label="长度" controls-position="right" />
					</template>
				</el-table-column>
				<el-table-column prop="nullable" label="NULL" width="80" align="center">
					<template #default="field">
						<el-checkbox v-model="field.row.nullable"></el-checkbox>
					</template>
				</el-table-column>
				<el-table-column prop="index" label="索引类型">
					<template #default="field">
						<el-select v-model="field.row.index" placeholder="请选择">
							<el-option v-for="item in indexes" :key="item" :label="item" :value="item"> </el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="default" label="默认值">
					<template #default="field">
						<el-input v-model="field.row.default" placeholder="默认值" autocomplete="off" clearable />
					</template>
				</el-table-column>
				<el-table-column prop="comment" label="注释">
					<template #default="field">
						<el-input v-model="field.row.comment" placeholder="注释" autocomplete="off" clearable />
					</template>
				</el-table-column>
				<el-table-column label="操作" width="80" align="center">
					<template #default="field">
						<el-button type="danger" :icon="Delete" @click="deleteField(field.row.field)" />
					</template>
				</el-table-column>
			</el-table>
			<div class="text-right mt-4">
				<el-checkbox v-model="table.created_at" label="created_at&updated_at" />
				<el-checkbox v-model="table.soft_delete" label="deleted_at" />
				<el-checkbox v-model="table.creator_id" label="creator_id" border />
				<el-input placeholder="id" v-model="table.primary_key" style="width: 150px; margin-left: 5px">
					<template #prepend>ID</template>
				</el-input>
				<el-select v-model="table.engine" placeholder="请选择" style="margin-left: 5px">
					<el-option v-for="item in engines" :key="item" :label="item" :value="item" />
				</el-select>
				<el-input v-model="table.comment" placeholder="表注释" style="width: 250px; margin-left: 5px">
					<template #prepend>表注释</template>
				</el-input>
				<el-button type="primary" class="fr" :icon="Plus" @click="addField">新增字段</el-button>
			</div>
			<el-divider></el-divider>
			<div class="flex justify-center">
				<div class="mr-10">
					<el-checkbox v-model="create.controller" border label="创建控制器" />
					<el-checkbox v-model="create.model" border label="创建模型" />
					<el-checkbox v-model="create.migration" border label="创建表迁移" />
					<el-checkbox v-model="create.table" border label="创建表" />
				</div>
				<el-button type="primary" @click="handleSubmit">提交</el-button>
			</div>
			<el-drawer v-model="drawerVisible">
				<code class="php">{{ previewContent }}</code>
				<!--				<pre v-highlightjs v-if="drawerVisible"><code class="php">{{ preview_content }}</code></pre>-->
			</el-drawer>
			<el-dialog
				title="创建模块"
				v-model="moduleCreateVisible"
				:destroy-on-close="true"
				width="800px"
				@close="moduleCreateVisible = false"
			>
				<CreateModule @close="closeCreateModule" />
			</el-dialog>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { mysqlIndex, mysqlType } from "@/utils/serviceDict";
import { Delete, Plus, Search } from "@element-plus/icons-vue";
import CreateModule from "@/views/system/generate/components/createModule.vue";
import { previewCode, generateCode } from "@/api/modules/system";
import { ElMessage, FormInstance } from "element-plus";

// 创建模块弹层
const moduleCreateVisible = ref(false);
const closeCreateModule = () => {
	moduleCreateVisible.value = false;
};

// 模块、控制、模型设置
const generate = reactive({
	module: "",
	table: "",
	model: "",
	controller: "",
	restful: false
});

// 生成文件设置
const create = reactive({
	controller: true,
	model: true,
	migration: true,
	table: true
});

// 表单验证
const rules = reactive({
	module: [{ required: true, message: "请输入模块名称", trigger: "blur" }]
});

// 表引擎
const engines = reactive(["InnoDB", "MyISAM", "Memory"]);

// 表设置
const table = reactive({
	primary_key: "id",
	created_at: true,
	soft_delete: true,
	creator_id: true,
	engine: "InnoDB",
	comment: ""
});
// 默认字段
const getColumn = () => {
	return {
		field: "",
		type: "",
		length: 0,
		nullable: false,
		index: "",
		default: "",
		comment: "",
		unsigned: false
	};
};

const fields = ref([getColumn()]);

// 索引选项
const indexes = reactive(mysqlIndex);

// 字段类型
const mysqlTypes = mysqlType;

// 组合提交数据
const getData = () => {
	const params: any = {};
	params.controller = generate;
	params.table_fields = fields.value;
	params.table_extra = table;

	// create 文件
	params.create_controller = create.controller;
	params.create_model = create.model;
	params.create_migration = create.migration;
	params.create_table = create.table;

	return {
		data: JSON.stringify(params)
	};
};

// 预览代码
const drawerVisible = ref(false);
const previewContent = ref();
const preview = async (type: any) => {
	const post: any = getData();
	post.type = type;
	const { data } = await previewCode(post);
	previewContent.value = data;
	drawerVisible.value = true;
};

const deleteField = (field: any) => {
	fields.value = fields.value.filter(function (value) {
		return value.field !== field;
	});
};

const moduleChange = (value: any) => {
	generate.controller = "catchAdmin\\" + value + "\\controller\\";
	generate.model = "catchAdmin\\" + value + "\\model\\";
};

const addField = () => {
	fields.value.push(getColumn());
};

const coding = ref<FormInstance>();
const handleSubmit = () => {
	coding.value!.validate(async valid => {
		if (!valid) return;
		console.log(getData());
		// return;
		try {
			await generateCode(getData());
			ElMessage.success({ message: `生成代码成功！` });
		} catch (error) {
			console.log(error);
		}
	});
};
</script>
