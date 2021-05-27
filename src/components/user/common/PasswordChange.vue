<template>
  <div>
        <el-dialog title="修改密码" :visible.sync="dialogVisible" :append-to-body="true" width="530px">
      <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
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
  name: "PasswordChange.vue",
  data() {
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
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    clear() {
      this.password = ''
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
                  this.dialogVisible = false;
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
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
  }
}
</script>

<style scoped>

</style>
