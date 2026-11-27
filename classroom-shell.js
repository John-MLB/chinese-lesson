/* Scale the teaching type and expose the full viewport width for content reflow. */
(() => {
 'use strict';
 const WIDTH=1536,HEIGHT=864,frame=document.getElementById('classroom');
 function fit(){
  const width=document.documentElement.clientWidth,height=document.documentElement.clientHeight;
  if (!width || !height) return;
  const scale=Math.min(width/WIDTH,height/HEIGHT);
  // The inner document lays out text, images and controls across this width.
  frame.style.width=(width/scale)+'px';
  frame.style.transform=`translate(0px,${(height-HEIGHT*scale)/2}px) scale(${scale})`;
 }
 const legacyPage='classroom.html?v=20261124-6';
 const unit4Page='unit4.html?v=4';
 let activePage;
 function pageFor(hash){
  return /^#(?:unit4$|lesson10(?:-|$))/.test(hash)?unit4Page:legacyPage;
 }
 function loadPage(hash){
  const nextPage=pageFor(hash);
  const url=nextPage+hash;
  if(activePage&&frame.contentWindow.location)frame.contentWindow.location.replace(url);
  else frame.src=url;
  activePage=nextPage;
 }
 function receiveRoute(event){
  if(event.source!==frame.contentWindow||event.origin!==location.origin)return;
  const data=event.data;
  if(data?.type!=='classroom-route'||typeof data.hash!=='string'||(data.hash&&!data.hash.startsWith('#')))return;
  if(pageFor(data.hash)!==activePage)return;
  if(location.hash!==data.hash)history.replaceState(history.state,'',location.pathname+location.search+(data.hash||'#home'));
  if(typeof data.title==='string')document.title=data.title;
 }
 function sendRoute(){
  const hash=location.hash||'#home';
  if(pageFor(hash)!==activePage){loadPage(hash);return}
  frame.contentWindow.postMessage({type:'classroom-navigate',hash},location.origin);
 }
 window.addEventListener('message',receiveRoute);
 window.addEventListener('hashchange',sendRoute);
 window.addEventListener('popstate',sendRoute);
 window.addEventListener('resize',fit);
 new ResizeObserver(fit).observe(document.documentElement);
 fit();
 // Same-origin storage and the existing fragment URLs are preserved.
 frame.addEventListener?.('load',()=>{
  const doc=frame.contentDocument;
  const header=activePage===legacyPage?doc?.querySelector('body > header'):null;
  if(!header||header.querySelector('[data-unit4-entry]'))return;
  const link=doc.createElement('a');
  link.className='button';
  link.href='index.html#unit4';
  link.target='_parent';
  link.dataset.unit4Entry='';
  link.textContent='第四單元・魔法變變變';
  link.addEventListener('click',event=>{
   if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   event.preventDefault();
   location.hash='unit4';
  });
  header.append(link);
 });
 loadPage(location.hash||'#home');
})();
