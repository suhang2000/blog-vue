<template>
  <div>
    <el-dialog
      title="修改昵称"
      :visible.sync="dialogVisible"
      @close="clear">
      <div>
        <el-form>
          <el-form-item label="请输入新的昵称">
            <el-input v-model="username" placeholder="username" style="margin-top: 10px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeName">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NameChange',
  data () {
    return {
      dialogVisible: false,
      username: '',
      username_ori: this.$store.state.username
    }
  },
  methods: {
    clear () {
      this.username = ''
    },
    changeName () {
      const _this = this
      this.$axios
        .post('/changename', {
          username: _this.username_ori,
          username_new: _this.username
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message(resp.data.message)
            this.dialogVisible = false
            this.$emit('changeName')

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
