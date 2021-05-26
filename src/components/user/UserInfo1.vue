<template >
  <div>
  <div class="front">
      <el-card style lang="scss" class="box-card  "  >
  <div slot="header" class="clearfix" >
    <span style="font-size:20px">这是{{datas.username}}的个人信息</span>
  </div>
  <div class="text item"><i class="el-icon-user-solid"></i> <el-divider direction="vertical"></el-divider>
  用户昵称：{{datas.username}}<el-button style="padding:12px" size = "small" type="info" round  @click="open">修改</el-button><el-divider direction="vertical"></el-divider>
    <i class="el-icon-s-check"></i> <el-divider direction="vertical"></el-divider>
  用户性别：{{datas.genderch}} <el-button style="padding:12px" size = "small" type="info" round  @click="dialogFormVisible1 = true">修改</el-button>
    <el-dialog title="修改性别" :visible.sync="dialogFormVisible1" :append-to-body="true" width="530px">
      <el-radio v-model="radio" label="M" >男</el-radio>
      <el-radio v-model="radio" label="F">女</el-radio>

      <div slot="footer" class="dialog-footer">
    <el-button @click="open1" size = "small" type="info" round>提交</el-button>
    <el-button @click="dialogFormVisible1 = false" size = "small" type="info" round>取消</el-button>
  </div>
    </el-dialog>
  </div>
  <div class="text item"><i class="el-icon-phone"></i> <el-divider direction="vertical"></el-divider>
  用户电话：{{datas.phone_number}}  <el-button style="padding:12px" size = "small" type="info" round  @click="dialogFormVisible2 = true">修改</el-button>
    <el-dialog title="修改电话" :visible.sync="dialogFormVisible2" :append-to-body="true" width="530px">
      <el-form ref="regisForm" :model="regisForm" :rules="rules" class="regis-container" label-position="left"
           label-width="0px" v-loading="false">
        <el-form-item prop="phone_number">
      <el-input type="text" v-model="regisForm.phone_number"
                auto-complete="off" placeholder="电话号码"></el-input>
    </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
    <el-button @click="open2" size = "small" type="info" round>提交</el-button>
    <el-button @click="dialogFormVisible2 = false" size = "small" type="info" round>取消</el-button>
  </div>
    </el-dialog>

    <el-divider direction="vertical"></el-divider>
    <i class="el-icon-lock"></i> <el-divider direction="vertical"></el-divider>
  用户密码：****** <el-button style="padding:12px" size = "small" type="info" round  @click="dialogFormVisible = true">修改</el-button>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :append-to-body="true" width="530px">
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
    <el-button @click="dialogFormVisible = false;submitForm('ruleForm')" size = "small" type="info" round>提交</el-button>
    <el-button @click="resetForm('ruleForm')" size = "small" type="info" round>重置</el-button>
  </div>
</el-dialog>

  </div>
  <div class="text item"><i class="el-icon-picture"></i> <el-divider direction="vertical"></el-divider>用户头像：
  <div class="demo-image">
  <div class="block" v-for="fit in fits" :key="fit">
    <span class="demonstration"></span>
    <el-image
      style="width: 100px; height: 100px"
      :src="getImgUrl(datas.profile_photo)"
      :fit="fit"></el-image>
</div>
 </div>
<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-change="handleChange"
  :file-list="fileList">
  <el-button size="small" type="info" round>修改</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </div>
</el-card>
    </div>
    </div>
</template>

<script>
import {validatePhone} from '../../utils/validate'
export default {
  name: 'UserInfo',
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
      radio: '',
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      formLabelWidth: '120px',
      fileList: {name: '', url: ''},
      from: {
        gender2: ''
      },
      datas: {
        username: '',
        gender: '',
        genderch: '',
        phone_number: '',
        profile_photo: ''
      },
      fits: ['fill'],
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
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone_number: [{required: true, validator: validatePhone, trigger: 'blur'}]
      },
      regisForm: {
        phone_number: ''
      },
      currentDate: new Date()
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
          _this.datas.gender = resp.data.data[0].gender
          if (_this.datas.gender === 'F') {
            _this.datas.genderch = '女'
            _this.datas.phone_number = resp.data.data[0].phone_number
            _this.datas.profile_photo = resp.data.data[0].profile_photo
            _this.datas.user_password = resp.data.data[0].user_password
            console.log(_this.datas.username)
          }
          if (_this.datas.gender === 'M') {
            _this.datas.genderch = '男'
            _this.datas.phone_number = resp.data.data[0].phone_number
            _this.datas.profile_photo = resp.data.data[0].profile_photo
            _this.datas.user_password = resp.data.data[0].user_password
            console.log(_this.datas.username)
          }
        } else {
        }
      })
      .catch(failResponse => {
        this.$message('服务器异常')
      })
  },
  methods: {

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.oldpass !== this.datas.user_password) {
            this.$message({
              type: 'warning',
              message: '验证旧密码失败'
            })
          } else if (this.ruleForm.oldpass === this.datas.user_password) {
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
    },
    // getImgUrl (src) {
    //   return require('@/assets/avatar/' + src)
    // },
    handleChange (file, fileList) {
      const _this = this
      this.fileList = fileList
      console.log(file)
      this.datas.profile_photo = URL.createObjectURL(file.raw)
      console.log(this.datas.profile_photo)
      this.$axios.get('/changephoto', {
        params: {
          photo: file.name,
          username: this.$store.state.username
        }
      })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.datas.profile_photo = resp.data.data[0].profile_photo
            _this.$router.replace('/home/UserInfo1')
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
    },
    handleClick (row) {
      console.log(row)
    },

    open () {
      const _this = this
      this.$prompt('请输入新的昵称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (!value) {
          this.$message({
            type: 'info',
            message: '昵称不能为空'
          })
        } else if (value) {
          this.$axios.get('/changeusername', {
            params: {
              value: value,
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
                _this.$router.replace('/login')
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    open1 () {
      const _this = this
      this.$axios.get('/changegender', {
        params: {
          value: this.radio,
          username: this.$store.state.username
        }
      })
        .then(resp => {
          if (resp.data.code === 200) {
            if (resp.data.data[0].gender === 'F') {
              _this.datas.gender = resp.data.data[0].gender
              _this.datas.genderch = '女'
              _this.dialogFormVisible1 = false
              _this.$router.replace('/home/UserInfo1')
              this.$message({
                type: 'success',
                message: resp.data.message
              })
            }
            if (resp.data.data[0].gender === 'M') {
              _this.datas.gender = resp.data.data[0].gender
              _this.datas.genderch = '男'
              _this.dialogFormVisible1 = false
              _this.$router.replace('/home/UserInfo1')
              this.$message({
                type: 'success',
                message: resp.data.message
              })
            }
          } else {
          }
        })
        .catch(failResponse => {
          this.$message({
            type: 'warning',
            message: '请输入“F”或“M”'
          })
        })
    },
    open2 () {
      const _this = this
      this.$axios.get('/changenum', {
        params: {
          value: this.regisForm.phone_number,
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
            _this.datas.phone_number = resp.data.data[0].phone_number
            _this.dialogFormVisible2 = false
            _this.$router.replace('/home/UserInfo1')
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
  },
  extent (list) {
    var height = 50 * list.length
    return `height: ${height}px; line-height: ${height}px;`
  }
}
</script>

<style>
 .bg-purple-light {
    background: #e5e9f2;
  }
  .text {
    font-size: 18px;
  }

  .item {
    margin-bottom: 50px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    min-width: 380px;
    margin-right: 0px;
    margin-top: 0%;
    height: 580px;
    width: 1500px;
    background: transparent !important;

  }

.background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}

.front{
    z-index:1;
    position: absolute;

}

</style>
