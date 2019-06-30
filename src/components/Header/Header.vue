<template>
  <div>
    <div class="header">
      Stocks Portfolio
    </div>
    <div class="sub-header">
        Cash Balance: <b> {{formattedBalance}} </b>
        <button @click="openModal({type:modalTypes.ADDBALANCE})">Add Balance</button>
        <button @click="openModal({type:modalTypes.REMOVEBALANCE})">Remove Balance</button>
    </div>
  </div>
</template>

<script>
import { constants } from './../../constants';
const modalTypes = constants.modalTypes;
export default {
props:{
  cashBalance:Number,
  toggleAlert:Function,
  toggleProgress:Function,
  openModal:Function,
  },
  data:()=>({
    modalTypes
  }),
  computed:{
    formattedBalance(){
      if(this.cashBalance){
        return this.cashBalance.toFixed(2);
      }
      return 'NA'
    }
  }
}
</script>

<style>
@import './style.css'
</style>
