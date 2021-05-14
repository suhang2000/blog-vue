<template>
  <div><h1>{{ tableData.username }}</h1></div>

</template>

<script>
export default {
  name: 'UserInfo2.vue',
  data () {
    return {
      tableData:
        {
          username: ''
        }


    }
  },
   created: function () {
    this.$axios.get('/userInfo_select', {
      params: {
        username: this.$store.state.username
      }
    })
      .then(resp => {
        if (resp.data.code === 200) {
          this.tableData.username = resp.data.username
          console.log(this.tableData.username)
        } else {
        }
      })
      .catch(failResponse => {
        this.$message('服务器异常')
      })
  }
}
</script>

<style scoped>

</style>
