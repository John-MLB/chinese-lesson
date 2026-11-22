/* Editable classroom notes. No credentials or cloud service are embedded here. */
(() => {
'use strict';
const STORAGE='chinese-lesson-ink-v1', COLORS=['#c43d32','#195fc0','#182b29','#23844d'];
const HIGHLIGHT_COLORS=['#ffe34d','#ff8fbd','#6cc9f4','#80dc84'];
const strokeWidth=s=>s.tool==='highlight'?({3:22,6:34,10:48})[s.width]:s.width;
const NOTE_IDS=['sentence','definition','idiom','examples','giraffe','benefits','meaning','excerpt'];
const NOTE9_IDS=[
 ...['buddha','thailand','temple','splendid','monk','stroll','dealings','egypt','nile','lowland','dike','tulip','atmosphere','rowing'].map(id=>'l9-word-'+id),
 ...['buddha','terrain','prevent','dike','row','egypt','thai','stroll','tide','hua'].map(id=>'l9-glyph-'+id),
 ...[3,4,3,4].flatMap((count,p)=>Array.from({length:count},(_,i)=>`l9-picture-${p}-${i}`)),
 ...['monkhood','monarchy','market'].map(id=>'l9-knowledge-'+id),
 ...['dike','nomination','heading','appearance','atmosphere','cause','purpose'].map(id=>'l9-practice-'+id)
];
const MAX_POINTS=150000, MAX_BYTES=12*1024*1024;
const clone=value=>JSON.parse(JSON.stringify(value));
const emptyBook=lesson=>({format:'chinese-lesson-notes',version:1,lesson,surfaces:{}});
const storageKey=lesson=>lesson==='lesson8'?STORAGE:STORAGE+'-'+lesson;
let book=emptyBook('lesson8');
const lessonSessions=new Map();
let past=[],future=[],mode='view',color=COLORS[0],width=3,surface=null,panel=null,gesture=null,saveTimer,toastTimer;
let localProblem=false;
function validate(raw){
 if(!raw||raw.format!=='chinese-lesson-notes'||raw.version!==1||!['lesson8','lesson9'].includes(raw.lesson)||!raw.surfaces||typeof raw.surfaces!=='object'||Array.isArray(raw.surfaces))throw Error('這不是本站的課堂筆記檔。');
 const clean={format:raw.format,version:1,lesson:raw.lesson,surfaces:{}};let count=0,total=0;
 for(const [key,strokes] of Object.entries(raw.surfaces)){
  if(key!==raw.lesson&&!(raw.lesson==='lesson8'?NOTE_IDS:NOTE9_IDS).includes(key.replace(/^note:/,'')))throw Error('筆記頁面名稱不正確。');
  if(key!==raw.lesson&&!key.startsWith('note:'))throw Error('筆記頁面名稱不正確。');
  if(!Array.isArray(strokes)||(total+=strokes.length)>5000)throw Error('筆記筆數太多。');
  clean.surfaces[key]=strokes.map(s=>{
   if(!s||!(s.tool==='highlight'?HIGHLIGHT_COLORS:COLORS).includes(s.color)||![3,6,10].includes(s.width)||!['pen','line','highlight'].includes(s.tool)||!Array.isArray(s.points)||s.points.length<1||s.points.length>12000)throw Error('筆跡資料不完整。');
   count+=s.points.length;if(count>MAX_POINTS)throw Error('筆記太大，請分成不同檔案保存。');
   const points=s.points.map(p=>{
    const pattern=key==='lesson8'?/^p[0-4]-l\d{1,2}-c\d{1,3}$/:key==='lesson9'?/^(?:p[0-3]-(?:l\d{1,2}-(?:c\d{1,3}|indent|number)|image[0-3])|s[2-4]-i[0-2]-l[01]-c\d{1,3})$/:/^b\d{1,3}$/;
    if(!p||typeof p.a!=='string'||!pattern.test(p.a)||![p.x,p.y].every(v=>Number.isFinite(v)&&Math.abs(v)<=30))throw Error('筆跡座標不正確。');
    return {a:p.a,x:p.x,y:p.y};
   });
   const stroke={tool:s.tool,color:s.color,width:s.width,points};
   if(s.frame!==undefined){
    const f=s.frame;
    if(!f||![f.x,f.y].every(v=>Number.isFinite(v)&&Math.abs(v)<=30)||
       ![f.w,f.h].every(v=>Number.isFinite(v)&&v>0&&v<=100000)||
       points.some(p=>p.a!==points[0].a))throw Error('筆跡定位資料不正確。');
    stroke.frame={x:f.x,y:f.y,w:f.w,h:f.h};
   }
   return stroke;
  });
 }return clean;
}
function pointDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy,t=l?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/l)):0;return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)}
// Short tap toggles drawing; hold opens settings without an extra toggle on release.
function bindPenPress(target,tap,hold,schedule=setTimeout,unschedule=clearTimeout){
 let active=null,timer=null,suppress=false;
 const stop=()=>{if(timer!==null)unschedule(timer);timer=null};
 const cancel=()=>{stop();if(active)suppress=true;active=null};
 target.onpointerdown=e=>{if(e.isPrimary===false||e.button!==0)return;stop();suppress=false;active={id:e.pointerId,x:e.clientX,y:e.clientY,held:false,moved:false};target.setPointerCapture?.(e.pointerId);timer=schedule(()=>{timer=null;if(active&&!active.moved){active.held=true;hold()}},600)};
 target.onpointermove=e=>{if(active&&e.pointerId===active.id&&Math.hypot(e.clientX-active.x,e.clientY-active.y)>12){active.moved=true;stop()}};
 target.onpointerup=e=>{if(!active||e.pointerId!==active.id)return;stop();suppress=active.held||active.moved;active=null};
 target.onpointercancel=cancel;
 target.onlostpointercapture=()=>{if(active)cancel()};
 target.onclick=e=>{if(suppress&&e.detail!==0){suppress=false;return}suppress=false;tap()};
 target.oncontextmenu=e=>{e.preventDefault();if(!active?.held){stop();if(active)active.held=true;hold()}};
 target.onkeydown=e=>{if(e.key==='ArrowDown'){e.preventDefault();hold()}};
 return {cancel};
}
// A held light pointer never becomes a saved stroke or intercepts controls.
function bindLightPen(root,{allowed,show,move,hide}){
 let active=null;
 const stop=()=>{if(active===null)return;const id=active;active=null;hide();if(root.hasPointerCapture?.(id))root.releasePointerCapture(id)};
 const down=e=>{if(active!==null||!allowed()||e.isPrimary===false||e.button!==0||e.target.closest('button,a,input,select,textarea,[role="button"]'))return;active=e.pointerId;e.preventDefault();root.setPointerCapture?.(active);show(e)};
 const drag=e=>{if(e.pointerId!==active)return;if(!allowed()){stop();return}e.preventDefault();move(e)};
 const end=e=>{if(e.pointerId===active)stop()};
 const menu=e=>{if(allowed()&&!e.target.closest('button,a,input,select,textarea,[role="button"]'))e.preventDefault()};
 const events={pointerdown:down,pointermove:drag,pointerup:end,pointercancel:end,lostpointercapture:end,contextmenu:menu};
 for(const [name,fn]of Object.entries(events))root.addEventListener(name,fn);
 return {stop,destroy(){stop();for(const [name,fn]of Object.entries(events))root.removeEventListener(name,fn)}};
}
// Pure helpers are shared by the browser and the small regression check.
if(typeof module!=='undefined'&&module.exports){module.exports={validate,pointDistance,bindPenPress,bindLightPen,strokeWidth,storageKey,nearestAnchor,pinStroke,resolve};return}
try{const saved=localStorage.getItem(STORAGE);if(saved)book=validate(JSON.parse(saved))}catch{localProblem=true}
function saveLocal(){clearTimeout(saveTimer);try{localStorage.setItem(storageKey(book.lesson),JSON.stringify(gesture?.before||book));localProblem=false;return true}catch{localProblem=true;toast('這台電腦暫時無法自動保存，請按「存檔」下載筆記檔。');return false}}
function activateLesson(lesson){
 if(book.lesson===lesson)return;
 finishGesture();saveLocal();
 lessonSessions.set(book.lesson,{book,past,future,localProblem});
 const session=lessonSessions.get(lesson);
 if(session){({book,past,future,localProblem}=session)}else{
  book=emptyBook(lesson);past=[];future=[];localProblem=false;
  try{const saved=localStorage.getItem(storageKey(lesson));if(saved){const loaded=validate(JSON.parse(saved));if(loaded.lesson!==lesson)throw Error('課別不符');book=loaded}}catch{localProblem=true}
 }
}
function remember(before){past.push(before);if(past.length>25)past.shift();future=[];saveTimer=setTimeout(saveLocal,300);updatePanel();}
function toast(message){clearTimeout(toastTimer);document.querySelectorAll('.ink-toast').forEach(e=>e.remove());const el=document.createElement('div');el.className='ink-toast';el.setAttribute('role','status');el.textContent=message;host().append(el);toastTimer=setTimeout(()=>el.remove(),6000)}
function host(){const d=document.getElementById('lesson-note');return d?.open?d:document.body}
function closePanel(){panel?.remove();panel=null}
function setMode(next){finishGesture();mode=next;closePanel();syncMode()}
function syncMode(){
 surface?.light?.stop();
 document.querySelectorAll('.ink-layer').forEach(el=>{el.classList.toggle('ink-active',mode!=='view'&&el===surface?.svg);el.classList.toggle('ink-erase',mode==='eraser')});
 document.querySelectorAll('[data-ink-action]').forEach(b=>{const selected=(b.dataset.inkAction==='erase'&&mode==='eraser')||(b.dataset.inkAction==='paint'&&['pen','line','highlight'].includes(mode));b.classList.toggle('ink-selected',selected);if(['paint','erase'].includes(b.dataset.inkAction))b.setAttribute('aria-pressed',String(selected));else b.removeAttribute('aria-pressed')});
 document.querySelectorAll('.ink-mode-banner').forEach(e=>e.remove());
 if(mode!=='view'&&surface){const b=document.createElement('button');b.className='ink-mode-banner';b.textContent=({pen:'手繪',line:'直線',highlight:'螢光筆',eraser:'橡皮擦'}[mode])+'中・完成書寫';b.onclick=()=>setMode('view');host().append(b)}
}
function toolMarkup(){return `<button class="rail-control" data-ink-action="paint" aria-label="畫筆：輕點切換，長按設定" title="輕點：書寫／光筆；長按：畫筆設定"><span class="ink-tool-symbol" aria-hidden="true">✎</span><span>畫筆</span></button><button class="rail-control" data-ink-action="erase" aria-label="橡皮擦（擦除整筆）"><span class="ink-tool-symbol" aria-hidden="true">▱</span><span>橡皮擦</span></button><button class="rail-control" data-ink-action="undo" data-history="undo" aria-label="上一步：復原筆跡" title="上一步：復原筆跡"><span class="ink-tool-symbol" aria-hidden="true">↶</span><span>上一步</span></button><button class="rail-control" data-ink-action="redo" data-history="redo" aria-label="下一步：重做筆跡" title="下一步：重做筆跡"><span class="ink-tool-symbol" aria-hidden="true">↷</span><span>下一步</span></button><button class="rail-control" data-ink-action="save" aria-label="儲存與開啟筆記"><span class="ink-tool-symbol" aria-hidden="true">▣</span><span>存檔</span></button>`}
const penPresses=new WeakMap();
function setupTools(){
 document.querySelectorAll('.nav-rail').forEach(rail=>{if(!rail.querySelector('[data-ink-action]'))rail.insertAdjacentHTML('beforeend',toolMarkup());rail.querySelectorAll('[data-ink-action]').forEach(b=>b.hidden=!document.body.classList.contains('reading-mode'));rail.dataset.inkSide=rail.classList.contains('nav-rail-left')?'left':'right'});
 document.querySelectorAll('.note-tools').forEach(rail=>{if(!rail.children.length)rail.innerHTML=toolMarkup()});
 document.querySelectorAll('[data-ink-action]').forEach(b=>{
  const action=b.dataset.inkAction;
  if(action==='paint'){
   if(!penPresses.has(b))penPresses.set(b,bindPenPress(b,()=>{if(['pen','line','highlight'].includes(mode))setMode('view');else{color=COLORS[0];width=3;setMode('pen')}},()=>{if(!['pen','line','highlight'].includes(mode)){color=COLORS[0];width=3;setMode('pen')}openPanel('paint',b.closest('[data-ink-side]').dataset.inkSide)}));
  }else b.onclick=()=>{if(action==='erase')setMode(mode==='eraser'?'view':'eraser');else if(action==='undo'||action==='redo')undoRedo(action==='redo');else openPanel(action,b.closest('[data-ink-side]').dataset.inkSide)};
 });
 updatePanel();
}
function button(text,action){const b=document.createElement('button');b.type='button';b.textContent=text;b.onclick=action;return b}
function openPanel(kind,side){
 finishGesture();closePanel();const el=document.createElement('section');panel=el;el.className='ink-panel '+side;el.setAttribute('aria-label',kind==='paint'?'畫筆設定':'筆記存檔');
 const h=document.createElement('h2');h.textContent=kind==='paint'?'畫筆工具':'我的課堂筆記';el.append(h);
 if(kind==='paint'){
  const grid=document.createElement('div');grid.className='ink-grid';
  [['手繪','pen'],['直線','line'],['螢光筆','highlight']].forEach(([label,value])=>{const b=button(label,()=>{if(value==='highlight'&&mode!=='highlight'){color=HIGHLIGHT_COLORS[0];width=6}else if(value!=='highlight'&&mode==='highlight'){color=COLORS[0];width=3}setMode(value);openPanel('paint',side)});b.classList.toggle('primary',mode===value);if(value==='highlight')b.classList.add('ink-wide');grid.append(b)});el.append(grid);
  const colors=document.createElement('div');colors.className='ink-colors';(mode==='highlight'?HIGHLIGHT_COLORS:COLORS).forEach((c,i)=>{const b=button('',()=>{color=c;openPanel('paint',side)});b.setAttribute('aria-label',(mode==='highlight'?['黃色','粉紅色','淺藍色','淺綠色']:['紅色','藍色','黑色','綠色'])[i]);b.setAttribute('aria-pressed',String(color===c));b.classList.toggle('ink-selected',color===c);const dot=document.createElement('span');dot.className='ink-swatch';dot.style.background=c;b.append(dot);colors.append(b)});el.append(colors);
  const sizes=document.createElement('div');sizes.className='ink-grid';[3,6,10].forEach((n,i)=>{const b=button(['細筆','中筆','粗筆'][i],()=>{width=n;openPanel('paint',side)});b.classList.toggle('primary',width===n);sizes.append(b)});el.append(sizes);
  const hint=document.createElement('p');hint.textContent='選好後直接在課文上畫。輕點側邊畫筆，回到光筆。';el.append(hint);
 }else{
  const hint=document.createElement('p');hint.textContent='筆跡會自動記在這台電腦的此瀏覽器。請另存筆記檔，以免清除瀏覽器資料後遺失。';el.append(hint);
  [['下載筆記到本機',download],['存到同步資料夾',saveFolder],['開啟筆記檔',importFile]].forEach(([label,action])=>{const b=button(label,action);b.className='ink-full';el.append(b)});
  const cloud=document.createElement('p');cloud.textContent='同步資料夾：選電腦上的 Google Drive 或 OneDrive 資料夾；雲端上傳由該同步程式處理。';el.append(cloud);
  const status=document.createElement('p');status.className='ink-status';status.setAttribute('role','status');status.textContent=localProblem?'自動保存未成功，請下載筆記檔。':'可開啟筆記檔，繼續書寫。';el.append(status);
 }
 if(kind!=='paint'){const close=button('關閉工具',closePanel);close.className='ink-full';el.append(close)}host().append(el);updatePanel();
}
function updatePanel(){document.querySelectorAll('[data-history]').forEach(b=>b.disabled=!(b.dataset.history==='undo'?past.length:future.length))}
function undoRedo(redo){finishGesture();const from=redo?future:past,to=redo?past:future;if(!from.length)return;to.push(clone(book));book=from.pop();saveLocal();redraw();updatePanel()}
function stamp(){return new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}
function serialized(){return JSON.stringify({...book,savedAt:new Date().toISOString()},null,2)}
function download(){finishGesture();saveLocal();const url=URL.createObjectURL(new Blob([serialized()],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='國語第'+(book.lesson==='lesson9'?'九':'八')+'課筆記-'+stamp()+'.json';host().append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('已送出筆記檔下載，請在瀏覽器下載項目中確認。')}
async function saveFolder(){
 finishGesture();saveLocal();
 if(!window.showSaveFilePicker){toast('此瀏覽器不支援選資料夾存檔。請下載筆記檔，再放入電腦的同步資料夾。');return}
 try{
  const handle=await window.showSaveFilePicker({id:'chinese-lesson-notes',suggestedName:'國語第'+(book.lesson==='lesson9'?'九':'八')+'課筆記-'+stamp()+'.json',types:[{description:'可繼續編輯的課堂筆記',accept:{'application/json':['.json']}}]});
  const writable=await handle.createWritable();try{await writable.write(serialized());await writable.close()}catch(err){try{await writable.abort()}catch{}throw err}
  toast('筆記已存入所選資料夾。若為同步資料夾，請由同步程式確認雲端上傳。');
 }catch(err){if(err.name!=='AbortError'){console.warn('Note file save:',err.name,err.message);toast('這次無法直接寫入資料夾，請改用「下載筆記到本機」，再移入同步資料夾。')}}
}
function importFile(){
 const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.hidden=true;host().append(input);
 input.oncancel=()=>input.remove();input.onchange=async()=>{
  const file=input.files[0];input.remove();if(!file)return;
  try{if(file.size>MAX_BYTES)throw Error('檔案太大，無法開啟。');const incoming=validate(JSON.parse(await file.text()));if(incoming.lesson!==book.lesson)throw Error('這份筆記屬於第'+(incoming.lesson==='lesson9'?'九':'八')+'課，請先進入該課再開啟。');
   const apply=()=>{const before=clone(book);book=incoming;remember(before);saveLocal();setMode('view');redraw();toast('已開啟筆記，可以繼續書寫。')};
   if(Object.values(book.surfaces).some(s=>s.length)){
    const side=panel?.classList.contains('right')?'right':'left';closePanel();panel=document.createElement('section');panel.className='ink-panel '+side;panel.setAttribute('aria-label','確認開啟筆記');
    const title=document.createElement('h2');title.textContent='開啟這份筆記？';const message=document.createElement('p');message.textContent='將取代目前的筆跡。開啟後仍可用「上一步」還原。';
    const yes=button('開啟這份筆記',apply),no=button('保留目前筆跡',closePanel);yes.className='ink-full primary';no.className='ink-full';panel.append(title,message,yes,no);host().append(panel);
   }else apply();
  }catch(err){toast(err instanceof SyntaxError?'檔案不是正確的筆記格式；目前筆跡沒有變動。':err.message)}
 };input.click();
}
function geometry(){
 if(!surface)return;
 const {root,svg}=surface,w=root.clientWidth,h=root.clientHeight;
 svg.setAttribute('width',w);svg.setAttribute('height',h);svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
 const bounds=svg.getBoundingClientRect();
 surface.anchors=new Map();
 if(!bounds.width||!bounds.height)return;
 const sx=w/bounds.width,sy=h/bounds.height;
 const nodes=surface.key.startsWith('lesson')?root.querySelectorAll('[data-token]'):root.querySelectorAll('[data-ink-block]');
 for(const el of nodes){
  const r=el.getBoundingClientRect();
  if(r.width&&r.height)surface.anchors.set(el.dataset.token||el.dataset.inkBlock,
   {x:(r.left-bounds.left)*sx,y:(r.top-bounds.top)*sy,w:r.width*sx,h:r.height*sy});
 }
}
function nearestAnchor(p,anchors){
 let best=null,distance=Infinity;
 for(const [a,r] of anchors){
  const d=Math.hypot(Math.max(r.x-p.x,0,p.x-r.x-r.w),Math.max(r.y-p.y,0,p.y-r.y-r.h));
  if(d<distance){distance=d;best={a,x:(p.x-r.x)/r.w,y:(p.y-r.y)/r.h}}
 }
 return best&&Math.abs(best.x)<=30&&Math.abs(best.y)<=30?best:null;
}
function resolve(p,anchors,frame){
 const r=anchors.get(p.a);
 if(!r)return null;
 if(!frame)return {x:r.x+p.x*r.w,y:r.y+p.y*r.h};
 return {x:r.x+frame.x*r.w+(p.x-frame.x)*frame.w,
         y:r.y+frame.y*r.h+(p.y-frame.y)*frame.h};
}
// Attach the whole mark to the content under its center. The recorded dimensions
// preserve its shape even when a neighbouring character moves to another column.
function pinStroke(stroke,anchors){
 const coords=stroke.points.map(p=>resolve(p,anchors));
 if(!coords.length||coords.some(p=>!p))return;
 let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;
 for(const p of coords){
  left=Math.min(left,p.x);right=Math.max(right,p.x);
  top=Math.min(top,p.y);bottom=Math.max(bottom,p.y);
 }
 const center=nearestAnchor({x:(left+right)/2,y:(top+bottom)/2},anchors);
 if(!center)return;
 const r=anchors.get(center.a);
 const points=coords.map(p=>({a:center.a,x:(p.x-r.x)/r.w,y:(p.y-r.y)/r.h}));
 // Extremely long marks can exceed the version-1 coordinates of a small block.
 // Keep their original per-point anchors so older note readers can open them.
 if(r.w>100000||r.h>100000||points.some(p=>Math.abs(p.x)>30||Math.abs(p.y)>30))return;
 // Text glyphs keep their size when extra row spacing changes. Use their
 // cell origin; on a resizable picture or note block keep the relative center.
 const glyph=/^(?:p\d+|s[2-4]-i[0-2])-l\d+-c\d+$/.test(center.a);
 stroke.points=points;stroke.frame={x:glyph?0:center.x,y:glyph?0:center.y,w:r.w,h:r.h};
}
function pathData(stroke){
 let d='',prev=null;
 for(const point of stroke.points){
  const p=resolve(point,surface.anchors,stroke.frame);
  if(!p){prev=null;continue}
  const gap=prev&&Math.hypot(p.x-prev.x,p.y-prev.y)>240;
  d+=(prev&&!gap?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1);
  if(!prev||gap)d+='l.1 .1';
  prev=p;
 }
 return d;
}
function redraw(){
 if(!surface?.svg.isConnected)return;geometry();const strokes=book.surfaces[surface.key]||[];surface.svg.replaceChildren();
 const ordered=[...strokes,...(gesture?.stroke?[gesture.stroke]:[])].sort((a,b)=>Number(b.tool==='highlight')-Number(a.tool==='highlight'));
 for(const s of ordered){const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',pathData(s));path.setAttribute('stroke',s.color);path.setAttribute('stroke-width',strokeWidth(s));if(s.tool==='highlight')path.classList.add('ink-highlight');surface.svg.append(path)}
}
function localPoint(e){
 const {svg}=surface,r=svg.getBoundingClientRect();
 return {x:(e.clientX-r.left)*svg.viewBox.baseVal.width/r.width,
         y:(e.clientY-r.top)*svg.viewBox.baseVal.height/r.height};
}
function erase(point){
 const list=book.surfaces[surface.key]||[];book.surfaces[surface.key]=list.filter(s=>{
  let prev=null;for(const p of s.points){const here=resolve(p,surface.anchors,s.frame);if(here){if(Math.hypot(here.x-point.x,here.y-point.y)<14+strokeWidth(s)/2)return false;if(prev&&Math.hypot(here.x-prev.x,here.y-prev.y)<240&&pointDistance(point,prev,here)<14+strokeWidth(s)/2)return false}prev=here}return true
 });redraw();
}
function begin(e){
 if(e.currentTarget!==surface?.svg||mode==='view'||gesture||multiTouch||!e.isPrimary||(e.pointerType==='mouse'&&e.button!==0))return;
 closePanel();e.preventDefault();geometry();const point=localPoint(e),anchor=nearestAnchor(point,surface.anchors);if(!anchor)return;
 surface.svg.setPointerCapture(e.pointerId);gesture={id:e.pointerId,key:surface.key,svg:surface.svg,anchors:surface.anchors,pointerType:e.pointerType,before:clone(book),start:point,last:point,stroke:mode==='eraser'?null:{tool:mode,color,width,points:[anchor]}};
 if(mode==='eraser')erase(point);else redraw();
}
function move(e){
 if(!gesture||e.currentTarget!==gesture.svg||e.pointerId!==gesture.id)return;e.preventDefault();const point=localPoint(e);
 if(!gesture.stroke){const dist=Math.hypot(point.x-gesture.last.x,point.y-gesture.last.y),steps=Math.max(1,Math.ceil(dist/8));for(let i=1;i<=steps;i++)erase({x:gesture.last.x+(point.x-gesture.last.x)*i/steps,y:gesture.last.y+(point.y-gesture.last.y)*i/steps});gesture.last=point;return}
 const s=gesture.stroke;if(s.tool==='line'){
  s.points=[];const n=Math.max(1,Math.ceil(Math.hypot(point.x-gesture.start.x,point.y-gesture.start.y)/6));for(let i=0;i<=n;i++){const a=nearestAnchor({x:gesture.start.x+(point.x-gesture.start.x)*i/n,y:gesture.start.y+(point.y-gesture.start.y)*i/n},gesture.anchors);if(a)s.points.push(a)}
 }else if(s.points.length<12000){const d=Math.hypot(point.x-gesture.last.x,point.y-gesture.last.y);if(d<2)return;const n=Math.max(1,Math.ceil(d/8));for(let i=1;i<=n&&s.points.length<12000;i++){const a=nearestAnchor({x:gesture.last.x+(point.x-gesture.last.x)*i/n,y:gesture.last.y+(point.y-gesture.last.y)*i/n},gesture.anchors);if(a)s.points.push(a)}}
 gesture.last=point;redraw();
}
function finishGesture(cancel=false){
 if(!gesture)return;const g=gesture;gesture=null;
 if(cancel){book=g.before;redraw();return}
 if(g.stroke){pinStroke(g.stroke,g.anchors);(book.surfaces[g.key]||=[]).push(g.stroke);try{validate(book)}catch{book=g.before;toast('這份筆記已達容量上限，請先存檔。');redraw();return}}
 if(JSON.stringify(g.before.surfaces)!==JSON.stringify(book.surfaces))remember(g.before);redraw();
}
function beforeChange(){document.querySelectorAll('[data-ink-action="paint"]').forEach(b=>penPresses.get(b)?.cancel());finishGesture(true);closePanel();setMode('view');surface?.light?.destroy();surface?.observer?.disconnect();surface?.svg.remove();surface=null}
function refresh(){
 finishGesture(true);surface?.light?.destroy();surface?.observer?.disconnect();surface?.svg.remove();surface=null;activateLesson(document.body.dataset.lesson==='lesson9'?'lesson9':'lesson8');setupTools();
 const dialog=document.getElementById('lesson-note'),root=dialog.open?dialog.querySelector('.note-paper'):document.querySelector('.continuous-board');
 if(!root){syncMode();return}
 const key=dialog.open?'note:'+dialog.dataset.note:book.lesson;
 if(key.startsWith('note:'))root.querySelectorAll('h1,h3,p,.takeaway,img,figcaption').forEach((el,i)=>el.dataset.inkBlock='b'+i);
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('ink-layer');svg.setAttribute('aria-hidden','true');root.append(svg);surface={root,key,svg,anchors:new Map()};surface.light=createLightPen(root);
 svg.addEventListener('pointerdown',begin);svg.addEventListener('pointermove',move);svg.addEventListener('pointerup',e=>{if(gesture?.svg===svg&&gesture.id===e.pointerId){move(e);finishGesture()}});svg.addEventListener('pointercancel',e=>{if(gesture?.svg===svg&&gesture.id===e.pointerId)finishGesture(true)});svg.addEventListener('lostpointercapture',e=>{if(gesture?.svg===svg&&gesture.id===e.pointerId)finishGesture(true)});
 const observer=new ResizeObserver(()=>{if(surface?.svg===svg)redraw()});observer.observe(root);surface.observer=observer;root.querySelectorAll('img').forEach(img=>img.addEventListener('load',()=>{if(surface?.svg===svg)redraw()},{once:true}));redraw();syncMode();
}
// Light follows contact only. Coordinates stay local to the visible reading surface.
function createLightPen(root){
 const canvas=document.createElement('canvas');canvas.className='light-pen-layer';canvas.hidden=true;canvas.setAttribute('aria-hidden','true');root.append(canvas);
 const ctx=canvas.getContext('2d');let frame=0,points=[],head=null,started=0,radius=21.25;
 const local=e=>{const r=root.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
 const stop=()=>{cancelAnimationFrame(frame);frame=0;points=[];head=null;canvas.hidden=true;root.classList.remove('light-pen-held');ctx.clearRect(0,0,canvas.width,canvas.height)};
 const paint=now=>{
  if(!head)return;
  ctx.clearRect(0,0,canvas.width,canvas.height);points=points.filter(p=>now-p.t<460);
  // Short connected segments taper and fade toward the oldest point.
  for(let i=1;i<points.length;i++){
   const a=points[i-1],b=points[i],life=Math.max(0,1-(now-b.t)/460);
   ctx.strokeStyle=`rgba(28,203,67,${life*.42})`;ctx.lineWidth=Math.max(1,radius*1.35*life);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
  }
  const breath=.68+.17*Math.sin((now-started)*Math.PI*2/1800);
  const glow=ctx.createRadialGradient(head.x,head.y,0,head.x,head.y,radius);
  glow.addColorStop(0,`rgba(110,255,125,${breath})`);glow.addColorStop(.55,`rgba(20,218,60,${breath})`);glow.addColorStop(.8,`rgba(8,176,49,${breath*.55})`);glow.addColorStop(1,'rgba(8,176,49,0)');
  ctx.fillStyle=glow;ctx.beginPath();ctx.arc(head.x,head.y,radius,0,Math.PI*2);ctx.fill();frame=requestAnimationFrame(paint);
 };
 const binding=bindLightPen(root,{
  allowed:()=>mode==='view'&&!panel&&!multiTouch,
  show:e=>{
   stop();const scale=Math.min(window.devicePixelRatio||1,2),w=root.clientWidth,h=root.clientHeight;
   canvas.width=Math.ceil(w*scale);canvas.height=Math.ceil(h*scale);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(scale,0,0,scale,0,0);
   radius=(parseFloat(document.querySelector('.continuous-board')?.style.fontSize)||85)/4;
   started=performance.now();head=local(e);points=[{...head,t:started}];canvas.hidden=false;root.classList.add('light-pen-held');frame=requestAnimationFrame(paint);
  },
  move:e=>{
   const next=local(e),now=performance.now(),dist=Math.hypot(next.x-head.x,next.y-head.y);
   if(dist>1){points.push({...next,t:now});if(points.length>240)points.shift()}head=next;
  },
  hide:stop
 });
 return {stop:binding.stop,destroy(){binding.destroy();stop();canvas.remove()}};
}
// A pinch can begin on the paper and end on another element. Observe both
// contacts before the drawing layer handles them, including while erasing.
const touchContacts=new Set();
let multiTouch=false;
document.addEventListener('pointerdown',e=>{
 if(e.pointerType!=='touch')return;
 touchContacts.add(e.pointerId);
 if(touchContacts.size>1||!e.isPrimary){
  multiTouch=true;
  if(gesture?.pointerType==='touch')finishGesture(true);
  surface?.light?.stop();
 }
},true);
function releaseTouch(e){
 if(e.pointerType==='touch'){
  touchContacts.delete(e.pointerId);
  if(!touchContacts.size)multiTouch=false;
 }
}
document.addEventListener('pointerup',releaseTouch,true);
document.addEventListener('pointercancel',releaseTouch,true);
function interruptInput(){
 touchContacts.clear();multiTouch=false;
 surface?.light?.stop();finishGesture(true);
}
window.addEventListener('blur',interruptInput);
window.lessonInk={beforeChange,refresh};
window.addEventListener('pagehide',()=>{interruptInput();saveLocal()});
document.addEventListener('visibilitychange',()=>{if(document.hidden){interruptInput();saveLocal()}});
document.fonts?.ready.then(()=>{if(surface)redraw()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel){e.preventDefault();e.stopImmediatePropagation();closePanel()}else if(e.key==='Escape'&&mode!=='view'){e.preventDefault();e.stopImmediatePropagation();setMode('view')}},true);
})();
