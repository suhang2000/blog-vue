<template>
  <div>
  <div class="background">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
  </div>
  <div class="front">

     <span></span>
     <el-divider></el-divider>
    <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" label-width="500px" class="demo-ruleForm">
      <el-form-item  label="旧密码" prop="oldpass">
    <el-input style="background-color: transparent"  type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input><i class="el-icon-lock"></i>
  </el-form-item>
      <el-divider></el-divider>
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
       imgSrc:require('../../assets/avatar/info_bg1.jpg'),
      activeNames: ['1'],
      datas: {
        username: '',
        user_password:''
      },
      ruleForm: {
        oldpass:'',
        pass: '',
        checkPass: '',
      },
      rules: {
         oldpass: [
          { validator: validatePass0, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
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
          if(this.ruleForm.oldpass!=this.datas.user_password){
            this.$message({
                  type: 'warning',
                  message: '验证旧密码失败'
                })

          }
          else if(this.ruleForm.oldpass==this.datas.user_password){
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
          }

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
          _this.datas.user_password = resp.data.data[0].user_password
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
