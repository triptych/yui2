
/*                                                                                                                                                      
Copyright (c) 2006, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 0.12.0
*/ 

(function(){
var _1=YAHOO.util.Event;
var _2=YAHOO.util.Dom;
YAHOO.util.DragDrop=function(id,_4,_5){
if(id){
this.init(id,_4,_5);
}
};
YAHOO.util.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){
this.locked=true;
},unlock:function(){
this.locked=false;
},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,b4StartDrag:function(x,y){
},startDrag:function(x,y){
},b4Drag:function(e){
},onDrag:function(e){
},onDragEnter:function(e,id){
},b4DragOver:function(e){
},onDragOver:function(e,id){
},b4DragOut:function(e){
},onDragOut:function(e,id){
},b4DragDrop:function(e){
},onDragDrop:function(e,id){
},onInvalidDrop:function(e){
},b4EndDrag:function(e){
},endDrag:function(e){
},b4MouseDown:function(e){
},onMouseDown:function(e){
},onMouseUp:function(e){
},onAvailable:function(){

},getEl:function(){
if(!this._domRef){
this._domRef=_2.get(this.id);
}
return this._domRef;
},getDragEl:function(){
return _2.get(this.dragElId);
},init:function(id,_9,_10){
this.initTarget(id,_9,_10);
_1.on(this.id,"mousedown",this.handleMouseDown,this,true);
},initTarget:function(id,_11,_12){
this.config=_12||{};
this.DDM=YAHOO.util.DDM;
this.groups={};
if(typeof id!=="string"){
YAHOO.log("id is not a string, assuming it is an HTMLElement");
id=_2.generateId(id);
}
this.id=id;
this.addToGroup((_11)?_11:"default");
this.handleElId=id;
_1.onAvailable(id,this.handleOnAvailable,this,true);

this.setDragElId(id);
this.invalidHandleTypes={A:"A"};
this.invalidHandleIds={};
this.invalidHandleClasses=[];
this.applyConfig();
},applyConfig:function(){
this.padding=this.config.padding||[0,0,0,0];
this.isTarget=(this.config.isTarget!==false);
this.maintainOffset=(this.config.maintainOffset);
this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);
},handleOnAvailable:function(){

this.available=true;
this.resetConstraints();
this.onAvailable();
},setPadding:function(_13,_14,_15,_16){
if(!_14&&0!==_14){
this.padding=[_13,_13,_13,_13];
}else{
if(!_15&&0!==_15){
this.padding=[_13,_14,_13,_14];
}else{
this.padding=[_13,_14,_15,_16];
}
}
},setInitPosition:function(_17,_18){
var el=this.getEl();
if(!this.DDM.verifyEl(el)){

return;
}
var dx=_17||0;
var dy=_18||0;
var p=_2.getXY(el);
this.initPageX=p[0]-dx;
this.initPageY=p[1]-dy;
this.lastPageX=p[0];
this.lastPageY=p[1];

this.setStartPosition(p);
},setStartPosition:function(pos){
var p=pos||_2.getXY(this.getEl());
this.deltaSetXY=null;
this.startPageX=p[0];
this.startPageY=p[1];
},addToGroup:function(_24){
this.groups[_24]=true;
this.DDM.regDragDrop(this,_24);
},removeFromGroup:function(_25){

if(this.groups[_25]){
delete this.groups[_25];
}
this.DDM.removeDDFromGroup(this,_25);
},setDragElId:function(id){
this.dragElId=id;
},setHandleElId:function(id){
if(typeof id!=="string"){
YAHOO.log("id is not a string, assuming it is an HTMLElement");
id=_2.generateId(id);
}
this.handleElId=id;
this.DDM.regHandle(this.id,id);
},setOuterHandleElId:function(id){
if(typeof id!=="string"){
YAHOO.log("id is not a string, assuming it is an HTMLElement");
id=_2.generateId(id);
}

_1.on(id,"mousedown",this.handleMouseDown,this,true);
this.setHandleElId(id);
this.hasOuterHandles=true;
},unreg:function(){

_1.removeListener(this.id,"mousedown",this.handleMouseDown);
this._domRef=null;
this.DDM._remove(this);
},isLocked:function(){
return (this.DDM.isLocked()||this.locked);
},handleMouseDown:function(e,oDD){
var _27=e.which||e.button;

if(this.primaryButtonOnly&&_27>1){

return;
}
if(this.isLocked()){

return;
}

this.DDM.refreshCache(this.groups);
var pt=new YAHOO.util.Point(_1.getPageX(e),_1.getPageY(e));
if(!this.hasOuterHandles&&!this.DDM.isOverTarget(pt,this)){

}else{
if(this.clickValidator(e)){

this.setStartPosition();

this.b4MouseDown(e);
this.onMouseDown(e);
this.DDM.handleMouseDown(e,this);
this.DDM.stopEvent(e);
}else{

}
}
},clickValidator:function(e){
var _29=_1.getTarget(e);
return (this.isValidHandleChild(_29)&&(this.id==this.handleElId||this.DDM.handleWasClicked(_29,this.id)));
},addInvalidHandleType:function(_30){
var _31=_30.toUpperCase();
this.invalidHandleTypes[_31]=_31;
},addInvalidHandleId:function(id){
if(typeof id!=="string"){
YAHOO.log("id is not a string, assuming it is an HTMLElement");
id=_2.generateId(id);
}
this.invalidHandleIds[id]=id;
},addInvalidHandleClass:function(_32){
this.invalidHandleClasses.push(_32);
},removeInvalidHandleType:function(_33){
var _34=_33.toUpperCase();
delete this.invalidHandleTypes[_34];
},removeInvalidHandleId:function(id){
if(typeof id!=="string"){
YAHOO.log("id is not a string, assuming it is an HTMLElement");
id=_2.generateId(id);
}
delete this.invalidHandleIds[id];
},removeInvalidHandleClass:function(_35){
for(var i=0,len=this.invalidHandleClasses.length;i<len;++i){
if(this.invalidHandleClasses[i]==_35){
delete this.invalidHandleClasses[i];
}
}
},isValidHandleChild:function(_37){
var _38=true;
var _39;
try{
_39=_37.nodeName.toUpperCase();
}
catch(e){
_39=_37.nodeName;
}
_38=_38&&!this.invalidHandleTypes[_39];
_38=_38&&!this.invalidHandleIds[_37.id];
for(var i=0,len=this.invalidHandleClasses.length;_38&&i<len;++i){
_38=!_2.hasClass(_37,this.invalidHandleClasses[i]);
}

return _38;
},setXTicks:function(_40,_41){
this.xTicks=[];
this.xTickSize=_41;
var _42={};
for(var i=this.initPageX;i>=this.minX;i=i-_41){
if(!_42[i]){
this.xTicks[this.xTicks.length]=i;
_42[i]=true;
}
}
for(i=this.initPageX;i<=this.maxX;i=i+_41){
if(!_42[i]){
this.xTicks[this.xTicks.length]=i;
_42[i]=true;
}
}
this.xTicks.sort(this.DDM.numericSort);

},setYTicks:function(_43,_44){
this.yTicks=[];
this.yTickSize=_44;
var _45={};
for(var i=this.initPageY;i>=this.minY;i=i-_44){
if(!_45[i]){
this.yTicks[this.yTicks.length]=i;
_45[i]=true;
}
}
for(i=this.initPageY;i<=this.maxY;i=i+_44){
if(!_45[i]){
this.yTicks[this.yTicks.length]=i;
_45[i]=true;
}
}
this.yTicks.sort(this.DDM.numericSort);

},setXConstraint:function(_46,_47,_48){
this.leftConstraint=_46;
this.rightConstraint=_47;
this.minX=this.initPageX-_46;
this.maxX=this.initPageX+_47;
if(_48){
this.setXTicks(this.initPageX,_48);
}
this.constrainX=true;

},clearConstraints:function(){

this.constrainX=false;
this.constrainY=false;
this.clearTicks();
},clearTicks:function(){

this.xTicks=null;
this.yTicks=null;
this.xTickSize=0;
this.yTickSize=0;
},setYConstraint:function(iUp,_50,_51){

this.topConstraint=iUp;
this.bottomConstraint=_50;
this.minY=this.initPageY-iUp;
this.maxY=this.initPageY+_50;
if(_51){
this.setYTicks(this.initPageY,_51);
}
this.constrainY=true;

},resetConstraints:function(){

if(this.initPageX||this.initPageX===0){


var dx=(this.maintainOffset)?this.lastPageX-this.initPageX:0;
var dy=(this.maintainOffset)?this.lastPageY-this.initPageY:0;
this.setInitPosition(dx,dy);
}else{
this.setInitPosition();
}
if(this.constrainX){
this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);
}
if(this.constrainY){
this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);
}
},getTick:function(val,_53){
if(!_53){
return val;
}else{
if(_53[0]>=val){
return _53[0];
}else{
for(var i=0,len=_53.length;i<len;++i){
var _54=i+1;
if(_53[_54]&&_53[_54]>=val){
var _55=val-_53[i];
var _56=_53[_54]-val;
return (_56>_55)?_53[i]:_53[_54];
}
}
return _53[_53.length-1];
}
}
},toString:function(){
return ("DragDrop "+this.id);
}};
})();
if(!YAHOO.util.DragDropMgr){
YAHOO.util.DragDropMgr=function(){
var _57=YAHOO.util.Event;
return {ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initalized:false,locked:false,init:function(){

this.initialized=true;
},POINT:0,INTERSECT:1,mode:0,_execOnAll:function(_58,_59){
for(var i in this.ids){
for(var j in this.ids[i]){
var oDD=this.ids[i][j];
if(!this.isTypeOfDD(oDD)){
continue;
}
oDD[_58].apply(oDD,_59);
}
}
},_onLoad:function(){
this.init();

_57.on(document,"mouseup",this.handleMouseUp,this,true);
_57.on(document,"mousemove",this.handleMouseMove,this,true);
_57.on(window,"unload",this._onUnload,this,true);
_57.on(window,"resize",this._onResize,this,true);
},_onResize:function(e){

this._execOnAll("resetConstraints",[]);
},lock:function(){
this.locked=true;
},unlock:function(){
this.locked=false;
},isLocked:function(){
return this.locked;
},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(oDD,_61){
if(!this.initialized){
this.init();
}
if(!this.ids[_61]){
this.ids[_61]={};
}
this.ids[_61][oDD.id]=oDD;
},removeDDFromGroup:function(oDD,_62){
if(!this.ids[_62]){
this.ids[_62]={};
}
var obj=this.ids[_62];
if(obj&&obj[oDD.id]){
delete obj[oDD.id];
}
},_remove:function(oDD){
for(var g in oDD.groups){
if(g&&this.ids[g][oDD.id]){
delete this.ids[g][oDD.id];
}
}
delete this.handleIds[oDD.id];
},regHandle:function(_65,_66){
if(!this.handleIds[_65]){
this.handleIds[_65]={};
}
this.handleIds[_65][_66]=_66;
},isDragDrop:function(id){
return (this.getDDById(id))?true:false;
},getRelated:function(_67,_68){
var _69=[];
for(var i in _67.groups){
for(j in this.ids[i]){
var dd=this.ids[i][j];
if(!this.isTypeOfDD(dd)){
continue;
}
if(!_68||dd.isTarget){
_69[_69.length]=dd;
}
}
}
return _69;
},isLegalTarget:function(oDD,_71){
var _72=this.getRelated(oDD,true);
for(var i=0,len=_72.length;i<len;++i){
if(_72[i].id==_71.id){
return true;
}
}
return false;
},isTypeOfDD:function(oDD){
return (oDD&&oDD.__ygDragDrop);
},isHandle:function(_73,_74){
return (this.handleIds[_73]&&this.handleIds[_73][_74]);
},getDDById:function(id){
for(var i in this.ids){
if(this.ids[i][id]){
return this.ids[i][id];
}
}
return null;
},handleMouseDown:function(e,oDD){
this.currentTarget=YAHOO.util.Event.getTarget(e);

this.dragCurrent=oDD;
var el=oDD.getEl();
this.startX=YAHOO.util.Event.getPageX(e);
this.startY=YAHOO.util.Event.getPageY(e);
this.deltaX=this.startX-el.offsetLeft;
this.deltaY=this.startY-el.offsetTop;
this.dragThreshMet=false;
this.clickTimeout=setTimeout(function(){
var DDM=YAHOO.util.DDM;
DDM.startDrag(DDM.startX,DDM.startY);
},this.clickTimeThresh);
},startDrag:function(x,y){

clearTimeout(this.clickTimeout);
if(this.dragCurrent){
this.dragCurrent.b4StartDrag(x,y);
this.dragCurrent.startDrag(x,y);
}
this.dragThreshMet=true;
},handleMouseUp:function(e){
if(!this.dragCurrent){
return;
}
clearTimeout(this.clickTimeout);
if(this.dragThreshMet){

this.fireEvents(e,true);
}else{

}
this.stopDrag(e);
this.stopEvent(e);
},stopEvent:function(e){
if(this.stopPropagation){
YAHOO.util.Event.stopPropagation(e);
}
if(this.preventDefault){
YAHOO.util.Event.preventDefault(e);
}
},stopDrag:function(e){
if(this.dragCurrent){
if(this.dragThreshMet){

this.dragCurrent.b4EndDrag(e);
this.dragCurrent.endDrag(e);
}

this.dragCurrent.onMouseUp(e);
}
this.dragCurrent=null;
this.dragOvers={};
},handleMouseMove:function(e){
if(!this.dragCurrent){
return true;
}
if(YAHOO.util.Event.isIE&&!e.button){

this.stopEvent(e);
return this.handleMouseUp(e);
}
if(!this.dragThreshMet){
var _76=Math.abs(this.startX-YAHOO.util.Event.getPageX(e));
var _77=Math.abs(this.startY-YAHOO.util.Event.getPageY(e));
if(_76>this.clickPixelThresh||_77>this.clickPixelThresh){

this.startDrag(this.startX,this.startY);
}
}
if(this.dragThreshMet){
this.dragCurrent.b4Drag(e);
this.dragCurrent.onDrag(e);
this.fireEvents(e,false);
}
this.stopEvent(e);
return true;
},fireEvents:function(e,_78){
var dc=this.dragCurrent;
if(!dc||dc.isLocked()){
return;
}
var x=YAHOO.util.Event.getPageX(e);
var y=YAHOO.util.Event.getPageY(e);
var pt=new YAHOO.util.Point(x,y);
var _80=[];
var _81=[];
var _82=[];
var _83=[];
var _84=[];
for(var i in this.dragOvers){
var ddo=this.dragOvers[i];
if(!this.isTypeOfDD(ddo)){
continue;
}
if(!this.isOverTarget(pt,ddo,this.mode)){
_81.push(ddo);
}
_80[i]=true;
delete this.dragOvers[i];
}
for(var _86 in dc.groups){
if("string"!=typeof _86){
continue;
}
for(i in this.ids[_86]){
var oDD=this.ids[_86][i];
if(!this.isTypeOfDD(oDD)){
continue;
}
if(oDD.isTarget&&!oDD.isLocked()&&oDD!=dc){
if(this.isOverTarget(pt,oDD,this.mode)){
if(_78){
_83.push(oDD);
}else{
if(!_80[oDD.id]){
_84.push(oDD);
}else{
_82.push(oDD);
}
this.dragOvers[oDD.id]=oDD;
}
}
}
}
}
if(this.mode){
if(_81.length){

dc.b4DragOut(e,_81);
dc.onDragOut(e,_81);
}
if(_84.length){

dc.onDragEnter(e,_84);
}
if(_82.length){

dc.b4DragOver(e,_82);
dc.onDragOver(e,_82);
}
if(_83.length){

dc.b4DragDrop(e,_83);
dc.onDragDrop(e,_83);
}
}else{
var len=0;
for(i=0,len=_81.length;i<len;++i){

dc.b4DragOut(e,_81[i].id);
dc.onDragOut(e,_81[i].id);
}
for(i=0,len=_84.length;i<len;++i){

dc.onDragEnter(e,_84[i].id);
}
for(i=0,len=_82.length;i<len;++i){

dc.b4DragOver(e,_82[i].id);
dc.onDragOver(e,_82[i].id);
}
for(i=0,len=_83.length;i<len;++i){

dc.b4DragDrop(e,_83[i].id);
dc.onDragDrop(e,_83[i].id);
}
}
if(_78&&!_83.length){

dc.onInvalidDrop(e);
}
},getBestMatch:function(dds){
var _89=null;
var len=dds.length;
if(len==1){
_89=dds[0];
}else{
for(var i=0;i<len;++i){
var dd=dds[i];
if(dd.cursorIsOver){
_89=dd;
break;
}else{
if(!_89||_89.overlap.getArea()<dd.overlap.getArea()){
_89=dd;
}
}
}
}
return _89;
},refreshCache:function(_90){

for(var _91 in _90){
if("string"!=typeof _91){
continue;
}
for(var i in this.ids[_91]){
var oDD=this.ids[_91][i];
if(this.isTypeOfDD(oDD)){
var loc=this.getLocation(oDD);
if(loc){
this.locationCache[oDD.id]=loc;
}else{
delete this.locationCache[oDD.id];

}
}
}
}
},verifyEl:function(el){
try{
if(el){
var _93=el.offsetParent;
if(_93){
return true;
}
}
}
catch(e){

}
return false;
},getLocation:function(oDD){
if(!this.isTypeOfDD(oDD)){

return null;
}
var el=oDD.getEl(),pos,x1,x2,y1,y2,t,r,b,l;
try{
pos=YAHOO.util.Dom.getXY(el);
}
catch(e){
}
if(!pos){

return null;
}
x1=pos[0];
x2=x1+el.offsetWidth;
y1=pos[1];
y2=y1+el.offsetHeight;
t=y1-oDD.padding[0];
r=x2+oDD.padding[1];
b=y2+oDD.padding[2];
l=x1-oDD.padding[3];
return new YAHOO.util.Region(t,r,b,l);
},isOverTarget:function(pt,_94,_95){
var loc=this.locationCache[_94.id];
if(!loc||!this.useCache){

loc=this.getLocation(_94);
this.locationCache[_94.id]=loc;

}
if(!loc){

return false;
}
_94.cursorIsOver=loc.contains(pt);
var dc=this.dragCurrent;
if(!dc||!dc.getTargetCoord||(!_95&&!dc.constrainX&&!dc.constrainY)){
return _94.cursorIsOver;
}
_94.overlap=null;
var pos=dc.getTargetCoord(pt.x,pt.y);
var el=dc.getDragEl();
var _96=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);
var _97=_96.intersect(loc);
if(_97){
_94.overlap=_97;
return (_95)?true:_94.cursorIsOver;
}else{
return false;
}
},_onUnload:function(e,me){
this.unregAll();
},unregAll:function(){

if(this.dragCurrent){
this.stopDrag();
this.dragCurrent=null;
}
this._execOnAll("unreg",[]);
for(i in this.elementCache){
delete this.elementCache[i];
}
this.elementCache={};
this.ids={};
},elementCache:{},getElWrapper:function(id){
var _99=this.elementCache[id];
if(!_99||!_99.el){
_99=this.elementCache[id]=new this.ElementWrapper(YAHOO.util.Dom.get(id));
}
return _99;
},getElement:function(id){
return YAHOO.util.Dom.get(id);
},getCss:function(id){
var el=YAHOO.util.Dom.get(id);
return (el)?el.style:null;
},ElementWrapper:function(el){
this.el=el||null;
this.id=this.el&&el.id;
this.css=this.el&&el.style;
},getPosX:function(el){
return YAHOO.util.Dom.getX(el);
},getPosY:function(el){
return YAHOO.util.Dom.getY(el);
},swapNode:function(n1,n2){
if(n1.swapNode){
n1.swapNode(n2);
}else{
var p=n2.parentNode;
var s=n2.nextSibling;
if(s==n1){
p.insertBefore(n1,n2);
}else{
if(n2==n1.nextSibling){
p.insertBefore(n2,n1);
}else{
n1.parentNode.replaceChild(n2,n1);
p.insertBefore(n1,s);
}
}
}
},getScroll:function(){
var t,l,dde=document.documentElement,db=document.body;
if(dde&&(dde.scrollTop||dde.scrollLeft)){
t=dde.scrollTop;
l=dde.scrollLeft;
}else{
if(db){
t=db.scrollTop;
l=db.scrollLeft;
}else{
YAHOO.log("could not get scroll property");
}
}
return {top:t,left:l};
},getStyle:function(el,_104){
return YAHOO.util.Dom.getStyle(el,_104);
},getScrollTop:function(){
return this.getScroll().top;
},getScrollLeft:function(){
return this.getScroll().left;
},moveToEl:function(_105,_106){
var _107=YAHOO.util.Dom.getXY(_106);

YAHOO.util.Dom.setXY(_105,_107);
},getClientHeight:function(){
return YAHOO.util.Dom.getViewportHeight();
},getClientWidth:function(){
return YAHOO.util.Dom.getViewportWidth();
},numericSort:function(a,b){
return (a-b);
},_timeoutCount:0,_addListeners:function(){
var DDM=YAHOO.util.DDM;
if(YAHOO.util.Event&&document){
DDM._onLoad();
}else{
if(DDM._timeoutCount>2000){

}else{
setTimeout(DDM._addListeners,10);
if(document&&document.body){
DDM._timeoutCount+=1;
}
}
}
},handleWasClicked:function(node,id){
if(this.isHandle(id,node.id)){

return true;
}else{
var p=node.parentNode;
while(p){
if(this.isHandle(id,p.id)){
return true;
}else{

p=p.parentNode;
}
}
}
return false;
}};
}();
YAHOO.util.DDM=YAHOO.util.DragDropMgr;
YAHOO.util.DDM._addListeners();
}
YAHOO.util.DD=function(id,_111,_112){
if(id){
this.init(id,_111,_112);
}
};
YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(_113,_114){
var x=_113-this.startPageX;
var y=_114-this.startPageY;
this.setDelta(x,y);
},setDelta:function(_115,_116){
this.deltaX=_115;
this.deltaY=_116;

},setDragElPos:function(_117,_118){
var el=this.getDragEl();
this.alignElWithMouse(el,_117,_118);
},alignElWithMouse:function(el,_119,_120){
var _121=this.getTargetCoord(_119,_120);
if(!this.deltaSetXY){
var _122=[_121.x,_121.y];
YAHOO.util.Dom.setXY(el,_122);
var _123=parseInt(YAHOO.util.Dom.getStyle(el,"left"),10);
var _124=parseInt(YAHOO.util.Dom.getStyle(el,"top"),10);
this.deltaSetXY=[_123-_121.x,_124-_121.y];
}else{
YAHOO.util.Dom.setStyle(el,"left",(_121.x+this.deltaSetXY[0])+"px");
YAHOO.util.Dom.setStyle(el,"top",(_121.y+this.deltaSetXY[1])+"px");
}
this.cachePosition(_121.x,_121.y);
this.autoScroll(_121.x,_121.y,el.offsetHeight,el.offsetWidth);
},cachePosition:function(_125,_126){
if(_125){
this.lastPageX=_125;
this.lastPageY=_126;
}else{
var _127=YAHOO.util.Dom.getXY(this.getEl());
this.lastPageX=_127[0];
this.lastPageY=_127[1];
}
},autoScroll:function(x,y,h,w){
if(this.scroll){
var _130=this.DDM.getClientHeight();
var _131=this.DDM.getClientWidth();
var st=this.DDM.getScrollTop();
var sl=this.DDM.getScrollLeft();
var bot=h+y;
var _135=w+x;
var _136=(_130+st-y-this.deltaY);
var _137=(_131+sl-x-this.deltaX);
var _138=40;
var _139=(document.all)?80:30;
if(bot>_130&&_136<_138){
window.scrollTo(sl,st+_139);
}
if(y<st&&st>0&&y-st<_138){
window.scrollTo(sl,st-_139);
}
if(_135>_131&&_137<_138){
window.scrollTo(sl+_139,st);
}
if(x<sl&&sl>0&&x-sl<_138){
window.scrollTo(sl-_139,st);
}
}
},getTargetCoord:function(_140,_141){
var x=_140-this.deltaX;
var y=_141-this.deltaY;
if(this.constrainX){
if(x<this.minX){
x=this.minX;
}
if(x>this.maxX){
x=this.maxX;
}
}
if(this.constrainY){
if(y<this.minY){
y=this.minY;
}
if(y>this.maxY){
y=this.maxY;
}
}
x=this.getTick(x,this.xTicks);
y=this.getTick(y,this.yTicks);
return {x:x,y:y};
},applyConfig:function(){
YAHOO.util.DD.superclass.applyConfig.call(this);
this.scroll=(this.config.scroll!==false);
},b4MouseDown:function(e){
this.autoOffset(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));
},b4Drag:function(e){
this.setDragElPos(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));
},toString:function(){
return ("DD "+this.id);
}});
YAHOO.util.DDProxy=function(id,_142,_143){
if(id){
this.init(id,_142,_143);
this.initFrame();
}
};
YAHOO.util.DDProxy.dragElId="ygddfdiv";
YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){
var self=this;
var body=document.body;
if(!body||!body.firstChild){
setTimeout(function(){
self.createFrame();
},50);
return;
}
var div=this.getDragEl();
if(!div){
div=document.createElement("div");
div.id=this.dragElId;
var s=div.style;
s.position="absolute";
s.visibility="hidden";
s.cursor="move";
s.border="2px solid #aaa";
s.zIndex=999;
body.insertBefore(div,body.firstChild);
}
},initFrame:function(){
this.createFrame();
},applyConfig:function(){

YAHOO.util.DDProxy.superclass.applyConfig.call(this);
this.resizeFrame=(this.config.resizeFrame!==false);
this.centerFrame=(this.config.centerFrame);
this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);
},showFrame:function(_147,_148){
var el=this.getEl();
var _149=this.getDragEl();
var s=_149.style;
this._resizeProxy();
if(this.centerFrame){
this.setDelta(Math.round(parseInt(s.width,10)/2),Math.round(parseInt(s.height,10)/2));
}
this.setDragElPos(_147,_148);
YAHOO.util.Dom.setStyle(_149,"visibility","visible");
},_resizeProxy:function(){
if(this.resizeFrame){
var DOM=YAHOO.util.Dom;
var el=this.getEl();
var _151=this.getDragEl();
var bt=parseInt(DOM.getStyle(_151,"borderTopWidth"),10);
var br=parseInt(DOM.getStyle(_151,"borderRightWidth"),10);
var bb=parseInt(DOM.getStyle(_151,"borderBottomWidth"),10);
var bl=parseInt(DOM.getStyle(_151,"borderLeftWidth"),10);
if(isNaN(bt)){
bt=0;
}
if(isNaN(br)){
br=0;
}
if(isNaN(bb)){
bb=0;
}
if(isNaN(bl)){
bl=0;
}

var _156=Math.max(0,el.offsetWidth-br-bl);
var _157=Math.max(0,el.offsetHeight-bt-bb);

DOM.setStyle(_151,"width",_156+"px");
DOM.setStyle(_151,"height",_157+"px");
}
},b4MouseDown:function(e){
var x=YAHOO.util.Event.getPageX(e);
var y=YAHOO.util.Event.getPageY(e);
this.autoOffset(x,y);
this.setDragElPos(x,y);
},b4StartDrag:function(x,y){

this.showFrame(x,y);
},b4EndDrag:function(e){

YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");
},endDrag:function(e){
var DOM=YAHOO.util.Dom;

var lel=this.getEl();
var del=this.getDragEl();
DOM.setStyle(del,"visibility","");
DOM.setStyle(lel,"visibility","hidden");
YAHOO.util.DDM.moveToEl(lel,del);
DOM.setStyle(del,"visibility","hidden");
DOM.setStyle(lel,"visibility","");
},toString:function(){
return ("DDProxy "+this.id);
}});
YAHOO.util.DDTarget=function(id,_160,_161){
if(id){
this.initTarget(id,_160,_161);
}
};
YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){
return ("DDTarget "+this.id);
}});

