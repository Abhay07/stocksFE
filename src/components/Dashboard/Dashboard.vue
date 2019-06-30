<template>
  <div>
    <Header 
      :cashBalance="cashBalance"
      :toggleAlert="toggleAlert"
      :toggleProgress="toggleProgress"
      :openModal="openModal"
    />
    <Search 
     :toggleAlert="toggleAlert"
     :toggleProgress="toggleProgress"
     :openModal="openModal"
    />
    <TabularData 
    :stocksData="stocksData"
    :toggleAlert="toggleAlert"
    :toggleProgress="toggleProgress"
    :openModal="openModal"
    />
    <Modal v-if="showModal" 
    :hideModal="hideModal" 
    :toggleAlert="toggleAlert"
    :toggleProgress="toggleProgress"
    :setCashBalance="setCashBalance"
    :type="modalType"
    :cashBalance="cashBalance"
    :modalData="modalData"
    :getPortfolio="getPortfolio"
    />
  </div>
</template>

<script>
import Header from './../Header/Header.vue';
import TabularData from './../TabularData/TabularData.vue';
import Search from './../Search/Search.vue';
import Modal from './../Modal/Modal.vue';
import {getBalance, getPortfolio} from './../../services';
export default {
  components:{
    Header,
    TabularData,
    Modal,
    Search,
  },
  props:{
    toggleAlert:Function,
    toggleProgress:Function,
  },
  data:()=>({
    modalType:null,
    modalData:null,
  }),
  created(){
    getBalance()
    .then((resp)=>{
      if(resp.data && resp.data.balance){
        this.cashBalance = resp.data.balance;
      }
    })
    .catch(err=>{
      this.toggleAlert(err.error || 'cannot fetch balance');
    });

    this.getPortfolio();
  },
  data:()=>({
    cashBalance:null,
    showModal:false,
    stocksData:null,
  }),
  methods:{
    setCashBalance(balance){
      this.cashBalance = balance;
    },
    hideModal(){
      this.showModal = false;
    },
    openModal({type,data}){
      this.modalType = type;
      this.modalData = data;
      this.showModal = true;
    },
    getPortfolio(){
      getPortfolio()
      .then((resp)=>{
        if(resp.data && resp.data.portfolio){
          this.stocksData = resp.data.portfolio;
        }
        if(resp.data && resp.data.balance){
          this.cashBalance = resp.data.balance;
        }
      })
      .catch(err=>{
        this.toggleAlert((err.response && err.response.data && err.response.data.error) || 'cannot fetch portfolio');
      });
    }
  }
}
</script>
<style>
 @import './../../../node_modules/vue-datetime/dist/vue-datetime.css'
</style>
