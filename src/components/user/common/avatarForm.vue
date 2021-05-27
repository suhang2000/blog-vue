<template>
  <div>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      @close="clear">
      <div>
        <el-row>
          <el-col v-for="image in imageList" :key="image" :span="4">
<!--            <el-card>-->
              <el-image
                :src="image"
                style="height: auto;width: auto"
                @click="selectImage(image)">
              </el-image>
<!--            </el-card>-->
          </el-col>
        </el-row>
        <el-form>
          <el-form-item label="头像URL">
            <el-input v-model="imageURL" placeholder="请选择上面的头像或输入头像URL"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'avatarForm',
  data () {
    return {
      dialogVisible: false,
      imageURL: '',
      imageList: [
        '../static/avatar/1.jpg',
        '../static/avatar/2.jpg',
        '../static/avatar/3.jpg',
        '../static/avatar/4.jpg',
        '../static/avatar/5.jpg',
        '../static/avatar/6.jpg',
        '../static/avatar/7.jpg',
        '../static/avatar/8.jpg',
        '../static/avatar/9.jpg',
        '../static/avatar/10.jpg',
        '../static/avatar/11.jpg',
        '../static/avatar/12.jpg',
        '../static/avatar/13.jpg',
        '../static/avatar/14.jpg',
        '../static/avatar/15.jpg',
        '../static/avatar/16.jpg',
        '../static/avatar/17.jpg',
        '../static/avatar/18.jpg'
      ]
    }
  },
  methods: {
    clear () {
      this.imageURL = ''
    },
    onChange () {
      const _this = this
      this.$axios
        .post('/home/user/avatar', {
          username: _this.$store.state.username,
          profile_photo: _this.imageURL
        }).then(resp => {
          if (resp.status === 200) {
            _this.dialogVisible = false
            _this.$emit('onChange')
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
        })
    },
    selectImage (image) {
      this.imageURL = image
    }
  }
}
</script>

<style scoped>

</style>
