import React,{Component} from "react"

import "../../css/shop.css"
export default class ListData extends Component{
    render(){
        return (
            <div class="list-item">
                {
                    this.props.getListData.map((item,index)=>{
                        return (
                            <div class="little-item" key={index}>
                                <div class="title-pic">
                                    <img src={item.imageSrc}/>
                                </div>
                                <div class="kind-good-box">
                                    <ul class="kind-good">
                                        {
                                            item.products.map((listItem,i)=>{
                                                return (
                                                     <li key={i}>
                                                        <img src={listItem.image}/>
                                                        <h6>{listItem.name}</h6>
                                                        <p>¥{(listItem.price/100).toFixed(2)}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                       
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
   
}