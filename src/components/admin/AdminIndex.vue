<template>
<el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)" >
    <el-menu  router>
      <el-submenu  index="7">
         <template slot="title">信息管理</template>
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
              {{ item.navItem }}
            </el-menu-item>
<!--         <el-menu-item v-for="(item,index) in $router.options.routes[7].children" :key="index" :index="item.path">{{item.name}}</el-menu-item>-->
      </el-submenu>
    </el-menu>
  </el-aside>

  <el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
export default {
  data () {
    return {
      navList: [
        {name: 'Selectuser', navItem: '用户信息'},
        {name: 'AddUser', navItem: '添加用户'},
        {name: 'Selectarticle', navItem: '文章信息'},
        {name: 'Fixadmin', navItem: '个人信息修改'},
        {name: 'Selectreport', navItem: '用户举报信息'}
      ],
      regisForm: {
        user_id: '',
        uname: '',
        password: '',
        phone: '',
        gender: ''
      },
      tableData: [{
        user_id: '',
        username: '',
        phone: '',
        gender: ''
      }]
    }
  },
  created: function () {
    this.$router.push({path: '/admin/Selectuser'})
  }
}
</script>
