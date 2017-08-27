import React,{Component} from "react"

import "../../css/shop.css"
export default class ShopNav extends Component{
    render(){
        return (
            <div class="shop-little-banner">
                {
                    this.props.getLittleBannerData.map((item,index)=>{
                         return (<img src={item.imageSrc} key={index}/>)
                    })
                   
                }
            </div>
        )
    }
   
}