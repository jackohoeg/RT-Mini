var gl,g_canvasID,isDrag=!1,xCVV=1,yCVV=0,xMpos=0,yMpos=0,xMdragTot=0,yMdragTot=0;rayView=new VBObox1,preView=new PreVis,camera=new Camera;var minRes=64,maxRes=1024,curRes=256,g_myPic=new CImgBuf(curRes,curRes),g_myScene=new CScene,g_SceneNum=0,G_SCENE_MAX=3,g_AAcode=1,G_AA_MAX=8,g_isJitter=0,g_maxRecursion=6,g_minRefl=.01,g_minTran=.1,lamp=[],matter=[],isRendering=!1;function main(){g_canvasID=document.getElementById("webgl"),(gl=g_canvasID.getContext("webgl2",{preserveDrawingBuffer:!0}))?(gl.enable(gl.DEPTH_TEST),gl.enable(gl.CULL_FACE),init(),g_myScene.initScene(1),rayView.init(gl),preView.init(gl),gl.clearColor(g_myScene.skyColor[0],g_myScene.skyColor[1],g_myScene.skyColor[2],1),initPage(),onBrowserResize(),drawAll()):console.log("Failed to get the rendering context for WebGL")}function init(){camera.init(1,1),initEvents(),lamp.push(new LightsT),glMatrix.vec4.set(lamp[0].I_pos,0,0,5,1),lamp[0].turnOn(),lamp.push(new LightsT),glMatrix.vec4.set(lamp[1].I_pos,0,0,4,1),lamp[1].turnOn()}function initPage(){lamp[0].I_pos[0]=camera.eyePoint[0],lamp[0].I_pos[1]=camera.eyePoint[1],lamp[0].I_pos[2]=camera.eyePoint[2]}function initEvents(){g_canvasID.addEventListener("mousedown",function(e){return mouseDown(e)}),window.addEventListener("mousemove",function(e){return mouseMove(e)}),window.addEventListener("mouseup",function(e){return mouseUp(e)}),window.addEventListener("keydown",function(e){return keyDown(e)},!1),window.addEventListener("keyup",function(e){return keyUp(e)},!1)}function drawPreview(){gl.enable(gl.SCISSOR_TEST),gl.scissor(0,0,gl.drawingBufferWidth/2,gl.drawingBufferHeight),gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT),gl.disable(gl.SCISSOR_TEST),gl.viewport(0,0,gl.drawingBufferWidth/2,gl.drawingBufferHeight),preView.draw()}function drawAll(){gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT),gl.viewport(0,0,gl.drawingBufferWidth/2,gl.drawingBufferHeight),preView.draw(),gl.viewport(gl.drawingBufferWidth/2,0,gl.drawingBufferWidth/2,gl.drawingBufferHeight),rayView.switchToMe(),rayView.draw()}function publishRender(){rayView.switchToMe(),rayView.reload(),drawAll()}function onRenderButton(){g_myScene.isRendering||(document.getElementById("renderReport").innerHTML="Rendering",g_myScene.makeRayTracedImage())}function onResolutionButton(){g_myScene.isRendering||(curRes<maxRes?curRes*=2:curRes=minRes,g_myPic.setResolution(curRes),rayView.init(gl),document.getElementById("resReport").innerHTML=curRes.toString()+" x "+curRes.toString())}function onSuperSampleButton(){g_myScene.isRendering||(G_AA_MAX<(g_AAcode+=1)&&(g_AAcode=1),document.getElementById("AAreport").innerHTML=1==g_AAcode?0==g_isJitter?"1 sample/pixel. No jitter.":"1 sample/pixel, but jittered.":0==g_isJitter?g_AAcode+"x"+g_AAcode+" Supersampling. No jitter.":g_AAcode+"x"+g_AAcode+" JITTERED Supersampling")}function onRayRecurButton(){g_myScene.isRendering||(g_maxRecursion++,g_maxRecursion%=9,document.getElementById("RayRecur").innerHTML="Max Recursion = "+g_maxRecursion)}function onJitterButton(){g_myScene.isRendering||(g_isJitter=!g_isJitter,document.getElementById("AAreport").innerHTML=1==g_AAcode?0==g_isJitter?"1 sample/pixel. No jitter.":"1 sample/pixel, but jittered.":0==g_isJitter?g_AAcode+"x"+g_AAcode+" Supersampling. No jitter.":g_AAcode+"x"+g_AAcode+" JITTERED Supersampling")}function onSceneButton(){g_myScene.isRendering||(g_SceneNum<0||G_SCENE_MAX<=g_SceneNum?g_SceneNum=0:g_SceneNum+=1,document.getElementById("SceneReport").innerHTML="Show Scene "+g_SceneNum,g_myPic.setTestPattern(g_SceneNum),g_myScene.initScene(),gl.clearColor(g_myScene.skyColor[0],g_myScene.skyColor[1],g_myScene.skyColor[2],1),rayView.switchToMe(),rayView.reload(),drawAll())}function onBrowserResize(e){innerWidth>2*e?(g_canvasID.width=2*e,g_canvasID.height=e):(g_canvasID.width=innerWidth,g_canvasID.height=.5*innerWidth),drawAll()}function lightMove(){lamp[1].I_pos[0]=document.getElementById("lightX").value,lamp[1].I_pos[1]=document.getElementById("lightY").value,lamp[1].I_pos[2]=document.getElementById("lightZ").value,drawPreview()}function lampOff(e){g_myScene.isRendering||(lamp[e].turnOff(),drawPreview())}function lampOn(e){g_myScene.isRendering||(lamp[e].turnOn(),drawPreview())}function mouseDown(e){g_myScene.isRendering||(mouseToCVV(e),xMpos=xCVV,yMpos=yCVV,isDrag=!0)}function mouseMove(e){g_myScene.isRendering||0!=isDrag&&(mouseToCVV(e),xMdragTot+=xCVV-xMpos,yMdragTot+=yCVV-yMpos,xMpos=xCVV,yMpos=yCVV,camera.aim(xMdragTot,-yMdragTot),camera.refreshView(),camera.refreshVP(),drawPreview())}function mouseUp(e){mouseMove(e),isDrag=!1}function mouseToCVV(e){var n=g_canvasID.getBoundingClientRect(),a=e.clientX-n.left,n=g_canvasID.height-(e.clientY-n.top);xCVV=(a-g_canvasID.width/2)/(g_canvasID.width/2),yCVV=(n-g_canvasID.height/2)/(g_canvasID.height/2)}function clearMouse(){xCVV=1,yMdragTot=xMdragTot=yMpos=xMpos=yCVV=0,camera.aim(0,0),camera.refreshView(),camera.refreshVP()}function keyDown(e){if(!g_myScene.isRendering){var n=!1;switch(e.code){case"KeyT":onRenderButton();break;case"KeyA":camera.dollyLeft(),lamp[0].I_pos[0]=camera.eyePoint[0],lamp[0].I_pos[1]=camera.eyePoint[1];break;case"KeyD":camera.dollyRight(),lamp[0].I_pos[0]=camera.eyePoint[0],lamp[0].I_pos[1]=camera.eyePoint[1];break;case"KeyS":camera.dollyBack(),lamp[0].I_pos[0]=camera.eyePoint[0],lamp[0].I_pos[1]=camera.eyePoint[1],lamp[0].I_pos[2]=camera.eyePoint[2];break;case"KeyW":camera.dollyForward(),lamp[0].I_pos[0]=camera.eyePoint[0],lamp[0].I_pos[1]=camera.eyePoint[1],lamp[0].I_pos[2]=camera.eyePoint[2];break;case"KeyQ":camera.craneDown(),lamp[0].I_pos[2]=camera.eyePoint[2];break;case"KeyE":camera.craneUp(),lamp[0].I_pos[2]=camera.eyePoint[2];break;case"ArrowLeft":xMdragTot+=camera.yawStep,xMpos+=camera.yawStep,xCVV=xMpos,camera.pan(xMdragTot),n=!0;break;case"ArrowRight":xMdragTot-=camera.yawStep,xMpos-=camera.yawStep,xCVV=xMpos,camera.pan(xMdragTot),n=!0;break;case"ArrowUp":yMdragTot-=camera.pitchStep,yMpos-=camera.pitchStep,yCVV=yMpos,camera.tilt(-yMdragTot),n=!0;break;case"ArrowDown":yMdragTot+=camera.pitchStep,yMpos+=camera.pitchStep,yCVV=yMpos,camera.tilt(-yMdragTot),n=!0}!0===n&&camera.refreshView(),!0===camera.changed&&(camera.refreshVP(),drawPreview())}}function keyUp(e){}