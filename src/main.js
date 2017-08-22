import React from "react"
import ReactDOM from "react-dom"
import store from "./store"
import App from "./App.js"

function render(){
	ReactDOM.render(
		<App />,
		document.getElementById("app")
	)
}
//数据发生变化，再调用一次
store.subscribe(render)
//默认调用
render();