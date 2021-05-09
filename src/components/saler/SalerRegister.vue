<template>
  <body id="paper">
  <el-form ref="regisForm" :model="regisForm" :rules="rules" class="regis-container" label-position="left"
           label-width="0px" v-loading="false">
    <h3 class="regis_title">商家注册</h3>
    <!--使用Prop在父组件内向子组件传递参数!!!prop应为此界面具有的子组件-->
    <el-form-item prop="sname">
      <el-input type="text" v-model="regisForm.sname"
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
    <el-form-item prop="bank_num">
      <el-input type="text" v-model="regisForm.bank_num"
                auto-complete="off" placeholder="银行卡号"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input type="text" v-model="regisForm.email"
                auto-complete="off" placeholder="邮箱（选填）"></el-input>
    </el-form-item>
    <el-form-item prop="address">
      <el-input type="text" v-model="regisForm.address"
                auto-complete="off" placeholder="地址（选填）"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="validate_register('regisForm')">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
import {validatePhone} from '../../utils/validate'
import {validateEmail} from '../../utils/validate'
import {validateBanknum} from '../../utils/validate'

export default{
  data () {
    const validatePassword =(rule, value, callback) =>{
      if (value === "") {
        callback(new Error("再次输入登陆密码！"));
      } else if (value !== this.regisForm.password) {
        callback(new Error("两次密码必须相同！"));
      } else {
        callback();
      }
    }
    return {
      rules: {
        sname: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        verifypwd: [{required: true, validator: validatePassword,trigger: 'blur'}],
        phone: [{required: true, validator: validatePhone, trigger: 'blur'}],
        bank_num: [{required: true, validator: validateBanknum, trigger: 'blur'}],
        email: [{required: true, validator: validateEmail, trigger: 'blur'}]
      },
      regisForm: {
        sname: '',
        password: '',
        verifypwd:'',
        phone: '',
        bank_num: '',
        email: '',
        address: '',
      },
    }
  },
  methods: {
    register () {
      var _this = this
      this.$axios
        .post('/register/saler', {
          sname: this.regisForm.sname,
          password: this.regisForm.password,
          phone: this.regisForm.phone,
          bank_num: this.regisForm.bank_num,
          email: this.regisForm.email,
          address: this.regisForm.address,
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
    validate_register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
