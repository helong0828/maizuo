import { createStore } from "redux"

function reducer(state,action){
    switch(action.type){
        case "CHANGETITLE":
            //return出去的数据就是Store,任何组件都能使用的数据
            //"CHANGETITLE"触发后将title进行修改
            state.title = action.title
            return state
        default:
            //默认的初始数据
            return {
                title:"卖座电影"
            }
    }
}

export default createStore(reducer)