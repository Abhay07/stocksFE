<template>
  <div class="overlay" @click="hideModal">
    <form @click="stopPropagate" id="modal-form" @submit="preventDefault" v-if="type == modalTypes.BUY">
      <span>Buy Stocks</span>
      <span class="label">Name</span>
      <input type="text" placeholder="Stock Name" :value="modalData['01. symbol']" readonly/>
      <span class="label">Price</span>
      <input type="text" placeholder="Stock Name" :value="modalData['05. price']" readonly/>
      <span class="label">Count</span>
      <input type="number" placeholder="No. of Stocks"  v-model="stockCount"/>
      <button @click="buyStock">Submit</button>
    </form>
    <form @click="stopPropagate" id="modal-form" @submit="preventDefault" v-else-if="type == modalTypes.SELL">
      <span>Sell Stocks</span>
      <span class="label">Name</span>
      <input type="text" placeholder="Stock Name" :value="modalData['01. symbol']" readonly/>
      <span class="label">Price</span>
      <input type="text" placeholder="Stock Name" :value="modalData['05. price']" readonly/>
      <span class="label">Count</span>
      <input type="number" placeholder="No. of Stocks"  v-model="stockCount"/>
      <button @click="sellStock">Submit</button>
    </form>
    <form @click="stopPropagate" id="modal-form" @submit="preventDefault" v-else-if="type == modalTypes.ADDBALANCE">
      <span>Add Balance</span>
      <input type="text" placeholder="Type Amount" name="mealname" v-model="balanceInput"/>
      <button @click="addBalance">Submit</button>
    </form>
    <form @click="stopPropagate" id="modal-form" @submit="preventDefault" v-else-if="type == modalTypes.REMOVEBALANCE">
      <span>Remove Balance</span>
      <input type="text" placeholder="Type Amount" name="mealname" v-model="balanceInput"/>
      <button @click="removeBalance">Submit</button>
    </form>
  </div>
</template>

<script>
import { constants } from './../../constants';
const modalTypes = constants.modalTypes;
import { updateBalance, buyStock, sellStock} from './../../services';
export default {
  props:{
  	hideModal:Function,
    toggleAlert:Function,
    toggleProgress:Function,
    getMeals:Function,
    selectedMeal:Object,
    setCashBalance:Function,
    type:Number,
    cashBalance:Number,
    modalData:Object,
    getPortfolio:Function,
  },
  created(){
    if(this.type == modalTypes.SELL){
      this.stockCount = this.modalData.availableStock;
    }
  },
  data:()=>({
    balanceInput:0,
    modalTypes,
    stockCount:0,
  }),
  computed:{
    updatedAddBalance(){
      return (Number(this.cashBalance) + Number(this.balanceInput));
    },
    updatedRemoveBalance(){
      return (Number(this.cashBalance) - Number(this.balanceInput));
    }
  },
  methods:{
  	stopPropagate(event){
  		event.stopPropagation();
  	},
    preventDefault(event){
      event.preventDefault();
    },
    addBalance(){
      if(isNaN(this.balanceInput) || this.balanceInput <= 0){
        this.toggleAlert('Please add valid balance');
        return;
      }
      this.toggleProgress();
      updateBalance({"balance":this.updatedAddBalance})
      .then(resp=>{
        this.toggleAlert('Balance added successfully',true);
        this.setCashBalance(this.updatedAddBalance);
        this.hideModal();
      })
      .catch(err=>{
        this.toggleAlert((err.response && err.response.data && err.response.data.error) || 'Balance could not be updated');
      })
      .finally(_=>{
        this.toggleProgress();
      })
    },
    removeBalance(){
      if(isNaN(this.balanceInput) || this.balanceInput <= 0){
        this.toggleAlert('Please add valid balance');
        return;
      }
      else if(this.balanceInput > this.cashBalance){
        this.toggleAlert('Insufficient Balance');
        return;
      }
      this.toggleProgress();
      updateBalance({"balance":this.updatedRemoveBalance})
      .then(resp=>{
        this.toggleAlert('Balance removed successfully',true);
        this.setCashBalance(this.updatedRemoveBalance);
        this.hideModal();
      })
      .catch(err=>{
        this.toggleAlert((err.response && err.response.data && err.response.data.error) || 'Balance could not be updated');
      })
      .finally(_=>{
        this.toggleProgress();
      })
    },
    buyStock(){
      if(isNaN(this.stockCount) || this.stockCount < 1){
        this.toggleAlert('Please enter valid stock count');
        return;
      }
      else if(Number(this.stockCount) > Number(this.modalData['06. volume'])){
        this.toggleAlert('Please enter lesser stocks to buy');
        return;
      }
      const data = {
        name:this.modalData['01. symbol'],
        count:Number(this.stockCount)
      }
      this.toggleProgress();
      buyStock(data)
      .then((res)=>{
        this.getPortfolio();
        this.toggleAlert('Stock bought successfully', true);
        this.hideModal();
      })
      .catch(err=>{
        this.toggleAlert((err.response && err.response.data && err.response.data.error) ||  'Stock could not be bought');
      })
      .finally(_=>{
        this.toggleProgress();
      })
    },
    sellStock(){
      if(isNaN(this.stockCount) || this.stockCount < 1){
        this.toggleAlert('Please enter valid stock count');
        return;
      }
      else if(Number(this.stockCount) > Number(this.modalData['availableStock'])){
        this.toggleAlert('You dont have sufficient stock');
        return;
      }
      const data = {
        name:this.modalData['01. symbol'],
        count:Number(this.stockCount)
      }
      this.toggleProgress();
      sellStock(data)
      .then((res)=>{
        this.getPortfolio();
        this.toggleAlert('Stock sold successfully', true);
        this.hideModal();
      })
      .catch(err=>{
        console.log(err.response);
        this.toggleAlert((err.response && err.response.data && err.response.data.error) || 'Stock could not be sold');
      })
      .finally(_=>{
        this.toggleProgress();
      })
    }
  }
}
</script>

<style>
@import './style.css';
</style>
