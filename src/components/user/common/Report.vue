<template>
    <body id="paper">
  <el-form ref="reportInfo" :model="reportInfo" :rules="rules" class="regis-container" label-position="left"
           label-width="0px" v-loading="false">
    <h3 class="regis_title">将举报博客标题为：<br>{{ reportInfo.title }}</h3>
    <h3 class="regis_title">被举报用户为：<br>{{ reportInfo.username }}</h3>
    <el-form-item prop="reason">
      <el-input type="text" v-model="reportInfo.reason"
                auto-complete="off" placeholder="举报理由"></el-input>
    </el-form-item>
    <el-form-item prop="description">
      <div style="margin: 20px 0;"></div>
        <el-input
          type="textarea"
          placeholder="请输入详细描述"
          v-model="reportInfo.description"
          maxlength="500"
          auto-complete="off"
          show-word-limit
        >
        </el-input>
    </el-form-item>
    <el-radio v-model="reportInfo.type" label="1">低俗色情</el-radio>
    <el-radio v-model="reportInfo.type" label="2">血腥暴力</el-radio>
    <el-radio v-model="reportInfo.type" label="3">虚假信息</el-radio>
    <el-radio v-model="reportInfo.type" label="4">过激言论</el-radio>
    <el-radio v-model="reportInfo.type" label="5">涉政</el-radio>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="report('reportInfo')">举报</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'Report',
  data () {
    return {
      rules: {
        reason: [{required: true, message: '理由不得为空', trigger: 'blur'}],
        description: [{required: true, message: '请输入详细描述', trigger: 'blur'}]
      },
      reportInfo: {
        title: '',
        username: '',
        reason: '',
        description: '',
        type: '',
        blog_id: ''
      }
    }
  },
  created () {
    var temp = this.$route.query
    this.reportInfo.title = temp.content['title']
    this.reportInfo.username = temp.username
    this.reportInfo.blog_id = temp.blog_id
  },
  methods: {
    report (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.reportInfo.type !== '') {
          this.$message('举报成功')
          this.$axios.post('/report/article', {
            title: this.reportInfo.title,
            username: this.reportInfo.username,
            reason: this.reportInfo.reason,
            description: this.reportInfo.description,
            type: this.reportInfo.type,
            blog_id: this.reportInfo.blog_id
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$alert(resp.data.message, {confirmButtonText: 'OK'})
              this.$router.push('/home/blog')
            } else {
              this.$alert('举报失败!', {confirmButtonText: 'OK'})
            }
          })
            .catch(failResponse => {})
        } else if (this.reportInfo.type === '') {
          this.$alert('请输入举报类型!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.regis-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .regis_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #paper {
    /*background: url("../../../assets/regisBG.jpg") no-repeat center;*/
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0;
  }
  .describe {
    height: 50px;
  }
</style>
