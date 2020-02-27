<template>
    <div id="time"><slot></slot></div>
</template>

<script>
export default {
  name: 'TimeShow'
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
