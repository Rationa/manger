<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-table @edit="edit"></v-table>
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="dialog"></v-dialog>
  </div>
</template>

<script>
// 引入组件
import vDialog from "./dialog";
import vTable from "./table";

import { mapGetters, mapActions } from "vuex";
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
    vDialog,
    vTable,
  },
  computed: {
    ...mapGetters({
      adminList: "admin/getAdminList",
    }),
  },
  methods: {
    add() {
      this.addInfo.isShow = true;
      this.addInfo.isadd = true
    },
    // 将关闭信息传给子组件
    cancel(e) {
      this.addInfo.isShow = e;
    },
    edit(id){
      this.$refs.dialog.edit(id)
      this.addInfo.isShow = true;
      this.addInfo.isadd = false
    }
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 20px;
}
</style>