<template>
  <el-dialog
    title="修改菜单"
    :visible.sync="addInfo.isShow"
    center
    :before-close="cancel"
  >
    <el-form :model="form" :rules="rules" ref="formData">
      <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
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
      <el-button type="primary" @click="update">更新</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editMember,getMemberOne} from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        phone: "",
        password: "",
        status: 1,
        nickname: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在11个数字",
            trigger: "blur",
          },
        ],
        nickname: [{ required: true, message: "请选择昵称", trigger: "blur" }],
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
    }),
  },
  methods: {
    ...mapActions({
      getMemberListAction: "member/getMemberListAction",
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
    edit(uid) {
      getMemberOne({ uid }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
    update() {  
      editMember(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          this.getMemberListAction(this.params);
        }
      });
    },
  },
};
</script>