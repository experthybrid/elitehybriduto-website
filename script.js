const reviews = [
  { name: 'Dee Shrestha', text: 'This place is Godsend for all hybrid owners! Mohammed is extremely knowledgeable, honest and upfront from Day 1. My vehicle was ready in 3 business days. These guys are amazing!' },
  { name: 'Timothy H', text: 'The absolute BEST for Prius hybrid cars! These guys communicated well, diagnosed the problem, and changed the head gasket in my 2012 Prius V. Great prices and friendly service. Highly recommended!' },
  { name: 'Alfred Ramirez', text: 'From the initial phone call, I knew the owner understood the Prius. They were polite, fast, and delivered quality work exactly as quoted. My Prius is running great.' },
  { name: 'Allan Fisher', text: 'Mo and his technician quickly diagnosed the issue on my Prius and had it repaired the same day. Trustworthy, reliable, affordable, and I will definitely be coming back for future work.' },
  { name: 'Phelps Rivera', text: 'The best mechanics in San Diego. Amazing prices, professional work, and exceptional customer service. I will keep coming back for all my hybrid vehicles.' },
  { name: 'Kyle Nguyen', text: 'Very knowledgeable on hybrid cars. Mohamed was honest and straightforward about the repairs my Prius needed. I could not be happier with the results.' },
  { name: 'RegalRandy (Ramon O.)', text: '10/10. The best Prius mechanics in San Diego. Friendly, fast, and honest. They do not guess or upsell — they diagnose correctly, stand behind their work, and get you back on the road.' },
  { name: 'Justin Estrada', text: 'They helped me over the phone with great advice before I even brought my Prius in. Friendly, timely, fairly priced, and they took great care of my car. I will definitely be back.' }
];

const track = document.getElementById('reviewTrack');
const dots = document.getElementById('reviewDots');
let current = 0;
let timer;

function renderReviews() {
  if (!track || !dots) return;
  track.innerHTML = reviews.map((review, index) => `
    <article class="review-card ${index === current ? 'active' : ''}">
      <div class="stars">★★★★★</div>
      <blockquote>“${review.text}”</blockquote>
      <div class="name">— ${review.name}</div>
      <span class="badge">Google Review</span>
    </article>
  `).join('');

  dots.innerHTML = reviews.map((_, index) => `
    <button aria-label="Show review ${index + 1}" class="${index === current ? 'active' : ''}"></button>
  `).join('');

  dots.querySelectorAll('button').forEach((button, index) => {
    button.addEventListener('click', () => showReview(index));
  });
}

function showReview(index) {
  current = (index + reviews.length) % reviews.length;
  renderReviews();
  restartTimer();
}

function nextReview() { showReview(current + 1); }
function previousReview() { showReview(current - 1); }
function restartTimer() {
  clearInterval(timer);
  timer = setInterval(() => { current = (current + 1) % reviews.length; renderReviews(); }, 6500);
}

document.querySelector('.review-arrow.next')?.addEventListener('click', nextReview);
document.querySelector('.review-arrow.prev')?.addEventListener('click', previousReview);

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

renderReviews();
restartTimer();
