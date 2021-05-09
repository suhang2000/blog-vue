<template>
  <el-container style="height: 95vh">
    <el-aside style="margin-top: 0px;width: 200px">
      <el-menu>
        <el-submenu index="0">
          <template slot="title"><img src="../../assets/saler/saler.jpg" alt="" width="40px" style="float: left;margin-top: 10px;">商家管理</template>
        </el-submenu>
      </el-menu>
      <el-menu default-active="1" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="select">
        <el-menu-item index="1"><i class="el-icon-s-management"></i>运营报表</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-document-copy"></i>内容管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1"><i class="el-icon-s-goods"></i>商品管理</el-menu-item>
            <el-menu-item index="2-2"><i class="el-icon-s-order"></i>订单管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>信息管理</template>
          <el-menu-item-group>
            <el-menu-item index="3-1"><i class="el-icon-edit"></i>商家信息</el-menu-item>
            <el-menu-item index="3-2"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'SalerIndex',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    select (key) {
      switch (key) {
        case '1':
          this.$router.push('/saler/dashboard')
          break
        case '2-1':
          this.$router.push('/saler/product')
          break
        case '2-2':
          this.$router.push('/saler/order')
          break
        case '3-1':
          this.$router.push('/saler/salerinfo')
          break
        case '3-2':
          this.$store.commit('logout')
          this.$router.push('/login')
          break
      }
    }
  }
}
</script>
