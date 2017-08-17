import React, {Component} from "react"
import {Link} from "react-router-dom"


import "../../css/appHeader.css"
export default class AppHeader extends Component{
	constructor(){
		super();
		this.state={
			title:"卖座电影"
		}
	}
	render(){
		return (
			<header class="app-header one-border-bottom">
				<i class="iconfont icon-menu"></i>
				<h4 class="title">{this.state.title}</h4>
				<p class="city">深圳<i class="iconfont icon-arrow-down"></i></p>
				<i class="iconfont icon-me"></i>
			</header>
		)
	}
}
