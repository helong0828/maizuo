import React, {Component} from "react"
import {Link} from "react-router-dom"
import "../../css/movies.css"
import homeService from "../../services/homeService.js"

var movieSrcoll = null;

//
export default class Movies extends Component{
	constructor(){
		super();
		this.state = {
			isSelected:0,
			nowPage:1,
			soonPage:1,
			nowPalyingListData:[],
			soonListData:[]
		}
	}
	render(){
		let tabsBorderNow={
			borderBottom:this.state.isSelected == 0?"3px solid #fe6e00":"none"
		}
		let tabsBorderSoon={
			borderBottom:this.state.isSelected == 1?"3px solid #fe6e00":"none"
		}
		let moviesNowInfo={
			display:this.state.isSelected == 0?"block":"none"
		}
		let moviesSoonInfo={
			display:this.state.isSelected == 1?"block":"none"
		}
		let data = this.state.isSelected == 0?this.state.nowPalyingListData:this.state.soonListData
		//console.log(this.state.isSelected);
		return (
				<div class="movies page">
					<div class="wrap">
						<div class="tabs">
							<ul>
								<li style={tabsBorderNow} onClick={this.nowTabsAction.bind(this)}>正在热映</li>
								<li style={tabsBorderSoon} onClick={this.soonTabsAction.bind(this)}>即将上映</li>
							</ul>
						</div>
						<div class="movieList">
							<ul>
								{
									data.map((item,index)=>{
										return (
											
											<li key={index}>
												<Link to={'/movie-detail/'+item.id}> 
													<img src={item.poster.origin}/>
													<h4>{item.name}</h4>
													<p>{item.intro}</p>
													<p class="now" style={moviesNowInfo}><span>{item.cinemaCount}</span>家影院上映<span>{item.watchCount}</span>人购票</p>
													<p class="soon" style={moviesSoonInfo}><span>{item.playingTime.timedate}</span>上映<span>{item.playingTime.timeday}</span></p>
													<p class="grade">{item.grade}<i class="iconfont icon-arrow-left"></i></p>
												</Link>
											</li>
										)
									})
								}
							</ul>
						</div>
					</div>
				</div>
		)
	}
	nowTabsAction(){
		this.setState({isSelected:0});
		movieSrcoll.refresh();
	}
	soonTabsAction(){
		this.setState({isSelected:1});
		homeService.getSoonMovieListData(this.state.soonPage)
		.then((res)=>{
			console.log(res);
			this.setState({soonListData:res});
			movieSrcoll.refresh();
		})
	}
	componentDidMount(){
		movieSrcoll = new IScroll(".movies",{

		})
		movieSrcoll.on("scrollEnd",()=>{
			if(movieSrcoll.y <= movieSrcoll.maxScrollY){
				if(this.state.isSelected == 0){
					this.state.nowPage += 1;
					homeService.getNowMovieListData(this.state.nowPage)
					.then((res)=>{
						var newarr = this.state.nowPalyingListData.concat(res);
						this.setState({nowPalyingListData:newarr});
						movieSrcoll.refresh();
					})
				}else{
					this.state.soonPage += 1;
					homeService.getNowMovieListData(this.state.soonPage)
					.then((res)=>{
						var newarr = this.state.soonListData.concat(res);
						this.setState({soonListData:newarr});
						movieSrcoll.refresh();
					})
				}
			}
		})
	}
	componentWillMount(){
		homeService.getNowMovieListData(this.state.nowPage)
		.then((res)=>{
			this.setState({nowPalyingListData:res});
			movieSrcoll.refresh();
		})
	}
}
