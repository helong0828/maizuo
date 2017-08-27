import React, {Component} from "react"
import store from "../../store"
import "../../css/slider.css"
import menu from  "../../services/silderBarInfo.js"

export default class Sliderbar extends Component{
	
	render(){
		
		let sliderBarStyle = {
			transform:this.props.show?"none":"translateX(-100%)"
		}
		
		let coverStyle = {
			display:this.props.show?"block":"none"
		}
		
		let menuListData = this.props.pathname === "/shop"?menu.shopSilderBarData:menu.homeSilderBarData
		return (
			<div>
				<div class="cover" style={coverStyle} onClick={this.coverAction.bind(this)}></div>
				<nav class="slider" style={sliderBarStyle}>
					{
						menuListData.map((item,index)=>{
							return (
								<a key={index} onClick={this.menuAction.bind(this,item)}>{item.title}<i class="iconfont icon-arrow-left"></i></a>
							)
						})
					}
				</nav>
			</div>
		)
	}
	menuAction(item){
		//slideBar页面跳转
		this.props.history.push(item.path);
		//改变父级隐藏
		this.props.hideMenu();
		
		store.dispatch({
			type:"CHANGETITLE",
			title:item.header
		})
	}
	//cover点击隐藏slide
	coverAction(){
		this.props.hideMenu();
	}
}
