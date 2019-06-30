<template>
    <div>
        <div v-if="stocksData && stocksData.length > 0">
            <div class="data-row heading">
                <span>Stock Name</span>
                <span>Count</span>
                <span></span>
            </div>
            <div class="data-row" v-for="stock in stocksData" >
            	<span>{{stock.name}}</span>
            	<span>{{stock.count}}</span>
            	<span @click="getPrice(stock)">
            		<button>Sell</button>
            	</span>
            </div>
        </div>
        <div class="data-row bordered" v-else>
           <span>No Stocks in portfolio</span>
        </div>
    </div>
</template>

<script>
import { constants } from './../../constants';
import { getStockPrice } from './../../services';
const modalTypes = constants.modalTypes;
export default {
    props:{
        stocksData:Array,
        openModal:Function,
        toggleProgress:Function,
        toggleAlert:Function,
    },
    methods:{
        getPrice(stock){
          const symbol = stock.name;
          this.toggleProgress();
          getStockPrice(symbol)
          .then(res=>{
            if( res.data['Global Quote']){
              const data = res.data['Global Quote'];
              data.availableStock = stock.count;
              this.openModal({type:modalTypes.SELL,data:res.data['Global Quote']})
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
