<template>
  <div>
    <el-container>
      <el-aside>
        <div>
          <el-image
            v-if="user.profile_photo"
            :src="user.profile_photo"
            style="margin-top: 50px"
            @click="changeAvatar()">
          </el-image>
          <span v-else>
            <el-button icon="el-icon-user-solid" circle style="margin-top: 50px" @click="changeAvatar()"></el-button>
          </span>
          <avatar-form @onChange="loadUser()" ref="ava"></avatar-form>
        </div>
        <el-button type="success" style="margin-top: 50px" @click="editUser()">修改信息</el-button>
        <user-form @onSubmit="loadUser()" ref="edit"></user-form>
      </el-aside>
      <el-main>
        <p class="user" align="left">id: {{user.user_id}}</p>
        <br>
        <p class="user" align="left">昵称: {{user.username}}</p>
        <br>
        <p class="user" align="left">电话: {{user.phone_number}}</p>
        <br>
        <p class="user" align="left">邮箱: {{user.email}}</p>
        <br>
        <p class="user" align="left">性别: {{user.gender}}</p>
        <br>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserForm from './UserForm'
import AvatarForm from './avatarForm'
export default {
  name: 'UserInfo',
  components: {AvatarForm, UserForm},
  data () {
    return {
      user: {
        profile_photo: '../static/avatar/16.jpg'
      }
    }
  },
  methods: {
    loadUser () {
      const _this = this
      this.$axios.get('/home/user/' + _this.$store.state.username).then(resp => {
        if (resp && resp.status === 200) {
          _this.user = resp.data.data
        }
      }).catch(failResponse => {
        _this.$message('加载失败')
      })
    },
    editUser () {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        // uname: this.user.uname,
        phone_number: this.user.phone_number,
        // email: this.user.email,
        gender: this.user.gender
      }
    },
    changeAvatar () {
      this.$refs.ava.dialogVisible = true
      this.$refs.ava.imageURL = this.user.profile_photo
    }
    // getImgUrl (src) {
    //   return require('@/assets/avatar/' + src)
    // }
    // single_quotes (doubleQuotes) {
    //   return JSON.stringify(doubleQuotes).replace(/\"/g, "'")
    // }
  },
  created () {
    this.loadUser()
  }
}
</script>

<style scoped>
  .user {
    font-size: x-large;
    font-family: 华文行楷;
  }
</style>
