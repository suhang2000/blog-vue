<template>
  <div>
    <br>
    <el-row :gutter="20">
     <el-col :span="3">
      <el-input v-model="articleform.blog_id" maxlength="10" show-word-limit placeholder="请输入ID"></el-input>
     </el-col>
      <el-col :span="5">
      <el-input v-model="articleform.title" maxlength="30" show-word-limit placeholder="请输入标题"></el-input>
      </el-col>
      <el-col :span="5">
      <el-input v-model="articleform.text" maxlength="30" show-word-limit placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="6">
      <el-input v-model="articleform.username" maxlength="11" show-word-limit placeholder="请输入发布用户" v-if="!isuser"></el-input>
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
      prop="username"
      label="发布用户"
      width="240"
      v-if="!isuser">
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
          data0: '',
          isuser: false,
          pagetotal: 10,
          pagesize: 2,
          articleform: {
            blog_id: '',
            title: '',
            describe: '',
            text:'',
            username: ''
          },
          tableData: [{
            blog_id: '',
            title: '',
            describe: '',
            text:'',
            username:''
          }]
      }
    },
    created(){
          let _this = this;
          try{
            if (JSON.stringify(_this.$store.state.username)!='{}') {
              _this.isuser=true;
              _this.articleform.username=_this.$store.state.username;
            }
          }catch(exception){
            alert("no username")
            console.log("no username")
          }
          _this.$axios
              .post('/select/article/page',{
            blog_id: _this.articleform.blog_id,
            title: _this.articleform.title,
            describe: _this.articleform.describe,
            text: _this.articleform.text,
            username: _this.articleform.username,
            page: 1,
            op: "and",
            hardcond: 'username'
        }).then(resp => {
        if (resp.data.code === 200) {
          console.log(resp.data.data);
          var datas = resp.data.data;
          var i = 0;
          _this.data0 = [];
          for(var i = 0; i<datas.length - 1; i++){
              _this.data0[i] = datas[i];
          }
          var datanew = [];
          var keynew = {};
          for(var key in _this.data0){
            for(var key2 in _this.data0[key]){
              if(Object.prototype.toString.call(_this.data0[key][key2]) === "[object String]"){
                keynew[key2] = _this.data0[key][key2].replace(/<[^>]+>/g,"");//remove html attrib
              }else{
                keynew[key2] = _this.data0[key][key2];
              }
            }
            datanew.push(keynew);
            keynew={};
          }
          _this.tableData = datanew;
          //this.pagetotal = datas[];
          _this.pagetotal = parseInt(datas[datas.length - 1]['total']);
          //this.pagetoal = this.pagesize * parseInt(datas[datas.length - 1]['total']);
          console.log(_this.pagetoal);
        }else {
          _this.$alert('select failed!', {confirmButtonText: 'OK'})
        }
      })
      .catch(failResponse => {})
    },
    methods: {
      select_by_condition() {
      let _this = this;
      _this.$axios
        .post('/select/article', {
            blog_id: _this.articleform.blog_id,
            title: _this.articleform.title,
            describe: _this.articleform.describe,
            text: _this.articleform.text,
            username: _this.articleform.username,
            op: "and"
        })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.$alert('select success!', {confirmButtonText: 'OK'})
            console.log(resp.data.data);
            var datas = resp.data.data;
            var i = 0;
            console.log(datas[1]);
            _this.tableData = datas;
          }else {
            _this.$alert('select failed!', {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
      },
        page(currentPage){
          let _this = this;
          _this.$axios.post('/select/article/page',{
              blog_id: _this.articleform.blog_id,
              title: _this.articleform.title,
              describe: _this.articleform.describe,
              text: _this.articleform.text,
              username: _this.articleform.username,
              page: currentPage,
              op: "and",
              hardcond: 'username'
          }).then(resp => {
          if (resp.data.code === 200) {
            console.log(resp.data.data);
            var datas = resp.data.data;
            var i = 0;
            _this.data0 = [];
            for(var i = 0; i<datas.length - 1; i++){
                _this.data0[i] = datas[i];
            }
            var datanew = [];
            var keynew = {};
            for(var key in _this.data0){
              for(var key2 in _this.data0[key]){
                if(Object.prototype.toString.call(_this.data0[key][key2]) === "[object String]"){
                  keynew[key2] = _this.data0[key][key2].replace(/<[^>]+>/g,"");//remove html attrib
                }else{
                  keynew[key2] = _this.data0[key][key2];
                }
              }
              datanew.push(keynew);
              keynew={};
            }
            _this.tableData = datanew;
            //this.pagetotal = datas[];
            _this.pagetotal = parseInt(datas[datas.length - 1]['total']);
            //this.pagetoal = this.pagesize * parseInt(datas[datas.length - 1]['total']);
            console.log(_this.pagetoal);
          }else {
            _this.$alert('select failed!', {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
        },
        cleandata(){
          let _this = this;
          _this.articleform.blog_id = '';
          _this.articleform.title = '';
          _this.articleform.describe = '';
          _this.articleform.text = '';
          _this.articleform.username = '';
        },
        handleEdit: function (index, row) {
          let _this = this;
          console.log(row);
          if(this.isuser){
            _this.$router.push({path: '/home/Fixarticle', query: {data: this.data0[index], admin: false}});
          }else{
            _this.$router.push({path: '/admin/Fixarticle', query: {data: this.data0[index], admin: true}});
          }
        },
        handleDelete: function (index, row) {
          let _this = this;
          console.log(row);
          _this.$axios
            .post('/delete/article', {
                blog_id: row.blog_id
            })
            .then(resp => {
              if (resp.data.code === 200) {
                _this.$alert('delete success!', {confirmButtonText: 'OK'})
              }else {
                _this.$alert('delete failed!', {confirmButtonText: 'OK'})
              }
              _this.$axios
                  .post('/select/article/page',{
                  blog_id: _this.articleform.blog_id,
                  title: _this.articleform.title,
                  describe: _this.articleform.describe,
                  text: _this.articleform.text,
                  username: _this.articleform.username,
                  page: 1,
                  op: "and",
                  hardcond: 'username'
              }).then(resp => {
              if (resp.data.code === 200) {
                console.log(resp.data.data);
                var datas = resp.data.data;
                var i = 0;
                _this.data0 = [];
                for(var i = 0; i<datas.length - 1; i++){
                    _this.data0[i] = datas[i];
                }
                var datanew = [];
                var keynew = {};
                for(var key in _this.data0){
                  for(var key2 in _this.data0[key]){
                    if(Object.prototype.toString.call(_this.data0[key][key2]) === "[object String]"){
                      keynew[key2] = _this.data0[key][key2].replace(/<[^>]+>/g,"");//remove html attrib
                    }else{
                      keynew[key2] = _this.data0[key][key2];
                    }
                  }
                  datanew.push(keynew);
                  keynew={};
                }
                _this.tableData = datanew;
                //this.pagetotal = datas[];
                _this.pagetoal = _this.pagesize * parseInt(datas[datas.length - 1]['total']);
                console.log(_this.pagetoal);
              }else {
                _this.$alert('select failed!', {confirmButtonText: 'OK'})
              }
              })
              .catch(failResponse => {})
            })
            .catch(failResponse => {})    
        }
    }
  }
</script>

