<template>
  <div id="app">
    <Pager/>
  </div>
</template>

<script>
import Pager from './components/Pager.vue'

export default {
  name: 'App',
  components: { Pager }
}
</script>

<style lang="scss">
  @import './style/main.scss';
</style>
