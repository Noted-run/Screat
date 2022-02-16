import {Bodies, addComposite, runRender}  from "./setting"

(function(){
	window.onload = () => {
		// メイン処理
		const boxA = Bodies.rectangle(400, 200, 80, 80);
		const boxB = Bodies.rectangle(450, 50, 80, 80);
		const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

		addComposite(boxA, boxB, ground)

		runRender()
		
	}
})();

