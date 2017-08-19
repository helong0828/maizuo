import React, {Component} from 'react'

import "../css/me.css"
export default class Me extends Component{
	
	render(){
		return (
			<div class="page">
				<div class="login">
					<input type="text" placeholder="输入手机号/邮箱"/>
					<div class="border-name"></div>
					<input type="password" placeholder="密码"/>
					<div class="border-pwd"></div>
					<button>登录</button>
				</div>
			</div>
		)
	}
	
}