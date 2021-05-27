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
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" @click="changeAvatar()"></i>
            </div>
          </el-image>
          <span v-else>
            <el-button icon="el-icon-user-solid" circle style="margin-top: 50px" @click="changeAvatar()"></el-button>
          </span>
          <avatar-form @onChange="loadUser()" ref="ava"></avatar-form>
        </div>
        <verify-info ref="verify" @verified="afterVefified"></verify-info>
        <el-button type="success" style="margin-top: 50px" @click="editUser()">修改个人信息</el-button>
        <el-dropdown @command="handleCommand">
          <el-button type="warning">修改验证信息<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="name">修改昵称</el-dropdown-item>
            <el-dropdown-item command="email">修改邮箱</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <user-form @onSubmit="loadUser()" ref="edit"></user-form>
        <name-change @changeName="logout" ref="nameChange"></name-change>
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
        <el-button @click="afterVefified">verified</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserForm from './UserForm'
import AvatarForm from './avatarForm'
import VerifyInfo from './VerifyInfo'
import NameChange from './NameChange'
export default {
  name: 'UserInfo',
  components: {NameChange, VerifyInfo, AvatarForm, UserForm},
  data () {
    return {
      user: {
        // profile_photo: '../static/avatar/16.jpg'
      },
      isVerified: false,
      com: ''
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
    },
    verifyEmail () {
      this.$refs.verify.dialogVisible = true
      this.$refs.verify.email = this.user.email
    },
    handleCommand (command) {
      this.verifyEmail()
      this.com = command
    },
    afterVefified () {
      this.isVerified = true
      console.log(this.isVerified)
      this.com = 'name'
      if (this.com === 'name') {
        console.log('change your name')
        this.$refs.nameChange.dialogVisible = true
        this.$refs.nameChange.username = this.user.username
      }
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
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
