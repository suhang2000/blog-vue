<template>
<el-container style="border: 1px solid #eee; min-height: 900px">
  <el-aside style="background-color: rgb(238, 241, 246)">
    <el-menu router default-active="1">
      <el-submenu index="1">
         <template slot="title"><i class="el-icon-s-home"></i>信息管理</template>
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
              {{ item.navItem }}
            </el-menu-item>
      </el-submenu>
      <el-menu-item index="2" @click="logout">
        <i class="el-icon-switch-button"></i>
        <span slot="title">登出</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      navList: [
        {name: 'Selectuser', navItem: '用户信息'},
        {name: 'AddUser', navItem: '添加用户'},
        {name: 'Fixadmin', navItem: '管理员信息修改'},
        {name: 'Selectarticle', navItem: '文章信息'},
        {name: 'Selectreport', navItem: '举报信息'}
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
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>
