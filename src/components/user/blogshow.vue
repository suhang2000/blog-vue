<template>
   <div class="editor_wrap" style="align:center">
    <div style="text-align:center">
    <ul>
    <el-button type="success" class="btn-success" @click="$router.back(-1)">返回</el-button>
    </ul>
    </div>
    <br>
    <h1 class="title">{{content.title}}</h1>
    <p style="color: rgba(0,0,0,.75)">{{content.username}}  <i> 创建于 </i>  {{content.public_time}}</p>
    <p class="description">{{content.describe}}</p>
    <br>
    <br>
    <div>
      <quill-editor
        v-model="content.text"
        ref="myQuillEditor"
        style="margin:0 auto; width:70%"
        :options="editorOption"
        @focus="onEditorFocus($event)"
      ></quill-editor>
      <br>
      <br>
    </div>
    <div class="blogs">
      <quillEditor
        v-model="mycomment"
        ref="myQuillEditor2"
        style="margin:0 auto; width:40%"
        :options="commenteditorOption"
      >
      </quillEditor>
      <div style="text-align:center; margin-top:40px;">
        <ul>
        <el-button type="primary" :disabled="btnChangeEnable" @click="submit()">提交评论</el-button>
        <el-button type="primary" :disabled="btnChangeEnable" @click="reportblog()">举报</el-button>
        </ul>
      </div>
      <br>
      <ul class="list" style="margin:0 auto; width:40%">
        <li v-for="item in commentList" :key="item.comment_id" class="item">
            <el-link :underline="false">
                <div class="content">
                    <p class="description">{{item.content}}</p>
                    <div class="meta">
                        <span>用户： {{item.username}}</span>
                        <span v-if="item.comment_time" class="time">评论于： {{item.comment_time}}</span>
                        <el-button style="text-align: left" type="primary" v-if="isadmin || (blog_user_name == this_user_name) || (item.username == this_user_name)" @click="ondelete(item.comment_id)">删除</el-button>
                    </div>
                </div>
            </el-link>
        </li>
      </ul>
      <br>
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
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      value: null,
      gettime: '',
      pagetotal: 0,
      pagesize: 5,
      isadmin: false,
      btnChangeEnable: false,
      blog_user_id: '',
      blog_user_name: '',
      this_user_name: '',
      blog_id: -1,
      commentList: [],
      content: {
        text: this.value
      },
      mycomment: '',
      editorOption: {
        modules: {
          toolbar: []
        }
      },
      commenteditorOption: {
        placeholder: '请输入评论，需少于200字',
        modules: {
          toolbar: []
        }
      }
    }
  },
  created () {
    this.oncreate()
  },
  watch: {
    value (val) {
      this.content.text = this.value
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorFocus (editor) {
      // 富文本获得焦点时的事件
      editor.enable(false) // 在获取焦点的时候禁用
    },
    getCurrentTime () {
      var _this = this
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let hh = new Date().getHours()
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      _this.gettime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss
    },
    oncreate () {
      var _this = this
      _this.blog_id = JSON.parse(_this.$route.query.blog_id)
      _this.isadmin = JSON.parse(_this.$route.query.isadmin)

      if (!_this.isadmin) {
        if (JSON.stringify(window.sessionStorage.getItem('username' || '[]')) != 'null') {
          _this.this_user_name = JSON.parse(window.sessionStorage.getItem('username' || '[]'))
        }
      } else {
        if (JSON.stringify(window.sessionStorage.getItem('admin' || '[]')) == 'null') {
          _this.isadmin = false
        } else {
          _this.mycomment = '管理状态下不能提交评论'
        }
      }
      _this.btnChangeEnable = _this.isadmin

      _this.$axios.post('/select/article/page', {
        blog_id: _this.blog_id,
        page: 1,
        op: 'and'
      }).then(resp => {
        if (resp.data.code === 200) {
          console.log(resp.data.data)
          var datas = resp.data.data
          _this.content = datas[0]
          _this.blog_user_id = datas[0].user_id
          _this.blog_user_name = datas[0].username
        } else {
          _this.$alert('select failed!', {confirmButtonText: 'OK'})
        }
        _this.$axios.post('/select/comments/page', {
          cblog_id: _this.blog_id,
          page: 1,
          op: 'and',
          hardcond: 'cblog_id'
        }).then(resp => {
          if (resp.data.code === 200) {
            console.log(resp.data.data)
            var datas = resp.data.data
            var data0 = []
            for (var i = 0; i < datas.length - 1; i++) {
              data0[i] = datas[i]
            }
            _this.commentList = data0
            _this.pagetotal = parseInt(datas[datas.length - 1]['total'])
          } else {
            _this.$alert('select failed!', {confirmButtonText: 'OK'})
          }
        }).catch(failResponse => {})
      }).catch(failResponse => {})
    },
    page (currentPage) {
      var _this = this
      _this.$axios.post('/select/comments/page', {
        cblog_id: _this.blog_id,
        page: currentPage,
        op: 'and',
        hardcond: 'cblog_id'
      }).then(resp => {
        if (resp.data.code === 200) {
          console.log(resp.data.data)
          var datas = resp.data.data
          var data0 = []
          for (var i = 0; i < datas.length - 1; i++) {
            data0[i] = datas[i]
          }
          _this.commentList = data0
          _this.pagetotal = parseInt(datas[datas.length - 1]['total'])
        } else {
          _this.$alert('select failed!', {confirmButtonText: 'OK'})
        }
      }).catch(failResponse => {})
    },
    submit () {
      let _this = this
      if (_this.mycomment.length == 0) {
        _this.$alert('评论不能为空', {confirmButtonText: 'OK'})
        return
      } else if (_this.mycomment.length > 200) {
        _this.$alert('评论需少于200字', {confirmButtonText: 'OK'})
        return
      }
      this.$axios.post('/select/user', {
        username: _this.this_user_name
      }).then(resp => {
        if (resp.data.code === 200) {
          var datas = resp.data.data
          this.getCurrentTime()
          this.$axios.post('/add/comment', {
            content: this.mycomment.replace(/<[^>]+>/g, ''),
            cuser_id: datas[0].user_id,
            cblog_id: this.blog_id,
            comment_time: this.gettime
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$alert(resp.data.message, {confirmButtonText: 'OK'})
              this.mycomment = ''
            } else {
              this.$alert('发布失败! 原因: ' + resp.data.message, {confirmButtonText: 'OK'})
            }
          }).catch(failResponse => {})
        } else {
          this.$alert('获取当前用户ID异常！', {confirmButtonText: 'OK'})
        }
        this.oncreate()
      }).catch(failResponse => {})
    },
    ondelete (cid) {
      var _this = this
      _this.$confirm('是否要删除此评论', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$axios.post('/delete/comment', {
          comment_id: cid
        }).then(resp => {
          if (resp.data.code === 200) {
            _this.$alert('删除成功!', {confirmButtonText: 'OK'})
          } else {
            _this.$alert('删除失败!', {confirmButtonText: 'OK'})
          }
          this.oncreate()
        }).catch(failResponse => {})
      }).catch(() => {})
    },
    reportblog () {
      console.log(this.blog_id)
      console.log(this.blog_user_name)
      this.$router.push({path: '/home/showarticle/Report', query: {username: this.blog_user_name, blog_id: this.blog_id, content: this.content}})
    }
  }
}
</script>

<style lang="less" scoped>
.editor_wrap /deep/ .editor img {
  max-width: 720px;
  margin:10px;
}
.editor_wrap /deep/ .editor .ql-bubble .ql-editor a {
  color: #136ec2;
}
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
.el-button--success{
  float: right;
  padding-top: 10px;
  margin-right: 20px;
}
</style>
