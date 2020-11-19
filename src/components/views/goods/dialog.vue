<template>
  <el-dialog
    :title="addInfo.isadd ? '添加商品' : '修改商品'"
    :visible.sync="addInfo.isShow"
    center
    :before-close="cancel"
  >
    <el-form :model="form" :rules="rules" ref="formData">
      <el-form-item
        label="一级分类"
        prop="first_cateid"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="form.first_cateid"
          placeholder="请选择"
          @change="select_cate"
        >
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="二级分类"
        prop="second_cateid"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.second_cateid" placeholder="请选择">
          <el-option
            v-for="item in cateChildren"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="商品名称"
        prop="goodsname"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.goodsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
        <el-input v-model.number="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="市场价格"
        prop="market_price"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model.number="form.market_price"
          autocomplete="off"
        ></el-input>
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
          :limit="1"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item
        label="商品规格"
        prop="specsid"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="form.specsid"
          placeholder="请选择"
          @change="select_specs"
        >
          <el-option
            v-for="item in specsList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="规格属性"
        prop="specsattr"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.specsattr" placeholder="请选择">
          <el-option
            v-for="item in specsChildren"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品" :label-width="formLabelWidth">
        <el-radio v-model="form.isnew" :value="1" :label="1">是</el-radio>
        <el-radio v-model="form.isnew" :value="2" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖" :label-width="formLabelWidth">
        <el-radio v-model="form.ishot" :value="1" :label="1">是</el-radio>
        <el-radio v-model="form.ishot" :value="2" :label="2">否</el-radio>
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
      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <div id="editor"></div>
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
import E from "wangeditor";
// 导入接口
import { postGoods, getGoodsOne, editGoods } from "../../../util/axios";
// 导入vux辅助性函数
import { mapGetters, mapActions } from "vuex";
export default {
  // 接收父组件的值
  props: ["addInfo"],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      editor: null,
      isdelete: false,
      // 商品分类子孩子
      cateChildren: [],
      // 商品规格
      specsChildren: [],
      dialogVisible: false,
      dialogImageUrl: "",
      fileList: [],
      imgUrl: "",
      params: { size: 2, page: 1 },
      formLabelWidth: "120px",
      // 规则验证
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级菜单", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级菜单", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请输入规格属性", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getCateListAction();
    this.getSpecsListAction(this.params);
    this.getGoodsListAction(this.params);
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      total: "goods/getGoodsTotal",
      specsList: "specs/getSpecsList",
    }),
  },
  methods: {
    // 获取menuaction
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
      getGoodsListAction: "goods/getGoodsListAction",
      getGoodsTotalAction: "goods/getGoodsTotalAction",
      getSpecsListAction: "specs/getSpecsListAction",
      getSpecsTotalAction: "specs/getSpecsTotalAction",
    }),
    //表单弹框打开时创建富文本
    createEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      //设置内容 设置表单描述信息参数
      this.editor.txt.html(this.form.description);
    },
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
      this.isdelete = false;
    },
    cancel() {
      // 传给父组件isShow值
      this.$emit("cancel", false);
      this.reset();
      // 富文本销毁
      this.editor.destroy();
      this.editor = null;
    },
    reset() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        descripiton: "s",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.fileList = [];
      this.imgUrl = "";
    },
    //select被选中cate商品分类
    select_cate() {
      // 传入下标

      let index = this.cateList.findIndex((item, i) => {
        return this.form.first_cateid == item.id;
      });
      this.cateChildren = this.cateList[index].children;
      this.form.second_cateid = "";
    },
    //select被选中商品规格
    select_specs() {
      // 传入下标
      let index = this.specsList.findIndex((item, i) => {
        return this.form.specsid == item.id;
      });
      this.specsChildren = this.specsList[index].attrs;
      this.form.specsattr = "";
    },
    // 添加
    confirm() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          let data = this.form;
          // 将普通文件转为FormData形式
          let file = new FormData();
          //把编辑器中的内容设置给我的描述参数
          this.form.description = this.editor.txt.html();
          // 必须通过append 去添加他的属性
          for (let i in data) {
            file.append(i, data[i]);
          }

          // 将图片信息添加到img中
          file.set("img", this.imgUrl);
          postGoods(file).then((res) => {
            if (res.data.code == 200) {
              console.log("响应成功", res);
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              this.getGoodsListAction(this.params);
              this.getGoodsTotalAction();
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
      getGoodsOne({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.createEditor();
          // 还是要记住
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
          // 真坑
          this.form.id = id;
        }
      });
    },
    update() {
      let data = this.form;
      console.log(this.form)
      // 将普通文件转为FormData形式
      let file = new FormData();
      //把编辑器中的内容设置给我的描述参数
      this.form.description = this.editor.txt.html();
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
      editGoods(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          // 跟新数据
          this.getGoodsListAction(this.params);
          // 关闭弹窗
          this.cancel();
        }
      });
    },
  },
};
</script>

<style lang="stylus"></style>