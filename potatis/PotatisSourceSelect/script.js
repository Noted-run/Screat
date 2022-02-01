const standardWidth = 440

const sourceObjectOuter = document.getElementById("source-select-outer")
const sourceSelecterContainerList = document.querySelectorAll('.source-selecter-container')
const sourceSelecterList = document.querySelectorAll('.source-selecter')
const sourceDetail = document.getElementById('selected-source-detail')
const overlay = document.getElementById('source-overlay')
// 現在選択中のソース
let selectedSourceIndex = -1
let selectedRect = null

/**
 * 画面サイズを調整
 */
fitWindowSize = (event) => {
	sourceObjectOuter.style.height = `${parseInt(parseInt(window.innerWidth / standardWidth *  window.innerHeight))}px`
}

/**
 * 選択確認画面を表示
 */
const confirmSource = (index)=>{
	if(index != selectedSourceIndex){
		selectedRect = sourceSelecterContainerList[index].getBoundingClientRect()
		sourceSelecterContainerList[index].animate(
			[
				{width:`${selectedRect.width}px`,transform:'translate(0,0)', margin:`0`},
				{width:'40%',transform:`translate(${-1 * selectedRect.x}px,${-1 * selectedRect.y}px)`,margin:`30px 30% 0 30%`}

			],{
			duration: 600,
			easing: 'linear',
			fill: 'forwards',
			iterations: 1
			}
		)
		
		// ソース説明のアニメーション
		sourceDetail.style.top = `${parseInt(selectedRect.y + + selectedRect.height / 2)}px`
		sourceDetail.style.left = `${parseInt(selectedRect.x + selectedRect.width / 2)}px`
		sourceDetail.animate(
			[
				{width:`${0}px`, height:`${0}px`, margin:`0`, transform:'translate(0,0)'},
				{width:`${80}%`,height:`${50}%`, margin:`140px 10% 0 10%`, transform:`translate(${-1 * (selectedRect.x + + selectedRect.width / 2)}px,${-1 * (selectedRect.y + + selectedRect.height / 2)}px)`},
			],{
			duration: 600,
			easing: 'linear',
			fill: 'forwards'
			}
		)
	
		overlay.classList.add('visible')
		
		sourceSelecterContainerList[index].classList.add('selected')

		selectedSourceIndex  = index //対象を記録
	}
}

overlay.onclick = () => {
	overlay.classList.remove('visible')

	sourceSelecterContainerList[selectedSourceIndex].animate(
		[
			{width:'40%',transform:`translate(${-1 * selectedRect.x}px,${-1 * selectedRect.y}px)`,margin:`30px 22% 0 22%`},
			{width:`${selectedRect.width}px`,transform:'translate(0,0)', margin:`0`}

		],{
		duration: 600,
    	easing: 'linear',
    	fill: 'forwards',
		iterations: 1
		}
	)

	sourceDetail.animate(
		[
			{width:`${80}%`,height:`${50}%`, margin:`140px 10% 0 10%`, transform:`translate(${-1 * (selectedRect.x + + selectedRect.width / 2)}px,${-1 * (selectedRect.y + + selectedRect.height / 2)}px)`},
			{width:`${0}px`, height:`${0}px`, margin:`0`, transform:'translate(0,0)'},
		],{
		duration: 600,
    	easing: 'linear',
    	fill: 'forwards'
		}
	)

	sourceSelecterContainerList[selectedSourceIndex].classList.remove('selected')
	selectedSourceIndex = -1
	

}

for(let i = 0; i < sourceSelecterContainerList.length; i++){
	sourceSelecterList[i].classList.add(`fuwafuwa-${i % 5 + 1}`)
	sourceSelecterContainerList[i].onclick = ((index) => {
		return () => {
			confirmSource(index)
		}
	})(i)
}

fitWindowSize(null)
window.addEventListener('resize',fitWindowSize)

