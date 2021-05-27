<template>
  <body id="poster">
  <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">登录</h3>
    <el-form-item prop="name">
      <el-input type="text" v-model="loginForm.name" maxlength="16"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="user_password">
      <el-input type="password" v-model="loginForm.user_password" maxlength="16"
                auto-complete="off" placeholder="密码" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="el-icon-user-solid" style="width: 25%;background: #505458;border: none" @click="validate_user_login('loginForm')">用户</el-button>
      <el-button type="primary" class="el-icon-setting" style="width: 25%;background: #505458;border: none" @click="validate_admin_login('loginForm')">管理员</el-button>
    </el-form-item>
    <el-form-item>
      <el-link :underline="false" href="http://localhost:8080/#/register/user" icon="el-icon-user-solid" type="primary">注册成为用户</el-link>
    </el-form-item>
    <el-link :underline="false" href="http://localhost:8080/#/resetPassword" icon="el-icon-s-help" type="warning">忘记密码或用户名？</el-link>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      rules: {
        name: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        user_password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      loginForm: {
        name: '',
        user_password: ''
      },
      loading: false
    }
  },
  activated: function () {
    this.getCase()
  },
  methods: {
    user_login () {
      const _this = this
      this.$axios
        .post('/login/user', {
          username: this.loginForm.name,
          user_password: this.loginForm.user_password
        })
        .then(resp => {
          console.log(resp)
          if (resp.data.code === 200) {
            _this.$store.commit('loginUser', _this.loginForm.name)
            const path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/home/myblog' : path})
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
          this.$message('服务器异常')
        })
    },
    admin_login () {
      const _this = this
      this.$axios
        .post('/login/admin', {
          admin_id: this.loginForm.name,
          admin_password: this.loginForm.user_password
        })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.$store.commit('loginAdmin', _this.loginForm.name)
            const path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/admin' : path})
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
          this.$message('服务器异常')
        })
    },
    validate_user_login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.user_login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    validate_admin_login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用自己的方法要加括号
          this.admin_login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #poster {
    background: url("../assets/loginBG.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0;
  }
</style>
