<template>
  <el-container style="height: 95vh">
    <el-aside style="margin-top: 0px;width: 200px">
      <el-menu>
        <el-submenu index="0">
          <template slot="title"><img src="../../assets/admin/admin.jpg" alt="" width="40px" style="float: left;margin-top: 10px;">商城管理</template>
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
          <template slot="title"><i class="el-icon-s-custom"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="3-1"><i class="el-icon-user-solid"></i>普通用户</el-menu-item>
            <el-menu-item index="3-2"><i class="el-icon-s-shop"></i>商家管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-setting"></i>管理人员</template>
          <el-menu-item-group>
            <el-menu-item index="4-1"><i class="el-icon-refresh"></i>人员管理</el-menu-item>
            <el-menu-item index="4-2"><i class="el-icon-circle-plus-outline"></i>注册账号</el-menu-item>
            <el-menu-item index="4-3"><i class="el-icon-edit"></i>修改密码</el-menu-item>
            <el-menu-item index="4-4"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
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
  name: 'AdminIndex',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    select (key) {
      switch (key) {
        case '1':
          this.$router.push('/admin/dashboard')
          break
        case '2-1':
          this.$router.push('/admin/product')
          break
        case '2-2':
          this.$router.push('/admin/order')
          break
        case '3-1':
          this.$router.push('/admin/user')
          break
        case '3-2':
          this.$router.push('/admin/saler')
          break
        case '4-1':
          this.$router.push('/admin/admininfo')
          break
        case '4-2':
          this.$router.push('/admin/register')
          break
        case '4-3':
          this.$router.push('/admin/pwdreset')
          break
        case '4-4':
          this.$store.commit('logout')
          this.$router.push('/login')
          break
      }
    }
  }
}
</script>
