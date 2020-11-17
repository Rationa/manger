<template>
  <el-dialog
    :title="addInfo.isadd ? '添加管理员' : '修改菜单'"
    :visible.sync="addInfo.isShow"
    center
    :before-close="cancel"
  >
    <el-form :model="form" :rules="rules" ref="formData">
      <el-form-item
        prop="roleid"
        label="所属角色"
        :label-width="formLabelWidth"
      >
        <el-select placeholder="请选择" v-model="form.roleid">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.id"
            :label="item.rolename"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="用户名称"
        prop="username"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
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
import { postAdmin, getAdminOne, editAdmin } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        username: "",
        password: "",
        status: 1,
        roleid: "",
      },
      params: { size: 2, page: 1 },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "请选择角色名称", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.getMemberListAction();
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
      roleList:'role/getRoleList'
    }),
  },
  methods: {
    ...mapActions({
      getMemberListAction: "member/getMemberListAction",
      getRoleListAction: "role/getRoleListAction",
    }),
    reset() {
      this.form = {
        username: "",
        password: "",
        status: 1,
        roleid: "",
      };
    },
    // 关闭对话框
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
      // 添加
    confirm() {
      this.$refs["forData"].validate((valid) => {
        if (valid) {
          postAdmin(this.form).then((res) => {
            if (res.data.code == 200) {
              console.log("响应成功", res);
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              this.getMemberListAction  ();
              this.reset();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error");
          return false;
        }
      });
    },
    edit(uid) {
      console.log(uid, "对话框");
      getAdminOne({ uid }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
    update() {
      editAdmin(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          this.getAdminListAction(this.params);
        }
      });
    },
  },
};
</script>