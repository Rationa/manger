<template>
  <div>
    <el-button type="primary" plain @click="add">添加</el-button>
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="dialog"></v-dialog>
    <v-table @edit="edit"></v-table>
  </div>
</template>

<script>
import vTable from "./table";
import vDialog from "./dialog";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isadd: true,
      },
    };
  },
  components: {
    vTable,
    vDialog,
  },
  methods: {
    //   将显示信息传给子组件
    add() {
      this.addInfo.isShow = true;
      this.addInfo.isadd = true;
    },
    // 将关闭信息传给子组件
    cancel(e) {
      this.addInfo.isShow = e;
    },
    // 接收table传来的id值
    edit(id) {
      this.addInfo.isShow = true;
      this.addInfo.isadd = false;
      this.$refs.dialog.edit(id)
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin-bottom: 20px;
}
</style>