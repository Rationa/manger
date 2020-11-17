<template>
  <el-dialog
    :title="addInfo.isadd ? '添加商品规格' : '修改菜单'"
    :visible.sync="addInfo.isShow"
    center
    :before-close="cancel"
  >
    <el-form :model="form" :rules="rules" ref="formData">
      <el-form-item
        label="规格名称"
        prop="specsname"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.specsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="规格属性"
        v-for="(attr, index) in attrs"
        :key="attr.key"
        :label-width="formLabelWidth"
      >
        <el-input
          class="attr"
          v-model="attr.value"
          autocomplete="off"
        ></el-input>
        <el-button class="btn" type="primary" v-if="index == 0" @click="addAttr"
          >新规格属性</el-button
        >
        <el-button class="btndel" type="primary" v-else plain  @click="delAttr(index)">删除</el-button>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm" v-if="addInfo.isadd"
        >确 定</el-button
      >
      <el-button type="primary" @click="update" v-else>更新</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSpecsOne, editSpecs, postSpecs } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrs: [
        {
          value: "",
        },
      ],
      params: { size: 2, page: 1 },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getSpecsTotalAction: "specs/getSpecsTotalAction",
    }),
    addAttr() {
      this.attrs.push({
        value: "",
        key: Date.now(),
      });
    },
    delAttr(index){
      this.attrs.splice(index,1)
    },
    reset() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrs = [
        {
          value: "",
        },
      ];
    },
    // 关闭对话框
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 添加商品属性
    confirm() {
      this.form.attrs = this.attrs.map((item) => item.value).join(",");
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          postSpecs(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              // 这里需要个参数
              this.getSpecsListAction(this.params);
              this.getSpecsTotalAction();
            } else {
              // 如果用户名重复,给用户提示
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    edit(id) {
      getSpecsOne({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.attrs = res.data.list[0].attrs.map((item) => {
            return { value: item };
          });
          this.form.id = id;
        }
      });
    },
    update() {
      this.form.attrs = this.attrs.map((item) => item.value).join(",");
      editSpecs(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          this.getSpecsListAction(this.params);
        }
      });
    },
  },
};
</script>

<style lang="stylus">
.attr {
  width: 80%;
}

.btn {
  width: 19%;
}

.btndel {
  width: 15%;
}
</style>