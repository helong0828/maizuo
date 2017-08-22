import React,{Component} from "react"
import homeService from "../../services/homeService.js"
import store from "../../store"
import "../../css/movieDetail.css"

export default class MovieDetail extends Component{
    constructor(props){
        super();
        this.state={
            detailData:{},
            name:""
        }
    }
    render(){
        var imgpath = this.state.detailData.cover==null?'': this.state.detailData.cover.origin;
        var time = this.state.detailData.playingTime==null?"":this.state.detailData.playingTime.timedate;
        var actor = this.state.detailData.actors==null?[]:this.state.detailData.actors;
            return (
                <div class="page">
                    <div class="pic">
                        <img src={imgpath}/>
                    </div>
                    <div class="info">
                        <h3>影片简介</h3>
                        <div class="director">
                            <p>导演：{this.state.detailData.director}</p>
                        </div>
                        <div class="actor">
                            <span>主演：</span>
                            {
                                actor.map((item,index)=>{
                                    return (
                                        <span key={index}>{item.name}|</span>
                                    )
                                })
                            }
                        </div>
                        <div class="language">
                            <p>地区语言：{this.state.detailData.nation}({this.state.detailData.language})</p>
                        </div>
                        <div class="type">
                            <span>类型：{this.state.detailData.category}</span>
                        </div>
                        <div class="palyingTime">
                            <span>上映时间：{time}</span>
                        </div>
                        <div class="detail">
                            <p>{this.state.detailData.synopsis}</p>
                        </div>
                    </div>
                    <div class="btn">
                        <button onClick={this.buyTicket.bind(this)}>立即购票</button>
                    </div>
                </div>
            )
        
    }
    componentWillMount(){
        var id=this.props.match.params.id;
        homeService.getMovieDetailData(id)
        .then((res)=>{
            this.setState({detailData:res});
            this.setState({name:res.name});
            store.dispatch({
                type:"CHANGETITLE",
                title:res.name
            })
        })
    }
    buyTicket(){
        var filmId=this.props.match.params.id;
        this.props.history.push({
            pathname:"/cinema",
            state:{
                id:filmId,
                name:this.state.name
            }
        })
    }
}

