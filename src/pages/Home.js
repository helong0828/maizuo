import React, {Component} from "react"

import homeService from "../services/homeService.js"
import "../css/home.css"

var bannerSwiper = null;
var homeScroll = null;
export default class Home extends Component{
	constructor(){
		super();
		this.state={
			bannerData:[],
			nowPlayingData:[],
			comingSoonData:[]
		}
	}
	render(){
		return (
			<div class="home page">
				<div class="wrap">
					<div ref="banner" class="swiper-container home-banner">
						<div class="swiper-wrapper">
							{
								this.state.bannerData.map((item,index)=>{
									return (
										<div class="swiper-slide" key={index}>
											<img src={item.imageUrl}/>
										</div>
									)
								})
							}
						</div>
					</div>
					<div class="now-playing">
						<ul>
							{
								this.state.nowPlayingData.map((item,index)=>{
									return (
										<li key={index}>
											<img src={item.cover.origin}/>
											<h5>{item.name}</h5>
											<p><span>{item.cinemaCount}</span>家影院上映<span>{item.watchCount}</span>人购票</p>
											<i>{item.grade}</i>
										</li>
									)
								})
							}
							
						</ul>
						
					</div>
					<div class="more">
						<span>更多热映电影</span>
					</div>
					<div class="comingSoon-title">
						<span>即将上映</span>
					</div>
					<div class="comingSoon">
						<ul>
							{
								this.state.comingSoonData.map((item,index)=>{
									return (
										<li key={index}>
											<img src={item.cover.origin}/>
											<h5>{item.name}<span></span></h5>
										</li>
									)
								})
							}
						</ul>
					</div>
					<div class="comingSoon-more">
						<span>更多即将上映电影</span>
					</div>
				</div>
			</div>
		)
	}
	componentWillMount(){
		homeService.getBannerData()
		.then((res)=>{
			this.setState({bannerData:res});
			bannerSwiper.update();
		})

		homeService.getNowPlayingData()
		.then((res)=>{
			this.setState({nowPlayingData:res});
			homeScroll.refresh();
		})

		homeService.getComingSoonData()
		.then((res)=>{
			this.setState({comingSoonData:res});
			homeScroll.refresh();
		})
	}
	componentDidMount(){
		bannerSwiper = new Swiper(this.refs.banner,{
			loop:true
		})
		homeScroll = new IScroll(".home",{
			
		})
	}
}
