import Matter from "matter-js"

const Engine = Matter.Engine
const Render = Matter.Render
const Runner = Matter.Runner
const Bodies = Matter.Bodies
const Composite = Matter.Composite

const engine = Engine.create()

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



function addComposite(...bodies){
	Composite.add(engine.world, bodies)
}

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
	addComposite,
	runRender}


