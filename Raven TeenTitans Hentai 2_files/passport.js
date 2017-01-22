var PassportHandler={callbacks:{}};(function($){$(document).ready(function(){var _passport_html=PHP.get('_passport_html',false);var _passport_redirect=PHP.get('_passport_redirect',false);if(false===_passport_html||false===_passport_redirect){return;}
var container=$('#passport_container');var login=$('#passport_login');var margin=60;var eventMethod=window.addEventListener?"addEventListener":"attachEvent";var eventer=window[eventMethod];var messageEvent=eventMethod=="attachEvent"?"onmessage":"message";if(typeof(eventer)=='undefined')return;login.click(function(){PassportHandler.open();return false;});PassportHandler.open=function(){container.html(_passport_html);var frame=$('#passport_frame');if(PHP.get('ng_design','2012')=='2012'){container.height($(document).height());frame.height($(document).height()- margin);}
frame.css('margin-top',margin);container.show();return PassportHandler;};PassportHandler.close=function(){container.html('');container.hide();return PassportHandler;};PassportHandler.addCallback=function(event,callback){if(typeof PassportHandler.callbacks[event]===typeof undefined){PassportHandler.callbacks[event]=[];}
PassportHandler.callbacks[event].push(callback);return PassportHandler;};PassportHandler.removeCallback=function(event,callback){if(typeof PassportHandler.callbacks[event]===typeof undefined){return;}
var index=PassportHandler.callbacks[event].indexOf(callback);if(index>-1){PassportHandler.callbacks[event].splice(index,1);}
return PassportHandler;};PassportHandler.executeCallbacks=function(event,message){if(typeof PassportHandler.callbacks[event]===typeof undefined){return;}
var i,result;for(i=PassportHandler.callbacks[event].length- 1;i>=0;i--){result=PassportHandler.callbacks[event][i](message);if(result===false){return;}}}
PassportHandler.removeAllCallbacks=function(event){if(typeof(event)=='undefined'){PassportHandler.callbacks={};}else{PassportHandler.callbacks[event]={};}
return PassportHandler;};PassportHandler.addCallback('requestLogin',function(message){return PassportHandler.open();});PassportHandler.addCallback('closePassport',function(message){return PassportHandler.close();});PassportHandler.addCallback('userLogin',function(message){window.location.replace(_passport_redirect);});PassportHandler.getContainer=function(){return container;};PassportHandler.reposition=function(pos){if(typeof pos===typeof undefined){pos=$(document).scrollTop();}
$('.passport_frame').css('margin-top',pos+ margin);return PassportHandler;};eventer(messageEvent,function(e){var message=e.data;if(e.origin.substr(-14).toLowerCase()!=='newgrounds.com'&&e.origin.substr(-14).toLowerCase()!=='ungrounded.net')return;if(typeof message.success===typeof undefined||typeof message.event===typeof undefined)return;PassportHandler.executeCallbacks(message.event,message);},false);});})(jQuery);