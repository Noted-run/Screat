import svg404Path from '~/resource/crush.svg';
import {runRender}  from "./setting"
import { create404Obj } from "./stage"
(function(){
	window.onload = () => {
		// main
		create404Obj(svg404Path)
		runRender()
		
	}
})();

