<template>
<div>

  <div class="filter-container">
    <div class="letf-items" style="float: left;">
      <router-link to="/home/order">
        <el-button type="primary" icon="el-icon-back" >返回订单管理</el-button></router-link>
    </div>
  </div>
  <el-table
    ref="multipleTable"
    :data="orders"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    border stripe>
    <el-table-column prop = "0" label="订单号">
    </el-table-column>
    <el-table-column prop="1" label="商品名称">
    </el-table-column>
    <el-table-column prop="2" label="数量">
    </el-table-column>
    <el-table-column prop="3" label="单价">
    </el-table-column>
    <el-table-column prop="4" label="金额">
    </el-table-column>
    <el-table-column prop="5" label="交易时间">
    </el-table-column>
    <el-table-column  label="操作" >
      <template slot-scope="scope">
        <el-button type = "danger" icon = "el-icon-delete" @click="orderDrop(scope.row)"
                   size = "mini" >
        </el-button>
        <el-button type = "primary" size = "mini" @click="orderPay(scope.row)" >支付</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

</template>

<script>
    export default {
        name: "OrderToPay",
      data() {
        return {
          orders:[]
        }
      },
      mounted () {
        this.showOrdersList()
      },
      methods:{
        //显示全部订单
        showOrdersList() {
          const _this = this
          this.$axios
            .post('/userorder/viewlist',{
              myName:_this.$store.state.user.name
            })
            .then(successResponse => {
              if (successResponse && successResponse.status === 200) {
                _this.orders = successResponse.data
                console.log(_this.orders)
              }
            })
            .catch(failResponse => {
              alert('服务器异常')
            })
        },
        //删除未支付订单
        async orderDrop (row) {
          console.log(row)
          const confirmResult = await
            this.$confirm('是否撤回订单号为' + row[0] + '的订单?', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }).catch(err => err)

          if (confirmResult !== 'confirm') {
            return this.$message.info('已取消删除')
          }
          console.log('oid为' + row[0])
          const _this = this
          this.$axios
            .post('/order/dropUnpaid', {
              oid: row[0]
            })
            .then(resp => {
              if (resp.data.code === 200) {
                _this.showOrdersList();
                this.$message.info('删除成功！')
              } else {
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'
                })
              }
            })

        },
        //支付未支付订单
        orderPay(row){
          console.log(row)
          console.log('oid为' + row[0])
          const _this = this
          this.$axios
            .post('/order/orderPay', {
              oid: row[0]
            })
            .then(resp => {
              if (resp.data.code === 200) {
                _this.showOrdersList();
                this.$message.info('支付成功！')
              } else {
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'

                })
              }
            })
        }
      }
    }
</script>

<style scoped>

</style>
