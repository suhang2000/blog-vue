<template>
  <body id="paper">
  <el-form ref="regisForm" :model="regisForm" :rules="rules" class="regis-container" label-position="left"
           label-width="0px" v-loading="false">
    <h3 class="regis_title">用户注册</h3>
    <div class="block">
      <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
    </div>
    <el-form-item>
      <el-input type="text" v-model="regisForm.user_id"
                auto-complete="off" placeholder="登录id"></el-input>
    </el-form-item>
    <el-form-item prop="uname">
      <el-input type="text" v-model="regisForm.uname"
                auto-complete="off" placeholder="登录昵称"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="regisForm.password"
                auto-complete="off" placeholder="登录密码"></el-input>
    </el-form-item>
    <el-form-item prop="verifypwd">
      <el-input type="password" v-model="regisForm.verifypwd"
                auto-complete="off" placeholder="再次输入登录密码"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input type="text" v-model="regisForm.phone"
                auto-complete="off" placeholder="电话号码"></el-input>
    </el-form-item>
    <el-radio v-model="regisForm.gender" label="F">男</el-radio>
    <el-radio v-model="regisForm.gender" label="M">女</el-radio>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="validate_register('regisForm')">注册</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="select_by_condition()">查询</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
import {validatePhone, validateEmail} from '../../utils/validate'

export default{
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('再次输入登陆密码！'))
      } else if (value !== this.regisForm.password) {
        callback(new Error('两次密码必须相同！'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        uname: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        verifypwd: [{required: true, validator: validatePassword, trigger: 'blur'}],
        phone: [{required: true, validator: validatePhone, trigger: 'blur'}]
      },
      regisForm: {
        uname: '',
        password: '',
        verifypwd: '',
        phone: '',
        gender: ''
      }
    }
  },
  methods: {
    register () {
      var _this = this
      this.$axios
        .post('/register/user', {
          user_id: '',
          username: this.regisForm.uname,
          user_password: this.regisForm.password,
          phone_number: this.regisForm.phone,
          gender: this.regisForm.gender
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('注册成功', '提示', {
              confirmButtonText: '确定'
            })
            var path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/login' : path})
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {})
    },
    select_by_condition() {
      var _this = this
      this.$axios
        .post('/select/user', {
          user_id: this.regisForm.user_id,
          username: this.regisForm.uname,
          phone_number: this.regisForm.phone,
          gender: this.regisForm.gender
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('select success!', {confirmButtonText: 'OK'})
            console.log(resp.data.data)
          }else {
            this.$alert('select failed!', {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
    },
    validate_register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style>
  .regis-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .regis_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #paper {
    background: url("../../assets/regisBG.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0;
  }
</style>
