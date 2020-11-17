<template>
  <!-- 数组记得加 -->
  <div>
    <el-table
      :data="adminList"
      border
      row-key="id"
      default-expand-all
      style="width: 100%"
    >
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色" width="220">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="item">
          <el-tag type="success" v-if="item.row.status == 1">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      ref="pagination"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { delAdmin } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      pagSize: 2,
      params: {
        size: 2,
        page: 1,
      },
    };
  },
  mounted() {
    this.getAdminListAction(this.params);
    this.getAdminListTotalAction();
  },
  computed: {
    ...mapGetters({
      adminList: "admin/getAdminList",
      total: "admin/getAdminTotal",
    }),
  },
  methods: {
    ...mapActions({
      getAdminListAction: "admin/getAdminListAction",
      getAdminListTotalAction: "admin/getAdminListTotalAction",
    }),

    // 切换
    currentChange(page) {
      this.params.page = page;
      this.getAdminListAction(this.params);
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(uid) {
      this.$confirm("确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delAdmin({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // 刷新数据 删除后这页没有数据将返回上一页
              if (this.params.page == 1) {
                this.params.page = 1;
              } else {
                if (this.total % this.params.size == 1) {
                  this.params.page--;
                }
              }
              this.getAdminListAction(this.params);
              this.getAdminListTotalAction();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-pagination {
  float: right;
  margin-top: 10px;
}
</style>