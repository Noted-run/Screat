import {runRender}  from "./setting"
import { create404Obj } from "./stage"
(function(){
	window.onload = () => {
		// main
		create404Obj('resource/crush.svg')
		
		runRender()
		
	}
})();

