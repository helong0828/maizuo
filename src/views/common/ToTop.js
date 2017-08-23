import React,{Component} from "react"

export default class ToTop extends Component{
    render(){
        let show={
            display:this.props.toTopShow?"block":"none"
        }
        return (
            <div class="toTop" onClick={this.toTopAction.bind(this)} style={show}>
                <i class="iconfont icon-to-top"></i>
            </div>
        )
    }
    toTopAction(event){
        event.stopPropagation();
        console.log("点击了");
        this.props.scrollToTop();
    }
}