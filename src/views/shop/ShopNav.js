import React,{Component} from "react"

import "../../css/shop.css"
export default class ShopNav extends Component{
    render(){
        return (
            <div class="shop-nav">
                <ul class="nav-list">
                    {
                        this.props.getNavData.map((item,index)=>{
                            return (
                                <li key={index}>
                                    <img src={item.imageSrc}/>
                                    <span>{item.name}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
   
}