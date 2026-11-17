const assert=require('node:assert/strict');
const {validate,pointDistance}=require('./ink.js');
const original={format:'chinese-lesson-notes',version:1,lesson:'lesson8',surfaces:{lesson8:[{tool:'line',color:'#c43d32',width:6,points:[{a:'p0-l0-c0',x:0,y:0},{a:'p0-l0-c1',x:.2,y:.4}]}],'note:sentence':[{tool:'pen',color:'#195fc0',width:3,points:[{a:'b1',x:.4,y:1.2}]}]}};
assert.deepEqual(validate(JSON.parse(JSON.stringify(original))),original);
const mutate=fn=>{const v=structuredClone(original);fn(v);return v};
assert.throws(()=>validate(mutate(v=>v.version=2)));
assert.throws(()=>validate(mutate(v=>v.surfaces.lesson8[0].points[0].x=NaN)));
assert.throws(()=>validate(mutate(v=>v.surfaces.lesson8[0].points[0].a='<img onerror=alert(1)>')));
assert.throws(()=>validate(mutate(v=>v.surfaces.lesson8[0].color='url(https://example.org)')));
assert.throws(()=>validate(mutate(v=>v.surfaces['note:wrong']=[])));
assert.throws(()=>validate(mutate(v=>v.surfaces['sentence']=[])));
assert.throws(()=>validate(mutate(v=>v.surfaces.lesson8[0].points=Array(12001).fill({a:'p0-l0-c0',x:0,y:0}))));
assert.equal(pointDistance({x:5,y:3},{x:0,y:0},{x:10,y:0}),3);
assert.equal(pointDistance({x:-4,y:3},{x:0,y:0},{x:10,y:0}),5);
assert.equal(pointDistance({x:0,y:5},{x:0,y:0},{x:0,y:0}),5);
console.log('PASS: editable note round-trip, unsafe/invalid data rejection, eraser geometry');
const {bindPenPress}=require('./ink.js');
function fixture(){const target={},timers=new Map();let seq=0,taps=0,holds=0;const handle=bindPenPress(target,()=>taps++,()=>holds++,fn=>{timers.set(++seq,fn);return seq},id=>timers.delete(id));const e=(x=10,y=10)=>({isPrimary:true,button:0,pointerId:1,clientX:x,clientY:y,detail:1,preventDefault(){}});return {target,handle,e,run:()=>{for(const fn of [...timers.values()])fn();timers.clear()},counts:()=>[taps,holds]}}
{
 const f=fixture();f.target.onpointerdown(f.e());f.target.onpointerup(f.e());f.target.onclick(f.e());f.run();assert.deepEqual(f.counts(),[1,0]);
}
{
 const f=fixture();f.target.onpointerdown(f.e());f.run();f.target.onpointerup(f.e());f.target.onclick(f.e());assert.deepEqual(f.counts(),[0,1]);f.target.onpointerdown(f.e());f.target.onpointerup(f.e());f.target.onclick(f.e());assert.deepEqual(f.counts(),[1,1]);
}
{
 const f=fixture();f.target.onpointerdown(f.e());f.target.onpointermove(f.e(50,50));f.run();f.target.onpointerup(f.e());f.target.onclick(f.e());assert.deepEqual(f.counts(),[0,0]);
}
{
 const f=fixture();f.target.onpointerdown(f.e());f.target.onpointercancel();f.run();f.target.onclick(f.e());assert.deepEqual(f.counts(),[0,0]);f.target.onclick({...f.e(),detail:0});assert.deepEqual(f.counts(),[1,0]);
}
{
 const f=fixture();f.target.onpointerdown(f.e());f.handle.cancel();f.run();assert.deepEqual(f.counts(),[0,0]);
}
console.log('PASS: short tap, long hold, release suppression, move/cancel and keyboard click');
const {bindLightPen}=require('./ink.js');
function lightFixture(){
 const events={};let enabled=true,captured=null,shows=0,moves=0,hides=0;
 const root={addEventListener:(n,f)=>events[n]=f,removeEventListener:n=>delete events[n],setPointerCapture:id=>captured=id,hasPointerCapture:id=>captured===id,releasePointerCapture:()=>captured=null};
 const handle=bindLightPen(root,{allowed:()=>enabled,show:()=>shows++,move:()=>moves++,hide:()=>hides++});
 const e=(extra={})=>({pointerId:1,isPrimary:true,button:0,target:{closest:()=>null},preventDefault(){},...extra});
 return {events,handle,e,enable:v=>enabled=v,counts:()=>[shows,moves,hides],captured:()=>captured};
}
{
 const f=lightFixture();f.events.pointermove(f.e());assert.deepEqual(f.counts(),[0,0,0]);
 f.events.pointerdown(f.e());f.events.pointermove(f.e());assert.deepEqual(f.counts(),[1,1,0]);assert.equal(f.captured(),1);
 f.events.pointerup(f.e({pointerId:2}));assert.deepEqual(f.counts(),[1,1,0]);
 f.events.pointerup(f.e());f.events.pointermove(f.e());assert.deepEqual(f.counts(),[1,1,1]);assert.equal(f.captured(),null);
}
{
 const f=lightFixture();f.enable(false);f.events.pointerdown(f.e());f.enable(true);
 f.events.pointerdown(f.e({target:{closest:()=>({})}}));f.events.pointerdown(f.e({button:2}));f.events.pointerdown(f.e({isPrimary:false}));assert.deepEqual(f.counts(),[0,0,0]);
 f.events.pointerdown(f.e());f.events.pointercancel(f.e());assert.deepEqual(f.counts(),[1,0,1]);
 f.events.pointerdown(f.e());f.events.lostpointercapture(f.e());assert.deepEqual(f.counts(),[2,0,2]);
 f.events.pointerdown(f.e());f.enable(false);f.events.pointermove(f.e());assert.deepEqual(f.counts(),[3,0,3]);
 f.enable(true);f.events.pointerdown(f.e());f.handle.destroy();assert.deepEqual(f.counts(),[4,0,4]);assert.equal(Object.keys(f.events).length,0);
}
console.log('PASS: light contact/release, drag, control exclusion, drawing exclusion and cancellation cleanup');
