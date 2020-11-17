<template>
  <!-- 数组记得加 -->
  <el-table
    border
    row-key="id"
    :data="roleList"
    default-expand-all
    style="width: 100%"
  >
    <el-table-column prop="id" label="角色编号" width="120"> </el-table-column>
    <el-table-column prop="rolename" label="角色名称" width="180">
    </el-table-column>
    <el-table-column prop="status" label="状态" width="500">
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
// 调取接口
import { deleteRole } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
// 在这里渲染数据
export default {
  data() {
    return {};
  },
  mounted() {
    this.getRoleListAction();
  },
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  methods: {
    //   解析map
    ...mapActions({
      getRoleListAction: "role/getRoleListAction",
    }),

    // 删除role
    del(id) {
      this.$confirm("确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRole({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //   渲染数据
              this.getRoleListAction();
            }
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },
    // 编辑
    edit(id) {
      // 将id传给父级
      this.$emit("edit", id);
    },
  },
};
</script>