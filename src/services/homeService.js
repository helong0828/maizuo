import API from "../api"
import axios from "axios"
//获取城市列表
function getCityListData(){
	var data = [];
	return new Promise((resolve,reject)=>{
		axios.get(`${API.cityListApi}?__t=${new Date().getTime()}`)
		.then((response)=>{
			var arr = response.data.data.cities;
			var newArr = [];
			//取出所有城市拼音的开头字母
			arr.map((item)=>{
				newArr.push(item.pinyin[0]);
			})
			//去重后排序
			var set = new Set(newArr); 
			var newArr1 = new Array(...set);
			newArr1 = newArr1.sort();
			//将每一个城市的开头字母实例化成一个对象，并在对象中保存一个空数组
			data = newArr1.map((item)=>{
				var obj = {};
				obj.classify = item;
				obj.cities = [];
				return obj
			})
			console.log(data);
			//遍历整个数据，分类压入数据
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
//获取主页banner列表
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
//获取主页正在热映电影
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
//获取主页即将上映电影
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
//获取影片页正在热映电影
function getNowMovieListData(page){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.nowPlayingListApi}&page=${page}`)
		.then((response)=>{
			var arr = response.data.data.films;
			arr.map((item)=>{
				return item.playingTime = getPlayingTime(item.premiereAt) 
			})
			resolve(arr);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
//获取影片页即将热映电影
function getSoonMovieListData(page){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.comingSoonListApi}&page=${page}`)
		.then((response)=>{
			var arr = response.data.data.films;
			arr.map((item)=>{
				return item.playingTime = getPlayingTime(item.premiereAt) 
			})
			resolve(arr);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
//上映时间处理
function getPlayingTime(time){
	var date = new Date(time);
	var arr=["一","二","三","四","五","六","天"];
	var timedate = date.getMonth()+1+"月"+date.getDate()+"日";
	var timeday = "星期"+arr[date.getDay()];
	return {timedate,timeday};
}


//获取影院页数据
function getCinemaData(){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.cinemaDataApi}?__t=${new Date().getTime()}`)
		.then((response)=>{
			var arr = response.data.data.cinemas;
			//取出所有区
			var newArr = arr.map((item)=>{
				return item.district.name;
			})
			//去重
			var set = new Set(newArr); 
			var newArr1 = new Array(...set);
			//将每个区实例化成一个对象，并在对象中保存一个空数组
			var data = newArr1.map((item)=>{
				var obj = {};
				obj.name = item;
				obj.cinemas = [];
				return obj;
			})
			//遍历原始的数据，分类压入不同对象的数组中
			arr.map((item)=>{
				for(var i=0 ; i<data.length ; i++){
					if(data[i].name == item.district.name){
						data[i].cinemas.push(item);
					}
				}
			})
			resolve(data);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
//获取影院、电影拍片数据
function getScheduleTime(time){
	var date = new Date(time);
	var timedate = date.getMonth()+1+"月"+date.getDate()+"日";
	return timedate;
}
function getSchedulePlayTime(start,long){
	var date = new Date(start);
	var startMin = date.getMinutes();
	if(startMin < 10){
		startMin = "0"+startMin;
	}
	var startTime = date.getHours()+":"+startMin;
	
	var endHours = date.getHours()+parseInt(long/60);
	var endMin = date.getMinutes()+parseInt(long%60);
	if(endMin>=60){
		endMin -=60;
		endHours +=1;
	}
	if(endHours>23){
		endHours -= 24;
	}
	if(endMin < 10){
		var endTime = endHours+":0"+endMin;
	}else{
		var endTime = endHours+":"+endMin;
	}
	return {startTime,endTime}
}
//影院排片数据
function getCenimanScheduleData(cinemaId,filmId){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.movieSchedule}?__t=${new Date().getTime()}&film=${filmId}&cinema=${cinemaId}`)
		.then((response)=>{
			var arr = response.data.data.schedules;
			var newArr = [];
			arr.map((item)=>{
				var str = getScheduleTime(item.showAt);
				if(newArr.indexOf(str) == -1){
					newArr.push(str);
				}
			})
			var data=newArr.map((item)=>{
				var obj={};
				obj.day = item;
				obj.info = [];
				return obj;
			})
			arr.map((item)=>{
				var str = getScheduleTime(item.showAt);
				for(var i=0 ; i<data.length ; i++){
					if(data[i].day == str){
						data[i].info.push(item);
					}
				}
			})
			data.map((item)=>{
				item.info.map((list)=>{
					var obj = getSchedulePlayTime(list.showAt,list.film.mins);
					list.startTime = obj.startTime;
					list.endTime = obj.endTime;
				})
			})
			console.log(data);
			resolve(data);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
//获取电影详情数据
function getMovieDetailData(id){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.movieDetailApi}${id}?__t=${new Date().getTime()}`)
		.then((response)=>{
			var obj=response.data.data.film;
			obj.playingTime = getPlayingTime(obj.premiereAt);
			resolve(obj);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//获取影院座位数据
function getSeatInfoData(id){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.seatInfoApi}${id}?__t=${new Date().getTime()}`)
		.then((response)=>{
			var arr = response.data.data.seatingChart;
			console.log(arr);
			var newArr = [];
			for(var i=0 ; i<arr.height ; i++){
				var obj = {};
				obj.row = i+1;
				obj.newseats = [];
				obj.width = arr.width;
				obj.height = arr.height;
				newArr.push(obj);
			}
			arr.seats.map((item)=>{
				for(var i=0 ; i<newArr.length ; i++){
					if(item.row == newArr[i].row){
						newArr[i].newseats.push(item);
						break;
					}
				}
			})
			console.log(newArr);
			resolve(newArr);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
//选座页面头部数据
function getSeatPageTitleData(id){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.seatPageTitleApi}${id}?__t=${new Date().getTime()}`)
		.then((response)=>{
			var obj = response.data.data.schedule
			var date = new Date(response.data.data.schedule.showAt);
			var ymd = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
			var hm = date.getHours() + ':' + date.getMinutes();
			obj.ymd = ymd;
			obj.hm = hm;
			obj.name = obj.cinema.name;
			resolve(obj);
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}
//影院详情页数据
function getCinemaDetailData(id){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.cinemaDetailApi}${id}?__t=${new Date().getTime()}`)
		.then((response)=>{
			console.log(response);
		})
	})
}

export default {
	getCityListData,
	getBannerData,
	getNowPlayingData,
	getComingSoonData,
	getNowMovieListData,
	getSoonMovieListData,
	getCinemaData,
	getCenimanScheduleData,
	getMovieDetailData,
	getSeatInfoData,
	getSeatPageTitleData,
	getCinemaDetailData
}
