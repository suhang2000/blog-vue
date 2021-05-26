<template>
  <body id="poster">
  </body>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    var _this = this
    this.$axios
      .post('/verifyToken', {
        token: this.$route.query.token
      })
      .then(resp => {
        this.$alert(resp.data.message, '提示', {
          confirmButtonText: '确定'
        })
        const path = _this.$route.query.redirect
        _this.$router.replace({path: path === '/' || path === undefined ? '/login' : path})
      })
      .catch(failResponse => {
        this.$message('服务器异常')
      })
  },
  methods: {
  }
}
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #poster {
    background: url("../../assets/loginBG.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0;
  }
</style>
