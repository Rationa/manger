<template>
  <el-dialog
    :title="addInfo.isadd ? '添加菜单' : '修改菜单'"
    :visible.sync="addInfo.isShow"
    center
    :before-close="cancel"
  >
    <el-form :model="form" :rules="rules" ref="forData">
      <el-form-item label="活动名称" prop="title" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动期限" :label-width="formLabelWidth">
        <div class="block">
          <el-date-picker
            v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select
          v-model="form.first_cateid"
          :disabled="!addInfo.isadd"
          placeholder="请选择"
          @change="selectCate(false)"
        >
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" :label-width="formLabelWidth">
        <el-select
          v-model="form.second_cateid"
          :disabled="!addInfo.isadd"
          placeholder="请选择"
          @change="selectCateChild(false)"
        >
          <el-option
            v-for="item in cateChildren"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品" :label-width="formLabelWidth">
        <el-select
          v-model="form.goodsid"
          :disabled="!addInfo.isadd"
          placeholder="请选择"
        >
          <el-option
            v-for="item in goodsList"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-model="form.status"
        label="状态"
        :label-width="formLabelWidth"
      >
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm" v-if="addInfo.isadd"
        >确 定</el-button
      >
      <el-button type="primary" @click="update" v-else>更新</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口
import {
  postSeck,
  getSeckOne,
  editSeck,
  getGoodsList,
} from "../../../util/axios";
// 导入vux辅助性函数
import { mapGetters, mapActions } from "vuex";
export default {
  // 接收父组件的值
  props: ["addInfo"],
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      cateChildren: [],
      goodsList: [],
      date: "",
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getSeckListAction();
    this.getCateListAction();
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    cancel() {
      // 传给父组件isShow值
      this.$emit("cancel", false);
      this.reset();
    },
    // 获取menuaction
    ...mapActions({
      getSeckListAction: "seck/getSeckListAction",
      getCateListAction: "cate/getCateListAction",
      getGoodsListAction: "goods/getGoodsListAction",
      getGoodsTotalAction: "goods/getGoodsTotalAction",
    }),
    reset() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        status: 1,
      };
    },
    //select被选中
    selectCate(id) {
      let index = this.cateList.findIndex((item) => {
        return item.id == this.form.first_cateid;
      });
      this.cateChildren = this.cateList[index].children;
      if (!id) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    selectCateChild(id) {
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        console.log(res.data);
        this.goodsList = res.data.list;
        if (!id) {
          this.form.goodsid = "";
        }
      });
    },
    // 添加
    confirm() {
      this.$refs["forData"].validate((valid) => {
        if (valid) {
          this.form.begintime = this.date[0];
          this.form.endtime = this.date[1];
          postSeck(this.form).then((res) => {
            if (res.data.code == 200) {
              console.log("响应成功", res);
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              this.getSeckListAction();
              this.getGoodsTotalAction();
              this.reset();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 编辑
    edit(id) {
      getSeckOne({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 真坑
          this.form.id = id;
          this.date = [this.form.begintime, this.form.endtime];
          this.selectCate(true);
          this.selectCateChild(true);
        }
      });
    },
    update() {
      editSeck(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          // 跟新数据
          this.getSeckListAction();
          // 关闭弹窗
          this.cancel();
        }
      });
    },
  },
};
</script>

<style lang="stylus"></style>