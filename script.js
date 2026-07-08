const reviews = [
  {name:'Dee Shrestha', age:'2 years ago', text:'This place is a Godsend for all hybrid owners! Mohammed is extremely knowledgeable, honest and upfront from Day 1. My vehicle was ready in 3 business days. These guys are amazing!'},
  {name:'Timothy H', age:'3 years ago', text:'The absolute BEST for Prius hybrid cars! They communicated well, diagnosed the problem and changed the head gasket in my Prius V. Great prices and friendly service. Highly recommended!'},
  {name:'Alfred Ramirez', age:'4 years ago', text:'From the initial phone call I knew the owner understood the Prius. Very polite, fast, quality work and the price was exactly as quoted. My Prius is running great!'},
  {name:'Allan Fisher', age:'3 years ago', text:'Mo and his technician were able to diagnose the issue and pinpoint the problem. They fixed it and it was ready the same day. Trustworthy, reliable and affordable.'},
  {name:'Phelps Rivera', age:'3 years ago', text:'These mechanics are the best in San Diego. I wish I had called them before another mechanic and the dealership. Amazing prices, professional work and very gracious.'},
  {name:'Kyle Nguyen', age:'a year ago', text:'The shop is very knowledgeable on hybrid cars. Mohamed is honest and straight up about the service that needed to be done. I couldn’t be any happier.'},
  {name:'RegalRandy', age:'2 years ago', text:'10/10. The best Prius mechanics in the City of San Diego. Friendly, fast and honest. They do not guess or upsell. They stand behind their work.'},
  {name:'Justin Estrada', age:'2 years ago', text:'Helped me over the phone at first with great advice. Brought my Prius in and they took great care of it. Friendly, timely and great price. I will be back.'},
  {name:'Tracy Lewin', age:'5 years ago', text:'Mo and his team were able to replace my whole engine for less than half of what Toyota quoted. Incredibly knowledgeable with Toyotas and Prius vehicles. Highly recommend!'}
];

const track = document.getElementById('reviewTrack');
const dots = document.getElementById('reviewDots');
const prev = document.getElementById('prevReview');
const next = document.getElementById('nextReview');
let current = 0;
let perView = window.innerWidth <= 680 ? 1 : (window.innerWidth <= 1050 ? 2 : 3);

function buildReviews(){
  track.innerHTML = reviews.map(r => `
    <article class="review-card">
      <div class="review-head"><div class="stars">★★★★★</div><div class="google-mark">G</div></div>
      <p>“${r.text}”</p>
      <strong>— ${r.name}</strong>
      <small>${r.age} • Verified Google Review</small>
    </article>
  `).join('');
  const maxIndex = Math.max(0, reviews.length - perView);
  dots.innerHTML = Array.from({length:maxIndex+1}, (_,i)=>`<button aria-label="Go to review ${i+1}" data-index="${i}"></button>`).join('');
  [...dots.querySelectorAll('button')].forEach(btn => btn.addEventListener('click',()=>goTo(Number(btn.dataset.index))));
  updateSlider();
}

function updatePerView(){
  perView = window.innerWidth <= 680 ? 1 : (window.innerWidth <= 1050 ? 2 : 3);
  current = Math.min(current, Math.max(0, reviews.length - perView));
}
function updateSlider(){
  updatePerView();
  const card = track.querySelector('.review-card');
  if(!card) return;
  const gap = 18;
  const cardWidth = card.getBoundingClientRect().width + gap;
  track.style.transform = `translateX(${-current * cardWidth}px)`;
  dots.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active', i===current));
}
function goTo(index){
  current = Math.max(0, Math.min(index, reviews.length - perView));
  updateSlider();
}
function goNext(){ goTo(current >= reviews.length - perView ? 0 : current + 1); }
function goPrev(){ goTo(current <= 0 ? reviews.length - perView : current - 1); }

prev?.addEventListener('click', goPrev);
next?.addEventListener('click', goNext);
window.addEventListener('resize', () => { buildReviews(); });
let timer = setInterval(goNext, 5500);
document.querySelector('.review-shell')?.addEventListener('mouseenter',()=>clearInterval(timer));
document.querySelector('.review-shell')?.addEventListener('mouseleave',()=>timer=setInterval(goNext,5500));

const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
menuToggle?.addEventListener('click',()=>{
  const open = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
siteNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>siteNav.classList.remove('open')));

buildReviews();
