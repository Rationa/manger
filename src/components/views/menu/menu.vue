<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-dialog ref="dialog" @cancel="cancel()" :addInfo="addInfo"></v-dialog>
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
        isadd: true,
        isShow: false,
      },
    };
  },
  components: {
    vTable,
    vDialog,
  },
  methods: {
    // 显示弹框
    add() {
      this.addInfo.isadd = true
      this.addInfo.isShow = true;
    },
    // 关闭dialog
    cancel(e) {
      this.addInfo.isShow = e;
    },
    // 编辑
    edit(e) {
      this.addInfo.isShow = true;
      this.addInfo.isadd = false;
      // 给dialog传id e就是id
      this.$refs.dialog.edit(e)
    },
  },
};
</script>

<style lang="stylus">
.el-button {
  margin-bottom: 10px;
}
</style>