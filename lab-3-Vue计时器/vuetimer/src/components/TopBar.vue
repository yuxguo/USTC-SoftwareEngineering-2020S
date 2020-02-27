<template>
    <div>
        <hint-show hint-id="hint" v-show="this.state !='before-start'" v-text="hintMsg"></hint-show>
        <input-time input-time-id="hour" v-show="this.state =='before-start'" @hour-change="hourChange">时</input-time>
        <input-time input-time-id="minute" v-show="this.state =='before-start'" @minute-change="minuteChange">分</input-time>
        <input-time input-time-id="second" v-show="this.state =='before-start'" @second-change="secondChange">秒</input-time>
        <control-btn btn-class="btn1" btn-id="countup" @countup="countUpClick" v-show="this.state =='before-start'">开始正计时</control-btn>
        <control-btn btn-class="btn1" btn-id="countdown" @countdown="countDownClick" v-show="this.state =='before-start'">开始倒计时</control-btn>
        <control-btn btn-class="btn1" btn-id="resume" @resume="$emit('resume')" v-show="this.state =='pausing'">恢复计时器</control-btn>
        <control-btn btn-class="btn1" btn-id="pause" @pause="$emit('pause')" v-show="this.state =='timing'">暂停计时器</control-btn>
        <control-btn btn-class="btn3" btn-id="restart" @restart="$emit('restart')" v-show="this.state !='before-start'">重新再记时</control-btn>
        <control-btn btn-class="btn2" btn-id="clear" @clear="$emit('clear')" v-show="this.state !='before-start'" v-text="clearBtnMsg"></control-btn>
    </div>
</template>

<script>
import HintShow from './HintShow'
import InputTime from './InputTime'
import ControlBtn from './ControlBtn'
export default {
  name: 'TopBar',
  data: function () {
    return {
      hour: '0',
      minute: '0',
      second: '0'
    }
  },
  props: {
    state: String,
    dir: String,
    initTime: {
      Type: String,
      default: '00:00:00'
    }
  },
  methods: {
    hourChange: function (data) {
      this.hour = data
    },
    minuteChange: function (data) {
      this.minute = data
    },
    secondChange: function (data) {
      this.second = data
    },
    countUpClick: function () {
      let result = this.parseParam()
      if (result !== false) {
        this.$emit('countup', result)
      }
    },
    countDownClick: function () {
      let result = this.parseParam()
      if (result !== false) {
        this.$emit('countdown', result)
      }
    },
    parseParam: function () {
      let hour = this.hour
      let minute = this.minute
      let second = this.second
      if (hour === '' || minute === '' || second === '' ||
        parseInt(hour) < 0 || parseInt(minute) < 0 || parseInt(second) < 0 ||
        (parseInt(hour) === 0 && parseInt(minute) === 0 && parseInt(second) === 0) ||
        hour.indexOf('.') !== -1 || minute.indexOf('.') !== -1 || second.indexOf('.') !== -1 ||
        hour.indexOf('e') !== -1 || minute.indexOf('e') !== -1 || second.indexOf('e') !== -1 ||
        hour.indexOf('E') !== -1 || minute.indexOf('E') !== -1 || second.indexOf('E') !== -1) {
        alert('参数不合法 ' + hour + ':' + minute + ':' + second)
        return false
      } else if (parseInt(hour) > 99 || parseInt(minute) > 59 || parseInt(second) > 59) {
        hour = (parseInt(hour) > 99) ? 99 : parseInt(hour)
        minute = (parseInt(minute) > 59) ? 59 : parseInt(minute)
        second = (parseInt(second) > 59) ? 59 : parseInt(second)
        return [hour, minute, second]
      } else {
        return [parseInt(hour), parseInt(minute), parseInt(second)]
      }
    }
  },
  computed: {
    hintMsg: function () {
      let msg = ''
      if (this.state === 'timing') {
        msg = (this.dir === 'up') ? ('正在正计时 ' + this.initTime) : ('正在倒计时 ' + this.initTime)
      } else if (this.state === 'pausing') {
        msg = (this.dir === 'up') ? ('暂停正计时 ' + this.initTime) : ('暂停倒计时 ' + this.initTime)
      } else if (this.state === 'end-timing') {
        msg = (this.dir === 'up') ? ('正计时 ' + this.initTime + '已结束') : ('倒计时 ' + this.initTime + '已结束')
      }
      return msg
    },
    clearBtnMsg: function () {
      return (this.dir === 'up') ? '清空正计时' : '清空倒计时'
    }
  },
  components: {
    ControlBtn,
    InputTime,
    HintShow
  }
}
</script>

<style scoped>
    div {
        width: 1140px;
        height: 40px;
        padding: 15px 40px 15px 40px;
        background-color: #97a5bc;
    }
</style>
