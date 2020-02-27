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
    min-width: 0;
    max-width: 180px;
    height: 16px;
    font-family: PingFangSC-Regular;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 16px;
    padding: 0;
    margin-right: 17px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
</style>
