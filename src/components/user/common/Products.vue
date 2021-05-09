<template>
  <div>
    <el-row style="position: absolute;left: 350px">
      <el-tooltip effect="dark" placement="right"
                  v-for="item in products.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :key="item.pid">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">详情：{{item.description}}</p>
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">剩余数量：{{item.number}}</p>
<!--        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">图片：{{item.cover}}</p>-->
        <el-card style="margin-bottom: 20px;float: left;margin-right: 15px;height: 300px;width: 300px"
                 bodyStyle="padding:0px" shadow="hover">
<!--          在此将图片src改为item.cover-->
<!--          <img src="item.cover" alt="没有图片" class="cover">-->
          <el-image :src="item.cover" class="cover" style="width: 200px;height: 200px">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div style="padding: 14px;">
            <span>{{item.pname}}</span>
            <div class="bottom clearfix">
              <div class="price">
                <i class="el-icon-price-tag"></i>
                ￥{{item.price}}
                <el-button type="text" class="el-icon-shopping-cart-2" @click="addCart(item)" style="font-size: 20px"
                v-show="isLogin"></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row style="position:absolute;bottom:-400px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="products.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      products: [],
      currentPage: 1,
      pageSize: 8,
      isLogin: false,
      uname: ''
    }
  },
  mounted: function () {
    if (this.$store.state.user.name) {
      this.uname = this.$store.state.user.name
      this.isLogin = true
      // console.log('是否登录')
      // console.log(this.isLogin)
      // console.log(this.uname)
    }
    this.loadProducts()
  },
  methods: {
    loadProducts () {
      const _this = this
      this.$axios.get('/home/products').then(resp => {
        if (resp && resp.status === 200) {
          _this.products = resp.data
          console.log(_this.products)
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    addCart (item) {
      const _this = this
      this.$axios
        .post('/list/addCart', {
          pid: item.pid,
          myName: _this.$store.state.user.name
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message.info('已添加')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }
  a {
    text-decoration: none;
  }
  a:link, a:visited, a:focus {
    color: #3377aa;
  }
  .price {
    font-size: 20px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .cover {
    /*width: 50%;*/
    /*display: block;*/
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
