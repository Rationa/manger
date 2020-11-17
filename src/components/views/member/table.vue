<template>
  <el-table
    :data="memberList"
    border
    row-key="id"
    default-expand-all
    style="width: 100%"
  >
    <el-table-column prop="uid" label="用户编号" width="100"> </el-table-column>
    <el-table-column prop="nickname" label="昵称" width="280">
    </el-table-column>
    <el-table-column prop="phone" label="手机号" width="280">
    </el-table-column>
    <el-table-column prop="status" label="状态" width="380">
      <template slot-scope="item">
        <el-tag type="success" v-if="item.row.status == 1">启用</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="item">
        <el-button type="primary" size="small" @click="edit(item.row.id)"
          >编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
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

    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
.img {
  width: 160px;
  height: auto;
}
</style>