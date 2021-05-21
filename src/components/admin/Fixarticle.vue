  <!--<template>
  <div>
    <quillEditor
      v-model="articleform.title"
      ref="myQuillEditor1"
      :options="titleeditorOption"
      @change="onEditorChange($event)"
    >
    </quillEditor>
    <br>
    <br>
    <quillEditor
      v-model="articleform.describe"
      ref="myQuillEditor2"
      :options="describeeditorOption"
      @change="onEditorChange($event)"
    >
    </quillEditor>
    <br>
    <br>
    <quillEditor
      v-model="articleform.text"
      ref="myQuillEditor"
      :options="editorOption"
      style="height:400px"
      @change="onEditorChange($event)"
    >
    </quillEditor>
    <div style="margin-top:80px;">
      <el-button type="primary" :disabled="btnChangeEnable" @click="submit">提交</el-button>
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
      isnew : false,
      isadmin: false,
      btnChangeEnable: true,
      user_id: '',
      gettime: '',
      blogInfo: {
        blog_id: ''
      },
      articleform:{
        title: '',
        describe: '',
        text: ''
      },
      temp:{
        title: '',
        describe: '',
        text: ''
      },
      editorOption: {
        placeholder: '请输入文章内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
      },
      titleeditorOption: {
        placeholder: '请输入文章标题',
        modules: {
          toolbar: []
        }
      },
      describeeditorOption: {
        placeholder: '请输入文章描述',
        modules: {
          toolbar: []
        }
      }
    }
  },
  created() {
    this.temp = this.$route.query.data;
    this.isadmin = this.$route.query.admin;
    if(this.temp.blog_id === undefined){
      this.user_id=this.temp.user_id;
      this.isnew=true;
    }else{
      this.isnew=false;
      this.blogInfo.blog_id = this.temp.blog_id;
      this.articleform.title = this.temp.title;
      this.articleform.describe = this.temp.describe;
      this.articleform.text = this.temp.text;
    }
  },
  methods: {
    onEditorChange() {
      var _this = this;
      _this.btnChangeEnable=false;
    },
    getCurrentTime() {
      var _this = this;
  　　let yy = new Date().getFullYear();
  　　let mm = new Date().getMonth()+1;
  　　let dd = new Date().getDate();
  　　let hh = new Date().getHours();
  　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
  　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
  　　_this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
    },
    submit () {
      if(this.articleform.title.length == 0){
        this.$alert("标题不能为空", {confirmButtonText: 'OK'});
        return;
      }
      if(this.articleform.describe.length == 0){
        this.$alert("描述不能为空", {confirmButtonText: 'OK'});
        return;
      }
      if(this.articleform.text.length == 0){
        this.$alert("内容不能为空", {confirmButtonText: 'OK'});
        return;
      }

      if((this.articleform.title==this.temp.title) && (this.articleform.describe==this.temp.describe) && (this.articleform.text==this.temp.text)){
        this.$alert("内容必须有改动", {confirmButtonText: 'OK'});
        return;
      }

      if(this.isnew){
        this.getCurrentTime();
        this.$axios.post('/add/article', {
                title: this.articleform.title,
                describe: this.articleform.describe,
                text: this.articleform.text,
                user_id: this.user_id,
                public_time: this.gettime
            }).then(resp => {
          if (resp.data.code === 200) {
            this.$alert(resp.data.message, {confirmButtonText: 'OK'});
            this.$router.push({path: "/home/cart"});
          }else {
            this.$alert('发布失败! 原因: '+resp.data.message, {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
      }else{
        this.$axios.post('/fix/article', {
                blog_id: this.blogInfo.blog_id,
                title: this.articleform.title,
                describe: this.articleform.describe,
                text: this.articleform.text
            }).then(resp => {
          if (resp.data.code === 200) {
            this.$alert(resp.data.message, {confirmButtonText: 'OK'});
            if(this.isadmin){
              this.$router.push({path: "/admin/Selectarticle"});
            }else{
              this.$router.push({path: "/home/Selectarticle"});
            }
          }else {
            this.$alert('修改失败! 原因: '+resp.data.message, {confirmButtonText: 'OK'})
          }
        })
        .catch(failResponse => {})
      }
    }
  }
}
</script>
