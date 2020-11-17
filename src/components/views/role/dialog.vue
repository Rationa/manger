<template>
  <el-dialog
    center
    :title="addInfo.isadd ? '添加角色' : '修改角色'"
    :visible.sync="addInfo.isShow"
    :before-close="cancel"
  >
    <el-form :model="form" :rules="rules" ref="formData">
      <el-form-item
        label="角色名称"
        prop="rolename"
        :label-width="formLabelWidth"
      >
        <el-input autocomplete="off" v-model="form.rolename"></el-input>
      </el-form-item>
      <el-form-item
        label="角色权限"
        v-model="form.menus"
        :label-width="formLabelWidth"
      >
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          :props="{
            children: 'children',
            label: 'title',
          }"
        >
        </el-tree>
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
      <el-button type="primary" v-if="addInfo.isadd" @click="confirm"
        >确 定</el-button
      >
      <el-button type="primary" v-else @click="update">更新</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { postRole, getRoleOneInfo, editRoleInfo } from "../../../util/axios";
//获取menulist
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },

      formLabelWidth: "120px",

      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.getMenuListAction();
    }
  },
  computed: {
    //通过vuex获取的变量放在computed()中
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 解析map
    ...mapActions({
      getMenuListAction: "menu/getMenuListAction",
      getRoleListAction: "role/getRoleListAction",
    }),
    // 重置
    reset() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      this.$refs.tree.setCheckedKeys(this.form.menus);
    },
    // 确定
    confirm() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          postRole(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //   关闭对话框
              this.cancel();
              //   重新渲染数据
              this.getRoleListAction();
            }
          });
        } else {
          console.log("error");
          return false;
        }
      });
    },
    // 编辑
    edit(id) {
      //   获取一条数据
      getRoleOneInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          let list = res.data.list.menus
            .split(",")
            .map((item) => parseInt(item));
          this.$refs.tree.setCheckedKeys(list);
        }
      });
    },
    // 更新数据
    update() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      editRoleInfo(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          // 更新数据
          this.getRoleListAction();
        }
      });
    },
  },
};
</script>

<style lang="stylus"></style>