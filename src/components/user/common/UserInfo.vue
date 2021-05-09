<template>
  <div>
    <el-container>
      <el-aside>
        <div>
          <el-image
            :src="user.icon"
            style="float: right;margin-right: 50px;margin-top: 50px">
          </el-image>
        </div>
        <el-button type="success" style="margin-top: 50px" @click="editUser()">修改信息</el-button>
        <user-form @onSubmit="loadUser()" ref="edit"></user-form>
      </el-aside>
      <el-main>
        <p class="user" align="left">id: {{user.uid}}</p>
        <br>
        <p class="user" align="left">昵称: {{user.uname}}</p>
        <br>
        <p class="user" align="left">电话: {{user.phone}}</p>
        <br>
        <p class="user" align="left">邮箱: {{user.email}}</p>
        <br>
        <p class="user" align="left">地址: {{user.address}}</p>
        <br>
        <p class="user" align="left">性别: {{user.gender}}</p>
        <br>
        <p class="user" align="left">生日: {{user.birthday}}</p>
        <br>
        <p class="user" align="left">注册时间: {{user.register_time}}</p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserForm from './UserForm'
export default {
  name: 'UserInfo',
  components: {UserForm},
  data () {
    return {
      user: []
    }
  },
  methods: {
    loadUser () {
      const _this = this
      this.$axios.get('/home/user/' + _this.$store.state.user.name + '/').then(resp => {
        if (resp && resp.status === 200) {
          _this.user = resp.data
        }
      }).catch(failResponse => {
        _this.$message('加载失败')
      })
    },
    editUser () {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        // uname: this.user.uname,
        phone: this.user.phone,
        email: this.user.email,
        address: this.user.address,
        gender: this.user.gender,
        birthday: this.user.birthday,
        icon: this.user.icon
      }
    }
  },
  mounted () {
    this.loadUser()
  }
}
</script>

<style scoped>
  .user {
    font-size: x-large;
    /*margin: auto;*/
    font-family: 华文行楷;
  }
</style>
