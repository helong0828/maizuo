import React, {Component} from 'react'
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

import "../css/city.css"
import homeService from "../services/homeService.js"

var cityScroll = null;

export default class City extends Component{
	constructor(){
		super();
		this.state={
			cityListData:[],
			cityScroll:null
		}
	}
	
	render(){
		return (
			<ReactCSSTransitionGroup
				transitionName="slideindown"
			    transitionAppear={true}
			    transitionAppearTimeout={500}
			    transitionEnter={false}
			    transitionLeave={false}>
				<div class="page" id="cities" ref="el">
						<div class="wrap">
							<h5>GPS定位所在的城市</h5>
							<h4>深圳</h4>
							<h5>热门城市</h5>
							<p><span>北京</span><span>上海</span><span>广州</span><span>深圳</span></p>
							<h5>按字母排序</h5>
							<ul class="start">
								{
									this.state.cityListData.map((item,index)=>{
										return <li key={index} onClick={this.letterAction.bind(this,item.classify)}>{item.classify}</li>
									})
								}
							</ul>
							<ul class="cityList">
								{
									this.state.cityListData.map((item,index)=>{
										return (
											<div>
												<h5 key={index} class={item.classify}>{item.classify}</h5>
												{
													item.cities.map((listcity,i)=>{
													return (
														<li key={i}>{listcity.name}</li>
														)
													})
												}
												
											</div>
										)
									})
								}
							</ul>
						</div>
				</div>
			</ReactCSSTransitionGroup>
		)
	}


	componentDidAppear(){
		// console.log(document.getElementById("#cities"))
		// cityScroll = new IScroll(this.refs.el,{
		// 	probeType:3
		// })
	}
	
	componentDidMount(){
		console.log(document.getElementById("#cities"))
		cityScroll = new IScroll(this.refs.el,{
			probeType:3
		})
		console.log(cityScroll);
		homeService.getCityListData()
		.then((res)=>{
			this.setState({cityListData:res}, ()=>{
					cityScroll.refresh();
			});
			//console.log(this.state.cityListData);
		})
	}
	//字母点击事件
	letterAction(letter){
		var letterDom = document.getElementsByClassName(letter)[0];
		console.log(letterDom.offsetTop);
		cityScroll.scrollTo(0,-letterDom.offsetTop,500);
	}
}