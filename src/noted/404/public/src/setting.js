import Matter from "matter-js"
// svgレンダリングに必要１
require('pathseg')

const Common = Matter.Common
const Engine = Matter.Engine
const Render = Matter.Render
const Runner = Matter.Runner
const Body = Matter.Body
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

const debugOption = {
    width: 800,
    height: 600,
    pixelRatio: 1,
    background: '#fafafa',
    wireframeBackground: '#222',
    hasBounds: true,
    enabled: true,
    wireframes: true,
    showSleeping: true,
    showDebug: true,
    showBroadphase: true,
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

const productOption = {
    width: 800,
    height: 600,
    pixelRatio: 1,
    background: '#fafafa',
    wireframeBackground: '#222',
    hasBounds: false,
    enabled: false,
    wireframes: false,
    showSleeping: true,
    showDebug: false,
    showBroadphase: false,
    showBounds: false,
    showVelocity: false,
    showCollisions: false,
    showSeparations: false,
    showAxes: false,
    showPositions: false,
    showAngleIndicator: false,
    showIds: false,
    showShadows: true,
    showVertexNumbers: false,
    showConvexHulls: false,
    showInternalEdges: false,
    showMousePosition: false
}

const render = Render.create({
    element: document.body,
    engine: engine,
    options:productOption
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

const stageBodies = [
    Bodies.rectangle(400, 610, 810, 60, { isStatic: true })
]
Composite.add(world, stageBodies)

function runRender(){
	Render.run(render)
	const runner = Runner.create();
	Runner.run(runner, engine)
}

export {
    render,
    world,
    Common,
	Engine,
	Render,
	Runner,
    Body,
	Bodies,
	Composite,
	Mouse,
    Vertices,
    Svg,
	runRender}


