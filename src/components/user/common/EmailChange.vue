<template>
  <div>
    <el-dialog
      title="修改Email"
      :visible.sync="dialogVisible"
      @close="clear">
      <div>
        <el-form>
          <el-form-item label="请输入新的Email">
            <el-input v-model="email" placeholder="email" style="margin-top: 10px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeEmail">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EmailChange',
  data () {
    return {
      dialogVisible: false,
      email: '',
      username: this.$store.state.username
    }
  },
  methods: {
    clear () {
      this.email = ''
    },
    changeEmail () {
      const _this = this
      console.log(_this.email)
      this.$axios
        .post('/changeemail', {
          username: _this.username,
          email: _this.email
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message(resp.data.message)
            this.dialogVisible = false
            this.$emit('changeEmail')
            this.$message({
              type: 'success',
              message: '修改成功'
            })
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
