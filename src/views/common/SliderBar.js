import React, {Component} from "react"

import "../../css/slider.css"
import menu from  "../../services/silderBarInfo.js"

export default class Sliderbar extends Component{
	
	render(){
		
		let sliderBarStyle = {
			transform:this.props.show?"none":"translateX(-100%)"
		}
		
		let menuListData = this.props.pathname === "/shop"?menu.shopSilderBarData:menu.homeSilderBarData
		return (
			<nav class="slider" style={sliderBarStyle}>
				{
					menuListData.map((item,index)=>{
						return (
							<a key={index} onClick={this.menuAction.bind(this,item)}>{item.title}<i class="iconfont icon-arrow-left"></i></a>
						)
					})
				}
			</nav>
		)
	}
	menuAction(item){
		console.log(this.props.pathname);
		this.props.history.push(item.path);
		this.props.hideMenu(item.header);
	}
		
}
