import React, {Component} from 'react'

import "../css/card.css"
export default class Card extends Component{
	constructor(){
		super();
		this.state = {
			isSelected:0
		}
	}
	
	render(){
		let tabsBorderNow={
			borderBottom:this.state.isSelected == 0?"3px solid #fe6e00":"none"
		}
		let tabsBorderSoon={
			borderBottom:this.state.isSelected == 1?"3px solid #fe6e00":"none"
		}
		return (
			<div class="page">
				<div class="tabs">
						<ul>
							<li style={tabsBorderNow} onClick={this.nowTabsAction.bind(this)}>卖座卡</li>
							<li style={tabsBorderSoon} onClick={this.soonTabsAction.bind(this)}>电子卖座卡</li>
						</ul>
				</div>
				<div class="card">
					<label>卡号：<input type="text" placeholder="请输入卡号"/></label>
					<div class="border-name"></div>
					<label>密码：<input type="password" placeholder="密码"/></label>
					<div class="border-pwd"></div>
					<button>查询</button>
				</div>
			</div>
		)
	}
	nowTabsAction(){
		this.setState({isSelected:0});
	}
	soonTabsAction(){
		this.setState({isSelected:1});
	}
}