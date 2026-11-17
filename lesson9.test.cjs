const assert=require('node:assert/strict');
const {countries,tokensForLesson,paginate}=require('./lesson9.js');
const {validate,storageKey}=require('./ink.js');
const tokens=tokensForLesson();
const blue=tokens.filter(t=>t.blue).map(t=>t.char).join('');
assert.equal(blue,'佛泰國廟華麗和尚逛逛埃及尼羅河地勢低窪築堤防潮鬱金香划船');
assert.deepEqual(countries.map(c=>c.lines.length),[8,8,10,9]);
for(const [w,h]of [[1660,930],[1200,740],[980,620],[600,500],[240,540],[3490,1950]]){
 const pages=paginate(w,h);
 assert.deepEqual(pages.flatMap(p=>p.cells.map(t=>t.id)),tokens.filter(t=>t.type!=='start').map(t=>t.id),'no lost or duplicated text');
 assert.deepEqual(pages.filter(p=>p.picture!==null).map(p=>p.picture),[0,1,2,3],'all four country galleries');
 for(const page of pages){
  const occupied=new Set();
  for(const cell of page.cells){
   for(let r=cell.row;r<cell.row+cell.span;r++){
    const key=cell.col+':'+r;assert(!occupied.has(key));occupied.add(key);
    assert(r<page.rows&&cell.col<page.cols);
    assert(!(page.picture!==null&&cell.col>=page.cols-page.pictureCols&&r>=page.rows-page.pictureRows),'text must wrap outside the image');
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
console.log('PASS: all textbook lines and blue words; complete pagination, image exclusions, two-character indent; lesson-specific notes');
