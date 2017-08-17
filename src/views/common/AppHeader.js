import React, {Component} from "react"
import {Link} from "react-router-dom"


import "../../css/appHeader.css"
export default class AppHeader extends Component{
	constructor(){
		super();
		this.state={
			
		}
	}
	render(){
		return (
			<header class="app-header one-border-bottom">
				<i class="iconfont icon-menu" onClick={this.menuHeaderAction.bind(this)}></i>
				<h4 class="title">{this.props.title}</h4>
				<p class="city">深圳<i class="iconfont icon-arrow-down"></i></p>
				<i class="iconfont icon-me"></i>
			</header>
		)
	}
	menuHeaderAction(){
		this.props.menuClick();
	}
}
