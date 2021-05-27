<template>
  <div>
    <el-dialog
      title="邮箱验证"
      :visible.sync="dialogVisible"
      @close="clear">
      <div>
        <el-form ref="codeForm">
          <el-form-item label="请输入邮箱验证码：" prop="code">
            <el-input v-model="codeForm.code" placeholder="邮箱验证码" maxlength="6" style="margin-top: 10px"></el-input>
            <el-button type="primary" plain @click="sendEmail" style="margin-top: 20px; float: left">发送验证码至{{email}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onVerify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'VerifyInfo',
  data () {
    return {
      dialogVisible: false,
      verified: false,
      codeForm: {
        code: ''
      },
      email: ''
    }
  },
  methods: {
    clear () {
      this.codeForm.code = ''
    },
    onVerify () {
      console.log(this.codeForm.code)
      const _this = this
      this.$axios
        .post('/verifycode', {
          email: _this.email,
          code: _this.codeForm.code
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message(resp.data.message)
            this.dialogVisible = false
            this.$emit('verified')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
          this.$message('服务器异常')
        })
      // this.dialogVisible = false
      // this.$emit('verified')
    },
    sendEmail () {
      console.log('sending email...')
      const _this = this
      this.$axios
        .post('/sendcode', {
          email: _this.email
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message(resp.data.message)
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
          this.$message('服务器异常')
        })
    }
  }
}
</script>

<style scoped>

</style>
