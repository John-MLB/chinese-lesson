const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const callbacks={},messages=[],routes=[];
const viewport={clientWidth:1920,clientHeight:1080};
const frame={style:{},contentWindow:{postMessage:(...args)=>messages.push(args)}};
const location={origin:'https://example.test',pathname:'/chinese-lesson/',search:'',hash:'#lesson9-text-3'};
vm.runInNewContext(fs.readFileSync('classroom-shell.js','utf8'),{
 document:{documentElement:viewport,getElementById:id=>{assert.equal(id,'classroom');return frame}},
 window:{addEventListener:(name,fn)=>callbacks[name]=fn},
 ResizeObserver:class{constructor(fn){this.fn=fn}observe(){}},location,
 history:{state:null,replaceState:(...args)=>routes.push(args)}
});
assert.equal(frame.src,'classroom.html?v=20261124-4#lesson9-text-3');
for(const [w,h] of [[1920,1080],[1920,940],[1280,720],[768,1024],[1366,768]]){
 Object.assign(viewport,{clientWidth:w,clientHeight:h});callbacks.resize();
 const [x,y,s]=frame.style.transform.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/g).map(Number);
 assert(s>0&&1536*s<=w+.001&&864*s<=h+.001);
 assert(x===0 && Math.abs(parseFloat(frame.style.width)*s-w)<.001&&Math.abs(2*y+864*s-h)<.001);
 // Text and handwriting share the same transform; neither layout nor URL changes.
 const text={x:800,y:450},ink={x:870,y:460};
 assert(Math.abs(((x+ink.x*s)-(x+text.x*s))/s-70)<1e-8);
 assert(Math.abs(((y+ink.y*s)-(y+text.y*s))/s-10)<1e-8);
 assert.equal(frame.src,'classroom.html?v=20261124-4#lesson9-text-3');
}
callbacks.message({source:{},origin:location.origin,data:{type:'classroom-route',hash:'#home'}});
callbacks.message({source:frame.contentWindow,origin:'https://untrusted.test',data:{type:'classroom-route',hash:'#home'}});
assert.equal(routes.length,0);
callbacks.message({source:frame.contentWindow,origin:location.origin,data:{type:'classroom-route',hash:'#lesson9-text-4'}});
assert.equal(routes[0][2],'/chinese-lesson/#lesson9-text-4');
callbacks.hashchange();assert.equal(messages[0][0].hash,'#lesson9-text-3');
const html=fs.readFileSync('classroom.html','utf8');
assert(!/data-fullscreen|requestFullscreen|exitFullscreen|fullscreenchange/.test(html));
assert(/width:1536px;height:864px/.test(fs.readFileSync('index.html','utf8')));
console.log('PASS: five viewport sizes preserve a single canvas, shared ink/text scaling, route validation, no fullscreen mode');

// A truncated teaching document used to show its toolbar over a blank home page.
assert(html.trimEnd().endsWith('</html>'));
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
assert(scripts.some(([, , body]) => body.includes('function render(')));
for (const [, attributes, body] of scripts) {
  if (!attributes.includes('src=')) new vm.Script(body);
}
const {paginate} = require('./lesson9.js');
const pages = paginate(1352, 719);
assert.equal(pages.length, 8);
assert.equal(pages[2].cells.slice(0, 6).map(cell => cell.char).join(''), '我的家鄉來！');
assert.equal(pages[2].picture, 1);
