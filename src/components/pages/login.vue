<template>
  <el-form
    :model="loginForm"
    status-icon
    :rules="rules"
    ref="loginForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="loginForm.username" clearable></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="loginForm.password"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login()">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { adminLogin } from "../../util/axios";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在2",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 2,
            max: 18,
            message: "长度在6到18个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      //console.log(this.$refs[formName],'formDOM')
      //validate 验证
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          //登录逻辑
          //调取登录接口
          adminLogin(this.loginForm).then((res) => {
            if (res.data.code == 200) {
              //登录成功之后，把登录数据存储到本地存储中
              sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
              this.$message.success(res.data.msg)
              this.$router.push('/menu')
            }else{
              this.$message.error(res.data.msg)
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>


<style scoped>
.el-form {
  width: 400px;
  padding: 60px 100px 40px 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-form-item {
  text-align: center;
}
.el-buutton {
  width: 150px !important;
}
</style>