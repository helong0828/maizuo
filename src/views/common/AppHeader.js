import React, {Component} from "react"
import {Link} from "react-router-dom"
import store from "../../store"

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
				<h4 class="title">{store.getState().title}</h4>
				<Link to="/city-list" class="city">深圳<i class="iconfont icon-arrow-down"></i></Link>
				<Link to="/me" class="iconfont icon-me"></Link>
			</header>
		)
	}
	menuHeaderAction(){
		this.props.menuClick();
	}
}
