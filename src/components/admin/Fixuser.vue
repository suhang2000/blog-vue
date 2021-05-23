<template>
    <body id="paper">
  <el-form ref="fixInfo" :model="fixInfo" :rules="rules" class="regis-container" label-position="left"
           label-width="0px" v-loading="false">
    <h3 class="regis_title">正在修改用户的Id为：{{ userInfo.user_id }}</h3>
    <div class="block">
      <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
    </div>
    <el-form-item prop="username">
      <el-input type="text" v-model="fixInfo.username"
                auto-complete="off" :placeholder="userInfo.username"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input type="text" v-model="fixInfo.phone"
                auto-complete="off" :placeholder="userInfo.phone"></el-input>
    </el-form-item>
    <el-radio v-model="fixInfo.gender" label="M">男</el-radio>
    <el-radio v-model="fixInfo.gender" label="F">女</el-radio>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="user_fix('fixInfo')">修改</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
  import {validatePhone, validateEmail} from '../../utils/validate'
    export default {
        name: "Fixuser",
        data() {
            return {
                rules: {
                    username: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
                    phone: [{required: true, validator: validatePhone, trigger: 'blur'}]
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
        created() {
            var temp = this.$route.query.data;
            this.userInfo.user_id = temp.user_id;
            this.userInfo.username = temp.username;
            this.userInfo.phone = temp.phone_number;
            this.userInfo.gender = temp.gender;
            this.fixInfo.user_id = temp.user_id;
        },
        methods: {
            user_fix(formName){this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('success')
            this.$axios.post('/fix/user', {
                user_id: this.userInfo.user_id,
                username: this.fixInfo.username,
                phone_number: this.fixInfo.phone,
                gender: this.fixInfo.gender
            }).then(resp => {
          if (resp.data.code === 200) {
            this.$alert(resp.data.message, {confirmButtonText: 'OK'});
            this.$router.push({path: "/admin/Selectuser"});
          }else {
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
