<template>
  <el-table
    :data="cateList"
    border
    row-key="id"
    default-expand-all
    style="width: 100%"
  >
    <el-table-column prop="id" label="分类编号" width="180"> </el-table-column>
    <el-table-column prop="catename" label="分类名称" width="180">
    </el-table-column>
    <el-table-column prop="img" label="图片" width="300">
      <template slot-scope="item">
        <img class="img" :src="$imgUrl+item.row.img" alt="" />
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" width="380">
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
</template>

<script>
import { delCate } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.getCateListAction();
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
    }),

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
          delCate({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getCateListAction();
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
.img{
  width: 160px;
  height: auto;
}
</style>