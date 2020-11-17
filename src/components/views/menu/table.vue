<template>
  <!-- 数组记得加 -->
  <el-table
    border
    :data="menuList"
    row-key="id"
    default-expand-all
    :tree-props="{ children: 'children' }"
    style="width: 100%"
  >
    <el-table-column prop="id" label="菜单编号" width="180"> </el-table-column>
    <el-table-column prop="title" label="菜单名称" width="180">
    </el-table-column>
    <el-table-column prop="pid" label="上级菜单" width="220"> </el-table-column>
    <el-table-column prop="icon" label="菜单图标" width="220">
      <template slot-scope="item">
        <span :class="item.row.icon"></span>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="菜单地址" width="180"> </el-table-column>
    <el-table-column prop="status" label="状态" width="180">
      <template slot-scope="item">
        <el-tag type="success" v-if="item.row.status == 1">启用</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="item">
        <div>
          <el-button type="primary" @click="edit(item.row.id)" size="small"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(item.row.id)" size="small"
            >删除</el-button
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteMenuList } from "../../../util/axios";
// 在这里渲染数据
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
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
          deleteMenuList({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("删除");
              // 再次渲染数据
              this.getMenuListAction();
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