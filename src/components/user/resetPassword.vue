<template>
  <body id="poster">
  <el-form ref="resetForm" :model="resetForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">重置密码</h3>
    <el-form-item prop="email">
      <el-input type="text" v-model="resetForm.email" maxlength="40"
                auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-row>
      <el-button type="primary" style="width: 25%;background: #505458;border: none" @click="$router.back(-1)">返回</el-button>
      <el-button type="primary" class="el-icos-n-user-solid" style="width: 25%;background: #505458;border: none" @click="validate_user_reset('resetForm')">发送邮件</el-button>
    </el-row>
  </el-form>
  </body>
</template>

<script>
import {validateEmail} from '../../utils/validate'
export default {
  data () {
    return {
      rules: {
        email: [{required: true, validator: validateEmail, trigger: 'blur'}]
      },
      resetForm: {
        email: ''
      },
      loading: false
    }
  },
  methods: {
    user_reset () {
      var _this = this
      this.$axios
        .post('/sendEmail/', {
          email: this.resetForm.email
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
            const path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/login' : path})
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
    validate_user_reset (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.user_reset()
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
    background: url("../../assets/loginBG.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0;
  }
</style>
