<template>
  <div>
    <el-dialog
      title="商品信息"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="商品名" :label-width="formLabelWidth" prop="pname">
          <el-input v-model="form.pname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth" prop="number">
          <el-input v-model.number="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
          <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>
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
  name: 'ProductForm',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        pname: '',
        price: '',
        number: '',
        description: '',
        cover: ''
      },
      formLabelWidth: '120px',
      pid: '',
      sid: 0
    }
  },
  methods: {
    clear () {
      this.form = {
        pname: '',
        price: '',
        number: '',
        description: '',
        cover: ''
      }
      this.pid = ''
      this.sid = 0
    },
    onSubmit () {
      console.log(this.form)
      console.log(this.pid)
      // const _this = this
      this.$axios
        .post('/home/product/info', {
          pid: this.pid,
          sid: this.sid,
          pname: this.form.pname,
          price: this.form.price,
          number: this.form.number,
          description: this.form.description,
          cover: this.form.cover
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
