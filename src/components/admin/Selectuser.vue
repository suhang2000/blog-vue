<template>
  <div>
    <el-row :gutter="20">
     <el-col :span="3">
      <el-input v-model="regisForm.user_id" maxlength="5" show-word-limit placeholder="请输入ID"></el-input>
     </el-col>
      <el-col :span="5">
      <el-input v-model="regisForm.uname" maxlength="10" show-word-limit placeholder="请输入用户名"></el-input>
      </el-col>
      <el-col :span="6">
      <el-input v-model="regisForm.phone" maxlength="11" show-word-limit placeholder="请输入电话"></el-input>
      </el-col>
      <el-select v-model="regisForm.gender" placeholder="请选择">
        <el-option label="男" value="M"></el-option>
        <el-option label="女" value="F"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="page(1)">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="cleandata"></el-button>
    </el-row>
    <el-table
    :data="tableData"
    border
    style="width: 73%">
    <el-table-column
      fixed
      prop="user_id"
      label="ID"
      width="300">
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
      prop="gender"
      label="性别"
      width="240">
    </el-table-column>
    <el-table-column
      label="操作"
      width="330">
      <template slot-scope="scope">
        <el-button type="text" @click="handleEdit(scope.$index, scope.row)" size="small">编辑</el-button>
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
  .el-select .el-input {
    width: 260px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>

<script>
  export default {
      name: "Selectuser",
    data() {
      return {
          pagetotal: 10,
          pagesize: 2,
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
            gender:''
          }]
      }
    },
      created: function(){
           this.$axios
               .post('/select/user/page',{
              user_id: this.regisForm.user_id,
              username: this.regisForm.uname,
              phone_number: this.regisForm.phone,
              gender: this.regisForm.gender,
              page: 1
          }).then(resp => {
          if (resp.data.code === 200) {
            console.log(resp.data.data);
            var datas = resp.data.data;
            var i = 0;
            var data0 = [];
            for(var i = 0; i<datas.length - 1; i++){
                data0[i] = datas[i];
            }
            this.tableData = data0;
            //this.pagetotal = datas[];
            this.pagetoal = this.pagesize * parseInt(datas[datas.length - 1]['total']);
            console.log(this.pagetoal);
          }else {
            this.$alert('select failed!', {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
      },
    methods: {
      select_by_condition() {
      var _this = this;
      this.$axios
        .post('/select/user', {
          user_id: this.regisForm.user_id,
          username: this.regisForm.uname,
          phone_number: this.regisForm.phone,
          gender: this.regisForm.gender
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('select success!', {confirmButtonText: 'OK'})
            console.log(resp.data.data);
            var datas = resp.data.data;
            var i = 0;
            console.log(datas[1]);
            this.tableData = datas;
          }else {
            this.$alert('select failed!', {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
      },
        page(currentPage){
          this.$axios.post('/select/user/page',{
              user_id: this.regisForm.user_id,
              username: this.regisForm.uname,
              phone_number: this.regisForm.phone,
              gender: this.regisForm.gender,
              page: currentPage
          }).then(resp => {
          if (resp.data.code === 200) {
            console.log(resp.data.data);
            var datas = resp.data.data;
            var i = 0;
            var data0 = [];
            for(var i = 0; i<datas.length - 1; i++){
                data0[i] = datas[i];
            }
            this.tableData = data0;
            //this.pagetotal = datas[];
            this.pagetoal = this.pagesize * parseInt(datas[datas.length - 1]['total']);
            console.log(this.pagetoal);
          }else {
            this.$alert('select failed!', {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
        },
        cleandata(){
          this.regisForm.gender = '';
          this.regisForm.phone = '';
          this.regisForm.uname = '';
          this.regisForm.user_id = '';
        },
        handleEdit: function (index, row) {
          console.log(row);
          this.$router.push({path: '/admin/Fixuser', query: {data: row}});
        }
    }
  }
</script>

