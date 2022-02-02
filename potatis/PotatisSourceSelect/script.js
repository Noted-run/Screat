const sourceObjectOuter = document.getElementById("source-select-outer")
const sourceSelecterContainerList = document.querySelectorAll('.source-selecter-container')
const sourceSelecterList = document.querySelectorAll('.source-selecter')
const sourceDetail = document.getElementById('selected-source-detail')
const sourceDecideBtn = document.getElementById('source-decide-btn')
const overlay = document.getElementById('source-overlay')
// 現在選択中のソース
let selectedSourceIndex = -1
let selectedRect = null
let isSelectedMode = false

/**
 * 画面サイズを調整
 */
fitWindowSize = (event) => {
	if(window.innerWidth > window.innerHeight){
		sourceObjectOuter.style.height = `${parseInt(640 / 440 * window.innerWidth)}px`
	}
	else if(window.innerWidth * 2 > window.innerHeight)
		sourceObjectOuter.style.height = `${parseInt(window.innerHeight)}px`
	else
		sourceObjectOuter.style.height = `${parseInt(440 / 620 *  window.innerHeight)}px`
}

/**
 * 選択確認画面を表示
 */
const confirmSource = (index)=>{
	if(index != selectedSourceIndex || isSelectedMode == false){
		if (selectedSourceIndex != -1)
			sourceSelecterContainerList[selectedSourceIndex].classList.remove('selected')
		selectedRect = sourceSelecterContainerList[index].getBoundingClientRect()
		sourceSelecterContainerList[index].style.width = '40%'
		sourceSelecterContainerList[index].style.transform = `translate(${-1 * selectedRect.x}px,${-1 * selectedRect.y}px)`
		sourceSelecterContainerList[index].style.margin = `30px 30% 0 30%`
		
		// ソース説明のアニメーション
		sourceDetail.style.transitionDuration = `0s`
		sourceDetail.style.transitionDelay = `0s`
		sourceDetail.style.top = `${parseInt(selectedRect.y + + selectedRect.height / 2)}px`
		sourceDetail.style.left = `${parseInt(selectedRect.x + selectedRect.width / 2)}px`
		
		sourceDetail.style.transitionDuration = `0.9s`
		sourceDetail.style.transitionDelay = `0.2s`
		sourceDetail.style.width = `${80}%`
		sourceDetail.style.height = `${50}%`
		sourceDetail.style.margin = `140px 10% 0 10%`
		sourceDetail.style.transform = `translate(${-1 * (selectedRect.x + + selectedRect.width / 2)}px,${-1 * (selectedRect.y + + selectedRect.height / 2)}px)`
	
		overlay.classList.add('visible')
		sourceSelecterContainerList[index].classList.add('selected')

		selectedSourceIndex  = index //対象を記録
		isSelectedMode = true
	}
}

/**
 * 外側の部分が選ばれたとき
 */
overlay.onclick = () => {
	overlay.classList.remove('visible')

	sourceSelecterContainerList[selectedSourceIndex].style.width = `${selectedRect.width}px`
	sourceSelecterContainerList[selectedSourceIndex].style.transform = `translate(0,0)`
	sourceSelecterContainerList[selectedSourceIndex].style.margin = `0`
	
	sourceDetail.style.width = `${0}px`
	sourceDetail.style.height = `${0}px`
	sourceDetail.style.margin = `0`
	sourceDetail.style.transform = 'translate(0,0)'
	isSelectedMode = false

}

for(let i = 0; i < sourceSelecterContainerList.length; i++){
	sourceSelecterList[i].classList.add(`fuwafuwa-${i % 5 + 1}`)
	sourceSelecterContainerList[i].onclick = ((index) => {
		return () => {
			confirmSource(index)
		}
	})(i)
}

/**
 * ソースが決められたとき
 */
sourceDecideBtn.onclick = () => {
	sourceSelecterContainerList[selectedSourceIndex].style.width = '40%'
	sourceSelecterContainerList[selectedSourceIndex].style.transform = `translate(${-1 * selectedRect.x}px,${window.innerHeight - selectedRect.y - selectedRect.height}px)`
	sourceSelecterContainerList[selectedSourceIndex].style.margin = `0 0 5% 5%`

	selectedRect = sourceSelecterContainerList[selectedSourceIndex].getBoundingClientRect()
	sourceDetail.style.transitionDelay = `0s`
	sourceDetail.style.transitionDuration = `0.3s`
	sourceDetail.style.width = `0px`
	sourceDetail.style.height = `0px`
	sourceDetail.style.margin = `140px 50% 0 50%`
	sourceDetail.style.transform = `translate(${-1 * (selectedRect.x + selectedRect.width / 2)}px,${-1 * (selectedRect.y + selectedRect.height)}px)`
	overlay.classList.remove('visible')
}

fitWindowSize(null)
window.addEventListener('resize',fitWindowSize)

