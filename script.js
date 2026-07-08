const reviews = [
  {name:'Dee Shrestha', time:'2 years ago', text:'This place is a Godsend for all hybrid owners! Mohammed is extremely knowledgeable, honest and upfront from Day 1. My vehicle was ready in 3 business days. These guys are amazing!'},
  {name:'Timothy H', time:'3 years ago', text:'The absolute BEST for Prius hybrid cars! They communicated well, diagnosed the problem and changed the head gasket in my Prius V. Great prices and friendly service. Highly recommended!'},
  {name:'Alfred Ramirez', time:'4 years ago', text:'From the initial phone call, I knew the owner understood the Prius. They were polite, fast, and delivered quality work exactly as quoted. My Prius is running great!'},
  {name:'Allan Fisher', time:'3 years ago', text:'Mo and his technician quickly diagnosed the issue on my Prius and had it repaired the same day. Trustworthy, reliable, affordable, and I will definitely be back.'},
  {name:'Phelps Rivera', time:'3 years ago', text:'The best mechanics in San Diego. I wish I had called them before going to another mechanic and the dealership. Amazing prices, professional work, and exceptional customer service.'},
  {name:'Kyle Nguyen', time:'a year ago', text:'Very knowledgeable on hybrid cars. Mohamed was honest and straightforward about the repairs my Prius needed. I could not be any happier with the results.'},
  {name:'Ramon O.', time:'2 years ago', text:'10/10. The best Prius mechanics in San Diego. Friendly, fast, and honest. They do not guess or upsell. They stand behind their work and get you back on the road.'},
  {name:'Justin Estrada', time:'2 years ago', text:'They helped me over the phone with great advice before I even brought my Prius in. Friendly, timely, fairly priced, and they took great care of my car. I will be back.'},
  {name:'Tracy Lewin', time:'5 years ago', text:'I am grateful I found this team. Toyota quoted me over $5k, and they provided a better repair solution for less. Knowledgeable, trustworthy, and highly recommended.'}
];

const track = document.getElementById('reviewTrack');
const dots = document.getElementById('reviewDots');
let index = 0;

function cardTemplate(r){
  return `<article class="review-card"><div class="stars">★★★★★</div><blockquote>“${r.text}”</blockquote><strong>— ${r.name}</strong><small>${r.time} · Google Review</small></article>`;
}

function initReviews(){
  if(!track) return;
  track.innerHTML = reviews.map(cardTemplate).join('');
  dots.innerHTML = reviews.map((_,i)=>`<button aria-label="Go to review ${i+1}" data-dot="${i}"></button>`).join('');
  dots.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>goTo(Number(btn.dataset.dot))));
  document.querySelector('.review-arrow.prev')?.addEventListener('click',()=>goTo(index-1));
  document.querySelector('.review-arrow.next')?.addEventListener('click',()=>goTo(index+1));
  update();
  setInterval(()=>goTo(index+1), 6500);
}

function visibleCount(){ return window.innerWidth < 900 ? 1 : 3; }
function goTo(i){ index = (i + reviews.length) % reviews.length; update(); }
function update(){
  const cards = track.querySelectorAll('.review-card');
  if(!cards.length) return;
  const cardWidth = cards[0].getBoundingClientRect().width + 20;
  const maxIndex = Math.max(0, reviews.length - visibleCount());
  const adjusted = Math.min(index, maxIndex);
  track.style.transform = `translateX(${-adjusted * cardWidth}px)`;
  dots.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active', i === index));
}
window.addEventListener('resize', update);
initReviews();

document.querySelector('.menu-toggle')?.addEventListener('click',()=>{
  document.getElementById('siteNav')?.classList.toggle('open');
});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('siteNav')?.classList.remove('open')));
