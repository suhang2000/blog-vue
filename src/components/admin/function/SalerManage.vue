<template>
  <div>
    <el-card>
      <p style="font-size: xx-large;font-family: Arial">商家管理</p>
      <el-table ref="multipleTable" :data="shopList" tooltip-effect="dark"
                style="width: 100%" :header-cell-style="{'text-align':'center'}" border stripe>

        <el-table-column prop = "0" label="id" width="50" align="center"></el-table-column>

        <el-table-column prop="1" label="名称" width="200" align="center"></el-table-column>

        <el-table-column prop="2" label="电话号码" width="200" align="center"></el-table-column>

        <el-table-column prop="3" label="电子邮箱" width="200" align="center"></el-table-column>

        <el-table-column prop="5" label="银行卡号" width="300" align="center"></el-table-column>

        <el-table-column prop="6" label="注册日期" width="100" align="center"></el-table-column>

        <el-table-column prop="4" label="地址" show-overflow-tooltip></el-table-column>

        <el-table-column label="删除" width="100" align="center">
          <template slot-scope="scope">
            <el-button type = "danger" icon = "el-icon-delete" size = "mini" @click="deleSaler(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'SalerManage',
    data () {
      return {
        shopList:[]
      }
    },
    created () {
      this.findSaler()
    },
    methods: {
      async findSaler () {
        const _this = this
        this.$axios
          .post('/admin/saler')
          .then(successResponse => {
            if (successResponse && successResponse.status === 200) {
              _this.shopList= successResponse.data
            }
          })
          .catch(failResponse => {
            alert('服务器异常')
          })
      },
      async deleSaler (row) {
        const confirmResult = await
          this.$confirm('是否删除商家' + row[1] + '?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消')
        }
        this.$axios
          .post('/admin/delesaler', {
            sid: row[0]
          })
          .then(resp => {
            this.$message.info('已删除')
            this.findSaler()
          })
      }
    }
  }
</script>

<style scoped>

</style>
