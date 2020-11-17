<template>
  <el-row>
    <el-col>
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        active-text-color="#efefef"
        unique-opened
        router
        background-color="#b3d9ff"
      >
        <el-menu-item index="/home" >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-submenu :index="item.id.toString()" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item :index="menu.url" v-for="menu in item.children" :key="menu.id">{{menu.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
// 导入vux辅助性函数
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home",
    };
  },
  mounted() {
    this.defaultActive = this.$route.path;
    this.getMenuListAction();
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuListAction: "menu/getMenuListAction",
    }),
  },
};
</script>

<style lang="stylus" scoped>
.el-menu {
  height: 80vh;
}
</style>