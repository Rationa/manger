<template>
  <!-- 数组记得加 -->
  <div>
    <el-table
      :data="specsList"
      border
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
      style="width: 100%"
    >
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="420">
        <template slot-scope="item">
          <el-tag
            type="info"
            v-for="(attr, index) in item.row.attrs"
            :key="index"
            >{{ attr }}</el-tag
          >
        </template>
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
            <el-button type="primary" size="small" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.id)"
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
import { delSpecs } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      params: {
        size: 2,
        page: 1,
      },
    };
  },
  mounted() {
    this.getSpecsListAction(this.params);
    this.getSpecsTotalAction();
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      total: "specs/getSpecsTotal",
    }),
  },
  methods: {
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getSpecsTotalAction: "specs/getSpecsTotalAction",
    }),

    // 切换
    currentChange(page) {
      this.params.page = page;
      this.getSpecsListAction(this.params);
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      this.$confirm("确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delSpecs({ id }).then((res) => {
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
              this.getSpecsListAction(this.params);
              this.getSpecsTotalAction();
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
.el-tag {
  margin-left: 5px;
}
</style>