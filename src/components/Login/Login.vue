<template>
  <div class="container">
    <form id="login-form" @submit="preventDefault">
      <div class="tabs">
        <span class="left-tab" @click="showLoginForm" :class="loginLabelClass">Login</span>
        <span @click="hideLoginForm" :class="registerLabelClass">Register</span>
      </div>
      <input type="text" placeholder="Username" name="username" v-model="username"/>
      <input type="text" placeholder="Password" name="password" v-model="password"/>
      <input type="text" placeholder="Name" name="name" v-model="uName" v-show="!loginFormVisible"/>
      <button @click="loginOrRegister">{{buttonText}}</button>
    </form>
  </div>
</template>

<script>
import {login, register} from './../../services';
export default {
  data:()=>({
    loginFormVisible:true,
    username:'',
    password:'',
    uName:''
  }),
  props:{
    toggleAlert:Function,
    toggleProgress:Function,
    setLoggedInUser:Function
  },
  computed:{
    registerFormVisible(){
      return !this.loginFormVisible;
    },
    loginLabelClass(){
      if(this.loginFormVisible){
        return ['bold']
      }
      return [];
    },
    registerLabelClass(){
      if(!this.loginFormVisible){
        return ['bold']
      }
      return [];
    },
    buttonText(){
      return this.loginFormVisible ? 'Login' : 'Register';
    },
    validationError(){
      let userRegex = /^[\w]{4,}$/;
      if(!this.username.match(userRegex)){
        return 'Invalid username, should have minimum 4 characters';
      }
      let passwordRegex = /^[^\s]{6,}$/;
      if(!this.password.match(passwordRegex)){
        return 'Password should have minimum 6 characters';
      }
      let nameRegex = /^[A-Za-z]+[A-Za-z\s]+$/;
      if(!this.loginFormVisible && !this.uName.match(nameRegex)){
        return 'Invalid name, should have minimum 3 character and no special characters allowed'
      }
      return null;
    }
  },
  methods:{
    showLoginForm(){
      if(!this.loginFormVisible){
        this.loginFormVisible = true;
      }
    },
    hideLoginForm(){
      if(this.loginFormVisible){
        this.loginFormVisible = false;
      }
    },
    loginOrRegister(){
      if(this.validationError){
        this.toggleAlert(this.validationError);
        return;
      }
      this.toggleProgress();
      if(this.loginFormVisible){
        login(this.username,this.password)
        .then((resp)=>{
          if(resp.data && resp.data.token){
            window.localStorage.setItem('token',resp.data.token);
            this.setLoggedInUser();
            return;
          }
          else{
            throw 'err';
          }
        })
        .catch((err)=>this.toggleAlert('Check username and password'))
        .finally(()=>this.toggleProgress());
      }
      else{
        register(this.username, this.password, this.uName)
        .then((resp)=>{
          if(resp.data && resp.data.token){
            this.toggleAlert('Registration successful',true);
            window.localStorage.setItem('token',resp.data.token);
            this.setLoggedInUser();
            return;
          }
          else{
            throw 'err';
          }
        })
        .catch((err)=>this.toggleAlert('User registration failed'))
        .finally(()=>this.toggleProgress());
      }

    },
    preventDefault(event){
      event.preventDefault();
    }
  }
}
</script>

<style>
@import './style.css';
</style>
