<template>
    <body id="paper">
  <el-form ref="fixInfo" :model="fixInfo" :rules="rules" class="regis-container" v-loading="false">
    <h3 class="regis_title">正在修改Id为{{ userInfo.user_id }}的用户</h3>
    <div class="block" style="margin-bottom: 20px">
      <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
    </div>
<!--    <el-form-item prop="username">-->
<!--      <el-input type="text" v-model="fixInfo.username"-->
<!--                auto-complete="off" :placeholder="userInfo.username"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item prop="phone" label="电话号码">
      <el-input type="text" v-model="fixInfo.phone"
                auto-complete="off" :placeholder="userInfo.phone"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="fixInfo.gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
<!--    <el-radio v-model="fixInfo.gender" label="M">男</el-radio>-->
<!--    <el-radio v-model="fixInfo.gender" label="F">女</el-radio>-->
<!--        <el-select v-model="fixInfo.gender" placeholder="请选择性别">-->
<!--          <el-option label="男" value="男"></el-option>-->
<!--          <el-option label="女" value="女"></el-option>-->
<!--        </el-select>-->
    <el-form-item style="width: 100%; margin-top: 20px">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="$router.back(-1)">返回</el-button>
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="user_fix('fixInfo')">修改</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
import {validatePhone} from '../../utils/validate'
export default {
  name: 'Fixuser',
  data () {
    return {
      rules: {
        // username: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        phone: [{required: false, validator: validatePhone, trigger: 'blur'}]
      },
      userInfo: {
        user_id: '',
        username: '',
        phone: '',
        gender: ''
      },
      fixInfo: {
        user_id: '',
        username: '',
        phone: '',
        gender: ''
      }
    }
  },
  created () {
    const temp = this.$route.query.data
    this.userInfo.user_id = temp.user_id
    this.userInfo.username = temp.username
    this.userInfo.phone = temp.phone_number
    this.userInfo.gender = temp.gender
    this.fixInfo.user_id = temp.user_id
  },
  methods: {
    user_fix (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/fix/user', {
            user_id: this.userInfo.user_id,
            // username: this.userInfo.username,
            phone_number: this.fixInfo.phone,
            gender: this.fixInfo.gender
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$alert(resp.data.message, {confirmButtonText: 'OK'})
              this.$router.push({path: '/admin/Selectuser'})
            } else {
              this.$alert('fix failed!', {confirmButtonText: 'OK'})
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
