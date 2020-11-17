<template>
  <div>
    <el-container>
      <el-header>后台管理项目</el-header>
      <el-container>
        <el-aside width="200px">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <v-bread></v-bread>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../common/nav";
import vBread from "../common/bread";
export default {
  components: {
    vNav,
    vBread,
  },
};
</script>

<style lang="stylus" scoped>
.el-header {
  height: 40px;
  font: 20px / 40px '微软雅黑';
  text-align: center;
  background-color: #668cff;
}
</style>