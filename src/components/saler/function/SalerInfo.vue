<template>
  <div>
    <p class="saler" align="left">id: {{saler.sid}}</p>
    <br>
    <p class="saler" align="left">昵称: {{saler.sname}}</p>
    <br>
    <p class="saler" align="left">电话: {{saler.phone}}</p>
    <br>
    <p class="saler" align="left">邮箱: {{saler.email}}</p>
    <br>
    <p class="saler" align="left">地址: {{saler.address}}</p>
    <br>
    <p class="saler" align="left">银行卡号: {{saler.bank_num}}</p>
    <br>
    <p class="saler" align="left">注册时间: {{saler.register_time}}</p>
    <el-button type="success" style="margin-top: 50px" @click="editSaler()">修改信息</el-button>
    <saler-form @onSubmit="loadSaler()" ref="edit"></saler-form>
  </div>
</template>

<script>
import SalerForm from './SalerForm'
export default {
  name: 'SalerInfo',
  components: {SalerForm},
  data () {
    return {
      saler: []
    }
  },
  methods: {
    loadSaler () {
      const _this = this
      this.$axios.get('/saler/' + _this.$store.state.saler.name + '/info').then(resp => {
        if (resp && resp.status === 200) {
          _this.saler = resp.data
        }
      }).catch(failResponse => {
        _this.$message('加载失败')
      })
    },
    editSaler () {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        phone: this.saler.phone,
        email: this.saler.email,
        address: this.saler.address,
        bank_num: this.saler.bank_num
      }
    }
  },
  mounted () {
    this.loadSaler()
  }
}
</script>

<style scoped>
  .saler {
    font-size: x-large;
    font-family: 华文行楷;
  }
</style>
