<template>
  <div>
    <quillEditor
      v-model="articleform.title"
      ref="myQuillEditor1"
      :options="titleeditorOption"
    >
    </quillEditor>
    <br>
    <br>
    <quillEditor
      v-model="articleform.describe"
      ref="myQuillEditor2"
      :options="describeeditorOption"
    >
    </quillEditor>
    <br>
    <br>
    <quillEditor
      v-model="articleform.text"
      ref="myQuillEditor"
      :options="editorOption"
      style="height:400px"
    >
    </quillEditor>
    <div style="margin-top:80px;">
      <el-button type="primary" @click="submit">提交</el-button>
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
      blogInfo: {
        blog_id: ''
      },
      articleform:{
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
            var temp = this.$route.query.data;
            this.blogInfo.blog_id = temp.blog_id;
            this.articleform.title = temp.title;
            this.articleform.describe = temp.describe;
            this.articleform.text = temp.text;
        },
  methods: {
    submit () {
      if(this.articleform.title.length == 0){
        alert("标题不能为空");
        return;
      }
      if(this.articleform.describe.length == 0){
        alert("描述不能为空");
        return;
      }
      if(this.articleform.text.length == 0){
        alert("内容不能为空");
        return;
      }

      this.$axios.post('/fix/article', {
              blog_id: this.blogInfo.blog_id,
              title: this.articleform.title,
              describe: this.articleform.describe,
              text: this.articleform.text
          }).then(resp => {
        if (resp.data.code === 200) {
          this.$alert(resp.data.message, {confirmButtonText: 'OK'});
          this.$router.push({path: "/admin/Selectarticle"});
        }else {
          this.$alert('修改失败! 原因: '+resp.data.message, {confirmButtonText: 'OK'})
        }
      })
      .catch(failResponse => {})
      console.log(this.content)
    }
  }
}
</script>