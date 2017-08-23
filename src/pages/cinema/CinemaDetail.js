import React, {Component} from "react"
import homeService from "../../services/homeService.js"
import "../../css/cinema-detail.css"
export default class CinemaDetail extends Component{
    constructor(){
        super();
        this.state = {
            
        }
    }
    render(){
        return (
            <div class="page cinema-detail">
                <div class="wrap">
                    <div class="cinema-detail-pic">
                        <img src=""/>
                    </div>
                    <div class="order-ticket cinema-detail-func">
                        <i class="iconfont icon-yizi"></i>
                        <h6>订座票</h6>
                        <p>选好场次座位</p>
                        <span></span>
                    </div>
                    <div class="exchange-ticket cinema-detail-func">
                        <i class="iconfont icon-piao"></i>
                        <h6>通兑票</h6>
                        <p>选好场次座位</p>
                    </div>
                    <div class="food cinema-detail-func">
                        <i class="iconfont icon-food"></i>
                        <h6>小卖品</h6>
                    </div>
                </div>
            </div>
        )
    }
    componentWillMount(){
        console.log(this.props);
        //var cinemaId = this.props.location.state;
        // homeService.getCinemaDetailData(cinemaId)
        // .then((res)=>{

        // })
    }
}