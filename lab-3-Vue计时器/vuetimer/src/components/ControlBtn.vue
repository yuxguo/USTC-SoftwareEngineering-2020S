<template>
    <button class="btn" type="button" :class="btnClass" :id="btnId" @click="btnClick"><slot></slot></button>
</template>

<script>
export default {
  name: 'ControlBtn',
  methods: {
    btnClick: function () {
      this.$emit(this.btnId)
    }
  },
  props: {
    btnClass: {
      type: String,
      default: 'btn1'
    },
    btnId: String
  }

}
</script>

<style scoped>
    .btn {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color:white;
        border-radius: 5px;
        border: none;
        border-width: 0;
        width: 98px;
        height: 40px;
        margin: 0 17px 0 0;
        padding: 0;
    }
    .btn1 {
        background-color: #2188e9;
    }
    .btn2 {
        background-color: #DD2E1D;
        margin-right: 17px;
        float: right;
    }
    .btn3 {
        background-color: #FFB020;
        margin-right: 17px;
        float: right;
    }
</style>
