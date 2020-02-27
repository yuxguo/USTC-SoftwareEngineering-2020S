<template>
  <div id="app">
    <top-bar :state="this.state" :dir="this.dir" @countup="countUp" @countdown="countDown" @resume="resume" @pause="pause" @clear="clear" @restart="restart"></top-bar>
    <time-show v-text="curTime"></time-show>
  </div>
</template>

<script>
import TopBar from './components/TopBar'
import TimeShow from './components/TimeShow'
export default {
  name: 'App',
  data: function () {
    return {
      state: 'before-start',
      dir: '',
      initHour: 0,
      initMinute: 0,
      initSecond: 0,
      curHour: 0,
      curMinute: 0,
      curSecond: 0
    }
  },
  computed: {
    initTime: function () {
      let mHour = (this.initHour < 10) ? ('0' + this.initHour.toString()) : this.initHour.toString()
      let mMinute = (this.initMinute < 10) ? ('0' + this.initMinute.toString()) : this.initMinute.toString()
      let mSecond = (this.initSecond < 10) ? ('0' + this.initSecond.toString()) : this.initSecond.toString()
      return mHour + ':' + mMinute + ':' + mSecond
    },
    curTime: function () {
      let mHour = (this.curHour < 10) ? ('0' + this.curHour.toString()) : this.curHour.toString()
      let mMinute = (this.curMinute < 10) ? ('0' + this.curMinute.toString()) : this.curMinute.toString()
      let mSecond = (this.curSecond < 10) ? ('0' + this.curSecond.toString()) : this.curSecond.toString()
      return mHour + ':' + mMinute + ':' + mSecond
    }
  },
  methods: {
    beforeStart: function () {
      this.state = 'before-start'
    },
    pausing: function () {
      this.state = 'pasuing'
    },
    timing: function () {
      this.state = 'timing'
    },
    endTiming: function () {
      this.state = 'end-timing'
    },
    countUp: function (data) {
      this.dir = 'up'
      this.state = 'timing'
      this.initHour = data[0]
      this.initMinute = data[1]
      this.initSecond = data[2]
    },
    countDown: function (data) {
      this.dir = 'down'
      this.state = 'timing'
      this.initHour = data[0]
      this.initMinute = data[1]
      this.initSecond = data[2]
    },
    resume: function () {
      this.state = 'timing'
    },
    pause: function () {
      this.state = 'pausing'
    },
    clear: function () {
      this.state = 'before-start'
    },
    restart: function () {
      this.state = 'timing'
    }

  },
  components: {
    TopBar,
    TimeShow
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  margin: 0;
}
</style>
