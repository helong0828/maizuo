import React, {Component} from "react"
import {BrowserRouter,Route} from "react-router-dom"

import Home from "./pages/Home.js"
import Movies from "./pages/Movies.js"

import AppHeader from "./views/common/AppHeader.js"
import SliderBar from "./views/common/SliderBar.js"

export default class APP extends Component{
	constructor(...rest){
		super();
		console.log(rest);
	}
	render(){
		return (
			<BrowserRouter>
				<div>
					<AppHeader />
					<SliderBar his={history}/>
					
					<Route path="/" exact component={Home}/>
					<Route path="/home" component={Home}/>
					<Route path="/movies" component={Movies} />
				</div>
			</BrowserRouter>
		)
	}
}
