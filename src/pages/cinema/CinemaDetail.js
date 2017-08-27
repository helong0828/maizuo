import React, {Component} from "react"
import homeService from "../../services/homeService.js"
import "../../css/cinema-detail.css"

var cinemaDetailIScroll = null;

export default class CinemaDetail extends Component{
    constructor(){
        super();
        this.state = {
            infoActive:1,
            cinemaServiceData:{},
            serviceDetailData:"",
            showFunc:[]
        }
    }
    render(){
        var phone = this.state.cinemaServiceData.telephones == null?"":this.state.cinemaServiceData.telephones[0]
        var one={display:this.state.showFunc[0]?"block":"none"}
        var two={display:this.state.showFunc[1]?"block":"none"}
        var three={display:this.state.showFunc[2]?"block":"none"}
        return (
            <div class="page cinema-detail">
                <div class="wrap">
                    <div class="cinema-detail-pic">
                        <img src="//static.m.maizuo.com/v4/static/app/asset/66461d1a02a9eaa64876c90952c42aed.png"/>
                    </div>
                    <div class="order-ticket cinema-detail-func" style={one}>
                       <div>
                            <i class="iconfont icon-yizi"></i>
                            <h6>订座票</h6>
                            <p>选好场次及座位，到影院自助机取票</p>
                            <span>立即订座</span>
                       </div>
                    </div>
                    <div class="exchange-ticket cinema-detail-func" style={two}>
                        <div>
                            <i class="iconfont icon-piao"></i>
                            <h6>通兑票</h6>
                            <p>有效期内到影院前台兑换影票</p>
                            <span>立即订票</span>
                        </div>
                    </div>
                    <div class="food cinema-detail-func" style={three}>
                        <div>
                            <i class="iconfont icon-food"></i>
                            <h6>小卖品</h6>
                            <span>购买</span>
                            </div>
                    </div>
                    <div class="address cinema-detail-func">
                       <div>
                            <i class="iconfont icon-position"></i>
                            <h6>{this.state.cinemaServiceData.address}</h6>
                       </div>
                    </div>
                    <div class="phone cinema-detail-func">
                       <div>
                            <i class="iconfont icon-phone"></i>
                            <h6>{phone}</h6>
                       </div>
                    </div>
                    <div class="info-tabs">
                        <ul>
                            <li class={this.state.infoActive == 1?"active":""} onClick={this.infoActionOne.bind(this)}>
                                <i class={this.state.infoActive == 1?"iconfont icon-piao active":"iconfont icon-piao"}></i>
                                <span>取票</span>
                            </li>
                            <li class={this.state.infoActive == 2?"active":""} onClick={this.infoActionTwo.bind(this)}>
                                <i class={this.state.infoActive == 2?"iconfont icon-glass active":"iconfont icon-glass"}></i>
                                <span>3D</span>
                            </li>
                            <li class={this.state.infoActive == 3?"active":""} onClick={this.infoActionThree.bind(this)}>
                                <i class={this.state.infoActive == 3?"iconfont icon-park active":"iconfont icon-park"}></i>
                                <span>停车</span>
                            </li>
                            <li class={this.state.infoActive == 4?"active":""} onClick={this.infoActionFour.bind(this)}>
                                <i class={this.state.infoActive == 4?"iconfont icon-lipin active":"iconfont icon-lipin"}></i>
                                <span>优惠</span>
                            </li>
                            <li class={this.state.infoActive == 5?"active":""} onClick={this.infoActioFive.bind(this)}>
                                <i class={this.state.infoActive == 5?"iconfont icon-bus active":"iconfont icon-bus"}></i>
                                <span>交通</span>
                            </li>
                        </ul>
                        <p>{this.state.serviceDetailData}</p>
                    </div>
                </div>
            </div>
        )
    }
    componentWillMount(){
        var cinemaId = this.props.match.params.id;
        homeService.getCinemaDetailTicketData(cinemaId)
        .then((res)=>{
            this.setState({showFunc:res});
        })
        homeService.getCinemaDetailInfoData(cinemaId)
        .then((res)=>{
            this.setState({cinemaServiceData:res});
            var arr = res.services;
            for(var i=0 ; i<arr.length ; i++){
                if(arr[i].name == "取票"){
                    this.setState({serviceDetailData:arr[i].description});
                    break;
                }
            }
            if(i == arr.length){
                this.setState({serviceDetailData:"暂无数据"});
            }
        })
    }
    componentDidMount(){
        cinemaDetailIScroll = new IScroll(".cinema-detail",{
            probeType:3
        })
    }
    infoActionOne(){
        this.setState({infoActive:1});
        var arr = this.state.cinemaServiceData.services;
        for(var i=0 ; i<arr.length ; i++){
            if(arr[i].name == "取票"){
                this.setState({serviceDetailData:arr[i].description});
                break;
            }
        }
        if(i == arr.length){
            this.setState({serviceDetailData:"暂无数据"});
        }
    }
    infoActionTwo(){
        this.setState({infoActive:2});
        var arr = this.state.cinemaServiceData.services;
        for(var i=0 ; i<arr.length ; i++){
            if(arr[i].name == "3D"){
                this.setState({serviceDetailData:arr[i].description});
                break;
            }
        }
        if(i == arr.length){
            this.setState({serviceDetailData:"暂无数据"});
        }
    }
    infoActionThree(){
        this.setState({infoActive:3});
        var arr = this.state.cinemaServiceData.services;
        for(var i=0 ; i<arr.length ; i++){
            if(arr[i].name == "停车"){
                this.setState({serviceDetailData:arr[i].description});
                break;
            }
        }
        if(i == arr.length){
            this.setState({serviceDetailData:"暂无数据"});
        }
    }
    infoActionFour(){
        this.setState({infoActive:4});
        var arr = this.state.cinemaServiceData.services;
        for(var i=0 ; i<arr.length ; i++){
            if(arr[i].name == "优惠"){
                this.setState({serviceDetailData:arr[i].description});
                break;
            }
        }
        if(i == arr.length){
            this.setState({serviceDetailData:"暂无数据"});
        }
    }
    infoActioFive(){
        this.setState({infoActive:5});
        var arr = this.state.cinemaServiceData.services;
        for(var i=0 ; i<arr.length ; i++){
            if(arr[i].name == "交通"){
                this.setState({serviceDetailData:arr[i].description});
                break;
            }
        }
        if(i == arr.length){
            this.setState({serviceDetailData:"暂无数据"});
        }
    }

}