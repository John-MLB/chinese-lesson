/* Lesson 9: teacher-supplied textbook pages 94–97. 【】 marks blue print only. */
(() => {
'use strict';
const FONT=85, BLUE='#005ead';
const sections=[
 {id:'text',title:'課文',icon:'▤',description:'請到我的家鄉來',ready:true},
 {id:'write',title:'我會寫字',icon:'✎',description:'準備中'},
 {id:'recognize',title:'我會認字',icon:'字',description:'準備中'},
 {id:'words',title:'認識詞語',icon:'詞',description:'準備中'},
 {id:'revise',title:'我會修改句子',icon:'改',description:'準備中'}
];
const countries=[
 {name:'泰國',page:94,lines:[
  '請到我的家鄉來，我的家鄉是「千',
  '【佛】之國」的【泰國】。這裡到處都能見到【廟】，',
  '每一座都【華麗】清靜。每一個信奉佛教的男',
  '人，都要出家當【和尚】一段時間，連國王也',
  '是如此。到了泰國，一定要【逛逛】水上市',
  '場。市場的生意【往來】從清晨五點就開始，',
  '幾百條小船載著日用品、水果等，一片熱',
  '鬧景象。來吧，請到我的家鄉來！'
 ],pictures:[
  {caption:'寺廟',src:0,box:[1584,124,239,207],clips:[[1584,124,222,157],[1738,168,85,159]]},
  {caption:'和尚',src:0,box:[1352,124,215,157]},
  {caption:'水上市場',src:0,box:[1115,124,217,157]}
 ]},
 {name:'埃及',page:95,lines:[
  '請到我的家鄉來，我的家鄉是五千',
  '年古國【埃及】。這裡的國土大部分是沙漠，',
  '氣候又乾又熱，幸好有【尼羅河】緩緩流過，',
  '為南北土地帶來一些水量。首都開羅就在',
  '尼羅河旁，來到這裡可以看見世界聞名的',
  '金字塔，最大的金字塔有五萬多平方公',
  '尺，一百三十七公尺高。來吧，請到我的',
  '家鄉來！'
 ],pictures:[
  {caption:'獅身人面像及金字塔',src:0,box:[75,124,269,157]},
  {caption:'尼羅河',src:0,box:[361,124,292,157]},
  {caption:'沙漠',src:0,box:[674,124,264,198],clips:[[674,124,238,157],[837,147,101,175]]},
  {caption:'埃及插圖',src:0,box:[30,438,239,390]}
 ]},
 {name:'荷蘭',page:96,lines:[
  '請到我的家鄉來，',
  '我的家鄉是【地勢低窪】的荷蘭。這裡的',
  '國土有三分之一在海平面之下，所以',
  '要【築堤防潮】，風車就是當初為了排水',
  '出海而建造的。在這種土地多低於海',
  '平面、水氣重的地方，穿上木頭做的',
  '鞋子行走最合適了。荷蘭也叫「花之',
  '王國」，人們喜歡種花，【鬱金香】和水',
  '仙都是知名的特產。來吧，請到我的',
  '家鄉來！'
 ],pictures:[
  {caption:'風車和鬱金香',src:1,box:[1024,647,970,394],clips:[[1024,647,306,394],[1330,746,664,295]],wide:true},
  {caption:'木鞋',src:1,box:[1808,972,180,105]},
  {caption:'荷蘭服飾插圖',src:1,box:[1910,487,87,194]}
 ]},
 {name:'奧地利',page:97,lines:[
  '請到我的家鄉來，我的家鄉',
  '是音樂國度奧地利，許多世界上',
  '有名的音樂家，都曾經在這裡居',
  '住過。這裡的男女老少都喜愛音',
  '樂，國土雖然不大，卻充滿歡樂',
  '的【氣息】。每年到了音樂節，常有',
  '大量的外國觀光客前來，在河上',
  '【划船】，在山上滑雪。來吧，請到',
  '我的家鄉來！'
 ],pictures:[
  {caption:'阿爾卑斯山',src:1,box:[102,222,304,166]},
  {caption:'莫札特',src:1,box:[425,222,156,166]},
  {caption:'多瑙河',src:1,box:[600,222,360,223],clips:[[600,222,279,166],[797,247,163,198]]},
  {caption:'滑雪插圖',src:1,box:[89,29,358,169]}
 ]}
];
const imageFiles=['lesson9-pages-94-95.png','lesson9-pages-96-97.png'];
const numerals=['一','二','三','四'];
// Fixed textbook annotations, separate from the teacher's editable ink.
const studyKinds={rhetoric:{label:'修辭　類疊'},cause:{label:'句型　因果'}};
const studyMarks=[
 {id:'thai-opening',p:0,kind:'rhetoric',text:'請到我的家鄉來，我的家鄉是「千佛之國」的泰國。'},
 {id:'thai-ending',p:0,kind:'rhetoric',text:'來吧，請到我的家鄉來！'},
 {id:'egypt-opening',p:1,kind:'rhetoric',text:'請到我的家鄉來，我的家鄉是五千年古國埃及。'},
 {id:'egypt-climate',p:1,kind:'rhetoric',text:'氣候又乾又熱'},
 {id:'egypt-ending',p:1,kind:'rhetoric',text:'來吧，請到我的家鄉來！'},
 {id:'dutch-opening',p:2,kind:'rhetoric',text:'請到我的家鄉來，我的家鄉是地勢低窪的荷蘭。'},
 {id:'dutch-cause',p:2,kind:'cause',text:'這裡的國土有三分之一在海平面之下，所以要築堤防潮，風車就是當初為了排水出海而建造的。'},
 {id:'dutch-ending',p:2,kind:'rhetoric',text:'來吧，請到我的家鄉來！'},
 {id:'austrian-opening',p:3,kind:'rhetoric',text:'請到我的家鄉來，我的家鄉是音樂國度奧地利，'},
 {id:'austrian-ending',p:3,kind:'rhetoric',text:'來吧，請到我的家鄉來！'}
];
function tokensForLesson(){
 const tokens=[];
 countries.forEach((country,p)=>{
  const plain=country.lines.join('').replace(/[【】]/g,'');
  const ranges=studyMarks.filter(m=>m.p===p).map(m=>({...m,start:plain.indexOf(m.text)}));
  let offset=0;
  const markAt=i=>ranges.find(m=>i>=m.start&&i<m.start+m.text.length);
  tokens.push({type:'start',p});
  tokens.push({type:'indent',p,number:1,id:`p${p}-l0-indent`});
  country.lines.forEach((line,l)=>{
   if(l){const mark=markAt(offset);tokens.push({type:'number',p,number:l+1,id:`p${p}-l${l}-number`,mark:mark&&mark===markAt(offset-1)?mark.id:null})}
   let blue=false,c=0;
   for(const char of line){if(char==='【'){blue=true;continue}if(char==='】'){blue=false;continue}const mark=markAt(offset++);tokens.push({type:'char',p,char,blue,id:`p${p}-l${l}-c${c++}`,mark:mark?mark.id:null})}
  });
 });return tokens;
}
// Occupied image cells are omitted from the vertical reading flow. Tokens retain
// textbook anchors even when the available screen size changes the page breaks.
function paginate(width,height){
 const rows=Math.max(3,Math.floor((height-20)/FONT));
 const cols=Math.max(1,Math.floor((width-54)/(FONT*1.44)));
 const pitch=(width-54)/cols,rowHeight=(height-20)/rows;
 const pictureCols=Math.max(1,Math.min(cols-1,Math.round(cols*.43)));
 const pictureRows=Math.min(rows-2,Math.max(2,Math.round(rows*.6)));
 const tokens=tokensForLesson(),pages=[];let at=0;
 while(at<tokens.length){
  const page={cells:[],picture:null,rows,cols,pitch,rowHeight,pictureCols,pictureRows};let slot=0;
  const occupied=s=>page.picture!==null&&Math.floor(s/rows)>=cols-pictureCols&&s%rows>=rows-pictureRows;
  while(at<tokens.length&&slot<rows*cols){
   const t=tokens[at];
   if(t.type==='start'){
    // Put the country gallery beside its opening, unless this page is already
    // carrying another gallery or has passed the first reserved picture cell.
    const firstReserved=(cols-pictureCols)*rows+rows-pictureRows;
    if(page.picture!==null||slot>firstReserved-2)break;
    page.picture=t.p;at++;continue;
   }
   if(occupied(slot)){slot++;continue}
   const span=t.type==='indent'?2:1;
   if(span===2&&(slot%rows===rows-1||occupied(slot+1))){slot++;continue}
   page.cells.push({...t,col:Math.floor(slot/rows),row:slot%rows,span});slot+=span;at++;
  }
  pages.push(page);
 }
 return pages;
}
// Split a marked passage only at actual columns/page breaks. No tokens are added,
// so existing pagination and saved pen anchors retain their original positions.
function studySegments(page){
 const segments=[];
 for(const cell of page.cells){
  if(!cell.mark)continue;
  const last=segments[segments.length-1];
  if(last&&last.id===cell.mark&&last.col===cell.col&&last.row+last.span===cell.row)last.span+=cell.span;
  else segments.push({id:cell.mark,col:cell.col,row:cell.row,span:cell.span});
 }
 const seen=new Set();
 return segments.map(s=>{const mark=studyMarks.find(m=>m.id===s.id),label=!seen.has(s.id);seen.add(s.id);return {...s,kind:mark.kind,label}});
}
function studyMarkup(page){
 return studySegments(page).map(s=>{
  const right=24+s.col*page.pitch,top=10+s.row*page.rowHeight;
  const band=`<span class="lesson9-study-band ${s.kind}" aria-hidden="true" style="right:${right}px;top:${top}px;width:${FONT*1.12}px;height:${s.span*page.rowHeight}px"></span>`;
  const labelTop=Math.min(top,10+page.rows*page.rowHeight-134);
  return band+(s.label?`<span class="lesson9-study-label ${s.kind}" data-study-mark="${s.id}" style="right:${right-24}px;top:${labelTop}px">${studyKinds[s.kind].label}</span>`:'');
 }).join('');
}
function crop(picture){const id='crop-'+picture.src+'-'+picture.box[0];return `<svg viewBox="${picture.box.join(' ')}" role="img" aria-label="${picture.caption}" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="${id}">${(picture.clips||[picture.box]).map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</clipPath></defs><image href="${imageFiles[picture.src]}" width="2048" height="1176" clip-path="url(#${id})"/></svg>`}
function gallery(p){
 const c=countries[p];return `<div class="country-gallery-title">${c.name}</div><div class="country-pictures count-${c.pictures.length}">${c.pictures.map((pic,i)=>`<figure class="country-picture ${pic.wide?'wide':''}" data-token="p${p}-image${i}">${crop(pic)}<figcaption>${pic.caption}</figcaption></figure>`).join('')}</div>`;
}
function catalogue(){return `<section class="lesson9-catalogue"><p class="kicker">第三單元・第九課</p><h1>請到我的家鄉來</h1><div class="lesson9-menu">${sections.map((s,i)=>`<a class="card ${s.ready?'current':''}" href="#lesson9-${s.id}${s.ready?'-1':''}"><span class="lesson9-card-icon" aria-hidden="true">${s.icon}</span><span class="number">0${i+1}</span><h2>${s.title}</h2><p>${s.description}${s.ready?' →':''}</p></a>`).join('')}</div></section>`}
function placeholder(id){const s=sections.find(s=>s.id===id);return s?`<p class="kicker">第九課・請到我的家鄉來</p><h1>${s.title}</h1><div class="empty"><p>這個部分準備中。</p></div><a class="button" href="#lesson9">回第九課目錄</a>`:catalogue()}
function reader(){return `<div class="reading-toolbar"><h1>請到我的家鄉來</h1><span class="lesson9-source">課本第94～97頁</span></div><div class="continuous-board lesson9-board" data-lesson="lesson9" aria-label="第九課課文，由右至左直排，藍色為本課語詞"></div><nav class="reading-pager" aria-label="課文翻頁"><span id="reading-count" class="small" aria-live="polite"></span></nav>`}
function layout(anchor){
 const board=document.querySelector('.lesson9-board');if(!board)return;
 lessonInk.beforeChange();board.style.fontSize=FONT+'px';
 const pages=paginate(board.clientWidth,board.clientHeight);
 const requested=(Number(location.hash.split('-')[2])||1)-1;
 const anchored=anchor?pages.findIndex(page=>page.cells.some(t=>t.id===anchor)):-1;
 const index=anchored>=0?anchored:Math.max(0,Math.min(requested,pages.length-1)),page=pages[index];
 board.innerHTML=studyMarkup(page)+page.cells.map(t=>{
  const style=`right:${24+t.col*page.pitch}px;top:${10+t.row*page.rowHeight}px;width:${FONT*1.12}px;height:${page.rowHeight*t.span}px`;
  if(t.type==='char')return `<span class="lesson9-cell flow-cell" style="${style}" data-token="${t.id}"><span class="flow-char ${t.blue?'learning-word':''}">${t.char}</span></span>`;
  return `<span class="lesson9-cell ${t.type==='indent'?'flow-indent':'flow-number-slot'}" data-token="${t.id}" style="${style}" ${t.type==='indent'?'aria-label="段首空兩個全型字"':''}><span class="inline-number" aria-label="課本第${t.number}行">${t.number}</span>${t.type==='indent'?`<span class="flow-paragraph-label">第${numerals[t.p]}段</span>`:''}</span>`;
 }).join('');
 if(page.picture!==null){
  const figure=document.createElement('aside');figure.className='country-gallery';figure.setAttribute('aria-label',countries[page.picture].name+'的課本圖片');
  figure.style.cssText=`left:12px;bottom:10px;width:${page.pictureCols*page.pitch-18}px;height:${page.pictureRows*page.rowHeight-14}px`;
  figure.innerHTML=gallery(page.picture);board.append(figure);
 }
 document.getElementById('reading-count').textContent=`${index+1} / ${pages.length}`;
 for(const suffix of ['', '-right']){
  const prev=document.getElementById('reading-prev'+suffix),next=document.getElementById('reading-next'+suffix);
  prev.disabled=index===0;next.disabled=index===pages.length-1;
  prev.onclick=()=>location.hash='lesson9-text-'+index;next.onclick=()=>location.hash='lesson9-text-'+(index+2);
 }
 if(anchor)history.replaceState(history.state,'','#lesson9-text-'+(index+1));
 lessonInk.refresh();return index+1;
}
const api={sections,countries,tokensForLesson,paginate,studyMarks,studySegments,catalogue,placeholder,reader,layout,FONT,BLUE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else window.lesson9=api;
})();
