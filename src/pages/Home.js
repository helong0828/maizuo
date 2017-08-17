import React, {Component} from "react"

import "../css/home.css"

export default class Home extends Component{
	constructor(...rest){
		super();
		console.log(rest);
//		console.log(history);
	}
	render(){
		return (
			<div class="home page">
				home
			</div>
		)
	}
}
