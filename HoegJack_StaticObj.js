var LINE_VSHADER=`#version 300 es
	precision mediump float;
	uniform mat4 u_ModelMatrix;
	uniform mat4 u_VpMatrix;
	uniform vec4 u_Color;
	
	in vec4 a_Position;
	
	out vec4 v_Color;
	
	void main() {
		gl_Position = u_VpMatrix * u_ModelMatrix * a_Position;
		v_Color = u_Color;
	}`,LINE_FSHADER=`#version 300 es
	precision mediump float;
	
	in vec4 v_Color;
	out vec4 myOutputColor;
	
	void main() {
		myOutputColor = v_Color;
	}`;function GroundGrid(){this.VSHADER_SOURCE=`#version 300 es
		uniform mat4 u_ModelMatrix;
		uniform mat4 u_VpMatrix;
		
		in vec4 a_Position;
		in vec4 a_Color;
		
		out vec4 v_Color;
		
		void main() {
			gl_Position = u_VpMatrix * u_ModelMatrix * a_Position;
			v_Color = a_Color;
		}
	`,this.FSHADER_SOURCE=`#version 300 es
		precision mediump float;
		
		in vec4 v_Color;
		
		out vec4 myOutputColor;
		void main() {
			myOutputColor = v_Color;
		}
	`,this.floatsPerVertex=7,this.vboContents=this.make(),this.vboVerts=this.vboContents.length/this.floatsPerVertex,this.FSIZE=this.vboContents.BYTES_PER_ELEMENT,this.vboBytes=this.vboContents.length*this.FSIZE,this.vboStride=this.vboBytes/this.vboVerts,this.vboFcount_a_Position=4,this.vboFcount_a_Color=3,console.assert((this.vboFcount_a_Position+this.vboFcount_a_Color)*this.FSIZE==this.vboStride,"Uh oh! GroundGrid.vboStride disagrees with attribute-size values!"),this.vboOffset_a_Position=0,this.vboOffset_a_Color=this.vboFcount_a_Position*this.FSIZE,this.vboLoc,this.shaderLoc,this.a_PosLoc,this.a_ColrLoc,this.modelMats=[],this.u_MvpMatLoc}GroundGrid.prototype.init=function(){for(i=0;i<9;i++)this.modelMats[i]=glMatrix.mat4.create();if(glMatrix.mat4.translate(this.modelMats[1],this.modelMats[1],[-200,-200,0]),glMatrix.mat4.translate(this.modelMats[2],this.modelMats[2],[-200,0,0]),glMatrix.mat4.translate(this.modelMats[3],this.modelMats[3],[-200,200,0]),glMatrix.mat4.translate(this.modelMats[4],this.modelMats[4],[0,-200,0]),glMatrix.mat4.translate(this.modelMats[5],this.modelMats[5],[0,200,0]),glMatrix.mat4.translate(this.modelMats[6],this.modelMats[6],[200,-200,0]),glMatrix.mat4.translate(this.modelMats[7],this.modelMats[7],[200,0,0]),glMatrix.mat4.translate(this.modelMats[8],this.modelMats[8],[200,200,0]),this.shaderLoc=createProgram(gl,this.VSHADER_SOURCE,this.FSHADER_SOURCE),this.shaderLoc){if(gl.program=this.shaderLoc,this.vaoLoc=gl.createVertexArray(),gl.bindVertexArray(this.vaoLoc),this.vboLoc=gl.createBuffer(),this.vboLoc)return gl.bindBuffer(gl.ARRAY_BUFFER,this.vboLoc),gl.bufferData(gl.ARRAY_BUFFER,this.vboContents,gl.STATIC_DRAW),this.a_PosLoc=gl.getAttribLocation(this.shaderLoc,"a_Position"),this.a_PosLoc<0?(console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_Position"),-1):(this.a_ColrLoc=gl.getAttribLocation(this.shaderLoc,"a_Color"),this.a_ColrLoc<0?(console.log(this.constructor.name+".init() failed to get the GPU location of attribute a_Color"),-1):(this.u_VpMatLoc=gl.getUniformLocation(this.shaderLoc,"u_VpMatrix"),void(this.u_VpMatLoc?(this.u_ModelMatLoc=gl.getUniformLocation(this.shaderLoc,"u_ModelMatrix"),this.u_ModelMatLoc?(gl.enableVertexAttribArray(this.a_PosLoc),gl.vertexAttribPointer(this.a_PosLoc,this.vboFcount_a_Position,gl.FLOAT,!1,this.vboStride,this.vboOffset_a_Position),gl.enableVertexAttribArray(this.a_ColrLoc),gl.vertexAttribPointer(this.a_ColrLoc,this.vboFcount_a_Color,gl.FLOAT,!1,this.vboStride,this.vboOffset_a_Color),gl.bindVertexArray(null)):console.log(this.constructor.name+".init() failed to get GPU location for u_ModelMatrix uniform")):console.log(this.constructor.name+".init() failed to get GPU location for u_VpMatrix uniform"))));console.log(this.constructor.name+".init() failed to create VBO in GPU. Bye!")}else console.log(this.constructor.name+".init() failed to create executable Shaders on the GPU. Bye!")},GroundGrid.prototype.draw=function(t){for(gl.useProgram(this.shaderLoc),gl.bindVertexArray(this.vaoLoc),gl.uniformMatrix4fv(this.u_VpMatLoc,!1,t.mvp),i=0;i<this.modelMats.length;i++)gl.uniformMatrix4fv(this.u_ModelMatLoc,!1,this.modelMats[i]),gl.drawArrays(gl.LINES,0,this.vboVerts);gl.bindVertexArray(null)},GroundGrid.prototype.make=function(){var t=100,i=new Float32Array([.75,.5,1]),r=new Float32Array([.1,.5,1]),a=new Float32Array(2*this.floatsPerVertex*200),o=t/99,s=t/99;for(v=0,j=0;v<200;v++,j+=this.floatsPerVertex)v%2==0?(a[j]=-t+v*o,a[j+1]=-t):(a[j]=-t+(v-1)*o,a[j+1]=t),a[j+2]=0,a[j+3]=1,a[j+4]=i[0],a[j+5]=i[1],a[j+6]=i[2];for(v=0;v<200;v++,j+=this.floatsPerVertex)v%2==0?(a[j]=-t,a[j+1]=-t+v*s):(a[j]=t,a[j+1]=-t+(v-1)*s),a[j+2]=0,a[j+3]=1,a[j+4]=r[0],a[j+5]=r[1],a[j+6]=r[2];return a};var generator={quad:function(t,i,r,a){var o=glMatrix.vec3.clone(i);glMatrix.vec3.normalize(o,o);var s=glMatrix.vec3.fromValues(1,0,0),e=glMatrix.vec3.fromValues(0,1,0),n=glMatrix.vec3.fromValues(0,0,1),i=glMatrix.quat.create();return glMatrix.quat.rotationTo(i,n,o),glMatrix.vec3.transformQuat(s,s,i),glMatrix.vec3.transformQuat(e,e,i),glMatrix.vec3.scale(s,s,r),glMatrix.vec3.scale(e,e,a),new Float32Array([t[0]+s[0]+e[0],t[1]+s[1]+e[1],t[2]+s[2]+e[2],t[0]-s[0]+e[0],t[1]-s[1]+e[1],t[2]-s[2]+e[2],t[0]-s[0]-e[0],t[1]-s[1]-e[1],t[2]-s[2]-e[2],t[0]+s[0]-e[0],t[1]+s[1]-e[1],t[2]+s[2]-e[2]])},quadWNormals:function(){var t=[];return t.push(-.5,.5,0,1),t.push(0,0,1,0),t.push(-.5,-.5,0,1),t.push(0,0,1,0),t.push(.5,-.5,0,1),t.push(0,0,1,0),t.push(.5,.5,0,1),t.push(0,0,1,0),new Float32Array(t)},quadInd:function(){return new Uint16Array([0,1,2,0,2,3])},quadIndLS:function(){return new Uint16Array([0,1,2,3,0])},quadHole:function(t,r,a,o,s){var e=glMatrix.vec3.clone(r);glMatrix.vec3.normalize(e,e);var n=glMatrix.vec3.fromValues(1,0,0),l=glMatrix.vec3.fromValues(0,1,0),u=glMatrix.vec3.fromValues(0,0,1),r=glMatrix.quat.create();glMatrix.quat.rotationTo(r,u,e),glMatrix.vec3.transformQuat(n,n,r),glMatrix.vec3.transformQuat(l,l,r),glMatrix.vec3.scale(n,n,a),glMatrix.vec3.scale(l,l,o);var h=[t[0]+n[0]+l[0],t[1]+n[1]+l[1],t[2]+n[2]+l[2],t[0]+l[0],t[1]+l[1],t[2]+l[2],t[0]-n[0]+l[0],t[1]-n[1]+l[1],t[2]-n[2]+l[2],t[0]-n[0],t[1]-n[1],t[2]-n[2],t[0]-n[0]-l[0],t[1]-n[1]-l[1],t[2]-n[2]-l[2],t[0]-l[0],t[1]-l[1],t[2]-l[2],t[0]+n[0]-l[0],t[1]+n[1]-l[1],t[2]+n[2]-l[2],t[0]+n[0],t[1]+n[1],t[2]+n[2]],c=glMatrix.vec3.create(),v=glMatrix.vec3.create();glMatrix.vec3.normalize(n,n),glMatrix.vec3.normalize(l,l),glMatrix.vec3.scale(n,n,s),glMatrix.vec3.scale(l,l,s);var m=glMatrix.glMatrix.toRadian(22.5);for(i=0;i<16;i++)glMatrix.vec3.scale(c,n,Math.cos(i*m)),glMatrix.vec3.scale(v,l,Math.sin(i*m)),h.push(t[0]+c[0]+v[0]),h.push(t[1]+c[1]+v[1]),h.push(t[2]+c[2]+v[2]);return new Float32Array(h)},quadHoleIndLS:function(){var t=[0,2,4,6,0,1];for(i=12;i<=16;i++)t.push(i);for(t.push(3),i=16;i<=20;i++)t.push(i);for(t.push(5),i=20;i<24;i++)t.push(i);for(t.push(8),t.push(7),i=8;i<=12;i++)t.push(i);return new Uint16Array(t)},disc:function(t){var i,r,a,o=glMatrix.glMatrix.toRadian(360/t),s=[];for(s.push(0,0,0,1),s.push(0,0,1,0),a=1;a<t;a++)i=Math.cos(a*o),r=Math.sin(a*o),s.push(i,r,0,1),s.push(0,0,1,0);return s.push(i=1,r=0,0,1),s.push(0,0,1,0),new Float32Array(s)},discInd:function(t){glMatrix.glMatrix.toRadian(360/t);for(var i=[],r=1;r<t;r++)i.push(0),i.push(r),i.push(r+1);return i.push(0),i.push(t),i.push(1),new Uint16Array(i)},cube:function(t,i){var r=t[0]-i[0],a=t[0]+i[0],o=t[1]-i[1],s=t[1]+i[1],e=t[2]-i[2],i=t[2]+i[2];return new Float32Array([r,o,e,1,a,o,e,1,a,s,e,1,r,s,e,1,r,o,i,1,a,o,i,1,a,s,i,1,r,s,i,1])},cube2:function(t,i,r,a,o){var s=glMatrix.vec3.clone(t),e=glMatrix.vec3.create(),n=glMatrix.vec3.create(),t=glMatrix.vec3.create();return glMatrix.vec3.scale(e,r,i[0]),glMatrix.vec3.scale(n,a,i[1]),glMatrix.vec3.scale(t,o,i[2]),glMatrix.vec3.sub(s,s,t),glMatrix.vec3.scale(t,t,2),new Float32Array([s[0]-e[0]-n[0],s[1]-e[1]-n[1],s[2]-e[2]-n[2],s[0]+e[0]-n[0],s[1]+e[1]-n[1],s[2]+e[2]-n[2],s[0]+e[0]+n[0],s[1]+e[1]+n[1],s[2]+e[2]+n[2],s[0]-e[0]+n[0],s[1]-e[1]+n[1],s[2]-e[2]+n[2],s[0]-e[0]-n[0]+t[0],s[1]-e[1]-n[1]+t[1],s[2]-e[2]-n[2]+t[2],s[0]+e[0]-n[0]+t[0],s[1]+e[1]-n[1]+t[1],s[2]+e[2]-n[2]+t[2],s[0]+e[0]+n[0]+t[0],s[1]+e[1]+n[1]+t[1],s[2]+e[2]+n[2]+t[2],s[0]-e[0]+n[0]+t[0],s[1]-e[1]+n[1]+t[1],s[2]-e[2]+n[2]+t[2]])},cubeIndLS:function(){return new Uint16Array([0,1,5,1,2,6,2,3,7,3,0,4,5,6,7,4])},cubeWNormals:function(){ymin=-1,zmin=-1;return ymax=1,zmax=1,new Float32Array([-1,ymin,zmax,1,0,0,1,0,1,ymin,zmax,1,0,0,1,0,1,ymax,zmax,1,0,0,1,0,-1,ymax,zmax,1,0,0,1,0,-1,ymin,zmin,1,0,0,-1,0,1,ymin,zmin,1,0,0,-1,0,1,ymax,zmin,1,0,0,-1,0,-1,ymax,zmin,1,0,0,-1,0,-1,ymin,zmax,1,-1,0,0,0,-1,ymin,zmin,1,-1,0,0,0,-1,ymax,zmin,1,-1,0,0,0,-1,ymax,zmax,1,-1,0,0,0,1,ymax,zmax,1,1,0,0,0,1,ymax,zmin,1,1,0,0,0,1,ymin,zmin,1,1,0,0,0,1,ymin,zmax,1,1,0,0,0,-1,ymin,zmax,1,0,-1,0,0,-1,ymin,zmin,1,0,-1,0,0,1,ymin,zmin,1,0,-1,0,0,1,ymin,zmax,1,0,-1,0,0,1,ymax,zmax,1,0,1,0,0,1,ymax,zmin,1,0,1,0,0,-1,ymax,zmin,1,0,1,0,0,-1,ymax,zmax,1,0,1,0,0])},cubeInd:function(){var t=[];return t.push(0,1,2,2,3,0),t.push(5,4,6,7,6,4),t.push(9,8,10,11,10,8),t.push(13,12,14,15,14,12),t.push(16,17,18,18,19,16),t.push(20,21,22,22,23,20),new Uint16Array(t)},cylin:function(t,r,a,o,s){var e=glMatrix.vec3.fromValues(1,0,0),n=glMatrix.vec3.fromValues(0,1,0),l=glMatrix.vec3.fromValues(0,0,1),u=glMatrix.quat.create();glMatrix.quat.rotationTo(u,l,o),glMatrix.vec3.transformQuat(e,e,u),glMatrix.vec3.transformQuat(n,n,u),glMatrix.vec3.transformQuat(l,l,u),glMatrix.vec3.scale(e,e,r),glMatrix.vec3.scale(n,n,r),glMatrix.vec3.scale(l,l,a);var h=glMatrix.glMatrix.toRadian(360/s),c=glMatrix.vec3.create(),v=glMatrix.vec3.create(),m=[];for(i=0;i<2*s;i++)glMatrix.vec3.scale(c,e,Math.cos(i*h)),glMatrix.vec3.scale(v,n,Math.sin(i*h)),m.push(t[0]+c[0]+v[0]),m.push(t[1]+c[1]+v[1]),m.push(t[2]+c[2]+v[2]),m.push(t[0]+c[0]+v[0]+l[0]),m.push(t[1]+c[1]+v[1]+l[1]),m.push(t[2]+c[2]+v[2]+l[2]);return new Float32Array(m)},cylinWNormals:function(t){for(var i,r,a=glMatrix.glMatrix.toRadian(22.5),o=[],s=0;s<2*t;s++)i=Math.cos(s*a),r=Math.sin(s*a),o.push(i),o.push(r),o.push(0),o.push(1),o.push(i,r,0,0),o.push(i),o.push(r),o.push(1),o.push(1),o.push(i,r,0,0);for(o.push(0,0,1,1),o.push(0,0,1,0),s=0;s<=t;s++)i=Math.cos(s*a),r=Math.sin(s*a),o.push(i),o.push(r),o.push(1),o.push(1),o.push(0,0,1,0);for(o.push(0,0,0,1),o.push(0,0,-1,0),s=0;s<=t;s++)i=Math.cos(s*a),r=Math.sin(s*a),o.push(i),o.push(r),o.push(0),o.push(1),o.push(0,0,-1,0);return new Float32Array(o)},cylinInd:function(t){for(var i=[],r=0;r<2*t;r+=2)i.push(r+1,r,r+2),i.push(r+1,r+2,r+3);for(r=4*t;r<=5*t;r++)i.push(4*t),i.push(r),i.push(r+1);for(r=5*t+3;r<=6*t+2;r++)i.push(5*t+2),i.push(r+1),i.push(r);return new Uint16Array(i)},cylinIndLS:function(t){var r=[];for(i=0;i<=2*t;i+=2)r.push(i),r.push(i+1),r.push(i);for(i=1;i<2*t;i+=2)r.push(i);return r.push(1),new Uint16Array(r)},sphere:function(t,i,r){for(var a,o,s,e,n,l,u=[],h=0;h<=r;h++)for(e=h*Math.PI/r,n=Math.sin(e),l=Math.cos(e),a=0;a<=r;a++)s=2*a*Math.PI/r,o=Math.sin(s),s=Math.cos(s),u.push(o*n*i+t[0]),u.push(l*i+t[1]),u.push(s*n*i+t[2]),u.push(1),u.push(o*n*i+t[0]),u.push(l*i+t[1]),u.push(s*n*i+t[2]),u.push(0);return new Float32Array(u)},sphereInd:function(t){var r,a,o=[];for(j=0;j<t;j++)for(i=0;i<t;i++)a=(r=j*(t+1)+i)+(t+1),o.push(r),o.push(a),o.push(r+1),o.push(r+1),o.push(a),o.push(a+1);return new Uint16Array(o)},sphereIndLS:function(t){var r,a,o=[];for(j=0;j<t;j++)for(i=0;i<t;i+=6)a=(r=j*(t+1)+i)+(t+1),o.push(r),o.push(a),o.push(a+1),o.push(a+2),o.push(a+3),o.push(a+4),o.push(a+5),o.push(a+6);return new Uint16Array(o)}};