<template>
  <body>
  <el-form ref="resetForm" :model="resetForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">修改密码</h3>
    <el-form-item prop="oldpwd">
      <el-input type="password" v-model="resetForm.oldpwd"
                auto-complete="off" placeholder="初始密码"></el-input>
    </el-form-item>
    <el-form-item prop="newpwd">
      <el-input type="password" v-model="resetForm.newpwd"
                auto-complete="off" placeholder="新密码" show-password></el-input>
    </el-form-item>
    <el-form-item prop="verifypwd">
      <el-input type="password" v-model="resetForm.verifypwd"
                auto-complete="off" placeholder="再次输入新密码" show-password></el-input>
    </el-form-item>
    <el-row>
      <el-button type="primary" class="el-icon-setting" style="width: 25%;background: #505458;border: none" @click="validate_admin_reset('resetForm')">修改</el-button>
    </el-row>
  </el-form>
  </body>
</template>

<script>
import {validateAdminOldPwd} from '../../../utils/validate'

export default {
  name: 'reset',
  data () {
    const validatePassword =(rule, value, callback) =>{
      if (value === "") {
        callback(new Error("再次输入登陆密码！"));
      } else if (value !== this.resetForm.newpwd) {
        callback(new Error("两次密码必须相同！"));
      } else {
        callback();
      }
    }
    return {
      rules: {
        oldpwd: [{required: true, validator: validateAdminOldPwd, trigger: 'blur'}],
        newpwd: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        verifypwd: [{required: true, validator: validatePassword, trigger: 'blur'}]
      },
      resetForm: {
        oldpwd: '',
        newpwd: '',
        verifypwd: ''
      },
      loading: false
    }
  },
  methods: {
    admin_reset () {
      var _this = this
      this.$axios
        .post('/pwdreset/admin', {
          aname: this.$store.state.admin.name,
          password: this.resetForm.newpwd
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message('成功修改密码')
            const path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/admin/admininfo' : path})
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
    validate_admin_reset(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.admin_reset()
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
  body{
    margin: 0;
  }
</style>
