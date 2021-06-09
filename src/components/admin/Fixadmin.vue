<template>
    <body id="paper">
  <el-form ref="fixInfo" :model="fixInfo" :rules="rules" class="regis-container" label-position="left"
           label-width="0px" v-loading="false">
    <h3 class="regis_title">你的Id为：{{ userInfo.user_id }}</h3>
<!--    <div class="block">-->
<!--      <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>-->
<!--    </div>-->
    <el-form-item prop="username">
      <el-input type="text" v-model="fixInfo.username"
                auto-complete="off" :placeholder="userInfo.username"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input type="text" v-model="fixInfo.phone" prop="phone"
                auto-complete="off" :placeholder="userInfo.phone"></el-input>
    </el-form-item>
    <el-form-item prop="old_password">
      <el-input type="password" v-model="fixInfo.old_password"
                auto-complete="off" placeholder="旧密码" show-password></el-input>
    </el-form-item>
    <el-form-item prop="user_password">
      <el-input type="password" v-model="fixInfo.password"
                auto-complete="off" placeholder="新密码" show-password></el-input>
    </el-form-item>
    <el-form-item prop="verifypwd">
      <el-input type="password" v-model="fixInfo.verifypwd"
                auto-complete="off" placeholder="确认密码" show-password></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="$router.back(-1)">返回</el-button>
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="admin_fix('fixInfo')">修改</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
import {validatePhone} from '../../utils/validate'
export default {
  name: 'Fixadmin',
  data () {
    const validatePassword = (rule, value, callback) => {
      if (this.fixInfo.password !== value && this.fixInfo.old_password !== '') {
        callback(new Error('两次密码必须相同！'))
      } else if (value === '' && this.fixInfo.password === '' && this.fixInfo.old_password !== '') {
        callback(new Error('请输入新密码及确认'))
      // } else if (value === this.fixInfo.password && this.fixInfo.old_password === value) {
      //   callback(new Error('新密码与原密码不得相同'))
      } else {
        callback()
      }
    }
    const validateOldPwd = (rule, value, callback) => {
      if (value !== this.userInfo.password && value !== '') {
        callback(new Error('旧密码错误'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        username: [{required: false, message: '姓名不能为空', trigger: 'blur'}],
        user_password: [{required: false, message: '', trigger: 'blur'}],
        old_password: [{required: false, validator: validateOldPwd, trigger: 'blur'}],
        verifypwd: [{required: false, validator: validatePassword, trigger: 'blur'}],
        phone: [{required: false, validator: validatePhone, trigger: 'blur'}]
      },
      userInfo: {
        user_id: '',
        username: '',
        password: '',
        phone: '',
        official_name: ''
      },
      fixInfo: {
        user_id: '',
        username: '',
        password: '',
        phone: '',
        official_name: '',
        old_password: '',
        verifypwd: ''
      }
    }
  },
  created () {
    this.userInfo.user_id = this.$store.state.adminid
    this.$axios.get('/select/admin', {params: {admin_id: this.userInfo.user_id}}).then(resp => {
      if (resp.data.code === 200) {
        // this.$alert(resp.data.message, {confirmButtonText: 'OK'});
        // console.log(resp.data.data);
        var temp = resp.data.data
        this.userInfo.username = temp[0].adminname
        this.userInfo.password = temp[0].admin_password
        this.userInfo.phone = temp[0].phone_number
        this.userInfo.official_name = temp[0].official_name
      } else {
        this.alert('select faild!')
      }
    }).catch(failResponse => {})
  },
  methods: {
    admin_fix (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.fixInfo.password != '') {
          }
          this.$axios.post('/fix/admin', {
            admin_id: this.userInfo.user_id,
            adminname: this.fixInfo.username,
            phone_number: this.fixInfo.phone,
            admin_password: this.fixInfo.password
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$alert(resp.data.message, {confirmButtonText: 'OK'})
              this.$router.push({path: '/login'})
            } else {
              this.$alert(resp.data.message, {confirmButtonText: 'OK'})
            }
          })
            .catch(failResponse => {})
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
.regis-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 10% 25%;
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
    /*background: url("../../assets/regisBG.jpg") no-repeat center;*/
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0;
  }
</style>
