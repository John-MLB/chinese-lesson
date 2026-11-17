/* Editable classroom notes. No credentials or cloud service are embedded here. */
(() => {
'use strict';
const STORAGE='chinese-lesson-ink-v1', COLORS=['#c43d32','#195fc0','#182b29','#23844d'];
const NOTE_IDS=['sentence','definition','idiom','examples','giraffe','benefits','meaning','excerpt'];
const MAX_POINTS=150000, MAX_BYTES=12*1024*1024;
const clone=value=>JSON.parse(JSON.stringify(value));
let book={format:'chinese-lesson-notes',version:1,lesson:'lesson8',surfaces:{}};
let past=[],future=[],mode='view',color=COLORS[0],width=6,surface=null,panel=null,gesture=null,saveTimer,toastTimer;
let localProblem=false;
function validate(raw){
 if(!raw||raw.format!=='chinese-lesson-notes'||raw.version!==1||raw.lesson!=='lesson8'||!raw.surfaces||typeof raw.surfaces!=='object'||Array.isArray(raw.surfaces))throw Error('這不是本站的第八課筆記檔。');
 const clean={format:raw.format,version:1,lesson:'lesson8',surfaces:{}};let count=0,total=0;
 for(const [key,strokes] of Object.entries(raw.surfaces)){
  if(key!=='lesson8'&&!NOTE_IDS.includes(key.replace(/^note:/,'')))throw Error('筆記頁面名稱不正確。');
  if(key!=='lesson8'&&!key.startsWith('note:'))throw Error('筆記頁面名稱不正確。');
  if(!Array.isArray(strokes)||(total+=strokes.length)>5000)throw Error('筆記筆數太多。');
  clean.surfaces[key]=strokes.map(s=>{
   if(!s||!COLORS.includes(s.color)||![3,6,10].includes(s.width)||!['pen','line'].includes(s.tool)||!Array.isArray(s.points)||s.points.length<1||s.points.length>12000)throw Error('筆跡資料不完整。');
   count+=s.points.length;if(count>MAX_POINTS)throw Error('筆記太大，請分成不同檔案保存。');
   const points=s.points.map(p=>{
    const pattern=key==='lesson8'?/^p[0-4]-l\d{1,2}-c\d{1,3}$/:/^b\d{1,3}$/;
    if(!p||typeof p.a!=='string'||!pattern.test(p.a)||![p.x,p.y].every(v=>Number.isFinite(v)&&Math.abs(v)<=30))throw Error('筆跡座標不正確。');
    return {a:p.a,x:p.x,y:p.y};
   });return {tool:s.tool,color:s.color,width:s.width,points};
  });
 }return clean;
}
function pointDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy,t=l?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/l)):0;return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)}
// Pure helpers are shared by the browser and the small regression check.
if(typeof module!=='undefined'&&module.exports){module.exports={validate,pointDistance};return}
try{const saved=localStorage.getItem(STORAGE);if(saved)book=validate(JSON.parse(saved))}catch{localProblem=true}
function saveLocal(){clearTimeout(saveTimer);try{localStorage.setItem(STORAGE,JSON.stringify(book));localProblem=false;return true}catch{localProblem=true;toast('這台電腦暫時無法自動保存，請按「存檔」下載筆記檔。');return false}}
function remember(before){past.push(before);if(past.length>25)past.shift();future=[];saveTimer=setTimeout(saveLocal,300);updatePanel();}
function toast(message){clearTimeout(toastTimer);document.querySelectorAll('.ink-toast').forEach(e=>e.remove());const el=document.createElement('div');el.className='ink-toast';el.setAttribute('role','status');el.textContent=message;host().append(el);toastTimer=setTimeout(()=>el.remove(),6000)}
function host(){const d=document.getElementById('lesson-note');return d?.open?d:document.body}
function closePanel(){panel?.remove();panel=null}
function setMode(next){mode=next;closePanel();syncMode()}
function syncMode(){
 document.querySelectorAll('.ink-layer').forEach(el=>{el.classList.toggle('ink-active',mode!=='view'&&el===surface?.svg);el.classList.toggle('ink-erase',mode==='eraser')});
 document.querySelectorAll('[data-ink-action]').forEach(b=>{const selected=(b.dataset.inkAction==='erase'&&mode==='eraser')||(b.dataset.inkAction==='paint'&&['pen','line'].includes(mode));b.classList.toggle('ink-selected',selected);b.setAttribute('aria-pressed',String(selected))});
 document.querySelectorAll('.ink-mode-banner').forEach(e=>e.remove());
 if(mode!=='view'&&surface){const b=document.createElement('button');b.className='ink-mode-banner';b.textContent=({pen:'手繪',line:'直線',eraser:'橡皮擦'}[mode])+'中・完成書寫';b.onclick=()=>setMode('view');host().append(b)}
}
function toolMarkup(){return `<button class="rail-control" data-ink-action="paint" aria-label="畫筆工具"><span class="ink-tool-symbol" aria-hidden="true">✎</span><span>畫筆</span></button><button class="rail-control" data-ink-action="erase" aria-label="橡皮擦（擦除整筆）"><span class="ink-tool-symbol" aria-hidden="true">▱</span><span>橡皮擦</span></button><button class="rail-control" data-ink-action="save" aria-label="儲存與開啟筆記"><span class="ink-tool-symbol" aria-hidden="true">▣</span><span>存檔</span></button>`}
function setupTools(){
 document.querySelectorAll('.nav-rail').forEach(rail=>{if(!rail.querySelector('[data-ink-action]'))rail.insertAdjacentHTML('beforeend',toolMarkup());rail.querySelectorAll('[data-ink-action]').forEach(b=>b.hidden=!document.body.classList.contains('reading-mode'));rail.dataset.inkSide=rail.classList.contains('nav-rail-left')?'left':'right'});
 document.querySelectorAll('.note-tools').forEach(rail=>{if(!rail.children.length)rail.innerHTML=toolMarkup()});
 document.querySelectorAll('[data-ink-action]').forEach(b=>b.onclick=()=>{if(b.dataset.inkAction==='erase'){setMode(mode==='eraser'?'view':'eraser');return}openPanel(b.dataset.inkAction,b.closest('[data-ink-side]').dataset.inkSide)})
}
function button(text,action){const b=document.createElement('button');b.type='button';b.textContent=text;b.onclick=action;return b}
function openPanel(kind,side){
 finishGesture();closePanel();const el=document.createElement('section');panel=el;el.className='ink-panel '+side;el.setAttribute('aria-label',kind==='paint'?'畫筆設定':'筆記存檔');
 const h=document.createElement('h2');h.textContent=kind==='paint'?'畫筆工具':'我的課堂筆記';el.append(h);
 if(kind==='paint'){
  const grid=document.createElement('div');grid.className='ink-grid';
  [['操作','view'],['手繪','pen'],['直線','line'],['橡皮擦','eraser']].forEach(([label,value])=>{const b=button(label,()=>setMode(value));b.classList.toggle('primary',mode===value);grid.append(b)});el.append(grid);
  const colors=document.createElement('div');colors.className='ink-colors';COLORS.forEach((c,i)=>{const b=button('',()=>{color=c;openPanel('paint',side)});b.setAttribute('aria-label',['紅色','藍色','黑色','綠色'][i]);b.setAttribute('aria-pressed',String(color===c));b.classList.toggle('ink-selected',color===c);const dot=document.createElement('span');dot.className='ink-swatch';dot.style.background=c;b.append(dot);colors.append(b)});el.append(colors);
  const sizes=document.createElement('div');sizes.className='ink-grid';[3,6,10].forEach((n,i)=>{const b=button(['細筆','中筆','粗筆'][i],()=>{width=n;openPanel('paint',side)});b.classList.toggle('primary',width===n);sizes.append(b)});el.append(sizes);
  const history=document.createElement('div');history.className='ink-grid';const undo=button('復原',()=>undoRedo(false));undo.dataset.history='undo';const redo=button('重做',()=>undoRedo(true));redo.dataset.history='redo';history.append(undo,redo);el.append(history);
  const hint=document.createElement('p');hint.textContent='橡皮擦會擦掉碰到的整筆。選「操作」後，可翻頁、捲動及點課文註記。';el.append(hint);
 }else{
  const hint=document.createElement('p');hint.textContent='筆跡會自動記在這台電腦的此瀏覽器。請另存筆記檔，以免清除瀏覽器資料後遺失。';el.append(hint);
  [['下載筆記到本機',download],['存到同步資料夾',saveFolder],['開啟筆記檔',importFile]].forEach(([label,action])=>{const b=button(label,action);b.className='ink-full';el.append(b)});
  const cloud=document.createElement('p');cloud.textContent='同步資料夾：選電腦上的 Google Drive 或 OneDrive 資料夾；雲端上傳由該同步程式處理。';el.append(cloud);
  const status=document.createElement('p');status.className='ink-status';status.setAttribute('role','status');status.textContent=localProblem?'自動保存未成功，請下載筆記檔。':'可開啟筆記檔，繼續書寫。';el.append(status);
 }
 const close=button('關閉工具',closePanel);close.className='ink-full';el.append(close);host().append(el);updatePanel();
}
function updatePanel(){if(!panel)return;panel.querySelectorAll('[data-history]').forEach(b=>b.disabled=!(b.dataset.history==='undo'?past.length:future.length))}
function undoRedo(redo){finishGesture();const from=redo?future:past,to=redo?past:future;if(!from.length)return;to.push(clone(book));book=from.pop();saveLocal();redraw();updatePanel()}
function stamp(){return new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}
function serialized(){return JSON.stringify({...book,savedAt:new Date().toISOString()},null,2)}
function download(){finishGesture();saveLocal();const url=URL.createObjectURL(new Blob([serialized()],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='國語第八課筆記-'+stamp()+'.json';host().append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('已送出筆記檔下載，請在瀏覽器下載項目中確認。')}
async function saveFolder(){
 finishGesture();saveLocal();
 if(!window.showSaveFilePicker){toast('此瀏覽器不支援選資料夾存檔。請下載筆記檔，再放入電腦的同步資料夾。');return}
 try{
  const handle=await window.showSaveFilePicker({id:'chinese-lesson-notes',suggestedName:'國語第八課筆記-'+stamp()+'.json',types:[{description:'可繼續編輯的課堂筆記',accept:{'application/json':['.json']}}]});
  const writable=await handle.createWritable();try{await writable.write(serialized());await writable.close()}catch(err){try{await writable.abort()}catch{}throw err}
  toast('筆記已存入所選資料夾。若為同步資料夾，請由同步程式確認雲端上傳。');
 }catch(err){if(err.name!=='AbortError'){console.warn('Note file save:',err.name,err.message);toast('這次無法直接寫入資料夾，請改用「下載筆記到本機」，再移入同步資料夾。')}}
}
function importFile(){
 const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.hidden=true;host().append(input);
 input.oncancel=()=>input.remove();input.onchange=async()=>{
  const file=input.files[0];input.remove();if(!file)return;
  try{if(file.size>MAX_BYTES)throw Error('檔案太大，無法開啟。');const incoming=validate(JSON.parse(await file.text()));
   const apply=()=>{const before=clone(book);book=incoming;remember(before);saveLocal();setMode('view');redraw();toast('已開啟筆記，可以繼續書寫。')};
   if(Object.values(book.surfaces).some(s=>s.length)){
    const side=panel?.classList.contains('right')?'right':'left';closePanel();panel=document.createElement('section');panel.className='ink-panel '+side;panel.setAttribute('aria-label','確認開啟筆記');
    const title=document.createElement('h2');title.textContent='開啟這份筆記？';const message=document.createElement('p');message.textContent='將取代目前的筆跡。開啟後仍可用「畫筆 → 復原」還原。';
    const yes=button('開啟這份筆記',apply),no=button('保留目前筆跡',closePanel);yes.className='ink-full primary';no.className='ink-full';panel.append(title,message,yes,no);host().append(panel);
   }else apply();
  }catch(err){toast(err instanceof SyntaxError?'檔案不是正確的筆記格式；目前筆跡沒有變動。':err.message)}
 };input.click();
}
function geometry(){
 if(!surface)return;const root=surface.root,base=root.getBoundingClientRect();surface.base=base;
 surface.anchors=new Map();const nodes=surface.key==='lesson8'?root.querySelectorAll('[data-token]'):root.querySelectorAll('[data-ink-block]');
 nodes.forEach(el=>{const r=el.getBoundingClientRect();if(r.width&&r.height)surface.anchors.set(el.dataset.token||el.dataset.inkBlock,{x:r.left-base.left,y:r.top-base.top,w:r.width,h:r.height})});
 const w=root.clientWidth,h=root.clientHeight;surface.svg.setAttribute('width',w);surface.svg.setAttribute('height',h);surface.svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
}
function anchorPoint(p){let best=null,dist=Infinity;for(const [a,r]of surface.anchors){const d=Math.hypot(Math.max(r.x-p.x,0,p.x-r.x-r.w),Math.max(r.y-p.y,0,p.y-r.y-r.h));if(d<dist){dist=d;best={a,x:(p.x-r.x)/r.w,y:(p.y-r.y)/r.h}}}return best&&Math.abs(best.x)<=30&&Math.abs(best.y)<=30?best:null}
function resolve(p){const r=surface.anchors.get(p.a);return r?{x:r.x+p.x*r.w,y:r.y+p.y*r.h}:null}
function pathData(points){let d='',prev=null;for(const point of points){const p=resolve(point);if(!p){prev=null;continue}const gap=prev&&Math.hypot(p.x-prev.x,p.y-prev.y)>240;d+=(prev&&!gap?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1);if(!prev||gap)d+='l.1 .1';prev=p}return d}
function redraw(){
 if(!surface?.svg.isConnected)return;geometry();const strokes=book.surfaces[surface.key]||[];surface.svg.replaceChildren();
 for(const s of [...strokes,...(gesture?.stroke?[gesture.stroke]:[])]){const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',pathData(s.points));path.setAttribute('stroke',s.color);path.setAttribute('stroke-width',s.width);surface.svg.append(path)}
}
function localPoint(e){const r=surface.root.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
function erase(point){
 const list=book.surfaces[surface.key]||[];book.surfaces[surface.key]=list.filter(s=>{
  let prev=null;for(const p of s.points){const here=resolve(p);if(here){if(Math.hypot(here.x-point.x,here.y-point.y)<14+s.width/2)return false;if(prev&&Math.hypot(here.x-prev.x,here.y-prev.y)<240&&pointDistance(point,prev,here)<14+s.width/2)return false}prev=here}return true
 });redraw();
}
function begin(e){
 if(mode==='view'||gesture||!e.isPrimary||(e.pointerType==='mouse'&&e.button!==0))return;
 closePanel();e.preventDefault();geometry();const point=localPoint(e),anchor=anchorPoint(point);if(!anchor)return;
 surface.svg.setPointerCapture(e.pointerId);gesture={id:e.pointerId,before:clone(book),start:point,last:point,stroke:mode==='eraser'?null:{tool:mode,color,width,points:[anchor]}};
 if(mode==='eraser')erase(point);else redraw();
}
function move(e){
 if(!gesture||e.pointerId!==gesture.id)return;e.preventDefault();const point=localPoint(e);
 if(!gesture.stroke){const dist=Math.hypot(point.x-gesture.last.x,point.y-gesture.last.y),steps=Math.max(1,Math.ceil(dist/8));for(let i=1;i<=steps;i++)erase({x:gesture.last.x+(point.x-gesture.last.x)*i/steps,y:gesture.last.y+(point.y-gesture.last.y)*i/steps});gesture.last=point;return}
 const s=gesture.stroke;if(s.tool==='line'){
  s.points=[];const n=Math.max(1,Math.ceil(Math.hypot(point.x-gesture.start.x,point.y-gesture.start.y)/6));for(let i=0;i<=n;i++){const a=anchorPoint({x:gesture.start.x+(point.x-gesture.start.x)*i/n,y:gesture.start.y+(point.y-gesture.start.y)*i/n});if(a)s.points.push(a)}
 }else if(s.points.length<12000){const d=Math.hypot(point.x-gesture.last.x,point.y-gesture.last.y);if(d<2)return;const n=Math.max(1,Math.ceil(d/8));for(let i=1;i<=n&&s.points.length<12000;i++){const a=anchorPoint({x:gesture.last.x+(point.x-gesture.last.x)*i/n,y:gesture.last.y+(point.y-gesture.last.y)*i/n});if(a)s.points.push(a)}}
 gesture.last=point;redraw();
}
function finishGesture(cancel=false){
 if(!gesture)return;const g=gesture;gesture=null;
 if(cancel){book=g.before;redraw();return}
 if(g.stroke){(book.surfaces[surface.key]||=[]).push(g.stroke);try{validate(book)}catch{book=g.before;toast('這份筆記已達容量上限，請先存檔。');redraw();return}}
 if(JSON.stringify(g.before.surfaces)!==JSON.stringify(book.surfaces))remember(g.before);redraw();
}
function beforeChange(){finishGesture();closePanel();setMode('view');surface?.observer?.disconnect();surface?.svg.remove();surface=null}
function refresh(){
 finishGesture();surface?.observer?.disconnect();surface?.svg.remove();surface=null;setupTools();
 const dialog=document.getElementById('lesson-note'),root=dialog.open?dialog.querySelector('.note-paper'):document.querySelector('.continuous-board');
 if(!root){syncMode();return}
 const key=dialog.open?'note:'+dialog.dataset.note:'lesson8';
 if(key!=='lesson8')root.querySelectorAll('h1,h3,p,.takeaway,img,figcaption').forEach((el,i)=>el.dataset.inkBlock='b'+i);
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('ink-layer');svg.setAttribute('aria-hidden','true');root.append(svg);surface={root,key,svg,anchors:new Map()};
 svg.addEventListener('pointerdown',begin);svg.addEventListener('pointermove',move);svg.addEventListener('pointerup',e=>{if(gesture?.id===e.pointerId){move(e);finishGesture()}});svg.addEventListener('pointercancel',e=>{if(gesture?.id===e.pointerId)finishGesture(true)});svg.addEventListener('lostpointercapture',e=>{if(gesture?.id===e.pointerId)finishGesture()});
 const observer=new ResizeObserver(()=>{if(surface?.svg===svg)redraw()});observer.observe(root);surface.observer=observer;root.querySelectorAll('img').forEach(img=>img.addEventListener('load',()=>{if(surface?.svg===svg)redraw()},{once:true}));redraw();syncMode();
}
window.lessonInk={beforeChange,refresh};
window.addEventListener('pagehide',()=>{finishGesture();saveLocal()});
document.addEventListener('visibilitychange',()=>{if(document.hidden){finishGesture();saveLocal()}});
document.fonts?.ready.then(()=>{if(surface)redraw()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel){e.preventDefault();e.stopImmediatePropagation();closePanel()}else if(e.key==='Escape'&&mode!=='view'){e.preventDefault();e.stopImmediatePropagation();setMode('view')}},true);
})();
