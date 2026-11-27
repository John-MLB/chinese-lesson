/* Reusable, right-to-left vocabulary cards and per-character vertical Zhuyin. */
(() => {
'use strict';
const escape = value => String(value).replace(/[&<>"']/g, char => ({
 '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[char]);
function annotatedTitle(term, pronunciation) {
 const syllables = pronunciation.trim().split(/\s+/);
 return [...term].map((char, index) => {
  const syllable = syllables[index] || '';
  const tones = syllable.match(/[ˊˇˋ˙]/);
  const tone = tones?.[0];
  const letters = [...syllable.replace(/[ˊˇˋ˙]/g, '')];
  const cells = letters.map((letter, i) => `<span>${escape(letter)}${i === letters.length - 1 && tone && tone !== '˙'
   ? `<b class="vocab-tone">${tone}</b>` : ''}</span>`).join('');
  return `<span class="vocab-glyph"><span>${escape(char)}</span><span class="vocab-zhuyin" role="img" aria-label="${escape(syllable)}">${tone==='˙'
   ? '<b class="vocab-neutral">˙</b>' : ''}${cells}</span></span>`;
 }).join('');
}
function card(title, body) {
 return `<section class="vertical-vocab-card"><h3>${escape(title)}</h3><p>${escape(body)}</p></section>`;
}
function note(term, pronunciation, meaning, example, supplement) {
 const science = supplement ? card(supplement.heading || '科普小知識', supplement.fact) : '';
 const picture = supplement?.image ? `<figure class="vertical-vocab-art"><img src="${escape(supplement.image)}"
  alt="${escape(supplement.alt)}"><figcaption>${escape(supplement.caption)}</figcaption></figure>` : '';
 const sources = `<footer class="vertical-vocab-sources"><a href="https://www.moedict.tw/${encodeURIComponent(term)}"
  target="_blank" rel="noopener noreferrer">萌典</a>${supplement?.source ? `<a href="${escape(supplement.source[1])}"
  target="_blank" rel="noopener noreferrer">${escape(supplement.source[0])}</a>` : ''}</footer>`;
 return {category:'認識詞語',title:annotatedTitle(term, pronunciation),html:`<div class="vertical-vocab">
  <div class="vertical-vocab-body">${card('課文中的意思',meaning)}${card('例句',example)}${science}${picture}</div>${sources}</div>`};
}
window.classroomVocabulary={note,annotatedTitle};
})();
