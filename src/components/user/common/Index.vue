<template>
<div class="blogs">
  <search-bar @onSearch="page(1)" ref="searchBar"></search-bar>
  <div style="text-align:center">
  <ul>
  <el-button type="primary" @click="handlenewblog()">添加博客</el-button>
  </ul>
  </div>
  <ul class="list">
      <li v-for="item in articleList" :key="item.blog_id" class="item">
          <el-link :underline="false" @click="handleShow(item.blog_id)">
              <div class="content">
                  <h4 class="title">{{item.title}}</h4>
                  <p class="description">{{item.describe}}</p>
                  <div class="meta">
                      <span>评论 {{item.commentCnt}}</span>
                      <span v-if="item.public_time" class="time">{{item.public_time}}</span>
                  </div>
              </div>
          </el-link>
      </li>
  </ul>
  <ul>
  <el-pagination
      background
      layout="prev, pager, next"
      style="text-align:center"
      :total="pagetotal"
      :page-size="pagesize"
      @current-change="page">
  </el-pagination>
  </ul>
</div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
  name: 'Index',
  components: {SearchBar},
  data () {
    return {
      isall: true,
      pagetotal: 0,
      pagesize: 5,
      articleform: {
        title: '',
        text: '',
        describe: '',
        username: ''
      },
      articleList: [
      ]
    }
  },
  created () {
    this.oncreate()
  },
  watch: {
    '$route' (to, from) {
      this.oncreate()
    }
  },
  methods: {
    handlenewblog () {
      let _this = this
      var datas
      this.$axios.post('/select/user', {
        username: JSON.parse(window.sessionStorage.getItem('username' || '[]'))
      }).then(resp => {
        if (resp.data.code === 200) {
          datas = resp.data.data
          _this.$router.push({path: '/home/Fixarticle', query: {data: datas[0], admin: false}})
        } else {
          this.$alert('获取当前用户ID异常！', {confirmButtonText: 'OK'})
        }
      }).catch(failResponse => {})
    },
    handleShow (blog_id) {
      let _this = this
      _this.$router.push({path: '/home/showarticle', query: {blog_id: blog_id, isadmin: false}})
    },
    oncreate () {
      var unm = ''
      var hcd = ''
      let _this = this
      if (_this.$route.path == '/home/blog') {
        _this.isall = true
      } else {
        _this.isall = false
      }
      if (_this.isall) {
        unm = ''
      } else {
        unm = JSON.parse(window.sessionStorage.getItem('username' || '[]'))
        hcd = 'username'
      }
      _this.$axios.post('/select/article/page', {
        title: _this.articleform.title,
        describe: _this.articleform.describe,
        text: _this.articleform.text,
        username: unm,
        page: 1,
        op: 'or',
        hardcond: hcd
      }).then(resp => {
        if (resp.data.code === 200) {
          console.log(resp.data.data)
          var datas = resp.data.data
          var i = 0
          _this.data0 = []
          for (var i = 0; i < datas.length - 1; i++) {
            _this.data0[i] = datas[i]
          }
          var datanew = []
          var keynew = {}
          for (var key in _this.data0) {
            for (var key2 in _this.data0[key]) {
              if (Object.prototype.toString.call(_this.data0[key][key2]) === '[object String]') {
                keynew[key2] = _this.data0[key][key2].substring(0, 100).replace(/<[^>]+>/g, '')// remove html attrib
              } else {
                keynew[key2] = _this.data0[key][key2]
              }
            }
            datanew.push(keynew)
            keynew = {}
          }
          _this.articleList = datanew
          // this.pagetotal = datas[];
          _this.pagetotal = parseInt(datas[datas.length - 1]['total'])
          // this.pagetoal = this.pagesize * parseInt(datas[datas.length - 1]['total']);
          console.log(_this.pagetoal)
        } else {
          _this.$alert('select failed!', {confirmButtonText: 'OK'})
        }
      }).catch(failResponse => {})
    },
    page (currentPage) {
      let _this = this
      var unm = ''
      var hcd = ''
      if (_this.isall) {
        unm = _this.$refs.searchBar.keywords
      } else {
        unm = JSON.parse(window.sessionStorage.getItem('username' || '[]'))
        hcd = 'username'
      }
      _this.$axios.post('/select/article/page', {
        title: _this.$refs.searchBar.keywords,
        describe: _this.$refs.searchBar.keywords,
        text: _this.$refs.searchBar.keywords,
        username: unm,
        page: currentPage,
        op: 'or',
        hardcond: hcd
      }).then(resp => {
        if (resp.data.code === 200) {
          console.log(resp.data.data)
          var datas = resp.data.data
          var i = 0
          _this.data0 = []
          for (var i = 0; i < datas.length - 1; i++) {
            _this.data0[i] = datas[i]
          }
          var datanew = []
          var keynew = {}
          for (var key in _this.data0) {
            for (var key2 in _this.data0[key]) {
              if (Object.prototype.toString.call(_this.data0[key][key2]) === '[object String]') {
                keynew[key2] = _this.data0[key][key2].substring(0, 100).replace(/<[^>]+>/g, '')// remove html attrib
              } else {
                keynew[key2] = _this.data0[key][key2]
              }
            }
            datanew.push(keynew)
            keynew = {}
          }
          _this.articleList = datanew
          // this.pagetotal = datas[];
          _this.pagetotal = parseInt(datas[datas.length - 1]['total'])
          // this.pagetoal = this.pagesize * parseInt(datas[datas.length - 1]['total']);
          console.log(_this.pagetoal)
        } else {
          _this.$alert('select failed!', {confirmButtonText: 'OK'})
        }
      }).catch(failResponse => {})
    }
  }
}
</script>

<style lang="less" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: auto;
  }
  .blogs {
        /*左对齐*/
        text-align: left;
        li {
            /*去除起前面的点*/
            list-style-type: none;
            /*内部间距*/
            padding: 15px 0 10px;
            /*每篇下面的实线*/
            border-bottom: 2px solid #f0f0f0;
            /*标题，鼠标，悬浮，变绿色*/
            &:hover {
                .title {
                    color: #42b983;
                }
            }
            /**/
            .description {
                min-height: 30px;
                margin: 4px 0 4px;
                font-size: 18px;
                color: #555;
            }
            .meta {
                font-size: 13px;
                line-height: 20px;
                span {
                    margin-right: 12px;
                    color: #666;
                }
            }
        }
        .title {
            color: #333;
            margin: 7px 0 7px;
            font-size: 28px;
            line-height: 1.5;
        }
    }
  .el-button--primary {
    float: right;
    padding-top: 10px;
    margin-right: 20px;
  }
</style>
