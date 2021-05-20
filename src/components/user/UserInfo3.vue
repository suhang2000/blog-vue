<template>
  <div>
  <div class="background">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
  </div>
  <div class="front">

     <span></span>
     <el-divider></el-divider>
    <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" label-width="500px" class="demo-ruleForm">
  <el-form-item  label="密码" prop="pass">
    <el-input style="background-color: transparent"  type="password" v-model="ruleForm.pass" autocomplete="off"></el-input><i class="el-icon-lock"></i>
  </el-form-item>
      <el-divider></el-divider>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input><i class="el-icon-lock"></i>
  </el-form-item>
  <el-form-item>
    <el-button  @click="submitForm('ruleForm')"size = "small" type="info" round>提交</el-button>
    <el-button @click="resetForm('ruleForm')"size = "small" type="info" round>重置</el-button>
  </el-form-item>
</el-form>
    </div>
    </div>

</template>

<script>
export default {
  name: 'UserInfo3.vue',
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
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
       imgSrc:require('../../assets/user/info_bg1.jpg'),
      activeNames: ['1'],
      datas: {
        username: ''
      },
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
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
          _this.datas.username = resp.data.data[0].username
          console.log(_this.datas.username)
        } else {
        }
      })
      .catch(failResponse => {
        this.$message('服务器异常')
      })
  }
}

</script>

<style >
.background{
    width:80%;
    height:80%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}

.front{
    z-index:1;
    position: absolute;

}

</style>
