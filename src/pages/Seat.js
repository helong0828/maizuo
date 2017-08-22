import React,{Component} from "react"


/*
{
                            this.state.seatData.map((item,index)=>{
                                return (
                                    <div>
                                        <sapn>{}</sapn>
                                    </div>
                                )
                            })
                        }
*/ 
import homeService from "../services/homeService.js"
import "../css/seat.css"
export default class Seat extends Component{
    constructor(props){
        super();
        this.state = {
            titleData:{},
            seatData:[],
            seatHeight:0,
            seatWidth:0
        }
    }
    render(){
        
        return (
            <div class="page"> 
                <div class="movieInfo">
                    <h2>{this.state.titleData.name}</h2>
                    <p>{this.state.titleData.ymd} {this.state.titleData.hm} {this.state.titleData.imagery}</p>
                    <span>换一场</span>
                </div>
                <div class="seat" ref="seatAera">
                    <div class="screen">
                        1厅方向
                    </div>
                    <div class="allSeat">
                        {
                            this.state.seatData.map((item,index)=>{
                                return (
                                    <div key={index} class="rowSeat">
                                        <sapn class="rownum">{item.row}</sapn>
                                        <div class="lattice">
                                            {
                                                item.newseats.map((list,i)=>{
                                                    return (
                                                        <span key={i} id={list.rowName + list.columnName} class="sea"></span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    componentWillMount(){
        var id = this.props.match.params.id;
        homeService.getSeatInfoData(id)
        .then((res)=>{
            console.log(res);
            this.setState({seatData:res});
            this.setState({seatHeight:res.height});
            this.setState({seatWidth:res.width});
        })
        homeService.getSeatPageTitleData(id)
        .then((res)=>{
            this.setState({titleData:res});
        })
        console.log(id);
    }
    componentDidMount(){
        var Asea = document.getElementsByClassName("sea");
        console.log(Asea.length);
    }
}