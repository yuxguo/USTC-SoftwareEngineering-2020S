<template>
    <div v-text="curTime" id="time">
    </div>
</template>

<script>
export default {
  name: 'TimeShow',
  data: function () {
    return {
      hour: 0,
      minute: 0,
      second: 0
    }
  },
  computed: {
    curTime: function () {
      let mHour = (this.hour < 10) ? ('0' + this.hour.toString()) : this.hour.toString()
      let mMinute = (this.minute < 10) ? ('0' + this.minute.toString()) : this.minute.toString()
      let mSecond = (this.second < 10) ? ('0' + this.second.toString()) : this.second.toString()
      return mHour + ':' + mMinute + ':' + mSecond
    }
  }
}
</script>

<style scoped>
     div {
        width: 960px;
        height: 200px;
        background-color: #f2f4f7;
        padding: 127px 130px 113px 130px;
        margin: 0px;
        border: none;
        font-family: PTMono-Bold;
        color: #333333;
        font-size: 200px;
        text-align: center;
        line-height: 200px;
     }
</style>
