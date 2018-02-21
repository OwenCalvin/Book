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

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .textCenter {
    text-align: center;
  }
</style>
