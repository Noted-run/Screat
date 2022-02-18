
import {Common,Svg,world,Body,Bodies,Composite,Vertices} from "./setting"

const getSvgDomList = function(root, selector) {
	return root.querySelectorAll(selector);
}

const loadSvg = function(url) {
    return fetch(url)
        .then(function(response) { return response.text(); })
        .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
}

export function create404Obj(svgPath , posX = 400, posY = 80){
	loadSvg(svgPath)
	.then(function(root) {
		const SvgDomList = getSvgDomList(root, 'path')
		const vertexSets = Array.prototype.slice.call(SvgDomList)
							.map(function(path) { return Svg.pathToVertices(path); });
		
		const bodies = Bodies.fromVertices(posX, posY, vertexSets)
		for(let i = 1; i  < bodies.parts.length; i++){
			const shape = {
				label: 'Shape Body' + i,
				position: bodies.parts[i].position,
				vertices: bodies.parts[i].vertices,
			};
			const body = Body.create(Common.extend({}, shape))
			Composite.add(world, body);
		}
	})
	
}

