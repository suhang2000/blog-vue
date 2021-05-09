<template>
  <el-menu
    :default-active="'/index'"
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
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">SCU25-购物商城</span>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      navList: [
        {name: 'index', navItem: '首页'},
        {name: 'cart', navItem: '购物车'},
        {name: 'order', navItem: '订单'},
        {name: 'userInfo', navItem: '我的信息'}
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
      if (this.$store.state.user.name) {
        this.isLogin = true
      }
    }
  },
  mounted () {
    this.checkLogin()
    this.uname = this.$store.state.user.name
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
