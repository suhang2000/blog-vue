<template>
  <div>
    <p style="font-size: xx-large;font-family: Arial">订单信息</p>
    <el-container>
      <el-select v-model="value" placeholder="请选择" style="width: 120px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-row :gutter="20">
        <el-col :span="20">
          <el-input placeholder="请输入内容" type="text" auto-complete="off"
                    v-model="input" clearable @clear="clearInput">

            <el-button slot="append" icon="el-icon-search"
                       @click="showPartialOrders">
            </el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-container>
    <el-table
      ref="multipleTable"
      :data="orders"
      tooltip-effect="dark"
      style="width: 100%"
      border stripe>

      <el-table-column
        label="订单号"
        width="100"
        prop ="0"
        sortable :sort-orders="['ascending', 'descending']"
      >
      </el-table-column>>
      <el-table-column
        label="商品名"
        prop ="1">
      </el-table-column>
      <el-table-column
        label="下单时间"
        prop="2"
        sortable :sort-orders="['ascending', 'descending']">
      </el-table-column>
      <el-table-column
        label="下单数量"
        prop = "3"
        sortable :sort-orders="['ascending', 'descending']">
      </el-table-column>
      <el-table-column
        label="买家地址"
        prop = "4"
      >
      </el-table-column>
      <el-table-column
        label="支付状态"
        prop="5">
      </el-table-column>
      <el-table-column
        label="发货状态"
        prop = "6"
      >
      </el-table-column>

      <el-table-column
        label="买家"
        prop = "7"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row[5] =='已付款' && scope.row[6] == '未发货'" type = "primary" size = "mini" @click="deliver(scope.row)">
            发货
          </el-button>
        </template>

      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      orders: [],
      order: {
        pname: '苹果',
        oid: 0,
        uid: 0,
        pid: 0,
        trade_time: 2000 - 1 - 1,
        trade_num: 0,
        address: '北京市',
        pay_or_not: 0,
        deliver_or_not: 0
      },
      options: [{
        value: '搜索商品',
        label: '搜索商品'
      }, {
        value: '搜索用户',
        label: '搜索用户'
      }],
      value: '',
      input: '',
      oper: '/searchBy/sname',
    }
  },
  created () {
    this.showAllOrders()
  },
  methods: {
    // 分页式展示商品信息

    async showAllOrders () {
      const _this = this
      this.$axios
        .post('/searchBy/sname', {
          input: _this.$store.state.saler.name})
        .then(successResponse => {
          if (successResponse && successResponse.status === 200) {
            _this.orders = successResponse.data
            _this.order = successResponse.data
          }
        })
        .catch(failResponse => {
          alert('服务器异常')
        })
    },
    async showPartialOrders () {
      const _this = this
      switch (_this.value) {
        case '搜索商品':
          _this.oper = '/searchBy/pname/saler'
          break
        case '搜索用户':
          _this.oper = '/searchBy/uname/saler'
          break
      }
      this.$axios
        .post(_this.oper, {
          input: _this.input,
          myName: _this.$store.state.saler.name})
        .then(successResponse => {
          if (successResponse && successResponse.status === 200) {
            _this.orders = successResponse.data
            _this.order = successResponse.data
            if (_this.orders[5]==1&&_this.orders[6]==0){
              _this.deliverAbility = 1;
            }
          }
        })
        .catch(failResponse => {
          alert('服务器异常')
        })
    },
    clearInput () {
    },
    deliver (row) {
      this.$axios
        .post('/list/order/deliver', {
          orderNum: row[0]
        })
        .then(successResponse => {
          if (successResponse && successResponse.status === 200) {
            this.$message.info('已发货')
            this.showAllOrders()
          } else {
            this.$alert(successResponse.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    }
}
</script>

<style scoped>

</style>
