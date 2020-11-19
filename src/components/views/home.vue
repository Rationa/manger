<template>
  <div>
    <h2>首页</h2>
    <div id="con"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this, "组件实例");
    let myChart = this.$eh.init(document.getElementById("con"));
    let options = {
      title: {
        text: "本系统的周访问量",
        textStyle: {
          color: "red",
          fontSize: 30,
        },
        textAlign: "auto",
      },
      xAxis: {
        type: "category",
        data: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [66, 500, 999, 1400, 800, 500, 1500],
          type: "line",
        },
      ],
    };
    myChart.setOption(options);
  },
};
</script>

<style lang="stylus" scoped>
#con {
  width: 800px;
  height: 500px;
  margin: 15px auto;
}
</style>