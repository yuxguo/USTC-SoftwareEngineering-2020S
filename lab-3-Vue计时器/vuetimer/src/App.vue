<template>
  <div id="app">
    <top-bar :state="this.state" :dir="this.dir" :init-time="this.initTime" @countup="countUp" @countdown="countDown" @resume="resume" @pause="pause" @clear="clear" @restart="restart"></top-bar>
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
      curSecond: 0,
      millSecond: 0,
      timer: 0,
      interval: 5
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
      this.curHour = 0
      this.curMinute = 0
      this.curSecond = 0
      this.millSecond = 0
      this.timer = window.setInterval(this.timerHandler, this.interval)
    },
    countDown: function (data) {
      this.dir = 'down'
      this.state = 'timing'
      this.initHour = data[0]
      this.initMinute = data[1]
      this.initSecond = data[2]
      this.curHour = data[0]
      this.curMinute = data[1]
      this.curSecond = data[2]
      this.millSecond = 0
      this.timer = window.setInterval(this.timerHandler, this.interval)
    },
    resume: function () {
      this.state = 'timing'
      this.timer = window.setInterval(this.timerHandler, this.interval)
    },
    pause: function () {
      window.clearInterval(this.timer)
      this.state = 'pausing'
    },
    clear: function () {
      this.millSecond = 0
      window.clearInterval(this.timer)
      this.initHour = 0
      this.initMinute = 0
      this.initSecond = 0
      this.curHour = 0
      this.curMinute = 0
      this.curSecond = 0
      this.millSecond = 0
      this.state = 'before-start'
    },
    restart: function () {
      this.millSecond = 0
      this.curHour = (this.dir === 'up') ? 0 : this.initHour
      this.curMinute = (this.dir === 'up') ? 0 : this.initMinute
      this.curSecond = (this.dir === 'up') ? 0 : this.initSecond
      window.clearInterval(this.timer)
      this.timer = window.setInterval(this.timerHandler, this.interval)

      this.state = 'timing'
    },
    timerHandler: function () {
      if (this.millSecond > 999) {
        this.millSecond = 0
        if (this.dir === 'up') {
          let scarry = (this.curSecond === 59)
          this.curSecond = scarry ? 0 : this.curSecond + 1
          let mcarry = (scarry && this.curMinute === 59)
          this.curMinute = scarry ? (mcarry ? 0 : this.curMinute + 1) : this.curMinute
          this.curHour = mcarry ? (this.curHour + 1) : this.curHour
        } else {
          let scarry = (this.curSecond === 0)
          this.curSecond = scarry ? 59 : this.curSecond - 1
          let mcarry = (scarry && this.curMinute === 0)
          this.curMinute = scarry ? (mcarry ? 59 : this.curMinute - 1) : this.curMinute
          this.curHour = mcarry ? (this.curHour - 1) : this.curHour
        }
        if (this.dir === 'up' && this.curTime === this.initTime) {
          this.endTiming()
          window.clearInterval(this.timer)
        } else if (this.dir === 'down' && this.curTime === '00:00:00') {
          this.endTiming()
          window.clearInterval(this.timer)
        }
      } else {
        this.millSecond += this.interval
      }
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
