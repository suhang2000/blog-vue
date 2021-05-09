<template>
  <div>
    <el-card>
      <p style="font-size: xx-large;font-family: Arial">人员管理</p>
      <el-table ref="multipleTable" :data="adminList" tooltip-effect="dark"
                style="width: 100%" :header-cell-style="{'text-align':'center'}" border stripe>

        <el-table-column prop = "0" label="id" width="50" align="center"></el-table-column>

        <el-table-column prop="1" label="姓名" width="200" align="center"></el-table-column>

        <el-table-column prop="2" label="加盐密码" width="300" align="center"></el-table-column>

        <el-table-column prop="3" label="电话号码" width="200" align="center"></el-table-column>

        <el-table-column label="重置密码" width="100" align="center">
          <template slot-scope="scope">
            <el-button type = "danger" icon = "el-icon-refresh" size = "mini" @click="pwdReset(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'AdminManage',
    data () {
      return {
        adminList:[]
      }
    },
    created () {
      this.findAdmin()
    },
    methods: {
      async findAdmin () {
        const _this = this
        this.$axios
          .post('/admin/admininfo')
          .then(successResponse => {
            if (successResponse && successResponse.status === 200) {
              _this.adminList= successResponse.data
            }
          })
          .catch(failResponse => {
            alert('服务器异常')
          })
      },
      async pwdReset (row) {
        const confirmResult = await
          this.$confirm('是否对' + row[1] + '进行密码重置?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消')
        }
        this.$axios
          .post('/admin/pwdreset', {
            aid: row[0]
          })
          .then(resp => {
            this.$message.info('已重置')
            this.findAdmin()
          })
      }
    }
  }
</script>
