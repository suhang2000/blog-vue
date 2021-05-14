<template>
  <div>
    <el-row :gutter="20">
     <el-col :span="3">
      <el-input v-model="articleform.blog_id" maxlength="10" show-word-limit placeholder="请输入ID"></el-input>
     </el-col>
      <el-col :span="5">
      <el-input v-model="articleform.title" maxlength="30" show-word-limit placeholder="请输入标题"></el-input>
      </el-col>
      <el-col :span="6">
      <el-input v-model="articleform.user_id" maxlength="11" show-word-limit placeholder="请输入发布用户"></el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-search" @click="page(1)">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="cleandata"></el-button>
    </el-row>
    <el-table
    :data="tableData"
    border
    style="width: 90%">
    <el-table-column
      fixed
      prop="blog_id"
      label="ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="240">
    </el-table-column>
    <el-table-column
      prop="describe"
      label="摘要"
      width="240">
    </el-table-column>
    <el-table-column
      prop="text"
      label="内容"
      width="240">
    </el-table-column>
    <el-table-column
      prop="user_id"
      label="发布用户"
      width="240">
    </el-table-column>
    <el-table-column
      label="操作"
      width="330">
      <template slot-scope="scope">
        <el-button type="text" @click="handleEdit(scope.$index, scope.row)" size="small">编辑</el-button>
        <el-button type="text" @click="handleDelete(scope.$index, scope.row)" size="small">删除</el-button>
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
      name: "Selectarticle",
    data() {
      return {
          pagetotal: 10,
          pagesize: 2,
          articleform: {
          blog_id: '',
          title: '',
          describe: '',
          text:'',
          user_id: ''
          },
          tableData: [{
            blog_id: '',
            title: '',
            describe: '',
            text:'',
            user_id:''
          }]
      }
    },
      created: function(){
           this.$axios
               .post('/select/article/page',{
              blog_id: this.articleform.blog_id,
              title: this.articleform.title,
              describe: this.articleform.describe,
              text: this.articleform.text,
              user_id: this.articleform.user_id,
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
        .post('/select/article', {
            blog_id: this.articleform.blog_id,
            title: this.articleform.title,
            describe: this.articleform.describe,
            text: this.articleform.text,
            user_id: this.articleform.user_id
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
          this.$axios.post('/select/article/page',{
              blog_id: this.articleform.blog_id,
              title: this.articleform.title,
              describe: this.articleform.describe,
              text: this.articleform.text,
              user_id: this.articleform.user_id,
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
          this.articleform.blog_id = '';
          this.articleform.title = '';
          this.articleform.describe = '';
          this.articleform.text = '';
          this.articleform.user_id = '';
        },
        handleEdit: function (index, row) {
          console.log(row);
          this.$router.push({path: '/admin/Fixarticle', query: {data: row}});
        },
        handleDelete: function (index, row) {
          console.log(row);
          this.$axios
            .post('/delete/article', {
                blog_id: row.blog_id
            })
            .then(resp => {
              if (resp.data.code === 200) {
                this.$alert('delete success!', {confirmButtonText: 'OK'})
              }else {
                this.$alert('delete failed!', {confirmButtonText: 'OK'})
              }
            })
            .catch(failResponse => {})
            created();
        }
    }
  }
</script>

