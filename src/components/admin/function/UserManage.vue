<template>
  <div>
    <el-card>
      <p style="font-size: xx-large;font-family: Arial">普通用户</p>
      <el-table :data="usersList" tooltip-effect="dark"
                style="width: 100%" :header-cell-style="{'text-align':'center'}" border stripe>

        <el-table-column prop="6" label="头像" width="70">
          <!--:表示引入变量-->
          <template slot-scope="scope">
          <img :src="getSrc(scope.row)" width="50" />
          </template>
          <!--<img :src="" width="40" height="40" class="head_pic"/>-->
        </el-table-column>

        <el-table-column prop="0" label="id" width="50" align="center"></el-table-column>

        <el-table-column prop="1" label="名称" width="200" align="center"></el-table-column>

        <el-table-column prop="2" label="电话号码" width="200" align="center"></el-table-column>

        <el-table-column prop="3" label="电子邮箱" width="200" align="center"></el-table-column>

        <el-table-column prop="5" label="性别" width="50"></el-table-column>

        <el-table-column prop="7" label="生日" width="100" align="center"></el-table-column>

        <el-table-column prop="8" label="注册日期" width="100" align="center"></el-table-column>

        <el-table-column prop="4" label="地址" show-overflow-tooltip></el-table-column>

        <el-table-column label="删除" width="100" align="center">
          <template slot-scope="scope">
            <el-button type = "danger" icon = "el-icon-delete" size = "mini" @click="deleUser(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserManage',
  data () {
    return {
      usersList: [],
      pic: [{}]
    }
  },
  created () {
    this.findUser()
  },
  methods: {
    async findUser () {
      const _this = this
      this.$axios
        .post('/admin/user')
        .then(successResponse => {
          if (successResponse && successResponse.status === 200) {
            _this.usersList = successResponse.data
          }
        })
        .catch(failResponse => {
          alert('服务器异常')
        })
    },
    getSrc(row) {
      return row[6]
    },
    async deleUser (row) {
      const confirmResult = await
      this.$confirm('是否删除用户' + row[1] + '?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      this.$axios
        .post('/admin/deleuser', {
          uid: row[0]
        })
        .then(resp => {
          this.$message.info('已删除')
          this.findUser()
        })
    }
  }
}
</script>

<style scoped>

</style>
