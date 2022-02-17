import Matter from "matter-js"
// svgレンダリングに必要１
import * as pathseg from "./plugins/pathseg" 

const Common = Matter.Common
const Engine = Matter.Engine
const Render = Matter.Render
const Runner = Matter.Runner
const Bodies = Matter.Bodies
const Composite = Matter.Composite
const Vertices = Matter.Vertices
const Svg = Matter.Svg
const Mouse = Matter.Mouse
const MouseConstraint = Matter.MouseConstraint
// SVGをレンダリングするのに必要２
Common.setDecomp(require('poly-decomp'));

const engine = Engine.create()
const world = engine.world;

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        pixelRatio: 1,
        background: '#fafafa',
        wireframeBackground: '#222',
        hasBounds: true,
        enabled: false,
        wireframes: false,
        showSleeping: true,
        showDebug: true,
        showBroadphase: false,
        showBounds: true,
        showVelocity: true,
        showCollisions: true,
        showSeparations: true,
        showAxes: true,
        showPositions: true,
        showAngleIndicator: true,
        showIds: true,
        showShadows: true,
        showVertexNumbers: true,
        showConvexHulls: true,
        showInternalEdges: true,
        showMousePosition: false
    }
});

const mouse = Mouse.create(render.canvas)
const mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		stiffness: 0.2,
		render: {
			visible: false
		}
	}
});
Composite.add(world, mouseConstraint);
render.mouse = mouse;

var select = function(root, selector) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
};
var loadSvg = function(url) {
    return fetch(url)
        .then(function(response) { return response.text(); })
        .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
};

loadSvg('./resource/crush.svg').then(function(root) {
    var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
    
    var vertexSets = select(root, 'path')
        .map(function(path) { 
            return Svg.pathToVertices(path); 
        });
    
    Composite.add(world, Bodies.fromVertices(400, 80, vertexSets, {
        render: {
            fillStyle: color,
            strokeStyle: color,
            lineWidth: 1
        }
    }, true));
});


// function addComposite(...bodies){
// 	Composite.add(world, bodies)
// }



function runRender(){
	Render.run(render)
	const runner = Runner.create();
	Runner.run(runner, engine)
}


export {
	Engine,
	Render,
	Runner,
	Bodies,
	Composite,
	Mouse,
	// addComposite,
	runRender}


