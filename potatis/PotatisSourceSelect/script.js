const standardWidth = 480

const sourceObjectOuter = document.getElementById("source-select-outer")
const sourceSelecterContainerList = document.querySelectorAll('.source-selecter-container')
const sourceSelecterList = document.querySelectorAll('.source-selecter')
const sourceDetail = document.getElementById('selected-source-detail')
const overlay = document.getElementById('source-overlay')
// 現在選択中のソース
let selectedSource = null

/**
 * 画面サイズを調整
 */
fitWindowSize = (event) => {
	sourceObjectOuter.style.height = `${parseInt(window.innerWidth / standardWidth * window.innerHeight)}px`
}

/**
 * 選択確認画面を表示
 */
const confirmSource = (index)=>{
	
	const targetRect = sourceSelecterContainerList[index].getBoundingClientRect()
	const detailRect = sourceDetail.getBoundingClientRect()
	// ソースの本体のアニメーション
	const targetMagnif = (window.innerWidth * 0.5 / targetRect.width) .toFixed(1) //拡大比率
	const targetMoveX = parseInt(window.innerWidth / 2 - ( targetRect.x + targetRect.width / 2))
	const targetMoveY = parseInt(window.innerHeight / 3 - ( targetRect.y + targetRect.height / 2))
	
	sourceSelecterList[index].animate(
		[
			{transform: 'translate(0,0) scale(1)'},
			{transform: `translate(${targetMoveX}px,${ targetMoveY}px) scale(${targetMagnif})`},
		],{
		duration: 600,
    	easing: 'linear',
    	fill: 'forwards'
		}
	)
	
	// ソース説明のアニメーション
	sourceDetail.style.top = `${parseInt(targetRect.y  - targetRect.height * targetMagnif/ 2)}px`
	sourceDetail.style.left = `${parseInt(targetRect.x - targetRect.width * targetMagnif / 2)}px`
	const detailMoveX = parseInt(targetMoveX)
	const detailMoveY  = parseInt(targetMoveY + targetRect.height * targetMagnif - ( detailRect.y + detailRect.height / 2))
	console.log(targetRect.height)
	sourceDetail.animate(
		[
			{transform: `translate(0,0) scale(0) `},
			{transform: `translate(${detailMoveX}px,${detailMoveY}px) scale(1)`},
		],{
		duration: 800,
    	easing: 'ease-in-out',
    	fill: 'forwards'
		}
	)
	
	sourceDetail.classList.add('visible')
	overlay.classList.add('visible')
	
	sourceSelecterContainerList[index].classList.add('selected')
	selectedSource = sourceSelecterContainerList[index] //対象を記録
}

for(let i = 0; i < sourceSelecterContainerList.length; i++){
	sourceSelecterContainerList[i].classList.add(`fuwafuwa-${i % 5 + 1}`)
	sourceSelecterContainerList[i].onclick = ((index) => {
		return () => {
			confirmSource(index)
		}
	})(i)
}

fitWindowSize(null)
window.addEventListener('resize',fitWindowSize)

