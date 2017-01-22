function embedController(filedata,html,autoscale){var REQUIRE_FLASH=1;var REQUIRE_UNITY=2;var REQUIRE_JAVA=3;var REQUIRE_OTHER_PLUGIN=4;var TOUCH_FRIENDLY=5;var SUPPORTS_GAMEPADS=6;var USE_SECURE_URL=7;var callback=null;var self=this;var file_used=filedata?null:{width:520,height:220};this.compatible=false;this.isCompatible=function(){return this.compatible;}
var window_loaded=false;var queued_functions=[];this.queueFunction=function(f)
{queued_functions.push(f);if(window_loaded)executeQueuedFunctions();}
function executeQueuedFunctions(){while(queued_functions.length>0){(queued_functions.pop())();}}
var has_unity=(typeof(UnityObject2)!='undefined')?null:false;this.hasUnityPlugin=function(cb){if(has_unity===null){if(typeof(UnityObject2)!='undefined'){ready=false;try{var u=new UnityObject2();u.detectUnity(function(status,version){ready=true;has_unity=status=="installed"?true:false;if(typeof(cb)=='function')cb(has_unity);},['3.0']);}
catch(err){console.log(err.message);has_unity=false;if(typeof(cb)=='function')cb(has_unity);}}else{has_unity=false;}}else{if(typeof(cb)=='function')cb(has_unity);}
return has_unity;}
this.hasFlashPlugin=function(cb){var has_flash=false;if(typeof(swfobject)!='undefined'&&swfobject.hasFlashPlayerVersion("9.0.0"))has_flash=true;if(typeof(cb)=='function')cb(has_flash);return has_flash;}
this.hasJavaPlugin=function(cb){var has_java=navigator.javaEnabled();if(typeof(cb)=='function')cb(has_java);return has_java;}
function getHTML(){if(html===null){var requirements;for(var i=0;i<filedata.length;i++){requirements=filedata[i].portal_item_requirements;var compatible=true;if(requirements.indexOf(REQUIRE_FLASH)>=0&&!self.hasFlashPlugin())compatible=false;if(compatible&&requirements.indexOf(REQUIRE_UNITY)>=0&&!self.hasUnityPlugin())compatible=false;if(compatible&&requirements.indexOf(REQUIRE_JAVA)>=0&&!self.hasJavaPlugin())compatible=false;if(compatible){self.compatible=true;file_used=filedata[i];html=filedata[i].html;callback=typeof(filedata[i].callback)=="undefined"?null:filedata[i].callback;break;}}
if(html===null&&filedata.length>0){file_used=filedata[0];html=filedata[0].html;callback=typeof(filedata[0].callback)=="undefined"?null:filedata[0].callback;}
filedata=null;if(autoscale){if(file_used.width>window.innerWidth)file_used.width=window.innerWidth;if(file_used.height>window.innerHeight)file_used.height=window.innerHeight;}}
return html?html:"Error: Could not embed this media.";}
this.getFormattedFilesize=function(){var size=parseInt(this.getFilesize());if(size===NaN)size=0;var measurements=["b","kb","mb"];var measurement=0;var highest=measurements.length- 1;while(size>1024&&measurement<highest){size=size/1024;measurement++;}
size=Math.round(size*100)/100;
return[size,measurements[measurement]];}
this.getFileID=function(){getHTML();return file_used.file_id;}
this.getDescription=function(){getHTML();return file_used.description;}
this.getFilesize=function(){getHTML();return file_used.filesize;}
this.getWidth=function(){getHTML();return file_used.width;}
this.getHeight=function(min){getHTML();if(typeof(min)=='undefined')min=file_used.height;return file_used.height>min?file_used.height:min;}
this.getFileURL=function(){getHTML();return file_used.url;}
function drawInto(element_id){var element=document.getElementById(element_id);if(element){element.innerHTML=getHTML();doCallback();}}
function doCallback()
{if(callback)callback();}
this.draw=function(element_id){function doDraw(){self.queueFunction(function(){drawInto(element_id);});}
if(has_unity===null){self.hasUnityPlugin(doDraw);}else{doDraw();}}
this.reportSuccess=function(success){file_used.callback=null;var values=[];for(var key in file_used){var value=null;if(typeof(file_used[key])=='string'&&key!='html'&&key!='url'){value="'"+(file_used[key].replace("'","\\'"))+"'";}else if(typeof(file_used[key])=='boolean'){value=file_used[key]?'true':'false';}else if(typeof(file_used[key])=='number'){value=file_used[key];}
if(value!==null)values.push(key+":"+value)}
if(typeof(jQuery)!='undefined'){var file_object="{"+values.join(",")+"}";}else{var file_object="{"+values.join(",")+"}";}
var message="{'event':'newgrounds_content_embedded','file':"+file_object+",'success':"+(success?'true':'false')+"}";window.postMessage(message,'*');}
if(typeof(window.onload)=='function')self.queueFunction(window.onload);window.onload=function(){window_loaded=true;executeQueuedFunctions();}}