<template>
    <body id="paper">
  <el-form class="regis-container" label-position="left"
           label-width="0px" v-loading="false">
    <h3 class="regis_title">文章标题：{{ title }}</h3>
    <div class="block">
      <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
    </div>
    <el-col :span="24"><div class="grid-content">被举报用户：{{ username }}</div></el-col>
    <el-col :span="24"><div class="grid-content">类型：{{ type }}</div></el-col>
    <el-col :span="24"><div class="grid-content">举报理由：{{ reason }}</div></el-col>
    <el-col :span="24"><div class="grid-content">详细描述： <p>{{ description }}</p></div></el-col>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 30%;background: #505458;border: none" @click="gotodeal">查找该博客</el-button>
      <el-button type="primary" style="width: 30%;background: #505458;border: none" @click="gotouser">查找该用户</el-button>
      <el-button type="primary" style="width: 25%;background: #505458;border: none" @click="goback">返回</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      id: '',
      title: '',
      username: '',
      reason: '',
      description: '',
      type: '',
      blog_id: ''
    }
  },
  created () {
    var temp = this.$route.query.data
    console.log(temp)
    this.id = temp.report_id
    this.title = temp.title
    this.username = temp.username
    this.reason = temp.reason
    this.description = temp.description
    this.blog_id = temp.blog_id
    if (temp.type === '1') { this.type = '色情低俗' };
    if (temp.type === '2') { this.type = '血腥暴力' };
    if (temp.type === '3') { this.type = '虚假信息' };
    if (temp.type === '4') { this.type = '过激言论' };
    if (temp.type === '5') { this.type = '涉政' };
  },
  methods: {
    gotodeal () {
      // console.log(this.blog_id)
      this.$router.push({path: '/admin/Selectarticle', query: {id: this.blog_id}})
    },
    gotouser () {
      this.$router.push({path: '/admin/Selectuser', query: {username: this.username}})
    },
    goback () {
      this.$router.push({path: '/admin/Selectreport'})
    }
  }
}
</script>

<style scoped>
.regis-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 10% 25%;
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
    /*background: url("../../assets/regisBG.jpg") no-repeat center;*/
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0;
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
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
