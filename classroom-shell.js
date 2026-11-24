/* One teaching canvas: viewport changes scale the complete page, never its layout. */
(() => {
 'use strict';
 const WIDTH=1536,HEIGHT=864,frame=document.getElementById('classroom');
 function fit(){
  const width=document.documentElement.clientWidth,height=document.documentElement.clientHeight;
  if (!width || !height) return;
  const scale=Math.min(width/WIDTH,height/HEIGHT);
  // Rails use the frame edges. The centered teaching sheet keeps its own width.
  frame.style.width=(width/scale)+'px';
  frame.style.transform=`translate(0px,${(height-HEIGHT*scale)/2}px) scale(${scale})`;
 }
 function receiveRoute(event){
  if(event.source!==frame.contentWindow||event.origin!==location.origin)return;
  const data=event.data;
  if(data?.type!=='classroom-route'||typeof data.hash!=='string'||(data.hash&&!data.hash.startsWith('#')))return;
  if(location.hash!==data.hash)history.replaceState(history.state,'',location.pathname+location.search+(data.hash||'#home'));
  if(typeof data.title==='string')document.title=data.title;
 }
 function sendRoute(){
  frame.contentWindow.postMessage({type:'classroom-navigate',hash:location.hash||'#home'},location.origin);
 }
 window.addEventListener('message',receiveRoute);
 window.addEventListener('hashchange',sendRoute);
 window.addEventListener('popstate',sendRoute);
 window.addEventListener('resize',fit);
 new ResizeObserver(fit).observe(document.documentElement);
 fit();
 // Same-origin storage and the existing fragment URLs are preserved.
 frame.src='classroom.html?v=20261124-4'+(location.hash||'#home');
})();
