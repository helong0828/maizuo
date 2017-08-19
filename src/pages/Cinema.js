import React, {Component} from 'react'
import homeService from "../services/homeService.js"
import "../css/cinema.css"

var cenimaScroll = null;
export default class Cinema extends Component{
	constructor(){
		super();
		this.state = {
			cinemaData:[]
		}
	}
	render(){
		let unShow = {
			display:"none"
		}
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
													<li key={i}>
														<p class="title">
															<span>{cinemaItem.name}</span>
															<span>座</span>
															<span>通</span>
															<i class="iconfont icon-arrow-left"></i>
														</p>
														<p class="acti"><span>可乐加爆米花</span><span>优惠活动</span></p>
														<p class="address">{cinemaItem.address}</p>
														<p class="distance">距离未知</p>
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
			console.log(this.refs);
			this.refs[0].style.display = "block";
		})
	}
	componentDidMount(){
		cenimaScroll = new IScroll(".cinema",{

		})
		
	}
	hideShowAction(index){
		console.log("点击了");
		if(this.refs[index].style.display == "block"){
			this.refs[index].style.display = "none";
		}else{
			this.refs[index].style.display = "block";
		}
	}
}