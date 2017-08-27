import React, {Component} from 'react'
import homeService from "../../services/homeService.js"
import ShopBanner from "../../views/shop/ShopBanner.js"
import ShopNav from "../../views/shop/ShopNav.js"
import LittleBanner from "../../views/shop/LittleBanner.js"
import HasPro from "../../views/shop/HasPro.js"
import ListData from "../../views/shop/ListData.js"
import GoodPro from "../../views/shop/GoodPro.js"
var shopBannerSwiper = null;
var shopIscroll = null;
export default class Shop extends Component{
	constructor(){
        super();
        this.state = {
            navData:[],
            bannerData:[],
            littleBannerData:[],
            hasProData:[],
			listData:[],
			goodProData:[],
			page:1,
			num:20
        }
    }
	render(){
		return (
			<div class="page shop">
				<div class="wrap">
					<ShopBanner getBannerData={this.state.bannerData}/>
					<ShopNav getNavData={this.state.navData}/>
					<LittleBanner getLittleBannerData = {this.state.littleBannerData}/>
					<HasPro getHasProData={this.state.hasProData}/>
					<ListData getListData={this.state.listData}/>
					<GoodPro getGoodProData={this.state.goodProData}/>
				</div>
			</div>
		)
	}
	 componentWillMount(){
        homeService.getShopBannerData()
        .then((res)=>{
            this.setState({navData:res.navData});
            this.setState({bannerData:res.bannerData});
            shopBannerSwiper.update();
            this.setState({littleBannerData:res.littleBannerData});
            this.setState({hasProData:res.hasProData});
			this.setState({listData:res.listData});
			shopIscroll.refresh();
		})
		var page = this.state.page;
		var num = this.state.num;
		homeService.getGoodProData(page,num)
		.then((res)=>{
			console.log(res);
			this.setState({goodProData:res});
		})
    }
    componentDidMount(){
        shopBannerSwiper = new Swiper(".swiper-container",{
            pagination: '.swiper-pagination'
		})
		shopIscroll = new IScroll(".shop",{
			probeType:3
		})
		shopIscroll.on("scrollEnd",()=>{
			if(shopIscroll.y <= shopIscroll.maxScrollY){
				this.setState({page:++this.state.page})
				var page = this.state.page;
				var num = this.state.num;
				console.log(page);
				homeService.getGoodProData(page,num)
				.then((res)=>{
					console.log(res);
					var newArr = this.state.goodProData.concat(res);
					this.setState({goodProData:newArr});
					shopIscroll.refresh();
				})
			}
		})
    }
}