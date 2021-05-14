<template>
<div>
<el-container style="height: 600px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']" >
      <el-submenu  index="1">
         <template slot="title"><i class="el-icon-user-solid"></i>个人信息管理</template>
         <el-menu-item @click="gotolink"  class="btn btn-success" index="1-1"><i class="el-icon-setting"></i>修改个人信息</el-menu-item>
        <el-menu-item @click="gotolink2" class="btn btn-success" index="1-2"><i class="el-icon-s-tools"></i>修改密码</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
</el-container>
</div>
</template>

<style>

</style>

<script>

  export default {

     provide(){
    return {
    }
  },

  data(){
    return {
      isRouterAlive: true
    }
  },
    methods: {
      gotolink() {
        this.$router.replace('/home/userInfo/UserInfo1')

      },
      gotolink2() {
        this.$router.replace('/home/userInfo/UserInfo3')
      },
    }
  }
</script>
