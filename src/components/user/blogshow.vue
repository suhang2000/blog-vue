<template>
   <div class="editor_wrap" style="align:center">
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
    <quillEditor
      v-model="mycomment"
      ref="myQuillEditor2"
      style="margin:0 auto; width:40%"
      :options="commenteditorOption"
      @change="onEditorChange($event)"
    >
    </quillEditor>
    </div>
    <div style="margin-top:40px;">
      <el-button type="primary" :disabled="btnChangeEnable" @click="submit">提交评论</el-button>
    </div>
    <ul class="list">
      <li v-for="item in commentList" :key="item.comment_id" class="item">
          <el-link :underline="false">
              <div class="content">
                  <p class="description">{{item.content}}</p>
                  <div class="meta">
                      <span>用户： {{item.username}}</span>
                      <span v-if="item.comment_time" class="time">{{item.comment_time}}</span>
                  </div>
              </div>
          </el-link>
      </li>
    </ul>
  </div>
</template>
<script>
// 工具栏配置
const toolbarOptions = [];

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name:'blogshow',
  props: {
    /*编辑器的内容*/
    value: null
  },
  components: {
    quillEditor
  },
  watch: {
    value(val) {
      this.content.text = this.value;
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {

    var _this = this;
    _this.blog_id = _this.$route.query.blog_id;
    _this.isadmin = _this.$route.query.isadmin;

    _this.$axios
            .post('/select/article/page',{
          blog_id: _this.blog_id,
          page: 1,
          op: "and"
      }).then(resp => {
      if (resp.data.code === 200) {
        console.log(resp.data.data);
        var datas = resp.data.data;
        _this.content = datas[0];
        _this.blog_user_id = datas[0].user_id;
      }else {
        _this.$alert('select failed!', {confirmButtonText: 'OK'})
      }


    })
    .catch(failResponse => {})
  },
  data() {
    return {
      isadmin: false,
      btnChangeEnable: false,
      blog_user_id: '',
      blog_user_name: '',
      blog_id: '',
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
        placeholder: '请输入评论',
        modules: {
          toolbar: []
        }
      },
      commentList: [
      ]
    };
  },
  methods: {
    onEditorFocus(editor) {
      // 富文本获得焦点时的事件
      editor.enable(false); // 在获取焦点的时候禁用
    }
  }
};
</script>

<style scoped>
.editor_wrap /deep/ .editor img {
  max-width: 720px;
  margin:10px;
}
.editor_wrap /deep/ .editor .ql-bubble .ql-editor a {
  color: #136ec2;
}
</style>
