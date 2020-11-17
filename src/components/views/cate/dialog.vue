<template>
  <el-dialog
    :title="addInfo.isadd ? '添加商品' : '修改商品'"
    :visible.sync="addInfo.isShow"
    center
    :before-close="cancel"
  >
    <el-form :model="form" :rules="rules" ref="cateForm">
      <el-form-item prop="pid" label="上级分类" :label-width="formLabelWidth">
        <el-select placeholder="请选择" v-model="form.pid">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="分类名称"
        prop="catename"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.catename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        v-model="form.img"
        label="图片"
        :label-width="formLabelWidth"
      >
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="onChange"
          :auto-upload="false"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
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
import { postCate, getCateOne, editCate } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        catename: "",
        img: "",
        status: 1,
      },
      isdelete: false,
      // 图片预览地址
      dialogImageUrl: "",
      // 图片是否预览
      dialogVisible: false,
      imgUrl: "",
      fileList: [],
      rules: {
        pid: [{ required: true, message: "请输入", trigger: "blur" }],
        catename: [
          { required: true, message: "请选择分类名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
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
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.imgUrl = file.raw;
    },
    // 图片移除
    handleRemove(file, fileList) {
      this.imgUrl = "";
      this.fileList = [];
      this.isdelete = true;
    },
    onChange(file) {
      this.imgUrl = file.raw;
      this.isdelete = false
    },
    cancel() {
      // 传给父组件isShow值
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      this.form = {
        catename: "",
        img: "",
        status: 1,
      };
      this.fileList = [];
      this.imgUrl = "";
    },
    // 添加
    confirm() {
      // this.getCateListAction();
      this.$refs["cateForm"].validate((valid) => {
        if (valid) {
          let data = this.form;
          // 将普通文件转为FormData形式
          let file = new FormData();
          // 必须通过append 去添加他的属性
          for (let i in data) {
            file.append(i, data[i]);
          }
          // 将图片信息添加到img中
          file.set("img", this.imgUrl);
          // 用get去获取结果
          postCate(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getCateListAction();
              //关闭弹框
              this.cancel();
              this.reset();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error");
          return false;
        }
      });
    },
    // 编辑
    edit(id) {
      getCateOne({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 真坑
          this.form.id = id;
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        }
      });
    },
    update() {
      let data = this.form;
      // 将普通文件转为FormData形式
      let file = new FormData();
      // 必须通过append 去添加他的属性
      for (let i in data) {
        file.append(i, data[i]);
      }
      // 将图片信息添加到img中
      this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
      if (this.isdelete) {
        this.imgUrl = "";
        this.isdelete = false;
      }
      file.set("img", this.imgUrl);
      editCate(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          // 跟新数据
          this.getCateListAction();
          this.imgUrl = [];
          // 关闭弹窗
          this.cancel();
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped></style>