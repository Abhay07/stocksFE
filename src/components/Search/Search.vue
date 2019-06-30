<template>
  <div class="searchWrapper">
    <strong>Search Stocks</strong>
    <div class="searchContainer">
    <input type="text" placeholder="Type Stock name" v-model="searchText" @input="inputHandler"/>
    <span>&#128269;</span>
    <ul class="searchList" v-if="loadingText">
      <li >{{loadingText}}</li>
    </ul>
    <ul class="searchList" v-else="loadingText">
      <li v-for="stock in stocksList" @click="selectStock(stock)">{{stock['1. symbol']+' '+ stock['2. name']}}</li>
    </ul>
    </div>
  </div>
</template>

<script>
import { searchStocks, getStockPrice } from './../../services';
import { constants } from './../../constants';
const modalTypes = constants.modalTypes;
export default {
  props:{
    toggleAlert:Function,
    toggleProgress:Function,
    openModal:Function,
  },
  data:()=>({
    stocksList:null,
    callAllowed:true,
    searchText:null,
    loadingText:null,
    typeTimer:null,
    modalTypes,
  }),
  created(){
    document.addEventListener('click',(e)=>{
      e.stopPropagation();
      this.stocksList = null;
    })
  },
  methods:{
    inputHandler(){
      if(this.searchText.length > 2){
          clearTimeout(this.typeTimer);
          this.typeTimer = setTimeout(()=>{
            this.loadingText = 'Searching';
            searchStocks(this.searchText)
            .then((res)=>{
              if(res.data && res.data.bestMatches){
                this.stocksList = res.data.bestMatches;
                this.loadingText = null;
              }
              else{
                this.loadingText = 'Stock cannot be found';
              }
            })
            .catch(_=>{
              this.loadingText = 'Stock cannot be found';
            })
          },1000)
      }
    },
    selectStock(stock){
      const symbol = stock['1. symbol']
      this.toggleProgress();
      getStockPrice(symbol)
      .then(res=>{
        if( res.data['Global Quote']){
          this.openModal({type:modalTypes.BUY,data:res.data['Global Quote']})
          this.stocksList = null;
        }
        else{
          throw '';
        }
      })
      .catch(err=>{
        this.toggleAlert(err.error || 'Cannot get price')
      })
      .finally(_=>{
        this.toggleProgress();
      })
    }
  }
}
</script>

<style>
@import './style.css'
</style>
