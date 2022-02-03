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

let centerX = 0 
let centerY = 0

let moveX = 0
let moveY = 0

const baseAnimDuration = '1.2s'
const selectedSourceSize = window.innerWidth * 0.4
const choicedSourceSize = window.innerWidth * 0.2

/**
 * 画面サイズを調整
 */
fitWindowSize = (event) => {
	let height = 0
	if(window.innerWidth > window.innerHeight){
		height = parseInt(640 / 440 * window.innerWidth)
	}
	else if(window.innerWidth * 2 > window.innerHeight)
		height = parseInt(window.innerHeight)
	else
		height = parseInt(440 / 620 *  window.innerHeight)

	sourceObjectOuter.style.height = `${height}px`
	centerX = document.body.clientWidth / 2 
	centerY = height / 2
}

const getTransformStyle = (transX, transY, scale) => {
	return `translate(${parseInt(transX)}px,${parseInt(transY)}px) scale(${scale.toFixed(1)})`
}

/**
 * 選択確認画面を表示
 */
const confirmSource = (index)=>{
	if(index != selectedSourceIndex || isSelectedMode == false){
		if (selectedSourceIndex != -1)
			sourceSelecterContainerList[selectedSourceIndex].classList.remove('selected')
		selectedRect = sourceSelecterContainerList[index].getBoundingClientRect()

		moveX = centerX - selectedRect.x - sourceSelecterContainerList[index].clientWidth / 2
		moveY = 60 - selectedRect.y

		/*即変化が必要なものは0sで変化させる */
		sourceSelecterContainerList[index].style.transitionDuration = '0s'
		sourceDetail.style.transitionDuration = `0s`
		sourceSelecterContainerList[index].style.zIndex = '5'
		sourceDetail.style.transform = `scale(1)`
		sourceDetail.style.transform = getTransformStyle(
			selectedRect.x + selectedRect.width/ 2 - document.body.clientWidth * 0.8 /2, 
			selectedRect.y + selectedRect.height / 2,
			0)	

		/*アニメーション的な変化は遅延をかける */
		setTimeout(() => {
			sourceSelecterContainerList[index].style.transitionDuration = baseAnimDuration
			sourceSelecterContainerList[index].style.transform = getTransformStyle(moveX, moveY, selectedSourceSize / selectedRect.width)	
			sourceDetailRect = sourceDetail.getBoundingClientRect()
			sourceDetail.style.transitionDuration = baseAnimDuration
			sourceDetail.style.transform = getTransformStyle(
				centerX - document.body.clientWidth * 0.8 /2,
				selectedRect.y + moveY, 
				1)		
		}, 100)

		overlay.classList.add('visible')
		sourceSelecterContainerList[index].classList.add('selected')
		selectedSourceIndex  = index 
		isSelectedMode = true
	}
}

/**
 * 外側の部分が選ばれたとき
 */
overlay.onclick = () => {
	overlay.classList.remove('visible')
	sourceDetail.style.transitionDuration = baseAnimDuration
	sourceSelecterContainerList[selectedSourceIndex].style.transform = getTransformStyle(0,0,1.0)
	sourceDetail.style.transform = getTransformStyle(0,0,0)
	isSelectedMode = false
	sourceSelecterContainerList[selectedSourceIndex].style.zIndex = '0'
}


/**
 * ソースが決められたとき
 */
sourceDecideBtn.onclick = () => {
	selectedRect = sourceSelecterContainerList[selectedSourceIndex].getBoundingClientRect()
	console.log(selectedRect.y)
	sourceSelecterContainerList[selectedSourceIndex].style.transform = getTransformStyle(
		moveX - centerX * 0.8,
		moveY + (window.innerHeight - selectedRect.y) * 0.8, 
		choicedSourceSize / selectedRect.width)
	sourceDetail.style.transform = getTransformStyle(
		centerX - document.body.clientWidth * 0.8 /2,
		window.innerHeight * 0.3, 
		0)
	overlay.classList.remove('visible')
	sourceSelecterContainerList[selectedSourceIndex].style.zIndex = '10'
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

