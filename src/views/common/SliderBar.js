import React, {Component} from "react"

import "../../css/slider.css"

export default class Sliderbar extends Component{
	
	render(){
		return (
			<nav class="slider">
				<a onClick={this.homeAction.bind(this)}>首页<i class="iconfont icon-arrow-left"></i></a>
				<a onClick={this.cenimaAction.bind(this)}>影院<i class="iconfont icon-arrow-left"></i></a>
			</nav>
		)
	}
	homeAction(){
		//console.log(this.props.his);
	}
	cenimaAction(){
		
	}
		
}
