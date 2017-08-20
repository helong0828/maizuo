import React, {Component} from "react"
import {BrowserRouter,Route} from "react-router-dom"

import Home from "./pages/home/Home.js"
import Movies from "./pages/movie/Movies.js"
import Me from "./pages/Me.js"
import Card from "./pages/Card.js"
import Shop from "./pages/Shop.js"
import Cinema from "./pages/cinema/Cinema.js"
import City from "./pages/City.js"

import MovieDetail from "./pages/movie/MovieDetail.js"

import AppHeader from "./views/common/AppHeader.js"
import SliderBar from "./views/common/SliderBar.js"


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
					<Route path="/city-list" component={City}/>

					<Route path="/movie-detail/:id" component={MovieDetail}/>
				</div>
			</BrowserRouter>
		)
	}
	changeShowBar(){
		this.setState({showBar:!this.state.showBar})
	}
	hideMenuAction(header){
		this.setState({showBar:!this.state.showBar})
		if(header){
			this.setState({headerName:header});
		}
	}
}
