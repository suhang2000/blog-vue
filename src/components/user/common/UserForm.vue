<template>
  <div>
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" :rules="rules"style="text-align: left" ref="form">
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone_number">
          <el-input v-model="form.phone_number" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">-->
<!--          <el-input v-model="form.email" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {validatePhone} from '../../../utils/validate'

export default {
  name: 'UserForm',
  data () {
    return {
      rules: {
        // uname: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        phone_number: [{required: true, validator: validatePhone, trigger: 'blur'}]
        // email: [{required: true, validator: validateEmail, trigger: 'blur'}]
      },
      dialogFormVisible: false,
      form: {
        // uname: '',
        phone_number: '',
        // email: '',
        gender: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.form = {
        phone_number: '',
        // email: '',
        gender: ''
      }
    },
    onSubmit () {
      console.log(this.form)
      const _this = this
      this.$axios
        .post('/home/user/info', {
          username: _this.$store.state.username,
          phone_number: this.form.phone_number,
          // email: this.form.email,
          gender: this.form.gender
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
            this.$message({
              type: 'success',
              message: '修改成功'
            })
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
