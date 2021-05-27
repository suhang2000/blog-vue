<template>
  <el-menu
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <el-button class="el-icon-switch-button"
               @click="logout"
               style="float:right;font-size: 20px;color: #222;padding-top: 8px;margin-top: 10px;margin-right: 20px"
               v-show="isLogin"></el-button>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">博客系统</span>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      navList: [
        {name: 'myblog', navItem: '我的博客'},
        {name: 'blog', navItem: '所有博客'},
        {name: 'selectarticle', navItem: '博客管理'},
        {name: 'userinfo', navItem: '我的信息'}
      ],
      isLogin: false,
      uname: ''
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    },
    checkLogin () {
      if (this.$store.state.username) {
        this.isLogin = true
      }
    }
  },
  mounted () {
    this.checkLogin()
    this.uname = this.$store.state.username
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>
