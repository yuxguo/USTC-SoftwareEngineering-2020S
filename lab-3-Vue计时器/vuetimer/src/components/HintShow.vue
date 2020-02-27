<template>
    <div :id="hintId" class="hintshow"><slot></slot></div>
</template>

<script>
export default {
  name: 'HintShow',
  props: {
    hintId: {
      Type: String,
      default: 'hint'
    }
  }
}
</script>

<style scoped>
  .hintshow {
    display: inline-block;
    width: 170px;
    height: 16px;
    font-family: PingFangSC-Regular;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 16px;
    margin: 12px, 17px, 12px, 0;
    padding: 0;
  }
</style>
