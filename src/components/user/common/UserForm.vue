<template>
  <div>
<!--    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>-->
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
<!--        <el-form-item label="昵称" :label-width="formLabelWidth" prop="uname">-->
<!--          <el-input v-model="form.uname" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth" prop="icon">
          <el-input v-model="form.icon" autocomplete="off" placeholder="图片 URL"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
          <div class="block">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
<!--        <el-form-item prop="bookid" style="height: 0">-->
<!--          <el-input type="hidden" v-model="form.bookid" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {validateEmail, validatePhone} from '../../../utils/validate'

export default {
  name: 'UserForm',
  data () {
    return {
      rules: {
        // uname: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        // phone: [{required: true, validator: validatePhone, trigger: 'blur'}],
        // email: [{required: true, validator: validateEmail, trigger: 'blur'}]
      },
      dialogFormVisible: false,
      form: {
        // uname: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
        birthday: '',
        icon: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.form = {
        // uname: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
        birthday: '',
        icon: ''
      }
    },
    onSubmit () {
      console.log(this.form)
      const _this = this
      this.$axios
        .post('/home/user/info', {
          uname: _this.$store.state.user.name,
          password: 'password',
          phone: this.form.phone,
          email: this.form.email,
          address: this.form.address,
          gender: this.form.gender,
          birthday: this.form.birthday,
          icon: this.form.icon
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
    },
    validate_info (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit()
        } else {
          _this.$message('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
