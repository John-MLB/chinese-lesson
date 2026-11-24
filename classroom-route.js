/* Keep bookmarks, browser Back, note dialogs and the outer URL in sync. */
(() => {
 'use strict';
 // Opening the teaching document directly still enters the same fixed canvas.
 if(window.parent===window){location.replace('index.html'+location.hash);return}
 function publish(){
  window.parent.postMessage({type:'classroom-route',hash:location.hash,title:document.title},location.origin);
 }
 // pushState/replaceState do not emit hashchange (note dialogs use both).
 for(const method of ['pushState','replaceState']){
  const original=history[method].bind(history);
  history[method]=(...args)=>{original(...args);queueMicrotask(publish)};
 }
 window.addEventListener('hashchange',()=>queueMicrotask(publish));
 window.addEventListener('popstate',()=>queueMicrotask(publish));
 window.addEventListener('DOMContentLoaded',publish);
 window.addEventListener('message',event=>{
  if(event.source!==window.parent||event.origin!==location.origin)return;
  const data=event.data;
  if(data?.type!=='classroom-navigate'||typeof data.hash!=='string'||!data.hash.startsWith('#')||location.hash===data.hash)return;
  // Preserve the joint browser-history entry rather than adding a second one.
  history.replaceState(null,'',data.hash);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
 });
})();
