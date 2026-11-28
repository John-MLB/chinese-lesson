/* Text and line breaks transcribed from the teacher's textbook, pp. 106–117. */
(() => {
'use strict';

const unitIntro = '神燈巨人、行色匆匆的兔子先生、善良的小精靈……真是奇妙！讓我們一起坐上想像力的飛毯，翱翔在奇幻的魔法世界。';
const lessons = [
 ['第十課','奇幻旋律','lamp','本課用詩歌的形式，介紹三個神奇的事物。奇幻的物品「唱出」自己的神奇，組合成一首《一千零一夜》的奇幻主題曲。'],
 ['第十一課','兔子先生等等我','rabbit','利用劇本的形式，描述愛麗絲為了追一隻拿著懷錶的兔子，不小心掉進兔子洞的冒險歷程，以及面對種種困境的危機與轉機。'],
 ['第十二課','老鞋匠和小精靈','shoe','以童話的形式，敘述勤奮的老鞋匠夫婦在生活貧困時，得到小精靈的幫助，因為懂得感恩與回饋，讓彼此都得到幸福與喜悅。']
];
const story = '一千零一夜是阿拉伯世界的民間故事，內容充滿天馬行空的奇幻色彩。本課有能快速上天下地的飛天魔毯、會聽暗號而開門的黃金洞穴，還有幫助人類達成願望的神奇油燈，他們會如何「唱出」自己的神奇之處呢？';
const stanzas = [
 ['一',109,'moon',['上下左右轉轉轉！','東西南北變變變！','中東世界雖遙遠，','【奇幻】【旋律】在耳邊……。']],
 ['二',110,'carpet',['輕輕薄薄身子【扁】，','上天下地一轉眼。','坐上來吧！快一點！','我載你離開危險，','【一瞬間】來到天邊。','一起遨遊！','千山萬水來【體驗】。','一同飛翔！','美好風光到眼前。']],
 ['三',111,'cave',['頭硬硬，【牙】尖尖。','「【芝麻】芝麻請開門！」','聽到暗語我張嘴。','小心！別讓【大盜】發現。','【邁開】大步走向前，','黃金閃閃一大片。','只怕你','心思一轉起貪念，','【困】在我的肚裡面。']],
 ['四',112,'genie',['鼻尖尖，臉圓圓，','沉睡洞裡數千年，','祕密等你來發現。','揉揉【臉龐】【搓】鼻尖，','神燈巨人就出現，','報答恩情送心願。','山珍海味、','【榮華富貴】……','說吧！說吧！為你實現！']],
 ['五',113,'finale',['前後古今轉轉轉！','分秒時刻變變變！','中東再也不遙遠，','奇幻旋律已傳【遍】。']]
];
const sections = [
 ['text-1','課文','▤','故事便利貼與五段詩'],
 ['write','我會寫字','✎','本課生字與筆順'],
 ['recognize','我會認字','字','認識有「扁」的字'],
 ['words','認識詞語','詞','和山、水有關的四字詞語'],
 ['listen','我會聆聽','聽','看圖聽故事']
];
// Definitions are adapted from the matching Moedict entries for this passage.
const words = {
 奇幻:['ㄑㄧˊ ㄏㄨㄢˋ','離奇又帶有幻想色彩。','故事裡的魔毯能飛上天空，展開一趟奇幻旅程。'],
 旋律:['ㄒㄩㄢˊ ㄌㄩˋ','高低、長短不同的音依節奏連起來，成為一段曲調。','這首歌的旋律很好記，我聽完就能哼出來。'],
 扁:['ㄅㄧㄢˇ','形狀寬而薄。','我把黏土壓扁，再用模具壓出星星。'],
 一瞬間:['ㄧˋ ㄕㄨㄣˋ ㄐㄧㄢ','非常短的時間。','煙火在一瞬間照亮了夜空。'],
 體驗:['ㄊㄧˇ ㄧㄢˋ','親自經歷並感受。','我們到農場體驗採番茄的樂趣。'],
 牙:['ㄧㄚˊ','嘴裡用來咬碎、咀嚼食物的器官。','小狗張開嘴，露出兩排白白的牙。'],
 芝麻:['ㄓ ˙ㄇㄚ','胡麻的別名，種子小而扁，可以食用或榨油。','奶奶在飯糰上撒了一些黑芝麻。'],
 大盜:['ㄉㄚˋ ㄉㄠˋ','強行搶走別人財物的人。','故事裡的大盜躲在山洞裡，守著搶來的寶物。'],
 邁開:['ㄇㄞˋ ㄎㄞ','跨出、踏出腳步。','聽到哨聲，選手便邁開大步往前跑。'],
 困:['ㄎㄨㄣˋ','陷在某個地方或處境，難以離開。','暴雨讓登山隊困在山屋裡。'],
 臉龐:['ㄌㄧㄢˇ ㄆㄤˊ','臉蛋、面容。','夕陽照在妹妹的臉龐上。'],
 搓:['ㄘㄨㄛ','用手反覆揉、摩擦。','天氣好冷，他搓了搓雙手取暖。'],
 榮華富貴:['ㄖㄨㄥˊ ㄏㄨㄚˊ ㄈㄨˋ ㄍㄨㄟˋ','形容很有財富，也有很高的地位。','國王過著榮華富貴的生活，住在華麗的宮殿裡。'],
 遍:['ㄅㄧㄢˋ','到處都是；在「傳遍」裡指傳到各處。','好消息很快傳遍了整個校園。']
};

function art(file, description, cls='') {
 return `<img src="${file}.webp" alt="${description}" class="${cls}">`;
}
function unit() {
 return `<div class="hero unit4-hero"><div><p class="kicker">康軒國語・四年級上學期・第四單元</p><h1>魔法變變變</h1><p class="sub">${unitIntro}</p></div></div>
 <div class="cards unit4-cards">${lessons.map(([number,title,image,description],i)=>{
  const contents=`${art('unit4-'+image,'','unit4-icon')}<span class="number">${number}</span><h2><mark>${title}</mark></h2><p>${description}</p>${i===0?'<span class="button primary">進入第十課 →</span>':''}`;
  return i===0?`<a class="card current" href="#lesson10">${contents}</a>`:`<article class="card">${contents}</article>`;
 }).join('')}</div><footer><a href="index.html#home" target="_parent">第三單元・放眼看世界</a></footer>`;
}
function catalogue() {
 return `<section class="lesson9-catalogue"><p class="kicker">第四單元・第十課</p><h1>奇幻旋律</h1><p class="sub">侯詩瑜</p><div class="lesson9-menu">${sections.map(([id,title,icon,description])=>`<a class="card" href="#lesson10-${id}"><span class="lesson9-card-icon" aria-hidden="true">${icon}</span><h2>${title}</h2><p>${description}</p></a>`).join('')}</div></section>`;
}

function markedText(text,page,line,token){
 const chars=[...text.replace(/[【】]/g,'')];
 const blue=[];
 let inBlue=false;
 for(const char of text){
  if(char==='【')inBlue=true;
  else if(char==='】')inBlue=false;
  else blue.push(inBlue);
 }
 const ranges=lesson10Terms.map(([term,p,l,anchor,extra,above],i)=>{
  const start=p===page&&l===line?chars.join('').indexOf(anchor||term):-1;
  return {term,start,length:(anchor||term).length,n:i+1,extra,above};
 }).filter(w=>w.start>=0);
 let result='';
 for(let i=0;i<chars.length;){
  const word=ranges.find(w=>w.start===i);
  const length=word?.length||1;
  const body=chars.slice(i,i+length).map((char,j)=>{
   const group=lesson10Glyphs[char];
   const shape=group&&group[0]===page&&group[1]===line?
    `<button type="button" class="shape-trigger" data-shape="${char}" aria-label="${char}的字音字形辨析" aria-haspopup="dialog"></button>`:'';
   return `<span data-token="${token(i+j)}" class="${shape?'shape-anchor ':''}${blue[i+j]?'study-blue':''}">${char}${shape}</span>`;
  }).join('');
  result+=word?`<span class="study-term">${body}<button class="study-outline" type="button" data-vocab="${word.term}" aria-label="${word.term}，字義與例句" aria-haspopup="dialog"></button><span class="study-number" aria-hidden="true">${word.n}</span>${word.extra?`<small class="study-extra${word.above?' above':''}">${word.extra}</small>`:''}</span>`:body;
  i+=length;
 }
 return result;
}
function lineMarkup(line, stanza, index) {
 const mediaLinks=stanza===1&&index===3
  ? `<div class="lesson10-media"><a href="https://docs.google.com/document/d/1u8ZncBwNWFHqeUYCF2pceQCLBJuj38yuhu3pPdD16po/edit?usp=drivesdk&amp;ouid=108673303949062286007" target="_blank" rel="noopener noreferrer">音樂</a>
    <a href="https://youtu.be/zrWLyjv_JBw" target="_blank" rel="noopener noreferrer">101夜故事影片</a><button type="button" data-middle-east aria-haspopup="dialog">中東世界</button></div>`
  : '';
 return `<div class="verse-line"><small aria-hidden="true">${index+1}</small><div class="verse-text">${stanza===2&&index===0?'<span class="rhetoric-repeat">類疊修辭</span><span class="rhetoric-personify">轉化修辭</span>':''}${markedText(line,108+stanza,index+1,i=>`l${stanza}-r${index}-c${i}`)}</div>${mediaLinks}</div>`;
}
function reader(index) {
 const page = index===0?'108':stanzas[index-1][1];
 const body = index===0
  ? `<div class="story-copy"><h2>故事便利貼</h2><p>${markedText(story,108,undefined,i=>'story-c'+i)}</p></div>`
  : `<div class="lesson10-verse" data-stanza="${index}">${stanzas[index-1][3].map((line,i)=>lineMarkup(line,index,i)).join('')}<h2>（第${stanzas[index-1][0]}段）</h2></div>`;
 const image=index===0?'city':stanzas[index-1][2];
 return `<div class="continuous-board lesson10-reader art-${image}" data-lesson="lesson10" aria-label="${index===0?'故事便利貼':'第'+stanzas[index-1][0]+'段，每欄一句，由右向左閱讀'}">${body}</div><nav class="reading-pager" aria-label="課文翻頁">${page===110?`<div class="rhetoric-buttons"><button type="button" data-rhetoric="repeat" aria-label="類疊修辭" aria-pressed="false">修</button><button type="button" data-rhetoric="personify" aria-label="轉化修辭" aria-pressed="false">修</button></div>`:''}<span class="small">課本 ${page} 頁　｜　${index+1} / 6</span></nav>`;
}
const mountainWords=[
 ['遊山玩水','遊覽山水景致。'],
 ['奇山異水','形勢特殊的山水風景。'],
 ['跋山涉水','形容走長遠路途的艱苦。'],
 ['依山傍水','靠山臨水，形容風景清幽如畫。'],
 ['青山綠水','青綠的山巒和河水，通常指風景秀麗的地方。']
];
function practice(id) {
 const title=sections.find(s=>s[0]===id)[1];
 const bodies={
  write:()=>art('lesson10-strokes','十五個生字的筆順圖','stroke-chart')+
   '<p class="visually-hidden">幻、牙、龐、旋、芝、搓、扁、盜、榮、瞬、邁、富、驗、困、遍</p>',
  recognize:()=>`<p class="practice-lead">念一念，認識有<mark>扁</mark>的字。</p><div class="lesson10-glyphs">${[['扁','ㄅㄧㄢˇ'],['偏','ㄆㄧㄢ'],['編','ㄅㄧㄢ'],['騙','ㄆㄧㄢˋ'],['遍','ㄅㄧㄢˋ'],['篇','ㄆㄧㄢ'],['匾','ㄅㄧㄢˇ'],['翩','ㄆㄧㄢ']].map(([glyph,sound])=>classroomVocabulary.annotatedTitle(glyph,sound)).join('')}</div>
   <p><mark>翩翩</mark>飛起把舞<mark>編</mark>，<br><mark>編</mark>織夢幻如詩<mark>篇</mark>。</p><p>牌<mark>匾</mark>內容已傳<mark>遍</mark>，<br>不<mark>偏</mark>頗也不欺<mark>騙</mark>。</p>`,
  words:()=>`<p class="practice-lead">讀一讀和「山、水」有關的詞語，你有什麼發現呢？</p><p>喜愛大自然的王爺爺，年輕時到處<mark>遊山玩水</mark>。為了探訪各地的<mark>奇山異水</mark>，就算千里迢迢、<mark>跋山涉水</mark>，也樂此不疲。後來，他找到一個<mark>依山傍水</mark>的村落住下來，終日和<mark>青山綠水</mark>相伴，過著逍遙自在的生活。</p><div class="lesson10-word-definitions">${mountainWords.map(([word,def])=>`<p><mark>${word}</mark>　${def}</p>`).join('')}</div><p>你還知道哪些和「山、水」有關的四字詞語呢？說一說這些詞語的意思。</p>`,
  listen:()=>`<p class="practice-lead">看圖聽故事，故事中有許多令人感到不可思議的事物。</p><a class="button primary" href="https://qr.knsh.com.tw/GQ7HZ" target="_blank" rel="noopener noreferrer">開啟課本聆聽音檔 ↗</a><p>一、請和同學分享，在故事中，你發現了哪些奇幻的事物？</p><p>二、想一想，圖四中的人會說什麼呢？</p>${art('lesson10-listen','四格故事圖：洞門、大盜、黃金寶物與神燈巨人','lesson10-listening-art')}`
 };
 const layout=id==='write'?'':` vertical-practice practice-${id}`;
 return `<section class="lesson10-practice${layout}"><h1>${title}</h1>${bodies[id]()}</section>`;
}

const vocabularySupplements={
 旋律:{image:'lesson10-vocab-melody.webp',alt:'孩子敲木琴，音符從琴上跳出來',caption:'把不同的音連成一段曲調',
  fact:'敲響木琴時，琴片會振動。振動越快，聽到的音通常越高。',source:['耶魯教師研究所','https://teachersinstitute.yale.edu/curriculum/units/2000/5/00.05.05/3']},
 一瞬間:{image:'lesson10-vocab-instant.webp',alt:'一顆泡泡在眼前突然破掉',caption:'泡泡一下子就破了',
  fact:'眨一次眼，眼淚就會在眼球表面鋪成薄薄一層，讓眼睛保持溼潤。',source:['美國國家眼科研究所','https://www.nei.nih.gov/eye-health-information/healthy-vision/how-eyes-work/how-tears-work']},
 牙:{image:'lesson10-vocab-teeth.webp',alt:'牙齒插圖，旁邊畫出不同形狀的牙',caption:'牙齒形狀不同，工作也不同',
  fact:'門牙像小刀，能切斷食物。犬齒尖尖的，能撕開食物。後面的臼齒比較寬，能把食物磨碎。',source:['美國牙醫學會','https://www.ada.org/-/media/project/ada-organization/ada/mouthhealthy/files/smile-smarts/ada_watchyourmouth_presentation.pdf']},
 芝麻:{image:'lesson10-vocab-sesame.webp',alt:'芝麻植株、裂開的果實，以及黑芝麻和白芝麻',caption:'芝麻長在細長的果實裡',
  fact:'芝麻籽藏在細長的果實裡。有些芝麻的果實成熟變乾後會裂開，讓芝麻籽掉出來。',source:['芝麻果實研究','https://pmc.ncbi.nlm.nih.gov/articles/PMC5056167/']},
 大盜:{image:'lesson10-vocab-bandit.webp',alt:'故事裡戴眼罩、提布袋的大盜',caption:'故事裡的大盜',
  fact:'指尖有細細的紋路。摸過光滑表面，有時會留下指紋，成為調查線索。',source:['美國司法研究所','https://www.ojp.gov/library/publications/fingerprint-sourcebook-chapter-2-anatomy-and-physiology-adult-friction-ridge']},
 臉龐:{image:'lesson10-vocab-face.webp',alt:'孩子正面微笑，可以看見臉頰和臉的輪廓',caption:'微笑的臉龐',
  fact:'微笑時，臉部的肌肉會把嘴角往上拉。同一張臉能做出許多不同的表情。',source:['克里夫蘭診所','https://my.clevelandclinic.org/health/body/21672-facial-muscles']},
 榮華富貴:{image:'lesson10-cave.webp',alt:'課本故事插圖，山洞裡堆著金銀財寶',caption:'故事中的金銀財寶',
  fact:'故事常用黃金代表財富。純金比較軟，可以敲打成很薄的金箔。',source:['美國地質調查局','https://pubs.usgs.gov/gip/prospect1/goldgip.html']},
 搓:{fact:'兩手來回搓時，摩擦會把一部分動作的能量變成熱，所以手掌會暖起來。',source:['美國物理學會','https://www.aps.org/learning-resources/students/friction-fun']}
};
function vocabulary(term) {
 const [sound,meaning,example,lookup]=lesson10Definitions[term]||words[term];
 const inherited={牙齒:'牙',搓揉:'搓'};
 const note=classroomVocabulary.note(term,sound,meaning,example,vocabularySupplements[inherited[term]||term]);
 if(lookup)note.html=note.html.replace(encodeURIComponent(term),encodeURIComponent(lookup)).replace('>萌典<',`>萌典・${lookup}<`);
 return note;
}
function shapeNote(char){
 const rows=lesson10Glyphs[char][2];
 return {category:'字音字形辨析',title:char,html:`<div class="shape-comparison"><div class="shape-brace" aria-hidden="true"><svg viewBox="0 0 44 22"><path d="M0 17H7Q20 17 22 4Q24 17 37 17H44"/></svg></div><div class="shape-grid">${rows.map(([glyph,sound,...examples])=>`<section><h3>${classroomVocabulary.annotatedTitle(glyph,sound)}</h3>${examples.map(example=>`<p>${example}</p>`).join('')}</section>`).join('')}</div></div>`};
}
function toggleRhetoric(button){
 const stanza=app.querySelector('[data-stanza="2"]');
 const key=button.dataset.rhetoric;
 const active=stanza.classList.toggle('mark-'+key);
 button.setAttribute('aria-pressed',String(active));
}

const app=document.querySelector('#app');
const dialog=document.querySelector('#lesson-note');
const movieDialog=document.querySelector('#middle-east-video');
const movie=movieDialog.querySelector('video');
const movieError=movieDialog.querySelector('[data-video-error]');
let movieOpener=null;
let currentRoute='';

function playMovie(){
 movie.play().catch(()=>{if(movie.error)movieError.hidden=false});
}
movieDialog.querySelector('[data-video-restart]').onclick=()=>{
 movie.currentTime=0;
 playMovie();
};
movieDialog.querySelector('[data-video-close]').onclick=()=>movieDialog.close();
movie.addEventListener('error',()=>{movieError.hidden=false});
movieDialog.addEventListener('close',()=>{
 movie.pause();
 if(movieOpener?.isConnected)movieOpener.focus({preventScroll:true});
 movieOpener=null;
});
function render() {
 const hash=location.hash.slice(1);
 const route=hash==='lesson10-text'?'lesson10-text-1':hash;
 if(route===currentRoute)return;
 currentRoute=route;
 if(route!==hash)history.replaceState(null,'','#'+route);
 lessonInk.beforeChange();
 if(dialog.open)dialog.close();
 if(movieDialog.open)movieDialog.close();
 const match=/^lesson10-text-([1-6])$/.exec(route);
 const index=match?Number(match[1])-1:null;
 const section=route.replace('lesson10-','');
 const isUnit=route==='unit4';
 document.title=(isUnit?'魔法變變變':'奇幻旋律')+'｜國語科備課';
 document.body.classList.toggle('reading-mode',index!==null);
 document.body.classList.toggle('teaching-page',index!==null);
 document.querySelectorAll('[data-menu]').forEach(a=>a.hidden=isUnit||route==='lesson10');
 document.querySelectorAll('[data-step]').forEach(a=>{
  a.hidden=index===null;
  const target=index===null?0:index+1+Number(a.dataset.step);
  a.disabled=target<1||target>6;
  a.onclick=()=>{location.hash='lesson10-text-'+target};
 });
 if(isUnit)app.innerHTML=unit();
 else if(index!==null)app.innerHTML=reader(index);
 else if(sections.some(s=>s[0]===section&&s[0]!=='text-1'))app.innerHTML=practice(section);
 else app.innerHTML=catalogue();
 if(!isUnit)annotateLesson10(app);
 app.scrollTop=0;
 window.scrollTo(0,0);
 lessonInk.refresh();
}

app.addEventListener('click',event=>{
 const opener=event.target.closest('[data-middle-east]');
 if(opener){
  movieOpener=opener;
  movieDialog.showModal();
  playMovie();
  return;
 }
 const rhetoric=event.target.closest('[data-rhetoric]');
 if(rhetoric){toggleRhetoric(rhetoric);return}
 const word=event.target.closest('[data-vocab]');
 const shape=event.target.closest('[data-shape]');
 if(word||shape){
  const term=word?.dataset.vocab;
  const char=shape?.dataset.shape;
  lesson9.openLessonNote('word-'+(term||'字'+char),word||shape,term?vocabulary(term):shapeNote(char),'l10-');
  annotateLesson10(dialog.querySelector('.note-paper'));
  lessonInk.refresh();
 }
});
document.addEventListener('keydown',event=>{
 if(dialog.open||movieDialog.open||event.altKey||event.ctrlKey||event.metaKey||event.target.closest('button,a,input,textarea'))return;
 const step={ArrowLeft:'1',ArrowRight:'-1'}[event.key];
 if(!step)return;
 const button=document.querySelector(`[data-step="${step}"]:not([hidden]):not(:disabled)`);
 if(button){event.preventDefault();button.click()}
});
document.querySelectorAll('body > header,#middle-east-video [data-video-error]').forEach(annotateLesson10);
window.addEventListener('hashchange',render);
window.addEventListener('popstate',render);
render();
})();
