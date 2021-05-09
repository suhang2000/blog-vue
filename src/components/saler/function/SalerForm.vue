<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" :label-width="formLabelWidth" prop="bank_num">
          <el-input v-model="form.bank_num" autocomplete="off"></el-input>
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
export default {
  name: 'SalerForm',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        phone: '',
        email: '',
        address: '',
        bank_num: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.form = {
        phone: '',
        email: '',
        address: '',
        bank_num: ''
      }
    },
    onSubmit () {
      console.log(this.form)
      const _this = this
      this.$axios
        .post('/saler/info', {
          sname: _this.$store.state.saler.name,
          password: 'password',
          phone: this.form.phone,
          email: this.form.email,
          address: this.form.address,
          bank_num: this.form.bank_num
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
