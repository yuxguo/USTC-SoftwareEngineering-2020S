<template>
    <div>
        <control-btn btn-class="btn1" btn-id="countup">开始正计时</control-btn>
        <control-btn btn-class="btn1" btn-id="countdown">开始倒计时</control-btn>
        <control-btn btn-class="btn1" btn-id="resume">恢复计时器</control-btn>
        <control-btn btn-class="btn1" btn-id="pause">暂停计时器</control-btn>
        <control-btn btn-class="btn3" btn-id="restart">重新再记时</control-btn>
        <control-btn btn-class="btn2" btn-id="clear">清空正计时</control-btn>
    </div>
</template>

<script>
import ControlBtn from './ControlBtn'
export default {
  name: 'TopBar',
  components: {
    ControlBtn
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
