import React,{Component} from "react"

import "../../css/shop.css"
export default class ShopBanner extends Component{
    render(){
        return (
            <div class="swiper-container shop-banner">
                <div class="swiper-wrapper">
                    {
                        this.props.getBannerData.map((item,index)=>{
                            return (
                                <div class="swiper-slide" key={index}>
                                    <img src={item.imageSrc}/>
                                </div>
                            )
                        })
                    }
                </div>
                <div class="swiper-pagination"></div>
            </div>
        )
    }
   
}