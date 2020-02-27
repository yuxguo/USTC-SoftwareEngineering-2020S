<template>
    <div class="inp-time">
        <input type="number" value="0" :id="inputTimeId" step="1" ><label :for="inputTimeId"><slot></slot></label>
    </div>
</template>

<script>
export default {
  name: 'InputTime',
  props: {
    inputTimeId: String
  }
}
</script>

<style scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
    .inp-time {
        display: inline-block;
        margin: 0px 17px 0px 0px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.10);
        border: none;
        border-radius: 5px;
        width: 70px;
        height: 40px;
        padding: 0;
    }
    .inp-time label {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #222222;
        width: 32px;
        height: 22px;
    }
    .inp-time input {
        border: none;
        font-family: PingFangSC-Regular;
        color: #AFAFAF;
        font-size: 16px;
        width: 20px;
        margin: 9px 13px 9px 9px;
    }

</style>
