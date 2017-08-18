import API from "../api"
import axios from "axios"

function getCityListData(){
	var data = [];
	return new Promise((resolve,reject)=>{
		axios.get(`${API.cityListApi}?__t=${new Date().getTime()}`)
		.then((response)=>{
			var arr = response.data.data.cities;
			var newArr = [];
			arr.map((item)=>{
				newArr.push(item.pinyin[0]);
			})
			var set = new Set(newArr); 
			var newArr1 = new Array(...set);
			newArr1 = newArr1.sort();
			
			data = newArr1.map((item)=>{
				var obj = {};
				obj.classify = item;
				obj.cities = [];
				return obj
			})
			console.log(data);
			arr.map((item)=>{
				for(var i=0 ; i<data.length ; i++){
					if(item.pinyin[0] == data[i].classify){
						data[i].cities.push(item);
					}
				}
			})
			console.log(data);
			resolve(data);
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}
function getBannerData(){
	return new Promise((resolve,reject)=>{
		//axios.get(`${API.bannerApi}?__t=${new Date().getTime()}`)
		axios.get(`${API.bannerApi}?__t=1503055615809`)
		.then((response)=>{
			resolve(response.data.data.billboards);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
function getNowPlayingData(){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.nowPlayingApi}?__t=${new Date().getTime()}`)
		.then((response)=>{
			resolve(response.data.data.films);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
function getComingSoonData(){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.comingSoonApi}?__t=${new Date().getTime()}`)
		.then((response)=>{
			resolve(response.data.data.films);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
export default {
	getCityListData,
	getBannerData,
	getNowPlayingData,
	getComingSoonData
}
