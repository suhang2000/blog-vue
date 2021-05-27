<template>
  <div>
    <el-row :gutter="30">
     <el-col :span="3">
      <el-input v-model="regisForm.id" maxlength="5" show-word-limit placeholder="请输入ID"></el-input>
     </el-col>
      <el-col :span="5">
      <el-input v-model="regisForm.uname" maxlength="10" show-word-limit placeholder="请输入用户名"></el-input>
      </el-col>
      <el-select v-model="regisForm.type" placeholder="请选择">
        <el-option label="低俗色情" value="1"></el-option>
        <el-option label="血腥暴力" value="2"></el-option>
        <el-option label="虚假信息" value="3"></el-option>
        <el-option label="过激言论" value="4"></el-option>
        <el-option label="涉政" value="5"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="page(1)">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="cleandata"></el-button>
    </el-row>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column
      fixed
      prop="report_id"
      label="ID"
      width="300">
    </el-table-column>
    <el-table-column
      fixed
      prop="title"
      label="标题"
      width="300">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="240">
    </el-table-column>
    <el-table-column
      prop="reason"
      label="理由"
      width="240">
    </el-table-column>
    <el-table-column
      prop="shortdescription"
      label="详细描述"
      width="240">
    </el-table-column>
    <el-table-column
      label="操作"
      width="330">
      <template slot-scope="scope">
        <el-button type="text" @click="handlelookup(scope.$index, scope.row)" size="small">详情</el-button>
        <el-button type="text" @click="handleDelete(scope.$index, scope.row)" size="small">已解决（删除）</el-button>
      </template>
    </el-table-column>
  </el-table>
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
export default {
  name: 'Selectreport',
  data () {
    return {
      pagetotal: 10,
      pagesize: 5,
      regisForm: {
        id: '',
        title: '',
        uname: '',
        type: ''
      },
      tableData: [{
        report_id: '',
        title: '',
        username: '',
        reason: '',
        description: '',
        shortdescription: '',
        type: '',
        blog_id: ''
      }]
    }
  },
  created: function () {
    this.load_report()
  },
  methods: {
    load_report () {
      this.$axios
        .post('/select/report/page', {
          report_id: this.regisForm.id,
          username: this.regisForm.uname,
          type: this.regisForm.type,
          page: 1
        }).then(resp => {
          if (resp.data.code === 200) {
            console.log(resp.data.data)
            const datas = resp.data.data
            let i = 0
            const data0 = []
            for (i = 0; i < datas.length - 1; i++) {
              data0[i] = datas[i]
              let str = ''
              // console.log(data0[i].description)
              str = data0[i].description
              str = str.substring(0, 10)
              console.log(str)
              str = str.concat('...')
              data0[i].shortdescription = str
              // console.log(str)
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
    page (currentPage) {
      this.$axios.post('/select/report/page', {
        report_id: this.regisForm.id,
        username: this.regisForm.uname,
        type: this.regisForm.type,
        page: currentPage
      }).then(resp => {
        if (resp.data.code === 200) {
          console.log(resp.data.data)
          const datas = resp.data.data
          let i = 0
          let j = 0
          const data0 = []
          for (i = 0; i < datas.length - 1; i++) {
            data0[i] = datas[i]
            let str = ''
            // console.log(data0[i].description)
            str = data0[i].description
            str = str.substring(0, 10)
            console.log(str)
            str = str.concat('...')
            data0[i].shortdescription = str
            // console.log(str)
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
      this.regisForm.id = ''
      this.regisForm.uname = ''
      this.regisForm.type = ''
      this.load_report()
    },
    handlelookup: function (index, row) {
      console.log(row)
      this.$router.push({path: '/admin/Selectreport/detail', query: {data: row}})
    },
    handleDelete: function (index, row) {
      this.$axios.post('/delete/report', {blog_id: row.blog_id}).then(resp => {
        this.$alert(resp.data.message, {confirmButtonText: 'OK'})
        this.load_report()
      }).catch(failResponse => {})
    }
  }
}
</script>
