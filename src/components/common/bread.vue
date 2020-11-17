<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="stylus" scoped>
.el-breadcrumb
    font-size 16px
    padding-bottom 20px
</style>