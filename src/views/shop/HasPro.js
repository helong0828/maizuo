import React,{Component} from "react"

import "../../css/shop.css"
export default class HasPro extends Component{
    render(){
        return (
            <div class="has-pro">
                <h4>有品专区</h4>
                <div class="has-pro-list">
                    {
                        this.props.getHasProData.map((item,index)=>{
                            return (<img src={item.imageSrc} key={index}/>)
                        })
                    }
                </div>
            </div>
        )
    }
   
}