import axios from 'axios';
import { urls } from './../constants/';
function getHeaders(){
	const token = window.localStorage.getItem('token') || '';
	const headers = {
		headers:{
			'access-token':token,
			'Content-type':'application/json'
		}
	}
	return headers;

}
export function login(username,password){
	return axios.post(urls.login,{
		username,
		password
	});
} 

export function register(username,password,name){
	return axios.post(urls.register,{
		username,
		password,
		name
	});
}

export function getBalance(filter){
	let url = urls.balance;
	if(filter){
		url += filter;
	}
	return axios.get(url,getHeaders());
}

export function getPortfolio(){
	return axios.get(urls.stock,getHeaders());
}

export function updateBalance(data){
	let url = `${urls.balance}`;
	return axios.put(url,data,getHeaders());
}

export function searchStocks(name){
	return axios.get(`${urls.stock}/search?symbol=${name}`,getHeaders());
}

export function getStockPrice(name){
	return axios.get(`${urls.stock}/${name}`,getHeaders());
}

export function buyStock(data){
	return axios.put(`${urls.stock}?type=BUY`,data,getHeaders());
}

export function sellStock(data){
	return axios.put(`${urls.stock}?type=SELL`,data,getHeaders());
}

export function deleteMeal(id){
	let url = `${urls.deleteMeal}/${id}`;
	return axios.post(url,{},getHeaders());
}

export function getCalories(){
	return axios.get(urls.calorie,getHeaders());
}

export function setCalories(data){
	return axios.post(urls.calorie,data,getHeaders());
}