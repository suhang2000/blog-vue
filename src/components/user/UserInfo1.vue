<template >
<el-card class="box-card">
  <div slot="header" class="clearfix" >
    <span style="font-size:20px">这是{{datas.username}}的个人信息</span>
  </div>
  <div class="text item">
  用户昵称：{{datas.username}}<el-button type="info" round  @click="open">修改</el-button>
  </div>
  <div class="text item">
  用户性别：{{datas.gender}} <el-button type="info" round  @click="open1">修改</el-button>
  </div>
  <div class="text item">
  用户电话：{{datas.phone_number}}  <el-button type="info" round  @click="open2">修改</el-button>
  </div>
  <div class="text item">用户头像：
 </div>

</el-card>
</template>

<script>
export default {
  name: 'UserInfo1',
  data () {
    return {
      datas: {
        username: '',
        gender: '',
        phone_number: '',
        profile_photo: ''
      },

      currentDate: new Date()
    }
  },
  created: function () {
    const _this = this
    this.$axios.get('/userInfo_select', {
      params: {
        username: this.$store.state.username
      }
    })
      .then(resp => {
        if (resp.data.code === 200) {
          _this.datas.username = resp.data.data[0].username
          _this.datas.gender = resp.data.data[0].gender
          _this.datas.phone_number = resp.data.data[0].phone_number
          console.log(_this.datas.username)
        } else {
        }
      })
      .catch(failResponse => {
        this.$message('服务器异常')
      })
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    open () {
      const _this = this
      this.$prompt('请输入新的昵称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (!value) {
          this.$message({
            type: 'info',
            message: '昵称不能为空'
          })
        } else if (value) {
          this.$axios.get('/changeusername', {
            params: {
              value: value,
              username: this.$store.state.username
            }
          })
            .then(resp => {
              if (resp.data.code === 400) {
                this.$message({
                  type: 'warning',
                  message: resp.data.message
                })
              }
              if (resp.data.code === 200) {
                _this.$router.replace('/login')
                this.$message({
                  type: 'success',
                  message: resp.data.message
                })
              } else {
              }
            })
            .catch(failResponse => {
              this.$message('服务器异常')
            })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    open1 () {
      const _this = this
      this.$prompt('请输入新的性别', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (!value) {
          this.$message({
            type: 'info',
            message: '性别不能为空'
          })
        } else if (value) {
          this.$axios.get('/changegender', {
            params: {
              value: value,
              username: this.$store.state.username
            }
          })
            .then(resp => {
              if (resp.data.code === 400) {
                this.$message({
                  type: 'warning',
                  message: resp.data.message
                })
              }
              if (resp.data.code === 200) {
                _this.datas.gender = resp.data.data[0].gender
                _this.$router.replace('/home/userInfo/UserInfo1')
                this.$message({
                  type: 'success',
                  message: resp.data.message
                })
              } else {
              }
            })
            .catch(failResponse => {
              this.$message('服务器异常')
            })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    open2 () {
      const _this = this
      this.$prompt('请输入新的电话', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (!value) {
          this.$message({
            type: 'info',
            message: '电话不能为空'
          })
        } else if (value) {
          this.$axios.get('/changenum', {
            params: {
              value: value,
              username: this.$store.state.username
            }
          })
            .then(resp => {
              if (resp.data.code === 400) {
                this.$message({
                  type: 'warning',
                  message: resp.data.message
                })
              }
              if (resp.data.code === 200) {
                _this.datas.phone_number = resp.data.data[0].phone_number
                _this.$router.replace('/home/userInfo/UserInfo1')
                this.$message({
                  type: 'success',
                  message: resp.data.message
                })
              } else {
              }
            })
            .catch(failResponse => {
              this.$message('服务器异常')
            })
        }
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    }
  },
  extent (list) {
    var height = 50 * list.length
    return `height: ${height}px; line-height: ${height}px;`
  }

}

</script>

<style>
  .text {
    font-size: 18px;
  }

  .item {
    margin-bottom: 50px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 800px;
  }
   .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 25px;
    line-height: 50px;
  }

  .image {
    width: 30%;
    height:50%;
    display: block;
    content:"";
    vertical-align: middle
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  .content{
    display: inline-block;
    vertical-align: middle
  }

</style>
