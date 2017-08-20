import React,{Component} from "react"
import homeService from "../../services/homeService.js"

import "../../css/movieDetail.css"

export default class MovieDetail extends Component{
    constructor(props){
        super();
        console.log(props);
        this.state={
            detailData:{}
        }
    }
    render(){
        console.log(this.state.detailData);
        return (
            <div class="page">
                <div class="pic">
                    <img src={this.detailData.poster.origin}/>
                </div>
                <div class="info">
                    <h3>影片简介</h3>
                    <div class="director">
                        <p>导演：{this.detailData.director}</p>
                    </div>
                    <div class="actor">
                        <span>主演：</span>
                    </div>
                    <div class="language">
                        <p>地区语言：{this.detailData.nation}({detailData.language})</p>
                    </div>
                    <div class="type">
                        <span>类型：{this.detailData.category}</span>
                    </div>
                    <div class="palyingTime">
                        <span>上映时间：{this.detailData.playingTime.timedate}</span>
                    </div>
                     <div class="detail">
                        <p>{this.detailData.synopsis}</p>
                    </div>
                </div>
                <div class="btn">
                    <button>立即购票</button>
                </div>
            </div>
        )
    }
    componentWillMount(){
        var id=this.props.match.params.id;
        homeService.getMovieDetailData(id)
        .then((res)=>{
            console.log(res);
            this.setState({detailData:res});
        })
    }
}

