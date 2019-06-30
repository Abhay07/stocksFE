<template>
  <div id="app">
    <Dashboard v-if="isLoggedIn" 
    :toggleAlert="toggleAlert"
    :toggleProgress="toggleProgress"
    />
    <Login v-if="!isLoggedIn" 
    :toggleAlert="toggleAlert"
    :toggleProgress="toggleProgress"
    :setLoggedInUser="setLoggedInUser"
    />
    <Progress v-if="showProgress" />
    <Alert v-if="showAlert" 
    :isInfoAlert="isInfoAlert" 
    :hideAlert="hideAlert" 
    :label="alertMsg"
    />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard/Dashboard.vue';
import Login from './components/Login/Login.vue';
import Alert from './components/Alert/Alert.vue';
import Progress from './components/Progress/Progress.vue';
export default {
  name: 'app',
  components:{
    Dashboard,
    Login,
    Alert,
    Progress
  },
  data:()=>({
    isLoggedIn:false,
    showAlert:false,
    isInfoAlert:false,
    showProgress:false,
    alertMsg:null,
  }),
  created(){
    //if token is present in localstorage, take user to dashboard
    let token = window.localStorage.getItem('token');
    if(token){
      this.isLoggedIn = true;
    }
  },
  methods:{
    toggleAlert(msg,isInfoAlert){
      this.isInfoAlert = Boolean(isInfoAlert);
      if(msg){
        this.alertMsg = msg;
      }
      else{
        this.alertMsg = null;
      }
      this.showAlert = !this.showAlert;
    },
    toggleProgress(){
      this.showProgress = !this.showProgress;
    },
    setLoggedOutUser(){
      this.isLoggedIn = false;
    },
    setLoggedInUser(){
      this.isLoggedIn = true;
    },
    hideAlert(){
      this.showAlert = false;
    }

  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
