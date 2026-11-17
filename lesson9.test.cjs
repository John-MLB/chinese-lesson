const assert=require('node:assert/strict');
const {countries,tokensForLesson,paginate,studyMarks,studySegments}=require('./lesson9.js');
const {validate,storageKey}=require('./ink.js');
const tokens=tokensForLesson();
const blue=tokens.filter(t=>t.blue).map(t=>t.char).join('');
assert.equal(blue,'佛泰國廟華麗和尚逛逛往來埃及尼羅河地勢低窪築堤防潮鬱金香氣息划船');
assert.deepEqual(countries.map(c=>c.lines.length),[8,8,10,9]);
assert.equal(studyMarks.filter(m=>m.kind==='rhetoric').length,9);
assert.equal(studyMarks.filter(m=>m.kind==='cause').length,1);
for(const mark of studyMarks){
 const marked=tokens.filter(t=>t.mark===mark.id);
 assert.equal(marked.filter(t=>t.type==='char').map(t=>t.char).join(''),mark.text,'each textbook highlight covers its complete passage');
 assert(marked.every(t=>t.p===mark.p),'highlights stay in the correct paragraph');
}
assert.equal(tokens.filter(t=>t.mark==='egypt-climate').map(t=>t.char||'').join(''),'氣候又乾又熱');
assert(tokens.filter(t=>t.type==='indent').every(t=>!t.mark),'paragraph indentation remains blank');
for(const [w,h]of [[1660,930],[1200,740],[980,620],[600,500],[240,540],[3490,1950]]){
 const pages=paginate(w,h);
 assert.deepEqual(pages.flatMap(p=>p.cells.map(t=>t.id)),tokens.filter(t=>t.type!=='start').map(t=>t.id),'no lost or duplicated text');
 assert.deepEqual(pages.filter(p=>p.picture!==null).map(p=>p.picture),[0,1,2,3],'all four country galleries');
 for(const page of pages){
  const segments=studySegments(page),coverage=new Map();
  for(const segment of segments){
   assert(segment.row+segment.span<=page.rows&&segment.col<page.cols);
   for(let row=segment.row;row<segment.row+segment.span;row++){
    const key=segment.col+':'+row;assert(!coverage.has(key));coverage.set(key,segment.id);
   }
  }
  assert.deepEqual(segments.filter(s=>s.label).map(s=>s.id),[...new Set(page.cells.filter(t=>t.mark).map(t=>t.mark))],'every visible marked passage has one nearby label');
  const occupied=new Set();
  for(const cell of page.cells){
   for(let r=cell.row;r<cell.row+cell.span;r++){
    const key=cell.col+':'+r;assert(!occupied.has(key));occupied.add(key);
    assert(r<page.rows&&cell.col<page.cols);
    assert(!(page.picture!==null&&cell.col>=page.cols-page.pictureCols&&r>=page.rows-page.pictureRows),'text must wrap outside the image');
    assert.equal(coverage.get(key)||null,cell.mark||null,'highlight bands cover only their text and inline line numbers');
   }
   if(cell.type==='indent')assert.equal(cell.span,2);
  }
 }
}
const sample={format:'chinese-lesson-notes',version:1,lesson:'lesson9',surfaces:{lesson9:[{tool:'pen',color:'#c43d32',width:3,points:[{a:'p0-l0-c0',x:0,y:0},{a:'p0-image1',x:1,y:1}]}]}};
assert.deepEqual(validate(JSON.parse(JSON.stringify(sample))),sample);
assert.notEqual(storageKey('lesson8'),storageKey('lesson9'));
assert.equal(storageKey('lesson8'),'chinese-lesson-ink-v1','preserve existing notes');
assert.throws(()=>validate({...sample,surfaces:{lesson8:sample.surfaces.lesson9}}));
assert.throws(()=>validate({...sample,surfaces:{'note:sentence':sample.surfaces.lesson9}}));
console.log('PASS: textbook lines, blue words, ten labeled highlight ranges across pagination; image exclusions, two-character indent; lesson-specific notes');
const {words,glyphs,pictureNotes,noteContent}=require('./lesson9.js');
assert.equal(words.length,14);assert.equal(glyphs.length,10);
assert(tokens.filter(t=>t.blue).every(t=>words.some(w=>w.id===t.word)),'every blue character opens a dictionary entry');
assert.deepEqual(tokens.filter(t=>t.wordStart).map(t=>t.word),words.map(w=>w.id));
assert.equal(tokens.filter(t=>t.glyph).length,10,'exactly ten textbook arrows, no duplicate on 逛逛');
for(const g of glyphs)assert.equal(tokens.find(t=>t.glyph===g.id).char,g.target);
const noteIds=[...words.map(w=>'word-'+w.id),...glyphs.map(g=>'glyph-'+g.id),...pictureNotes.flatMap((list,p)=>list.map((_,i)=>`picture-${p}-${i}`))];
assert.equal(noteIds.length,38);
for(const [p,c]of countries.entries())assert.equal(pictureNotes[p].length,c.pictures.length,'every textbook picture has a popup');
for(const w of words){assert.equal(w.examples.length,2);assert(w.lookup.length>0);assert(noteContent('word-'+w.id).html.includes('https://www.moedict.tw/'))}
for(const id of noteIds){
 const content=noteContent(id);assert(content?.title&&content?.html.includes('<details'),'all explanations include their sources');
 const saved={...sample,surfaces:{['note:l9-'+id]:[{tool:'pen',color:'#c43d32',width:3,points:[{a:'b0',x:.5,y:.5}]}]}};
 assert.deepEqual(validate(JSON.parse(JSON.stringify(saved))),saved,'new popup notes survive saving and reopening');
 assert.throws(()=>validate({...saved,lesson:'lesson8'}),'popup notes cannot cross lessons');
}
assert.equal(noteContent('picture-0-3'),null);
assert.equal(noteContent('word-unknown'),null);
assert.throws(()=>validate({...sample,surfaces:{'note:l9-word-unknown':[]}}));
console.log('PASS: 14 word entries / 28 original examples, 14 picture introductions, 10 character groups; 38 popup note round-trips and cross-lesson rejection');
