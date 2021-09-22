const RT_GNDPLANE=0,RT_DISK=1,RT_SPHERE=2,RT_BOX=3,RT_CYLINDER=4,RT_TRIANGLE=5,RT_BLOBBY=6;function CGeom(t){switch(null==t&&(t=RT_GNDPLANE),this.shapeType=t,this.shapeType){case RT_GNDPLANE:this.traceMe=function(t,r){this.traceGrid(t,r)},this.xgap=1,this.ygap=1,this.lineWidth=.1,this.lineColor=new Material(2),this.gapColor=new Material(20);break;case RT_DISK:this.traceMe=function(t,r){this.traceDisk(t,r)},this.xgap=61/107,this.ygap=61/107,this.lineWidth=.1,this.lineColor=glMatrix.vec4.fromValues(.1,.5,.1,1),this.gapColor=glMatrix.vec4.fromValues(.9,.9,.9,1);break;case RT_SPHERE:this.traceMe=function(t,r){this.traceSphere(t,r)};break;case RT_BOX:this.traceMe=function(t,r){this.traceBox(t,r)};break;case RT_CYLINDER:this.traceMe=function(t,r){this.traceCyl(t,r)};break;case RT_TRIANGLE:this.traceMe=function(t,r){this.traceTri(t,r)};break;case RT_BLOBBY:this.traceMe=function(t,r){this.traceBlobby(t,r)};break;default:return void console.log("CGeom() constructor: ERROR! INVALID shapeSelect:",t)}this.worldRay2model=glMatrix.mat4.create(),this.normal2world=glMatrix.mat4.create()}CGeom.prototype.setIdent=function(){glMatrix.mat4.identity(this.worldRay2model),glMatrix.mat4.identity(this.normal2world)},CGeom.prototype.rayTranslate=function(t,r,i){var e=glMatrix.mat4.create();e[12]=-t,e[13]=-r,e[14]=-i,glMatrix.mat4.multiply(this.worldRay2model,e,this.worldRay2model),glMatrix.mat4.transpose(this.normal2world,this.worldRay2model)},CGeom.prototype.rayRotate=function(t,r,i,e){var a=r,o=i,l=e,d=Math.sqrt(a*a+o*o+l*l);if(Math.abs(d)<1e-6)return console.log("CGeom.rayRotate() ERROR!!! zero-length axis vector!!"),null;a*=d=1/d,o*=d,l*=d;var g=Math.sin(-t),c=a*a*(m=1-(M=Math.cos(-t)))+M,s=a*o*m-l*g,r=a*l*m+o*g,i=o*a*m+l*g,e=o*o*m+M,d=o*l*m-a*g,t=l*a*m-o*g,g=l*o*m+a*g,m=l*l*m+M,M=glMatrix.mat4.create();M[0]=c,M[4]=s,M[8]=r,M[12]=0,M[1]=i,M[5]=e,M[9]=d,M[13]=0,M[2]=t,M[6]=g,M[10]=m,M[14]=0,M[3]=0,M[7]=0,M[11]=0,M[15]=1,glMatrix.mat4.multiply(this.worldRay2model,M,this.worldRay2model),glMatrix.mat4.transpose(this.normal2world,this.worldRay2model)},CGeom.prototype.rayScale=function(t,r,i){if(Math.abs(t)<2e-6||Math.abs(r)<2e-6||Math.abs(i)<2e-6)return console.log("CGeom.rayScale() ERROR!! zero-length scale!!!"),null;var e=glMatrix.mat4.create();e[0]=1/t,e[5]=1/r,e[10]=1/i,glMatrix.mat4.multiply(this.worldRay2model,e,this.worldRay2model),glMatrix.mat4.transpose(this.normal2world,this.worldRay2model)},CGeom.prototype.traceGrid=function(t,r){var i,e=new CRay;void 0!==t?(glMatrix.vec4.transformMat4(e.orig,t.orig,this.worldRay2model),glMatrix.vec4.transformMat4(e.dir,t.dir,this.worldRay2model),(i=-e.orig[2]/e.dir[2])<2e-6||i>r.t0||(r.t0=i,r.hitGeom=this,glMatrix.vec4.scaleAndAdd(r.modelHitPt,e.orig,e.dir,r.t0),glMatrix.vec4.copy(r.hitPt,r.modelHitPt),glMatrix.vec4.negate(r.viewN,t.dir),glMatrix.vec4.normalize(r.viewN,r.viewN),glMatrix.vec4.set(r.surfNorm,0,0,1,0),t=r.modelHitPt[0]/this.xgap,(t=r.modelHitPt[0]<0?-t:t)%1<this.lineWidth?r.hitNum=1:(t=r.modelHitPt[1]/this.ygap,(t=r.modelHitPt[1]<0?-t:t)%1<this.lineWidth?r.hitNum=1:r.hitNum=0))):r.hitNum=0},CGeom.prototype.traceDisk=function(t,r){var i,e,a=new CRay;void 0!==t?(glMatrix.vec4.copy(a.orig,t.orig),glMatrix.vec4.copy(a.dir,t.dir),glMatrix.vec4.transformMat4(a.orig,t.orig,this.worldRay2model),glMatrix.vec4.transformMat4(a.dir,t.dir,this.worldRay2model),(i=-a.orig[2]/a.dir[2])<0||i>r.t0||(e=glMatrix.vec4.create(),glMatrix.vec4.scaleAndAdd(e,a.orig,a.dir,i),1<e[0]*e[0]+e[1]*e[1]||(r.t0=i,r.hitGeom=this,glMatrix.vec4.copy(r.modelHitPt,e),glMatrix.vec4.scaleAndAdd(r.hitPt,t.orig,t.dir,r.t0),glMatrix.vec4.negate(r.viewN,t.dir),glMatrix.vec4.normalize(r.viewN,r.viewN),glMatrix.vec4.transformMat4(r.surfNorm,glMatrix.vec4.fromValues(0,0,1,0),this.normal2world),glMatrix.vec3.normalize(r.surfNorm,r.surfNorm),t=r.modelHitPt[0]/this.xgap,(t=r.modelHitPt[0]<0?-t:t)%1<this.lineWidth?r.hitNum=0:(t=r.modelHitPt[1]/this.ygap,(t=r.modelHitPt[1]<0?-t:t)%1<this.lineWidth?r.hitNum=0:r.hitNum=1)))):r.hitNum=0},CGeom.prototype.traceSphere=function(t,r){var i,e,a,o=new CRay;void 0!==t?(glMatrix.vec4.copy(o.orig,t.orig),glMatrix.vec4.copy(o.dir,t.dir),glMatrix.vec4.transformMat4(o.orig,t.orig,this.worldRay2model),glMatrix.vec4.transformMat4(o.dir,t.dir,this.worldRay2model),a=glMatrix.vec4.create(),glMatrix.vec4.subtract(a,glMatrix.vec4.fromValues(0,0,0,1),o.orig),(e=glMatrix.vec3.dot(a,a))<=1||((i=glMatrix.vec3.dot(o.dir,a))<0||(1<(e=e-i*i/(a=glMatrix.vec3.dot(o.dir,o.dir)))||((a=i/a-Math.sqrt((1-e)/a))>r.t0||(r.t0=a,r.hitGeom=this,glMatrix.vec4.scaleAndAdd(r.modelHitPt,o.orig,o.dir,r.t0),glMatrix.vec4.scaleAndAdd(r.hitPt,t.orig,t.dir,r.t0),glMatrix.vec4.negate(r.viewN,t.dir),glMatrix.vec4.normalize(r.viewN,r.viewN),glMatrix.vec4.transformMat4(r.surfNorm,r.modelHitPt,this.normal2world),r.hitNum=1))))):r.hitNum=0},CGeom.prototype.traceBox=function(t,r){var i=new CRay;if(void 0!==t){glMatrix.vec4.copy(i.orig,t.orig),glMatrix.vec4.copy(i.dir,t.dir),glMatrix.vec4.transformMat4(i.orig,t.orig,this.worldRay2model),glMatrix.vec4.transformMat4(i.dir,t.dir,this.worldRay2model);for(var e,a,o=-r.t0,l=r.t0,d=0,d=0;d<3;d++)if(0==i.dir[d]){if(1<Math.abs(i.orig[d]))return}else{var g,c=(-1-i.orig[d])/i.dir[d],s=(1-i.orig[d])/i.dir[d];if(s<c&&(g=c,c=s,s=g),o<c&&(o=c,0==d?e=glMatrix.vec4.fromValues(1,0,0,0):1==d?e=glMatrix.vec4.fromValues(0,1,0,0):2==d&&(e=glMatrix.vec4.fromValues(0,0,1,0))),(l=s<l?s:l)<o)return;if(l<0)return}o<0||o>r.t0||(r.t0=o,a=glMatrix.vec4.create(),glMatrix.vec4.scaleAndAdd(a,i.orig,i.dir,o),r.hitGeom=this,glMatrix.vec4.copy(r.modelHitPt,a),glMatrix.vec4.scaleAndAdd(r.hitPt,t.orig,t.dir,r.t0),glMatrix.vec4.negate(r.viewN,t.dir),glMatrix.vec4.normalize(r.viewN,r.viewN),glMatrix.vec4.transformMat4(r.surfNorm,e,this.normal2world),r.hitNum=1)}else r.hitNum=0},CGeom.prototype.traceCyl=function(t,r){var i,e,a,o,l,d,g,c=new CRay;void 0!==t?(glMatrix.vec4.copy(c.orig,t.orig),glMatrix.vec4.copy(c.dir,t.dir),glMatrix.vec4.transformMat4(c.orig,t.orig,this.worldRay2model),glMatrix.vec4.transformMat4(c.dir,t.dir,this.worldRay2model),e=glMatrix.vec2.squaredLength(c.dir),l=c.orig[0]*c.dir[0]+c.orig[1]*c.dir[1],(a=(l*=2)*l-4*e*(glMatrix.vec2.squaredLength(c.orig)-1))<0||(o=1/(2*e),g=(-l+(a=Math.sqrt(a)))*o,d=r.t0,i=r.t0,e=c.orig[2]+g*c.dir[2],a=c.orig[2]+(l=(-l-a)*o)*c.dir[2],o=-1,(e<0&&0<a||a<0&&0<e)&&(d=-c.orig[2]/c.dir[2],o=0),(e<1&&1<a||a<1&&1<a)&&(i=(1-c.orig[2])/c.dir[2],o=1),0<d?0<i&&(d=Math.min(d,i)):d=0<i?i:r.t0,g<0?g=l<0?r.t0:l:0<l&&(g=Math.min(g,l)),l=g,1<c.orig[2]?1==o&&(l=d):c.orig[2]<0&&0==o&&(l=d),l<0||l>r.t0||(d=glMatrix.vec4.create(),glMatrix.vec4.scaleAndAdd(d,c.orig,c.dir,l),d[2]>1+2e-6||d[2]<-2e-6||glMatrix.vec2.length(d)>1+2e-6||(r.t0=l,r.hitGeom=this,glMatrix.vec4.copy(r.modelHitPt,d),glMatrix.vec4.scaleAndAdd(r.hitPt,t.orig,t.dir,r.t0),glMatrix.vec4.negate(r.viewN,t.dir),glMatrix.vec4.normalize(r.viewN,r.viewN),r.hitNum=1,r.t0==g?(g=glMatrix.vec4.fromValues(r.modelHitPt[0],r.modelHitPt[1],0,0),glMatrix.vec4.transformMat4(r.surfNorm,g,this.normal2world)):glMatrix.vec4.transformMat4(r.surfNorm,glMatrix.vec4.fromValues(0,0,1,0),this.normal2world))))):r.hitNum=0},CGeom.prototype.traceTri=function(t,r){var i,e,a,o,l,d,g=new CRay;void 0!==t?(glMatrix.vec4.copy(g.orig,t.orig),glMatrix.vec4.copy(g.dir,t.dir),glMatrix.vec4.transformMat4(g.orig,t.orig,this.worldRay2model),glMatrix.vec4.transformMat4(g.dir,t.dir,this.worldRay2model),(i=-g.orig[2]/g.dir[2])<0||i>r.t0||(a=glMatrix.vec4.fromValues(-1,0,0,1),glMatrix.vec4.fromValues(1,0,0,1),glMatrix.vec4.fromValues(0,1,0,1),l=glMatrix.vec4.fromValues(2,0,0,0),o=glMatrix.vec4.fromValues(1,1,0,0),d=glMatrix.vec4.create(),e=glMatrix.vec4.create(),glMatrix.vec4.scaleAndAdd(e,g.orig,g.dir,i),glMatrix.vec4.subtract(d,e,a),g=glMatrix.vec2.dot(o,o),a=glMatrix.vec2.dot(o,l),o=glMatrix.vec2.dot(o,d),dot11=glMatrix.vec2.dot(l,l),g=(g*(l=glMatrix.vec2.dot(l,d))-a*o)*(d=1/(g*dot11-a*a)),0<=(d=(dot11*o-a*l)*d)&&0<=g&&d+g<1&&(r.t0=i,r.hitGeom=this,glMatrix.vec4.copy(r.modelHitPt,e),glMatrix.vec4.scaleAndAdd(r.hitPt,t.orig,t.dir,r.t0),glMatrix.vec4.normalize(r.viewN,r.viewN),glMatrix.vec4.transformMat4(r.surfNorm,glMatrix.vec4.fromValues(0,0,1,0),this.normal2world),r.hitNum=1))):r.hitNum=0},CGeom.prototype.traceTorus=function(t,r){var i,e=new CRay;void 0!==t?(glMatrix.vec4.copy(e.orig,t.orig),glMatrix.vec4.copy(e.dir,t.dir),glMatrix.vec4.transformMat4(e.orig,t.orig,this.worldRay2model),glMatrix.vec4.transformMat4(e.dir,t.dir,this.worldRay2model),i=glMatrix.vec3.dot(e.orig,e.dir),t=glMatrix.vec3.dot(e.dir,e.dir),glMatrix.vec3.dot(e.dir,e.orig),t=2*t*(glMatrix.vec3.dot(e.orig,e.orig)-4.25)+4*i*i,t+=16*e.dir[1]*e.dir[1],i=4*(glMatrix.vec3.dot(e.orig,e.orig)-4.25)*i,i+=32*e.dir[1]*e.orig[1],glMatrix.vec3.dot(e.orig,e.orig),glMatrix.vec3.dot(e.orig,e.orig),e.orig[1],e.orig[1]):r.hitNum=0};