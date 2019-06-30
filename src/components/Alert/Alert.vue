<template>
  <div id="alert-container" :class="alertClass">
    <span>{{label}}</span>
    <span id="cross-icon" @click="hideAlert">x</span>
  </div>
</template>

<script>
export default {
  props:{
    isInfoAlert:{
      type:Boolean,
      default:false
    },
    label:{
      type:String,
      default:'Something went wrong'
    },
    hideAlert:Function
  },
  mounted(){
    setTimeout(()=>{
      this.hideAlert();
    },2000)
  },
  computed:{
    alertClass(){
      return this.isInfoAlert ? ['info'] : [];
    }
  }
}
</script>

<style>
@import './style.css';
</style>
