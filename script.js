const reviews = [
  {name:'Dee Shrestha', date:'5 years ago', text:'This place is a Godsend for all hybrid owners! Mohammed is extremely knowledgeable, honest and upfront from Day 1. My vehicle was ready in 3 business days. These guys are amazing!'},
  {name:'Timothy H', date:'3 years ago', text:'The absolute BEST for Prius hybrid cars! They communicated well, diagnosed the problem, and changed the head gasket in my Prius V. Great prices and friendly service. Highly recommended!'},
  {name:'Alfred Ramirez', date:'4 years ago', text:'From the initial phone call, I knew the owner understood the Prius. Very polite, fast, quality work, and the price was exactly as quoted. My Prius is running great!'},
  {name:'Allan Fisher', date:'3 years ago', text:'Mo and his technician were able to diagnose the issue and pinpoint the problem. They fixed it and it was ready the same day. Trustworthy, reliable, and affordable. I will definitely be back!'},
  {name:'Phelps Rivera', date:'3 years ago', text:'These mechanics are the best in San Diego. I wish I had called them before another mechanic and the dealership. Amazing prices, professional work, and very gracious customer service.'},
  {name:'Kyle Nguyen', date:'a year ago', text:'Very knowledgeable on hybrid cars. Mohamed is honest and straight up about the service that needed to be done. Took my Prius there and got it repaired. I couldn’t be any happier.'},
  {name:'Ramon O.', date:'2 years ago', text:'10/10. The best Prius mechanics in San Diego. Friendly, fast, and honest. They do not guess or upsell. They stand behind their work and get you back on the road.'},
  {name:'Justin Estrada', date:'2 years ago', text:'They helped me over the phone with great advice before I brought my Prius in. Friendly, timely, great price, and they took great care of it. I will be back for future work.'},
  {name:'Tracy Lewin', date:'5 years ago', text:'I am grateful I found Mo and his team at auto repair. They replaced my engine for less than half of what Toyota quoted, checked in during the repair, and followed up after. Highly recommend!'}
];

let current = 0;
const track = document.getElementById('reviewTrack');
const dots = document.getElementById('reviewDots');
const prev = document.querySelector('.review-arrow.prev');
const next = document.querySelector('.review-arrow.next');
const nav = document.querySelector('.site-nav');
const menu = document.querySelector('.menu-toggle');

function cardsPerView(){
  if (window.innerWidth < 760) return 1;
  if (window.innerWidth < 1100) return 2;
  return 3;
}
function renderReviews(){
  const count = cardsPerView();
  track.style.opacity = '0';
  setTimeout(() => {
    track.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const review = reviews[(current + i) % reviews.length];
      const card = document.createElement('article');
      card.className = 'review-card';
      card.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px"><div class="review-stars">★★★★★</div><div class="google-corner">G</div></div>
        <p>“${review.text}”</p>
        <strong>— ${review.name}</strong>
        <small>${review.date}</small>
        <div class="verified">Verified Google Review</div>
      `;
      track.appendChild(card);
    }
    dots.innerHTML = '';
    reviews.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'review-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Show review ${i + 1}`);
      dot.addEventListener('click', () => { current = i; renderReviews(); resetTimer(); });
      dots.appendChild(dot);
    });
    track.style.opacity = '1';
  }, 140);
}
function moveReview(step){ current = (current + step + reviews.length) % reviews.length; renderReviews(); }
function resetTimer(){ clearInterval(timer); timer = setInterval(() => moveReview(1), 6500); }
prev.addEventListener('click', () => { moveReview(-1); resetTimer(); });
next.addEventListener('click', () => { moveReview(1); resetTimer(); });
window.addEventListener('resize', renderReviews);
menu.addEventListener('click', () => nav.classList.toggle('open'));
let timer = setInterval(() => moveReview(1), 6500);
renderReviews();
