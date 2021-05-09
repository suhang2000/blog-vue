<template>
  <div>
        <el-table :data="carts"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  border stripe>
          <el-table-column prop="0" label="编号">
          </el-table-column>
          <el-table-column prop="1" label="商品名称">
          </el-table-column>
          <el-table-column prop="2" label="单价" >
          </el-table-column>
          <el-table-column prop="3" label="商品数量">
          </el-table-column>

          <el-table-column  label="数量操作" width="150">
            <template slot-scope="scope">
              <el-button type = "danger" icon = "el-icon-circle-plus"
                         size = "mini" @click="plusGoods(scope.row)">
              </el-button>
              <el-button type = "danger" icon = "el-icon-remove"
                         size = "mini" @click="removeGoods(scope.row)">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="4" label="小计">
          </el-table-column>

          <el-table-column label="支付操作">
            <template slot-scope="scope">
              <el-popover
                placement="top"
                width="160">
                <p>已成功提交订单！</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="addOrder_later(scope.row),visible =true">稍后支付</el-button>
                  <el-button type="primary" size="mini" @click="addOrder_now(scope.row),visible =true">确认支付</el-button>
                </div>
                <el-button slot="reference" >提交订单</el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="删除操作" >
            <template slot-scope="scope">
              <el-button type = "danger" icon = "el-icon-delete"
                         size = "mini" @click="dropGoods(scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
  </div >
</template>


<script>
export default {
  name: 'Cart',
  data () {
    return {
      carts: [],
      visible: false,
    }
  },
  created () {
    this.showCartsList()
  },
  methods: {
    showCartsList () {
      const _this = this
      console.log(_this.$store.state.user.name)
      this.$axios
        .post("/cart/view",{
          myName:_this.$store.state.user.name
        })
        .then(successResponse => {
          if (successResponse && successResponse.status === 200) {
            _this.carts = successResponse.data
            console.log(_this.carts)
          }
        })
        .catch(failResponse => {
          alert('服务器异常')
        })
    },
      showDetailedInfo (row) {
        console.log(row)
      },

    //增加购物车内商品数量
    plusGoods (row) {
      const _this = this
      this.$axios
        .post('/cart/addGoods', {
          cid: row[0],
        })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.showCartsList()
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
      //生成未支付订单
      addOrder_later(row){
        console.log(row)
        console.log('cid为' + row[0])
        const _this = this
        this.$axios
          .post('/order/addPayOrder1', {
            cid: row[0]
          })
          .then(resp => {
            if (resp.data.code === 200) {
              _this.showCartsList()
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
      },

      //生成已支付订单
      addOrder_now(row){
        console.log(row)
        console.log('cid为' + row[0])
        this.$axios
          .post('/order/addPayOrder2', {
            cid: row[0]
          })
          .then(resp => {
            if (resp.data.code === 200) {
              this.showCartsList()
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
      },

    //减少购物车内商品数量
    removeGoods (row) {
      const _this = this
      this.$axios
        .post('/cart/removeGoods', {
          cid: row[0]
        })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.showCartsList()
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      this.showCartsList()
    },

    //删除购物车内商品
    async dropGoods (row) {
      console.log(row)
      const _this = this
      const confirmResult = await
      this.$confirm('是否删除' + row[1] + '?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      console.log('cid为' + row[0])
      this.$axios
        .post('/cart/dropGoods', {
          cid: row[0]
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message(resp.data.message)
            _this.showCartsList()
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
