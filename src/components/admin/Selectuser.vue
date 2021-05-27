<template>
  <div>
    <el-row :gutter="30">
     <el-col :span="3">
      <el-input v-model="regisForm.user_id" maxlength="5" show-word-limit placeholder="请输入ID"></el-input>
     </el-col>
      <el-col :span="5">
      <el-input v-model="regisForm.uname" maxlength="10" show-word-limit placeholder="请输入用户名"></el-input>
      </el-col>
      <el-col :span="6">
      <el-input v-model="regisForm.phone" maxlength="11" show-word-limit placeholder="请输入电话"></el-input>
      </el-col>
      <el-select v-model="regisForm.gender" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="page(1)">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="cleandata"></el-button>
    </el-row>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="user_id"
      label="ID"
      width="240">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="240">
    </el-table-column>
    <el-table-column
      prop="phone_number"
      label="电话"
      width="240">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="240">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="200">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="handleEdit(scope.$index, scope.row)" size="medium">修改基本信息</el-button>
        <el-button type="text" @click="editName(scope.$index, scope.row)" size="medium">修改用户名</el-button>
        <el-button type="text" @click="verifyEmail(scope.$index, scope.row)" size="medium">修改邮箱</el-button>
        <el-button type="text" @click="handleDelete(scope.$index, scope.row)" size="medium">删除用户</el-button>
      </template>
    </el-table-column>
  </el-table>
    <email-change @changeEmail="load_user" ref="emailChange"></email-change>
    <name-change @changeName="load_user" ref="nameChange"></name-change>
  <el-pagination
      background
      layout="prev, pager, next"
      :total="pagetotal"
      :page-size="pagesize"
      @current-change="page">
  </el-pagination>
</div>
</template>

<style>
</style>

<script>
import EmailChange from '../user/common/EmailChange'
import NameChange from '../user/common/NameChange'
export default {
  name: 'Selectuser',
  components: {NameChange, EmailChange},
  data () {
    return {
      pagetotal: 10,
      pagesize: 5,
      regisForm: {
        user_id: '',
        uname: '',
        password: '',
        phone: '',
        gender: ''
      },
      tableData: [{
        user_id: '',
        username: '',
        phone_number: '',
        gender: '',
        email: ''
      }]
    }
  },
  created: function () {
    if (this.$route.query.username !== undefined) {
      this.regisForm.uname = this.$route.query.username
    }
    this.load_user()
  },
  methods: {
    load_user () {
      this.$axios
        .post('/select/user/page', {
          user_id: this.regisForm.user_id,
          username: this.regisForm.uname,
          phone_number: this.regisForm.phone,
          gender: this.regisForm.gender,
          page: 1
        }).then(resp => {
          if (resp.data.code === 200) {
            const datas = resp.data.data
            let i = 0
            const data0 = []
            for (i = 0; i < datas.length - 1; i++) {
              data0[i] = datas[i]
            }
            this.tableData = data0
            // this.pagetotal = datas[];
            this.pagetotal = parseInt(datas[datas.length - 1]['total'])
            console.log(this.pagetotal)
          } else {
            this.$alert('select failed!', {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
    },
    select_by_condition () {
      const _this = this
      this.$axios
        .post('/select/user', {
          user_id: _this.regisForm.user_id,
          username: _this.regisForm.uname,
          phone_number: _this.regisForm.phone,
          gender: _this.regisForm.gender
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('select success!', {confirmButtonText: 'OK'})
            console.log(resp.data.data)
            const datas = resp.data.data
            console.log(datas[1])
            this.tableData = datas
          } else {
            this.$alert('select failed!', {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
    },
    page (currentPage) {
      this.$axios.post('/select/user/page', {
        user_id: this.regisForm.user_id,
        username: this.regisForm.uname,
        phone_number: this.regisForm.phone,
        gender: this.regisForm.gender,
        page: currentPage
      }).then(resp => {
        if (resp.data.code === 200) {
          console.log(resp.data.data)
          const datas = resp.data.data
          let i = 0
          const data0 = []
          for (i = 0; i < datas.length - 1; i++) {
            data0[i] = datas[i]
          }
          this.tableData = data0
          // this.pagetotal = datas[];
          this.pagetoal = parseInt(datas[datas.length - 1]['total'])
          console.log(this.pagetoal)
        } else {
          this.$alert('select failed!', {confirmButtonText: 'OK'})
        }
      })
        .catch(failResponse => {})
    },
    cleandata () {
      this.regisForm.gender = ''
      this.regisForm.phone = ''
      this.regisForm.uname = ''
      this.regisForm.user_id = ''
      this.load_user()
    },
    handleEdit: function (index, row) {
      console.log(row)
      this.$router.push({path: '/admin/Fixuser', query: {data: row}})
    },
    handleDelete: function (index, row) {
      this.$axios.post('/delete/user', {user_id: row.user_id}).then(resp => {
        this.$alert(resp.data.message, {confirmButtonText: 'OK'})
        this.load_user()
      }).catch(failResponse => {})
    },
    verifyEmail (index, row) {
      this.$refs.emailChange.dialogVisible = true
      this.$refs.emailChange.email = row.email
      this.$refs.emailChange.username = row.username
    },
    editName (index, row) {
      this.$refs.nameChange.dialogVisible = true
      this.$refs.nameChange.username = row.username
      this.$refs.nameChange.username_ori = row.username
    }
  }
}
</script>
