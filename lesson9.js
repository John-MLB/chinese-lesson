/* Lesson 9: teacher-supplied textbook pages 94–97. 【】 marks blue print only. */
(() => {
'use strict';
const FONT=85, BLUE='#005ead';
const sections=[
 {id:'text',title:'課文',icon:'▤',description:'請到我的家鄉來',ready:true},
 {id:'write',title:'我會寫字',icon:'✎',description:'準備中'},
 {id:'recognize',title:'我會認字',icon:'字',description:'比較堤、提、題',ready:true},
 {id:'words',title:'認識詞語',icon:'詞',description:'兩組反義詞',ready:true},
 {id:'revise',title:'我會修改句子',icon:'改',description:'找出用錯的詞',ready:true}
];
const practice = {
 recognize: {
  prompt: '比一比，堤、提、題哪裡不一樣？',
  items: [
   {id:'dike', label:'堤', heading:'堤　築堤、河堤', gloss:'ㄊㄧˊ', targets:['堤','河堤'], sentence:'為了修築河堤，卡車運來大量土石。',
    image:'dike', alt:'挖土機和卡車在水邊運送土石', link:'認字妙招', title:'土字旁的「堤」',
    parts:[['看部首','「堤」左邊是「土」。早期常用泥土或石塊築堤擋水，看到「河堤」，可以想想河邊擋水的那道土坡。'],['比一比','堤、提、題在這裡都念ㄊㄧˊ。請用手指指出「堤」的土字旁，再說出一個含有「堤」的詞。']],
    sources:[['教育部《國語辭典簡編本》：堤','https://dict.concised.moe.edu.tw/dictView.jsp?ID=10697&la=0&powerMode=0']]},
   {id:'nomination', label:'提', heading:'提　提名、提早', gloss:'ㄊㄧˊ', targets:['提','提名'], sentence:'班上要選出這學期的模範生，我舉手提名李育興。',
    image:'nomination', alt:'兩位學生在教室舉手', link:'認字妙招', title:'手部的「提」',
    parts:[['用動作記住字形','「提」有提手旁。先做出用手提書袋的動作，再找出「提」左邊和手有關的部件。'],['用詞語記住意思','「提名」是提出人選給大家考慮。「提早」是把時間往前移。早上原定八點出發，改成七點半，就是提早出發。']]},
   {id:'heading', label:'題', heading:'題　題目、標題', gloss:'ㄊㄧˊ', targets:['題','標題'], sentence:'這本書的每一頁都有醒目的標題，幫助我們閱讀時掌握重點。',
    image:'heading', alt:'一本攤開的書，頁面有醒目的標題', link:'認字妙招', title:'右邊有「頁」的「題」',
    parts:[['找部件','「題」右邊有個「頁」。可以用「翻開書頁找標題」這句話幫自己記住字形。'],['從課本找例子','請找出這一課的課名，再找出數學習作上的一道題目。標題告訴你內容大概在說什麼，題目則告訴你要回答什麼。']]}
  ]
 },
 words: {
  prompt: '念一念，每組詞語有什麼不同？',
  items: [
   {id:'appearance', label:'華麗、樸素', heading:'華麗、樸素', targets:['華麗','樸素'], sentence:'這家店販售各類服飾，有華麗珍貴的飾品，也有樸素雅緻的服裝。',
    image:'word-mascot', alt:'捧著書的課本吉祥物', link:'詞義比較', title:'華麗和樸素',
    parts:[['看外表','「華麗」形容外表亮眼、有許多裝飾。「樸素」形容外表簡單大方。'],['請學生說說看','一件上衣縫著閃亮的亮片，另一件上衣是素色的。你會用哪個詞形容它們？你是從哪裡看出來的？'],['反義詞有什麼用？','把意思相反的詞放在一起比較，能把事物的特點說得更清楚。']]},
   {id:'atmosphere', label:'清靜、熱鬧', heading:'清靜、熱鬧', targets:['清靜','熱鬧'], sentence:'你想去清靜幽雅的鄉村度假，還是造訪熱鬧繁華的都市？',
    image:'city-and-village', alt:'左邊是高樓林立的都市，右邊是田野和房屋', link:'詞義比較', title:'清靜和熱鬧',
    parts:[['聽聲音、看人群','「清靜」讓人感覺安靜、少受打擾。「熱鬧」常是人多、聲音多，活動也多。'],['換個情境試試','閱讀時間的圖書館很清靜。下課時的操場很熱鬧。同一個地方也會改變，像是平日清靜的廟埕，廟會那天可能很熱鬧。']],
    sources:[['教育部《國語辭典簡編本》：清靜','https://dict.concised.moe.edu.tw/dictView.jsp?ID=25619'],['教育部《國語辭典簡編本》：熱鬧','https://dict.concised.moe.edu.tw/dictView.jsp?ID=35928']] }
  ]
 },
 revise: {
  prompt: '紅框裡的詞用錯了，想一想為什麼。',
  items: [
   {id:'cause', label:'第一題', targets:['然後'], sentence:'荷蘭的國土有三分之一在海平面之下，然後要築堤防潮。',
    answer:'荷蘭的國土有三分之一在海平面之下，所以要築堤防潮。',
    image:'windmills', alt:'荷蘭水岸的風車、房屋和鬱金香', link:'看訂正', title:'把「然後」改成「所以」',
    parts:[['先問為什麼','為什麼要築堤防潮？因為有些國土在海平面之下。前半句是原因，後半句是因此採取的做法，可以用「所以」接起來。'],['想想「然後」何時用','「然後」適合說順序。例如「我先打開課本，然後翻到第九課。」']]},
   {id:'purpose', label:'第二題', targets:['只有'], sentence:'風車就是當初只有排水出海而建造的。',
    answer:'風車就是當初為了排水出海而建造的。',
    image:'windmills', alt:'荷蘭水岸的風車、房屋和鬱金香', link:'看訂正', title:'把「只有」改成「為了」',
    parts:[['找出目的','當初建造風車想做什麼？想把水排到海裡。要說明做這件事的目的，可以用「為了」。'],['想想「只有」何時用','「只有」表示限定。例如「書包裡只有一本書」。換你用「為了……而……」說一個句子。']]}
  ]
 }
};
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
// Teacher-facing explanations are bundled locally; opening one never leaves the lesson.
const words=[
 {id:'buddha',term:'佛',sound:'ㄈㄛˊ',lookup:['佛','佛陀'],meaning:'「佛陀」的簡稱。佛教用這個稱呼，指明白人生道理、解開煩惱的人。課文的「千佛之國」是形容泰國與佛教關係密切。',examples:['這座寺廟裡有一尊金色的佛像。','奶奶到寺廟禮佛時，我在一旁安靜等候。']},
 {id:'thailand',term:'泰國',sound:'ㄊㄞˋ ㄍㄨㄛˊ',lookup:['泰國'],meaning:'位於東南亞的國家，在中南半島的中部。',examples:['叔叔從泰國旅行回來，帶了一包芒果乾給我。','我在地圖上找到泰國，也看了看它附近有哪些國家。']},
 {id:'temple',term:'廟',sound:'ㄇㄧㄠˋ',lookup:['廟'],meaning:'供奉神明或佛像，讓人參拜的建築。',examples:['過年時，爸爸帶我們到附近的廟裡祈福。','這座廟的屋頂有許多精美的雕刻。']},
 {id:'splendid',term:'華麗',sound:'ㄏㄨㄚˊ ㄌㄧˋ',lookup:['華麗'],meaning:'漂亮又有光彩，裝飾十分豐富。',examples:['演員穿著華麗的服裝，一走上舞臺就吸引了大家的目光。','這座宮殿有金色的大門和彩色的屋頂，看起來十分華麗。']},
 {id:'monk',term:'和尚',sound:'ㄏㄜˊ ㄕㄤˋ',lookup:['和尚'],meaning:'日常生活中，常用來稱呼出家修行的男性佛教徒。',examples:['參觀寺廟時，一位和尚向我們介紹殿堂裡的佛像。','這位和尚說話很溫和，大家都專心聽他講解。']},
 {id:'stroll',term:'逛逛',sound:'ㄍㄨㄤˋ ㄍㄨㄤˋ',lookup:['逛'],meaning:'悠閒地走走、看看。「逛逛水上市場」就是到市場裡走走，看看有哪些東西。',examples:['晚飯後，我和家人到夜市逛逛。','這家書店有好多新書，我想進去逛逛。']},
 {id:'dealings',term:'往來',sound:'ㄨㄤˇ ㄌㄞˊ',lookup:['往來'],meaning:'有來有去，也可以指人與人之間的交往。課文的「生意往來」，是指買賣東西時的交易。',examples:['這家水果店和附近的果園一直有生意往來。','搬家以後，我們還是常和以前的鄰居往來。']},
 {id:'egypt',term:'埃及',sound:'ㄞ ㄐㄧˊ',lookup:['埃及'],meaning:'主要位於非洲東北部的國家，還有一部分國土在亞洲的西奈半島。',examples:['我最想去埃及看看金字塔。','讀完介紹埃及的書，我對尼羅河更好奇了。']},
 {id:'nile',term:'尼羅河',sound:'ㄋㄧˊ ㄌㄨㄛˊ ㄏㄜˊ',lookup:['尼羅河'],meaning:'非洲的一條大河，流經埃及，最後流入地中海。河水對沿岸居民的生活和耕種很重要。',examples:['老師請我們在地圖上找出尼羅河流經的地方。','讀了課文，我才知道尼羅河對埃及人這麼重要。']},
 {id:'lowland',term:'地勢低窪',sound:'ㄉㄧˋ ㄕˋ ㄉㄧ ㄨㄚ',lookup:['地勢','低窪'],meaning:'「地勢」是地面高低起伏的樣子；「低窪」是比四周低。合起來就是土地的位置比較低，容易積水。',examples:['這一帶地勢低窪，下大雨時容易積水。','因為公園的一角地勢低窪，工人正在那裡改善排水。']},
 {id:'dike',term:'築堤防潮',sound:'ㄓㄨˊ ㄊㄧˊ ㄈㄤˊ ㄔㄠˊ',lookup:['築','堤','防','潮'],meaning:'「築」是建造；「堤」是擋水的堤岸；「防」是防備；「潮」是潮水。合起來就是建造堤岸，防止潮水侵入。',examples:['海邊的居民築堤防潮，希望保護自己的家園。','這片土地比海面低，因此人們需要築堤防潮。']},
 {id:'tulip',term:'鬱金香',sound:'ㄩˋ ㄐㄧㄣ ㄒㄧㄤ',lookup:['鬱金香'],meaning:'一種供人欣賞的開花植物。花朵像杯子，有紅、黃、白、紫等顏色，地下長著像小球的鱗莖。',examples:['花園裡的鬱金香開了，有紅色，也有黃色。','妹妹把鬱金香畫成一個個漂亮的小杯子。']},
 {id:'atmosphere',term:'氣息',sound:'ㄑㄧˋ ㄒㄧˊ',lookup:['氣息'],meaning:'萌典收錄呼吸時進出的空氣、氣味等意思。在課文裡，「歡樂的氣息」是延伸用法，指讓人感到快樂的氣氛。',examples:['園遊會上到處都是笑聲，充滿歡樂的氣息。','教室掛起彩帶，立刻多了幾分過節的氣息。']},
 {id:'rowing',term:'划船',sound:'ㄏㄨㄚˊ ㄔㄨㄢˊ',lookup:['划船'],meaning:'用槳撥動水，讓船前進。',examples:['爸爸教我划船，先示範怎麼握住船槳。','大家一起用力划船，小船慢慢靠近岸邊。']}
];
const glyphs=[
 {id:'buddha',target:'佛',kind:'形近字',hint:'左邊換了部件，字義和讀音也會改變。',items:[['佛','ㄈㄛˊ','佛教','左邊是「亻」（人字旁）。'],['拂','ㄈㄨˊ','吹拂','左邊是「扌」（提手旁）。'],['沸','ㄈㄟˋ','沸騰','左邊是「氵」（三點水）。']]},
 {id:'terrain',target:'勢',kind:'形近字',hint:'看清楚字的下半部。',items:[['勢','ㄕˋ','地勢','下面是「力」。'],['熱','ㄖㄜˋ','熱情','下面是「灬」（四點底）。']]},
 {id:'prevent',target:'防',kind:'形近字',hint:'右邊都是「方」，要看左邊。',items:[['防','ㄈㄤˊ','防止','左邊是「阝」（左耳旁）。'],['妨','ㄈㄤˊ','妨礙','左邊是「女」。']]},
 {id:'dike',target:'堤',kind:'形近字',hint:'都有「是」這個部件，搭配的另一部分不同。',items:[['堤','ㄊㄧˊ','河堤','左邊是「土」。'],['提','ㄊㄧˊ','提早','左邊是「扌」（提手旁）。'],['題','ㄊㄧˊ','題目','右邊是「頁」。']]},
 {id:'row',target:'划',kind:'形近字',hint:'都有「戈」，留意另一個部件的位置。',items:[['划','ㄏㄨㄚˊ','划船','右邊是「刂」（立刀旁）。'],['伐','ㄈㄚ','步伐','左邊是「亻」（人字旁）。']]},
 {id:'egypt',target:'埃',kind:'形近字',hint:'右邊都是「矣」，左邊的部件不同。',items:[['埃','ㄞ','埃及','左邊是「土」。'],['唉','ㄞ','唉唷','左邊是「口」。'],['挨','ㄞ','挨近','左邊是「扌」（提手旁）。']]},
 {id:'thai',target:'泰',kind:'形近字',hint:'上半部很像，要特別看下面。',items:[['泰','ㄊㄞˋ','泰國','下面是「水」的變形。'],['秦','ㄑㄧㄣˊ','秦朝','下面是「禾」。'],['奉','ㄈㄥˋ','奉獻','下面是兩橫加一直，不要多寫撇、捺。'],['奏','ㄗㄡˋ','彈奏','下面是「天」。']]},
 {id:'stroll',target:'逛',kind:'形近字',hint:'「逛」比「狂」多了走之旁。',items:[['逛','ㄍㄨㄤˋ','逛街','外面有「辶」（走之旁）。'],['狂','ㄎㄨㄤˊ','狂歡','左邊是「犭」，沒有走之旁。']]},
 {id:'tide',target:'潮',kind:'形近字',hint:'「潮」「嘲」都含有「朝」，但左邊的部件不同。',items:[['潮','ㄔㄠˊ','潮汐','左邊是「氵」（三點水）。'],['朝','ㄔㄠˊ','朝廷','沒有另外加三點水或口字旁。'],['嘲','ㄔㄠˊ','嘲笑','左邊是「口」。']]},
 {id:'hua',target:'華',kind:'多音字',hint:'同一個字，放在不同詞語裡，讀音可能不同。',items:[['華','ㄏㄨㄚˊ','華麗','這裡讀二聲，形容漂亮、有光彩。'],['華','ㄏㄨㄚˋ','華佗','作為這個姓氏時讀四聲。華佗是東漢時的一位名醫。']]}
];
const pictureNotes=[
 [
  {title:'泰國寺廟',paragraphs:['寺廟是佛教徒禮佛、誦經和學習佛法的地方。在泰國，寺廟也是許多人生活中的重要場所。不同寺廟的屋頂、佛像和裝飾，各有自己的特色。','參觀時要穿著整齊，輕聲說話。進入殿堂前，依照現場規定脫鞋，也要尊重正在參拜的人。'],sources:[['泰國觀光局','https://www.tatnews.org/2018/08/observing-temple-and-sacred-site-etiquette-while-in-thailand/']]},
  {title:'泰國和尚',paragraphs:['圖中穿著橘色僧袍的人是佛教僧人，也就是課文說的和尚。他們學習佛教，也會誦經、靜坐。靜坐時，人們讓身體安定下來，練習觀察自己的心。','在泰國，有人會準備食物供養僧人，表達尊敬與分享。有些寺廟也會安排活動，讓人認識佛教和當地文化。'],sources:[['泰國觀光局','https://tourismthailand.my/home/religion']]},
  {title:'水上市場',paragraphs:['水上市場裡，有些攤販把小船當作攤位，載著水果、蔬菜或食物來做生意。買東西的人可以沿著岸邊逛，也能在有些市場搭船遊覽。','這種市場讓我們看見水邊居民的生活：河道不只是風景，也是運送物品、與人往來的道路。不同市場的營業時間並不相同。'],sources:[['泰國觀光局','https://www.tourismthailand.org/Trip-Planner/Suggestion-Detail/2-days-1-night-recommended-route-in-samut-songkhram']]}
 ],
 [
  {title:'獅身人面像與金字塔',paragraphs:['獅身人面像有獅子的身體和人的頭。古埃及人用這種形象表現國王的力量。巨大的石像，也讓我們看見古人的雕刻技術。','附近的金字塔是古埃及國王的陵墓，也就是安葬國王的地方。許多石塊堆疊成巨大的建築，留下了古埃及文明的重要線索。'],sources:[['埃及觀光與古蹟部','https://egymonuments.gov.eg/en/monuments/the-great-sphinx/'],['哈佛大學 Digital Giza','https://giza.fas.harvard.edu/gizaintro/']]},
  {title:'尼羅河',paragraphs:['埃及許多地方雨水很少，尼羅河因此十分重要。人們把河水引到田裡種植作物，河水讓乾燥土地上的生活有了依靠。','在古代，尼羅河氾濫後留下肥沃的泥土，讓河岸適合耕種。因此，許多古埃及人住在河流附近，形成一個個村莊與城市。'],sources:[['大英博物館：尼羅河谷的農業','https://artsandculture.google.com/story/kAWxk-YaOyfgJw?hl=en']]},
  {title:'埃及沙漠',paragraphs:['沙漠是雨水很少的地方，植物不容易生長。埃及的沙漠不全都是沙子：有起伏的沙丘，也有黑色岩石和形狀特別的白色岩石。','沙漠中有些地方能找到水源，形成綠洲。綠洲裡可以看到樹木和農作物。水源在哪裡，往往會影響人們住在哪裡。'],sources:[['埃及官方旅遊網站','https://www.experienceegypt.eg/en/city/31/oase-farafra']]},
  {title:'埃及插圖：法老與駱駝',paragraphs:['這張插圖集合了幾種埃及印象，例如金字塔、法老和駱駝。「法老」是古埃及國王的稱呼。你能在圖裡找到哪些與課文有關的事物？','駱駝適合在乾燥地區行走，寬大的腳掌有助於在沙地移動，也能幫人載運物品。牠的駝峰儲存的是脂肪，並不是裝水的水壺。'],sources:[['萌典：法老','https://www.moedict.tw/法老'],['聖地牙哥動物園','https://animals.sandiegozoo.org/animals/camel']]}
 ],
 [
  {title:'荷蘭風車與鬱金香',paragraphs:['荷蘭有些土地很低，古人利用風力帶動風車，把多餘的水抽走，讓土地可以居住或耕種。有些風車則用來磨穀物、鋸木頭，工作各不相同。','春天時，鬱金香田開出各種顏色的花，遠看像鋪上彩色地毯。風車與鬱金香，都是人們想到荷蘭時常會想到的景物。'],sources:[['荷蘭官方旅遊網站：風車','https://www.holland.com/global/tourism/experience/dutch-icons/windmills-in-the-netherlands'],['荷蘭官方旅遊網站：春天','https://www.holland.com/global/tourism/travel-essentials-1/interests/season/spring']]},
  {title:'荷蘭木鞋',paragraphs:['木鞋是用木頭做成的傳統工作鞋，通常由一整塊木頭雕成。堅硬的鞋身能保護雙腳，適合在潮溼、泥濘的地方工作。','有些木鞋會畫上鮮豔花紋，成為旅客喜歡的紀念品。如今，部分農場或工廠工作者仍會穿木鞋，但不是每個荷蘭人每天都穿它。'],sources:[['英國雷丁博物館','https://collections.readingmuseum.org.uk/pdfs/G140A.pdf']]},
  {title:'荷蘭傳統服飾',paragraphs:['圖中的帽子、裙子和圍裙，讓人想到荷蘭的傳統服飾。不同地方的帽子形狀、衣服花色可能不一樣，過去能從服裝看出一個人的家鄉。','傳統服飾也會隨著時代改變。今天，我們可以到博物館認識這些衣服，了解以前的生活；它們不是所有荷蘭人現在每天穿的服裝。'],sources:[['荷蘭弗里斯博物館','https://www.friesmuseum.nl/en/collection/icons/fries-kostuum-met-gouden-oorijzer']]}
 ],
 [
  {title:'阿爾卑斯山',paragraphs:['阿爾卑斯山是一大片相連的山脈，不是只有一座山。奧地利有許多地方位在這片山區，可以看到高山、森林、草地和湖泊。','季節不同，山裡的活動也不同。夏天有人健行、觀察自然，冬天則有人到雪地滑雪。這些山林景色，也是奧地利吸引旅客的原因。'],sources:[['奧地利國家旅遊局','https://www.austria.info/en-us/inspiration/alps/']]},
  {title:'莫札特',paragraphs:['莫札特是出生在薩爾斯堡的作曲家。作曲家就像音樂的作者，會把想到的旋律寫成樂譜，讓別人也能演奏。','莫札特很小就跟父親學音樂，也和姊姊一起到不同城市表演。他創作過許多音樂作品，包括歌劇《魔笛》。直到今天，人們仍然演奏、欣賞他的音樂。'],sources:[['國際莫札特基金會','https://mozarteum.at/en/wolfgang-amade-mozart']]},
  {title:'多瑙河',paragraphs:['多瑙河是歐洲的重要河流，從德國出發，流經奧地利等國家，最後流入黑海。在奧地利，河流大致由西往東流，沿岸有城市、村莊與自然風景。','旅客可以搭船欣賞兩岸，也能沿著河岸騎腳踏車。看著地圖追蹤河流，會發現一條河可以把不同地方連在一起。'],sources:[['奧地利國家旅遊局','https://www.austria.info/en-us/regions/danube/']]},
  {title:'滑雪',paragraphs:['插圖中的長板是滑雪板，細長的桿子是滑雪杖。奧地利有高山和雪地，滑雪是當地受歡迎的冬季活動之一。','滑雪時需要保持平衡，也要學習轉彎和停下來。選擇適合自己能力的雪道，戴好安全帽，並且注意前方與旁邊的人，才能安心享受雪地活動。'],sources:[['奧地利國家旅遊局','https://www.austria.info/en-us/inspiration/skiing-and-winter/']]}
 ]
];
// Teacher-added links use existing character anchors; they do not occupy a text
// cell or change page breaks / saved handwriting positions. p and l are zero-based.
const readingLinks=[
 {id:'video-thailand',kind:'video',p:0,l:1,phrase:'泰國。',offset:2,title:'認識泰國',href:'https://youtu.be/I9kaasea5rA'},
 {id:'knowledge-monkhood',kind:'knowledge',p:0,l:4,phrase:'是如此。',offset:3,title:'為什麼要短期出家？'},
 {id:'knowledge-monarchy',kind:'knowledge',p:0,l:3,phrase:'國王',offset:0,title:'泰國國王的地位與權力'},
 {id:'knowledge-market',kind:'knowledge',p:0,l:5,phrase:'場。',offset:0,title:'水上市場怎麼做生意？'},
 {id:'video-egypt',kind:'video',p:1,l:1,phrase:'埃及',offset:1,title:'認識埃及',href:'https://youtu.be/4k_13OmWNSE'},
 {id:'video-nile',kind:'video',p:1,l:2,phrase:'尼羅河',offset:1,title:'認識尼羅河',href:'https://youtu.be/zaxh11eRXTE'},
 {id:'video-pyramids',kind:'video',p:1,l:5,phrase:'金字塔',offset:1,title:'認識金字塔',href:'https://youtu.be/qOlnIF6z2mA'},
 {id:'video-windmill-drainage',kind:'video',p:2,l:3,phrase:'排水',offset:1,side:'right',title:'風車排水',href:'https://youtu.be/yvqwVCr4hz4'},
 {id:'video-wooden-shoes',kind:'video',p:2,l:6,phrase:'鞋子',offset:1,title:'荷蘭木鞋',href:'https://youtu.be/zonXkZ6KAKU'},
 {id:'video-flowers',kind:'video',p:2,l:7,phrase:'鬱金香和水',offset:4,title:'鬱金香和水仙旁的補充影片',href:'https://www.youtube.com/watch?v=Kl6jLVZVQx0'},
 {id:'video-austria',kind:'video',p:3,l:1,phrase:'奧地利，',offset:3,title:'奧地利旁的補充影片',href:'https://www.youtube.com/watch?v=Kl6jLVZVQx0'},
 {id:'knowledge-music-festival',kind:'knowledge',p:3,l:5,phrase:'音樂節',offset:2,title:'奧地利的音樂節'}
];
function readingLinkAnchor(link){
 const line=countries[link.p]?.lines[link.l]?.replace(/[【】]/g,'')||'',start=line.indexOf(link.phrase);
 return start<0?null:`p${link.p}-l${link.l}-c${start+link.offset}`;
}
const knowledgeNotes={
 monkhood:{title:'為什麼要短期出家？',summary:'課文介紹的是一種傳統習俗，並不是每一位泰國男性都一定會出家。',parts:[
  ['為什麼要出家一段時間？','在泰國，許多信奉佛教的男性，會在成年後到寺廟住一段時間。他們學習佛法，也就是佛教的道理，並遵守寺廟的生活規矩，練習讓自己安定下來。'],
  ['有什麼意義？','許多家庭相信，出家修行可以累積功德，為家人帶來福報。兒子也藉此感謝父母的養育。對一些人來說，這也是學習自律、負起責任的一段成長過程。'],
  ['要出家多久？','傳統上，常配合雨季，在寺廟住大約三個月。現在，有人出家一週、十五天或一個月，依自己的時間安排，沒有每個人都相同的天數。結束後可以「還俗」，也就是恢復一般人的生活。'],
  ['連國王也做過嗎？','有。例如，泰國的蒲美蓬國王，也稱為拉瑪九世，曾在一九五六年出家十五天，學習佛法，也表達對父母的感謝。']
 ],sources:[['Thailand Foundation：短期出家的傳統與時間','https://thailandfoundation.or.th/th/buat-nak-rituals-before-monkhood/'],['德國之聲：為什麼許多泰國男性短期出家','https://amp.dw.com/en/thailand-why-many-men-become-short-term-monks/a-66363802'],['泰國 KMUTT 大學圖書館：拉瑪九世出家十五天','https://www.lib.kmutt.ac.th/en/king-ramaix-chapter15/']]},
 monarchy:{title:'泰國國王的地位與權力',summary:'泰國保留國王，也有憲法、國會和政府。國王有正式職權，也有實際的政治影響力。',parts:[
  ['為什麼泰國會有國王？','泰國有很長的王室歷史。過去，國王掌握統治國家的大權。一九三二年，泰國改變政治制度，保留王室，但由憲法規定國王和政府的職責，這叫「君主立憲」。'],
  ['國王的地位如何？','國王是「國家元首」，也就是在制度上代表國家的人。他在國家的歷史和宗教生活中有重要地位，許多泰國人民尊敬王室。憲法也賦予國王特殊的地位與保護。'],
  ['誰處理國家的大小事？','日常國政主要由總理領導政府處理，國會負責制定法律。國王也有憲法規定的職權，例如依照程序，任命經眾議院同意的人選為總理。眾議院是國會的一部分。'],
  ['他有實際的政治權力嗎？','有正式職權，也有重要影響力。王室與軍方的關係密切，對泰國政治有相當影響。因此，了解泰國時，要一起看憲法怎麼規定，以及王室、政府和軍方實際上怎麼互動。']
 ],sources:[['泰國外交部：一九三二年的制度改變','https://www.mfa.go.th/en/page/complete-independence'],['泰國憲法譯本：第 3、6、158 條等','https://www.constituteproject.org/constitution/Thailand_2017?lang=en'],['自由之家：泰國國王的政治與軍事影響（2025 年報告）','https://freedomhouse.org/country/thailand/freedom-world/2025']]},
 market:{title:'水上市場怎麼做生意？',summary:'以前，河道就像道路，小船就像運貨的車子。水上市場和水邊居民的生活有密切關係。',parts:[
  ['為什麼市場會在水上？','泰國中部有許多河流和運河。以前，很多人住在水邊，利用船隻出門、運送農產品。大家把東西載到河道交會或人多的地方買賣，慢慢形成水上市場。'],
  ['賣東西的人怎麼賣？','有些攤販把水果、蔬菜和食物放在小船上，把船當成攤位；有些甚至在船上煮食物。水邊也有店家和攤位，所以水上市場不只有船。'],
  ['買東西的人怎麼買？','顧客可以在岸邊逛，也可以搭船靠近攤販。看好東西、問清楚價錢後，再付款、拿商品。例如，船靠近賣水果的攤販，就可以買一袋水果。'],
  ['有什麼特色？','船隻來來往往，船上有各種食物，岸邊有店家，買東西也像在認識水邊的生活。現在，有些水上市場也吸引許多旅客。各市場的時間不同，有的清早熱鬧，有的傍晚才熱鬧；不是全部都在清晨五點開市。']
 ],sources:[['泰國觀光局：丹嫩莎朵水上市場的由來','https://www.tourismthailand.org/Attraction/damnoen-saduak-floating-market'],['泰國觀光局：早市與晚市的不同風貌','https://www.tourismthailand.org/Articles/floating-market-en'],['泰國觀光目錄：搭船逛水上市場','https://www.thailandtourismdirectory.go.th/en/attraction/1358']]},
 'music-festival':{title:'奧地利的音樂節',summary:'音樂節就像一場音樂盛會，在一段時間內安排許多表演，讓大家一起欣賞。',parts:[
  ['有哪些精彩表演？','奧地利有許多音樂節，其中薩爾茲堡音樂節每年夏天舉行，已有一百多年的歷史。來自世界各地的音樂家齊聚一堂，帶來音樂會、歌劇，也有戲劇演出。歌劇是把故事用歌聲、音樂和表演呈現出來。'],
  ['為什麼吸引旅客？','人們能欣賞莫札特等作曲家的作品，感受現場演奏的魅力。許多外國旅客特地前來，一邊聽音樂，一邊欣賞當地風景，讓旅行充滿藝術的樂趣。']
 ],sources:[['薩爾茲堡音樂節官方介紹','https://www.salzburgerfestspiele.at/en/about-us'],['薩爾茲堡官方旅遊網站：音樂節','https://www.salzburg.info/en/salzburg/salzburg-festival/salzburg-festival']]}
};
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
   let blue=false,c=0,word=null,wordStart=false;
   for(let i=0;i<line.length;i++){
    const char=line[i];
    if(char==='【'){blue=true;word=words.find(w=>w.term===line.slice(i+1,line.indexOf('】',i)));wordStart=true;continue}
    if(char==='】'){blue=false;word=null;continue}
    const mark=markAt(offset++),glyph=blue?glyphs.find(g=>g.target===char):null;
    tokens.push({type:'char',p,char,blue,word:word?.id||null,wordStart:!!word&&wordStart,glyph:glyph&&!tokens.some(t=>t.glyph===glyph.id)?glyph.id:null,id:`p${p}-l${l}-c${c++}`,mark:mark?mark.id:null});wordStart=false;
   }
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
function crop(picture,prefix='crop'){const id=prefix+'-'+picture.src+'-'+picture.box[0];return `<svg viewBox="${picture.box.join(' ')}" role="img" aria-label="${picture.caption}" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="${id}">${(picture.clips||[picture.box]).map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</clipPath></defs><image href="${imageFiles[picture.src]}" width="2048" height="1176" clip-path="url(#${id})"/></svg>`}
function gallery(p){
 const c=countries[p];return `<div class="country-gallery-title">${c.name}</div><div class="country-pictures count-${c.pictures.length}">${c.pictures.map((pic,i)=>`<figure class="country-picture ${pic.wide?'wide':''}" data-token="p${p}-image${i}"><button class="lesson9-picture-link" data-lesson9-note="picture-${p}-${i}" aria-label="認識${pic.caption}" aria-haspopup="dialog">${crop(pic)}</button><figcaption><button data-lesson9-note="picture-${p}-${i}" aria-haspopup="dialog">${pic.caption}</button></figcaption></figure>`).join('')}</div>`;
}
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const moeSources=terms=>terms.map(t=>['萌典：'+t,'https://www.moedict.tw/'+t]);
function sourceMarkup(sources,caption='資料來源（介紹已改寫）'){
 return `<details class="lesson9-note-sources"><summary>${caption}</summary><ul>${sources.map(([label,url])=>`<li><a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a></li>`).join('')}</ul></details>`;
}
function readingLinkMarkup(tokenId){
 return readingLinks.filter(link=>readingLinkAnchor(link)===tokenId).map(link=>{
  const label=link.kind==='video'?'影片':'知識',description=`${label}：${link.title}${link.kind==='video'?'（另開新分頁）':''}`;
  const common=`class="lesson9-reading-link ${link.kind}${link.side==='right'?' on-right':''}" data-reading-link="${link.id}" aria-label="${escapeHTML(description)}" title="${escapeHTML(description)}"`;
  return link.kind==='video'?`<a ${common} href="${escapeHTML(link.href)}" target="_blank" rel="noopener noreferrer">${label}</a>`:`<button type="button" ${common} data-lesson9-note="${link.id}" aria-haspopup="dialog">${label}</button>`;
 }).join('');
}
function noteContent(id){
 if(id.startsWith('practice-')){
  const item=Object.values(practice).flatMap(section=>section.items).find(item=>'practice-'+item.id===id);
  if(!item)return null;
  const answer=item.answer?`<p class="takeaway">${escapeHTML(item.answer)}</p>`:'';
  const explanation=item.parts.map(([heading,body])=>`<h3>${escapeHTML(heading)}</h3><p>${escapeHTML(body)}</p>`).join('');
  return {category:item.link,title:item.title,html:answer+explanation+(item.sources?sourceMarkup(item.sources,'字義查考：教育部《國語辭典簡編本》'):'')};
 }
 if(id.startsWith('knowledge-')){
  const n=knowledgeNotes[id.slice('knowledge-'.length)];if(!n)return null;
  return {category:'延伸知識',title:n.title,html:`<p class="takeaway">${n.summary}</p>${n.parts.map(([heading,text])=>`<h3>${heading}</h3><p>${text}</p>`).join('')}${sourceMarkup(n.sources)}`};
 }
 if(id.startsWith('word-')){
  const w=words.find(w=>id==='word-'+w.id);if(!w)return null;
  return {category:'認識詞語',title:w.term,html:`<p class="lesson9-pronunciation">${w.sound}</p><h3>課文中的意思</h3><p class="takeaway">${w.meaning}</p><h3>一起讀例句</h3>${w.examples.map((s,i)=>`<p class="lesson9-example"><span>${i+1}.</span> ${s}</p>`).join('')}${sourceMarkup(moeSources(w.lookup),'字義查考：萌典；例句為自編')}`};
 }
 if(id.startsWith('glyph-')){
  const g=glyphs.find(g=>id==='glyph-'+g.id);if(!g)return null;
  return {category:g.kind,title:g.kind==='多音字'?g.target:g.items.map(i=>i[0]).join('・'),html:`<p class="takeaway">${g.hint}</p><div class="lesson9-glyph-list">${g.items.map(([char,sound,word,hint])=>`<section class="lesson9-glyph-card"><p class="lesson9-glyph"><span>${char}</span><small>${sound}</small></p><div><h3>${word}</h3><p>${hint}</p></div></section>`).join('')}</div>${sourceMarkup(moeSources([...new Set(g.items.map(i=>i[0]))]),'字表依課本；讀音查考：萌典')}`};
 }
 const match=/^picture-([0-3])-([0-3])$/.exec(id);
 if(match){const p=Number(match[1]),i=Number(match[2]),n=pictureNotes[p][i];if(!n)return null;
  return {category:'看圖認識世界',title:n.title,html:`<figure class="lesson9-note-picture">${crop(countries[p].pictures[i],'note-crop')}<figcaption>${countries[p].pictures[i].caption}</figcaption></figure>${n.paragraphs.map(s=>`<p>${s}</p>`).join('')}${sourceMarkup(n.sources)}`};
 }
 return null;
}
let noteOpener=null;
function closeLessonNote(){
 const dialog=document.getElementById('lesson-note');if(!dialog.dataset.lesson9Note)return;
 lessonInk.beforeChange();dialog.close();dialog.classList.remove('lesson9-note');delete dialog.dataset.lesson9Note;
 const token=noteOpener?.closest('[data-token]')?.dataset.token;
 const id=noteOpener?.dataset.lesson9Note;
 resizeReading(token);
 lessonInk.refresh();
 const opener=noteOpener?.isConnected?noteOpener:document.querySelector(`[data-token="${token}"] [data-lesson9-note="${id}"]`);
 opener?.focus({preventScroll:true});noteOpener=null;
}
function openLessonNote(id,opener){
 const content=noteContent(id);if(!content)return;
 const dialog=document.getElementById('lesson-note');lessonInk.beforeChange();noteOpener=opener;
 dialog.dataset.note='l9-'+id;dialog.dataset.lesson9Note=id;dialog.classList.add('lesson9-note');
 const destination=opener.classList.contains('practice-note-link')?'練習':'課文';
 const close=side=>`<div class="note-controls note-controls-${side}"><button class="note-close" data-lesson9-close aria-label="${side==='left'?'左':'右'}側關閉解說，返回${destination}" title="關閉解說，返回${destination}"><span aria-hidden="true">×</span></button></div>`;
 dialog.innerHTML=`<div class="note-header"><p>老師補充</p></div><div class="note-middle"><nav class="note-tools" data-ink-side="left" aria-label="解說左側畫筆工具"></nav><div class="note-content" tabindex="0" role="region" aria-label="解說內容，可上下捲動"><div class="note-paper"><p class="kicker">${content.category}</p><h1 id="note-title">${content.title}</h1><div class="board">${content.html}</div></div></div><nav class="note-tools" data-ink-side="right" aria-label="解說右側畫筆工具"></nav></div><div class="note-footer">${close('left')}<span class="lesson9-return-hint">關閉後，回到原來的${destination}</span>${close('right')}</div>`;
 dialog.querySelectorAll('[data-lesson9-close]').forEach(b=>b.onclick=closeLessonNote);
 if(!dialog.open)dialog.showModal();dialog.querySelector('.note-content').scrollTop=0;lessonInk.refresh();
 dialog.querySelector('[data-lesson9-close]').focus({preventScroll:true});
}
// Capture only our dialogs; Lesson 8 keeps its existing history-based modal flow.
if(typeof document!=='undefined'){
 const dialog=document.getElementById('lesson-note');
 dialog?.addEventListener('cancel',event=>{if(dialog.dataset.lesson9Note){event.preventDefault();event.stopImmediatePropagation();closeLessonNote()}},true);
 dialog?.addEventListener('close',()=>{if(!dialog.open){dialog.classList.remove('lesson9-note');delete dialog.dataset.lesson9Note;noteOpener=null}});
}
function catalogue(){return `<section class="lesson9-catalogue"><p class="kicker">第三單元・第九課</p><h1>請到我的家鄉來</h1><div class="lesson9-menu">${sections.map((s,i)=>`<a class="card ${s.ready?'current':''}" href="#lesson9-${s.id}${s.ready?'-1':''}"><span class="lesson9-card-icon" aria-hidden="true">${s.icon}</span><span class="number">0${i+1}</span><h2>${s.title}</h2><p>${s.description}${s.ready?' →':''}</p></a>`).join('')}</div></section>`}
function placeholder(id){const s=sections.find(s=>s.id===id);return s?`<p class="kicker">第九課・請到我的家鄉來</p><h1>${s.title}</h1><div class="empty"><p>這個部分準備中。</p></div><a class="button" href="#lesson9">回第九課目錄</a>`:catalogue()}
function practiceReader(id){
 const section=sections.find(section=>section.id===id);
 return `<div class="reading-toolbar lesson9-practice-toolbar"><h1>${section.title}${id==='revise'?'<span class="practice-item-label"></span>':''}</h1><button type="button" class="practice-note-link" data-lesson9-note aria-haspopup="dialog"></button></div><div class="continuous-board lesson9-board lesson9-practice" data-practice="${id}" aria-label="${section.title}，從右到左直排"><p class="practice-intro">${practice[id].prompt}</p></div><nav class="reading-pager" aria-label="練習翻頁"><span id="reading-count" class="small" aria-live="polite"></span></nav>`;
}
function practicePages(id,width,height){
 const pages=[];
 const sideImage=width>=620;
 const bottomImage=!sideImage&&height>=370;
 const imageWidth=sideImage?Math.min(320,Math.round(width*.24)):0;
 const imageHeight=bottomImage?112:0;
 const pitch=FONT*1.37,padding=12;
 const rows=Math.max(1,Math.floor((height-imageHeight-2*padding)/FONT));
 const columns=Math.max(1,Math.floor((width-imageWidth-2*padding)/pitch));
 const sectionIndex=sections.findIndex(section=>section.id===id);
 practice[id].items.forEach((item,itemIndex)=>{
  const lines=item.heading?[item.heading,item.sentence]:[item.sentence];
  const flow=lines.flatMap((line,lineIndex)=>{
   const pattern=[...item.targets].sort((a,b)=>b.length-a.length).join('|');
   const matches=[...line.matchAll(new RegExp(pattern,'g'))];
   const text=[...line].map((char,i)=>{
    const match=matches.find(match=>i>=match.index&&i<match.index+match[0].length);
    return {char,id:`s${sectionIndex}-i${itemIndex}-l${lineIndex}-c${i}`, heading:!!item.heading&&lineIndex===0,
     term:match?item.targets.indexOf(match[0]):-1, gloss:item.gloss&&lineIndex===0&&i===0?item.gloss:''};
   });
   const chunks=[];
   for(let start=0;start<text.length;){
    let end=Math.min(text.length,start+rows);
    if(end-start>1&&/[、。，？]/.test(text[end]?.char||''))end--;
    chunks.push(text.slice(start,end));
    start=end;
   }
   return chunks;
  });
  for(let i=0;i<flow.length;i+=columns)pages.push({item,cols:flow.slice(i,i+columns),pitch,padding,imageWidth,imageHeight});
 });
 return pages;
}
function practicePronunciation(gloss){
 if(!gloss)return '';
 if(gloss!=='ㄊㄧˊ')return `<span class="practice-zhuyin">${escapeHTML(gloss)}</span>`;
 // Two 24px phonetic cells. Center the rising stroke on their shared edge.
 return `<span class="practice-zhuyin" role="img" aria-label="注音 ㄊㄧˊ" style="top:50%;transform:translateY(-50%);width:28px;height:48px;writing-mode:horizontal-tb;line-height:24px"><span aria-hidden="true" style="display:block;width:24px;text-align:center">ㄊ<br>ㄧ</span><svg aria-hidden="true" viewBox="0 0 8 10" style="position:absolute;left:20px;top:19px;width:8px;height:10px"><path d="M1.5 8.5 L6.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg></span>`;
}
function layoutPractice(anchor){
 const board=document.querySelector('.lesson9-practice');
 const id=board.dataset.practice;
 const intro=board.querySelector('.practice-intro');
 const vertical=board.clientWidth>=700&&board.clientHeight>=480;
 intro.classList.toggle('vertical',vertical);
 const insetX=vertical?intro.offsetWidth:0;
 const insetY=vertical?0:intro.offsetHeight;
 const fullWidth=board.clientWidth-insetX, height=board.clientHeight-insetY;
 const items=practice[id].items;
 // Reserve a strip beneath the text for each illustration and its note button.
 const strip=140;
 const groupWidth=Math.floor(fullWidth/items.length);
 const gap=12;
 const candidate=practicePages(id,fullWidth,height-strip);
 const grouped=height>=500&&candidate.length===items.length&&candidate.every(page=>
  page.cols.length*(FONT+gap)+24<=groupWidth);
 const pages=grouped?candidate:practicePages(id,fullWidth,height);
 const requested=(Number(location.hash.split('-')[2])||1)-1;
 const anchored=anchor?pages.findIndex(page=>page.cols.some(col=>col.some(t=>t.id===anchor))):-1;
 const index=grouped?0:anchored>=0?anchored:Math.max(0,Math.min(requested,pages.length-1));
 lessonInk.beforeChange();
 board.replaceChildren(intro);
 const toolbarLink=document.querySelector('.practice-note-link');
 toolbarLink.hidden=grouped;
 const label=document.querySelector('.practice-item-label');
 if(label)label.textContent=grouped?'':pages[index].item.label;
 for(const [group,page] of (grouped?pages:[pages[index]]).entries()){
 const {item,cols,pitch,padding,imageWidth,imageHeight}=page;
 const columnPitch=grouped?Math.min(pitch,(groupWidth-24)/cols.length):pitch;
 const offset=insetX+(grouped?group*groupWidth:0);
 board.insertAdjacentHTML('beforeend',cols.map((col,c)=>col.map((t,r)=>{
  const where=`right:${offset+padding+c*columnPitch}px;top:${insetY+padding+r*FONT}px;width:${FONT}px;height:${FONT}px`;
  const sameTerm=other=>other?.term===t.term;
  const classes=['lesson9-cell','flow-cell',t.heading?'practice-heading':''];
  if(t.term>=0){
   classes.push('practice-term',`term-${t.term}`);
   if(sameTerm(col[r-1]))classes.push('term-continues-from');
   if(sameTerm(col[r+1]))classes.push('term-continues-to');
  }
  return `<span class="${classes.filter(Boolean).join(' ')}" style="${where}" data-token="${t.id}"><span class="flow-char">${escapeHTML(t.char)}</span>${practicePronunciation(t.gloss)}</span>`;
 }).join('')).join(''));
 if(imageWidth||imageHeight){
  const figure=document.createElement('figure');
  figure.className=`practice-picture ${imageWidth?'side':'bottom'}`;
  figure.style[imageWidth?'width':'height']=(imageWidth||imageHeight)+'px';
  figure.innerHTML=`<img src="lesson9-${item.image}.webp" alt="${escapeHTML(item.alt)}">`;
  if(grouped)figure.style.cssText=`left:auto;right:${offset+8}px;top:auto;bottom:0;width:${groupWidth-16}px;height:${strip}px;border-top:1px solid #d7dfd1`;
  if(grouped)figure.firstElementChild.style.cssText='height:100%;max-height:116px;width:54%';
  board.append(figure);
 }
 const link=grouped?toolbarLink.cloneNode(false):toolbarLink;
 if(grouped){
  link.hidden=false;
  link.style.cssText=`position:absolute;right:${offset+12}px;bottom:12px;z-index:6`;
  board.append(link);
 }
 link.textContent=grouped&&id==='revise'?item.label+'訂正':item.link;
 link.dataset.lesson9Note='practice-'+item.id;
 link.setAttribute('aria-label',`${item.link}：${item.label}`);
 link.onclick=()=>openLessonNote(link.dataset.lesson9Note,link);
 }
 setLesson9Pager(id,index,grouped?1:pages.length);
 if(anchor||(grouped&&requested>0))history.replaceState(history.state,'',`#lesson9-${id}-${index+1}`);
 lessonInk.refresh();
 return index+1;
}
function setLesson9Pager(section,index,total){
 document.getElementById('reading-count').textContent=`${index+1} / ${total}`;
 for(const suffix of ['', '-right']){
  const prev=document.getElementById('reading-prev'+suffix),next=document.getElementById('reading-next'+suffix);
  prev.disabled=index===0;next.disabled=index===total-1;
  prev.onclick=()=>location.hash=`lesson9-${section}-${index}`;
  next.onclick=()=>location.hash=`lesson9-${section}-${index+2}`;
 }
}
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
  if(t.type==='char'){
   const w=words.find(w=>w.id===t.word),g=glyphs.find(g=>g.id===t.glyph);
   const char=w?`<button class="flow-char learning-word" data-lesson9-note="word-${w.id}" aria-label="${w.term}：字義與例句" aria-haspopup="dialog" ${t.wordStart?'':'tabindex="-1"'}>${t.char}</button>`:`<span class="flow-char">${t.char}</span>`;
   const arrow=g?`<button class="lesson9-red-arrow" data-lesson9-note="glyph-${g.id}" aria-label="${g.target}：${g.kind}" aria-haspopup="dialog" title="${g.target}：${g.kind}"><svg viewBox="0 0 32 28" aria-hidden="true"><path d="M2 10h15V3l13 11-13 11v-7H2z"/></svg></button>`:'';
   return `<span class="lesson9-cell flow-cell" style="${style}" data-token="${t.id}">${char}${arrow}${readingLinkMarkup(t.id)}</span>`;
  }
  return `<span class="lesson9-cell ${t.type==='indent'?'flow-indent':'flow-number-slot'}" data-token="${t.id}" style="${style}" ${t.type==='indent'?'aria-label="段首空兩個全型字"':''}><span class="inline-number" aria-label="課本第${t.number}行">${t.number}</span>${t.type==='indent'?`<span class="flow-paragraph-label">第${numerals[t.p]}段</span>`:''}</span>`;
 }).join('');
 if(page.picture!==null){
  const figure=document.createElement('aside');figure.className='country-gallery';figure.setAttribute('aria-label',countries[page.picture].name+'的課本圖片');
  figure.style.cssText=`left:12px;bottom:10px;width:${page.pictureCols*page.pitch-18}px;height:${page.pictureRows*page.rowHeight-14}px`;
  figure.innerHTML=gallery(page.picture);board.append(figure);
 }
 board.onclick=event=>{const button=event.target.closest('[data-lesson9-note]');if(button)openLessonNote(button.dataset.lesson9Note,button)};
 setLesson9Pager('text',index,pages.length);
 if(anchor)history.replaceState(history.state,'','#lesson9-text-'+(index+1));
 lessonInk.refresh();return index+1;
}
const api={practice,practicePages,practiceReader,layoutPractice,sections,countries,words,glyphs,pictureNotes,readingLinks,readingLinkAnchor,readingLinkMarkup,knowledgeNotes,noteContent,tokensForLesson,paginate,studyMarks,studySegments,catalogue,placeholder,reader,layout,FONT,BLUE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else window.lesson9=api;
})();
