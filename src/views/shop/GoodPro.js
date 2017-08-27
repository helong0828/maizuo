import React,{Component} from "react"

import "../../css/shop.css"
export default class GoodPro extends Component{
    render(){
        return (
            <div class="good-pro">
                <h4>好货精选</h4>
                <ul>
                    {
                        this.props.getGoodProData.map((item,index)=>{
                            return (
                                <li key={index}>
                                    <img src={item.skuList[0].image}/>
                                    <h6>{item.masterName}</h6>
                                    <p>¥{(item.maxPrice/100).toFixed(2)}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
   
}