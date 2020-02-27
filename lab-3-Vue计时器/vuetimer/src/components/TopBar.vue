<template>
    <div>
        <hint-show hint-id="hint">la</hint-show>
        <input-time input-time-id="hour">时</input-time>
        <input-time input-time-id="minute">分</input-time>
        <input-time input-time-id="second">秒</input-time>
        <control-btn btn-class="btn1" btn-id="countup">开始正计时</control-btn>
        <control-btn btn-class="btn1" btn-id="countdown">开始倒计时</control-btn>
        <control-btn btn-class="btn1" btn-id="resume">恢复计时器</control-btn>
        <control-btn btn-class="btn1" btn-id="pause">暂停计时器</control-btn>
        <control-btn btn-class="btn3" btn-id="restart">重新再记时</control-btn>
        <control-btn btn-class="btn2" btn-id="clear">清空正计时</control-btn>
    </div>
</template>

<script>
import HintShow from './HintShow'
import InputTime from './InputTime'
import ControlBtn from './ControlBtn'
export default {
  name: 'TopBar',
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
