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
  data () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
