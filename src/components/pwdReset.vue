<template>
  <body id="poster">
  <el-form ref="resetForm" :model="resetForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">重置密码</h3>
    <el-form-item prop="name">
      <el-input type="text" v-model="resetForm.name"
                auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input type="text" v-model="resetForm.phone"
                auto-complete="off" placeholder="电话号码"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="resetForm.password"
                auto-complete="off" placeholder="新密码" show-password></el-input>
    </el-form-item>
    <el-form-item prop="verifypwd">
      <el-input type="password" v-model="resetForm.verifypwd"
                auto-complete="off" placeholder="再次输入新密码" show-password></el-input>
    </el-form-item>
    <el-row>
      <el-button type="primary" class="el-icon-user-solid" style="width: 25%;background: #505458;border: none" @click="validate_user_reset('resetForm')">用户</el-button>
      <el-button type="primary" class="el-icon-s-shop" style="width: 25%;background: #505458;border: none" @click="validate_saler_reset('resetForm')">商家</el-button>
    </el-row>
  </el-form>
  </body>
</template>

<script>
import {validatePhone} from '../utils/validate'

export default {
  name: 'reset',
  data () {
    const validatePassword =(rule, value, callback) =>{
      if (value === "") {
        callback(new Error("再次输入登陆密码！"));
      } else if (value !== this.resetForm.password) {
        callback(new Error("两次密码必须相同！"));
      } else {
        callback();
      }
    }
    return {
      rules: {
        name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
        phone: [{required: true, validator: validatePhone, trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        verifypwd: [{required: true, validator: validatePassword, trigger: 'blur'}]
      },
      resetForm: {
        name: '',
        phone: '',
        password: '',
        verifypwd: ''
      },
      loading: false
    }
  },
  methods: {
    user_reset () {
      var _this = this
      this.$axios
        .post('/pwdreset/user', {
          uname: this.resetForm.name,
          phone: this.resetForm.phone,
          password: this.resetForm.password
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('修改成功', '提示', {
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
    saler_reset () {
      var _this = this
      this.$axios
        .post('/pwdreset/saler', {
          sname: this.resetForm.name,
          phone: this.resetForm.phone,
          password: this.resetForm.password
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('修改成功', '提示', {
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
    validate_user_reset(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.user_reset()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    validate_saler_reset(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saler_reset()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
    background: url("../assets/loginBG.jpeg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0;
  }
</style>
