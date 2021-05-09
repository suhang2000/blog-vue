<template>
  <div>
    <el-card >
    <p style="font-size: xx-large;font-family: Arial">商品管理</p>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" type="text" auto-complete="off"
          v-model="product.pname" clearable @clear="clearInput">
              <el-button slot="append" icon="el-icon-search"
                     @click="showGoodsList">
              </el-button>
          </el-input>
        </el-col>
      </el-row>
    <el-table
      ref="multipleTable"
      :data="goodsList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border stripe>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column >
      <el-table-column
        prop="0"
        label="商品编号"
        width="100">
      </el-table-column>

      <el-table-column
        prop = "2"
        label="商品名">
<!--        <template slot-scope="scope">-->
<!--          <router-link tag="a" :to="{path:'/orderDetail',query:{id:scope.row.pid}}"-->
<!--                       style="color:black;text-decoration:none;">{{scope.row.pname}}</router-link>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column
        prop="3"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="4"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="5"
        label="商品描述"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="6"
        label="商家">
      </el-table-column>
      <el-table-column
      label="操作"
      width="200">
        <template slot-scope="scope">
            <el-button type = "danger" icon = "el-icon-delete"
                 size = "mini" @click="dropGoods(scope.row)">
            </el-button>
            <el-button type = "primary" icon = "el-icon-edit"
                 size = "mini" @click="editGoods(scope.row)">
            </el-button>
        </template>
      </el-table-column>
    </el-table>
      <ProductForm @onSubmit="showGoodsList()" ref="edit"></ProductForm>
<!--    <div style="margin-top: 3px">-->
<!--      <el-button type = "primary" icon = "el-icon-plus"-->
<!--                 size = "mini"   @click="addGoods()">-->
<!--      </el-button>-->
<!--    </div>-->
    </el-card>

  </div>
</template>

<script>
import ProductForm from '../../saler/function/ProductForm'
export default {
  name: 'List',
  components: {ProductForm},
  data () {
    return {
      goodsList: [],
      multipleSelection: [],
      product: {
        pid: 0,
        pname: ''
      },
    }
  },
  mounted () {
    this.showGoodsList()
  },
  methods: {
    async showGoodsList () {
      const _this = this
      this.$axios
        .post('/list/product', {
          pname: _this.product.pname
        })
        .then(successResponse => {
          if (successResponse && successResponse.status === 200) {
            _this.goodsList = successResponse.data
            console.log(_this.goodsList)
          }
        })
        .catch(failResponse => {
          alert('服务器异常')
        })
    },

    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    showDetailedInfo (row) {
      console.log(row)
    },
    // addGoods () {
    //   const _this = this
    //   this.$axios
    //     .post('/list/addGoods', {
    //       sid: _this.testProductData.sid,
    //       pname: _this.testProductData.pname,
    //       price: _this.testProductData.price,
    //       number: _this.testProductData.number,
    //       description: _this.testProductData.description,
    //       cover: _this.testProductData.cover
    //     })
    //     .then(resp => {
    //       this.$alert('添加成功', '提示', {
    //         confirmButtonText: '确定'
    //       })
    //     })
    //   // 刷新有问题，不能自动刷新
    //   this.showGoodsList()
    // },
    async dropGoods (row) {
      console.log(row)
      const confirmResult = await
      this.$confirm('是否删除' + row[2] + '?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }

      console.log('pid为' + row[0])
      this.$axios
        .post('/list/dropGoodsById', {
          pid: row[0]
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message.info('已删除')
          } else {
            this.$message.info('该商品还有订单未处理')
          }
          this.showGoodsList()
        })
    },
    editGoods (item) {
      console.log(item[7])
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.pid = item[0]
      this.$refs.edit.form = {
        pname: item[2],
        price: item[3],
        number: item[4],
        description: item[5],
        cover: item[7]
      }
    }
  }
}
</script>

<style scoped>

</style>
