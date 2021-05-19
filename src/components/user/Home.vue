<template>
  <div>
    <Menu></Menu>
    <router-view/>
  </div>
</template>

<script>
import Menu from './common/Menu'

export default {
  name: 'Home',
  components: {Menu},
   provide(){
    return {
      reload: this.reload
    }
  },

  data(){
    return {
      isRouterAlive: true
    }
  },


  methods: {}
}
</script>

<style scoped>

</style>
