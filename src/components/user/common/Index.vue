<template>
<div>
<search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
<!--  <Products class="products_area" ref="products"></Products>-->
</div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
  name: 'Index',
  components: {SearchBar},
  data () {
    return {
      // products: []
    }
  },
  methods: {
    searchResult () {
      const _this = this
      console.log(_this.$refs.searchBar.keywords)
      this.$axios
        .get('/home/search?keywords=' + this.$refs.searchBar.keywords, {
        }).then(resp => {
          if (resp && resp.status === 200) {
            // _this.products = resp.data
            _this.$refs.products.products = resp.data
            console.log(_this.$refs.products.products)
          }
        }).catch(failResponse => {
          _this.$message('服务器异常')
        })
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: auto;
  }

</style>
