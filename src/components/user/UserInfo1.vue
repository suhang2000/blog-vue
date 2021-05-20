<template >
  <div>
  <div class="background">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
  </div>
  <div class="front">
      <el-card  style lang="scss" class="box-card  "  >
  <div slot="header" class="clearfix" >
    <el-divider direction="vertical"></el-divider>
    <i class="el-icon-edit-outline"></i> <el-divider direction="vertical"></el-divider> <el-divider direction="vertical"></el-divider>
    <span style="font-size:20px">这是{{datas.username}}的个人信息</span>
  </div>
  <div class="text item"><i class="el-icon-user-solid"></i> <el-divider direction="vertical"></el-divider>
  用户昵称：{{datas.username}}<el-button style="float: right;padding:12px" size = "small" type="info" round  @click="open">修改</el-button>
  </div>
  <div class="text item"><i class="el-icon-s-check"></i> <el-divider direction="vertical"></el-divider>
  用户性别：{{datas.gender}} <el-button style="float: right;padding:12px" size = "small" type="info" round  @click="open1">修改</el-button>
  </div>
  <div class="text item"><i class="el-icon-phone"></i> <el-divider direction="vertical"></el-divider>
  用户电话：{{datas.phone_number}}  <el-button style="float: right;padding:12px" size = "small" type="info" round  @click="open2">修改</el-button>
  </div>
  <div class="text item"><i class="el-icon-picture"></i> <el-divider direction="vertical"></el-divider>用户头像：
  <div class="demo-image">
  <div class="block" v-for="fit in fits" :key="fit">
    <span class="demonstration"></span>
    <el-image
      style="width: 100px; height: 100px"
      :src="getImgUrl(datas.profile_photo)"
      :fit="fit"></el-image>
</div>
 </div>
<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-change="handleChange"
  :file-list="fileList">
  <el-button size="small" type="info" round>修改</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </div>
</el-card>
    </div>
    </div>
</template>

<script>
export default {
  name: 'UserInfo1',
  data () {
    return {
      imgSrc:require('../../assets/user/info_bg1.jpg'),
       fileList: {name: '', url: ''},
      datas: {
        username: '',
        gender: '',
        phone_number: '',
        profile_photo: ''
      },
      fits: ['fill'],
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
          _this.datas.profile_photo = resp.data.data[0].profile_photo
          console.log(_this.datas.username)
        } else {
        }
      })
      .catch(failResponse => {
        this.$message('服务器异常')
      })
  },
  methods: {
    getImgUrl (src) {
      return require('@/assets/user/' + src)
    },
     handleChange(file, fileList) {
      const _this = this
        this.fileList = fileList
       console.log(file)
        this.datas.profile_photo = URL.createObjectURL(file.raw)
       console.log(this.datas.profile_photo)
        this.$axios.get('/changephoto', {
            params: {
              photo: file.name,
              username: this.$store.state.username
            }
          })
            .then(resp => {
              if (resp.data.code === 200) {
                _this.datas.profile_photo = resp.data.data[0].profile_photo
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
      },
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
        }
        else if (value) {
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
              this.$message({
                  type: 'warning',
                  message: '请输入“F”或“M”'
                })
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
 .bg-purple-light {
    background: #e5e9f2;
  }
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
    min-width: 380px;
    margin-right: -500px;
    margin-top: 0%;
    height: 580px;
    width: 700px;
    background: transparent !important;

  }

.background{
    width:80%;
    height:80%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}

.front{
    z-index:1;
    position: absolute;

}

</style>
