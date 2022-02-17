
import {Common,Svg,world,Bodies,Composite} from "./setting"

const select = function(root, selector) {
	return Array.prototype.slice.call(root.querySelectorAll(selector));
}

var loadSvg = function(url) {
    return fetch(url)
        .then(function(response) { return response.text(); })
        .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
}

export function create404Obj(svgPath , posX = 400, posY = 80){
	loadSvg(svgPath)
	.then(function(root) {
		const color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);

		const vertexSets = select(root, 'path')
							.map(function(path) { return Svg.pathToVertices(path); });

		const bodies = Bodies.fromVertices(posX, posY, vertexSets, {
			render: {
				fillStyle: color,
				strokeStyle: color,
				lineWidth: 1
			}
		})

		Composite.add(world, bodies, true);
		
	})
	
}

