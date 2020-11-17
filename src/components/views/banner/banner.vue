<template>
  <div>
    <el-button type="primary" @click="add" plain>添加</el-button>
    <v-table @edit="edit"></v-table>
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="dialog"></v-dialog>
  </div>
</template>
<script>
import vDialog from "./dialog";
import vTable from "./table";
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
    vDialog,
    vTable,
  },
  methods: {
    add() {
      this.addInfo.isShow = true;
      this.addInfo.isadd = true;
    },
    // 将关闭信息传给子组件
    cancel(e) {
      this.addInfo.isShow = e;
    },
    edit(id) {
      this.$refs.dialog.edit(id);
      this.addInfo.isShow = true;
      this.addInfo.isadd = false;
    },
  },
};
</script>

<style scoped>
.el-button{
  margin-bottom: 10px;
}
</style>