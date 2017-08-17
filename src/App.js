import React, {Component} from "react"
import {BrowserRouter,Route} from "react-router-dom"

import Home from "./pages/Home.js"
import Movies from "./pages/Movies.js"
import Me from "./pages/Me.js"
import Card from "./pages/Card.js"
import Shop from "./pages/Shop.js"
import Cinema from "./pages/Cinema.js"


import AppHeader from "./views/common/AppHeader.js"
import SliderBar from "./views/common/SliderBar.js"


/*
 <Route path="/" render={({history, location})=>{
						return <SilderBar history={history} 
									      show={this.state.showBar}
									      pathname={location.pathname}
									      hideHandle={this.menuHandle.bind(this)}/>
					}}/>
 **/
export default class APP extends Component{
	constructor(){
		super();
		this.state = {
			showBar:false,
			headerName:"卖座电影"
		}
	}
	render(){
		return (
			<BrowserRouter>
				<div>
					<AppHeader menuClick={this.changeShowBar.bind(this)} title={this.state.headerName}/>
					<Route path="/" render={({history,location})=>{
						return <SliderBar history={history}
										  pathname={location.pathname}
										  show={this.state.showBar}
										  hideMenu={this.hideMenuAction.bind(this)}/>
					}}/>
					
					<Route path="/" exact component={Home}/>
					<Route path="/home" component={Home}/>
					<Route path="/me" component={Me}/>
					<Route path="/card" component={Card}/>
					<Route path="/shop" component={Shop}/>
					<Route path="/cinema" component={Cinema}/>
					<Route path="/movies" component={Movies}/>
				</div>
			</BrowserRouter>
		)
	}
	changeShowBar(){
		this.setState({showBar:!this.state.showBar})
	}
	hideMenuAction(header){
		console.log(header)
		this.setState({showBar:!this.state.showBar})
		this.setState({headerName:header});
	}
}
