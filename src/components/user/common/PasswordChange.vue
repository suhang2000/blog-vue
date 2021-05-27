<template>
  <div>
        <el-dialog title="修改密码" :visible.sync="dialogVisible" :append-to-body="true" width="530px">
      <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
        <el-form-item  label="旧密码" prop="oldpass">
    <i class="el-icon-lock"></i><el-input style="background-color: transparent"  type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item  label="密码" prop="pass">
    <i class="el-icon-lock"></i><el-input style="background-color: transparent"  type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item label="确认密码" prop="checkPass">
    <i class="el-icon-lock"></i><el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
</el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="submitForm('ruleForm')" size = "small" type="info" round>提交</el-button>
    <el-button @click="resetForm('ruleForm')" size = "small" type="info" round>重置</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PasswordChange',
  data () {
    var validatePass0 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      password: '',
      ruleForm: {
        oldpass: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        oldpass: [
          { validator: validatePass0, trigger: 'blur' }
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  created: function () {
    const _this = this
    this.$axios.get('/userInfo_select', {
      params: {
        username: this.$store.state.username
      }
    })
      .then(resp => {
        if (resp.data.code === 200) {
          _this.password = resp.data.data[0].user_password
        } else {
        }
      })
      .catch(failResponse => {
        this.$message('服务器异常')
      })
  },
  methods: {
    clear () {
      this.password = ''
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.oldpass !== this.password) {
            this.$message({
              type: 'warning',
              message: '验证旧密码失败'
            })
          } else if (this.ruleForm.oldpass === this.password) {
            this.$axios.get('/changepsd', {
              params: {
                value: this.ruleForm.pass,
                username: this.$store.state.username
              }
            })
              .then(resp => {
                if (resp.data.code === 400) {
                  this.$message({
                    type: 'warning',
                    message: resp.data.message
                  })
                }
                if (resp.data.code === 200) {
                  this.dialogVisible = false
                  this.$router.replace('/login')
                  this.$message({
                    type: 'success',
                    message: resp.data.message
                  })
                } else {
                }
              })
              .catch(failResponse => {
                this.$message('服务器异常')
              })
          } else {
            console.log('error submit!!')
            return false
          }
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
