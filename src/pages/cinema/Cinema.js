import React, {Component} from 'react'
import homeService from "../../services/homeService.js"
import "../../css/cinema.css"

var cenimaScroll = null;
export default class Cinema extends Component{
	constructor(){
		super();
		this.state = {
			cinemaData:[],
			scheduleData:[],
			isShow:0
		}
	}
	render(){
		let unShow = {display:"none"};
		let scheduleUnShow = {display:"none"};
		let showScheduleList = this.state.scheduleData.length>0?this.state.scheduleData[this.state.isShow].info:[];
		return (
			<div class="cinema page">
				<div class="wrap">
					{
						this.state.cinemaData.map((item,index)=>{
							return (
								<div class="cinemaList" key={index}>
									<h5 onClick={this.hideShowAction.bind(this,index)}>{item.name}</h5>
									<ul ref={index} style={unShow}>
										{
											item.cinemas.map((cinemaItem,i)=>{
												return (
													<li key={i}  onClick={this.cenimaAction.bind(this,cinemaItem.id,item.name+''+i)}>
														<p class="title">
															<span>{cinemaItem.name}</span>
															<span>座</span>
															<span>通</span>
															<i class="iconfont icon-arrow-left"></i>
														</p>
														<p class="acti"><span>可乐加爆米花</span><span>优惠活动</span></p>
														<p class="address">{cinemaItem.address}</p>
														<p class="distance">距离未知</p>
														<div ref={item.name+''+i} class="schedule" style={scheduleUnShow}>
															<p class="selectDate">
																{
																	this.state.scheduleData.map((item,index)=>{
																		return <span class={index == this.state.isShow?"active":""} data-index={index} onClick={this.selectDay.bind(this)} key={index}>{item.day}</span>
																	})
																}
																{
																	showScheduleList.map((item,index)=>{
																		return (
																			<div class="scheduleList" data-index={index} onClick={this.selectMovie.bind(this,index)} key={index}>
																				<p>{item.startTime}<i class="price">¥{item.price.maizuo}</i></p>
																				<p>预计{item.endTime}结束/{item.film.language}{item.imagery}/{item.hall.name}<i>¥{item.price.cinema}</i></p>
																			</div>
																		)
																	})
																}
															</p>
														</div>
													</li>
												)
											})
										}
									</ul>
								</div>
							)
						})
					}
					
				</div>
			</div>
		)
	}
	componentWillMount(){
		homeService.getCinemaData()
		.then((res)=>{
			this.setState({cinemaData:res});
			cenimaScroll.refresh();
			this.refs[0].style.display = "block";
		})
	}
	componentDidMount(){
		cenimaScroll = new IScroll(".cinema",{

		})
		
	}
	hideShowAction(index){
		if(this.refs[index].style.display == "block"){
			this.refs[index].style.display = "none";
		}else{
			this.refs[index].style.display = "block";
		}
	}
	cenimaAction(cinemaId,index){
		if(this.refs[index].style.display == "block"){
			this.refs[index].style.display = "none";
		}else{
			this.refs[index].style.display = "block";
		}
		if(this.props.location.state != null){
			var filmId = this.props.location.state
			homeService.getCenimanScheduleData(cinemaId,filmId)
			.then((res)=>{
				this.setState({scheduleData:res});
				console.log(res);
				cenimaScroll.refresh();
			})
		}else{
			this.props.history.push({
				pathname:"/cinema-detail"
			})
		}
	}
	selectDay(event){
		event.stopPropagation();
		console.log(event);
		console.log(event.target.dataset.index);
		this.setState({isShow:event.target.dataset.index});
	}

	selectMovie(index,event){
		event.stopPropagation();
		console.log(index);		
	}
}