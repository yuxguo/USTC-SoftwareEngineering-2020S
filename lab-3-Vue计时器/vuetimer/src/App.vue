<template>
  <div id="app">
    <top-bar></top-bar>
    <time-show></time-show>
  </div>
</template>

<script>
import TopBar from './components/TopBar'
import TimeShow from './components/TimeShow'
export default {
  name: 'App',
  components: {
    TopBar,
    TimeShow
  }
}
</script>

<style>
#app {
  margin: 0px;
}
</style>
