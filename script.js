const reviews = [
  { name: 'Dee Shrestha', date: '5 years ago', text: 'This place is a Godsend for all hybrid owners! Mohammed is extremely knowledgeable, honest and upfront from Day 1. My vehicle was ready in 3 business days. These guys are amazing!' },
  { name: 'Timothy H', date: '3 years ago', text: 'The absolute BEST for Prius hybrid cars! They communicated well, diagnosed the problem and changed the head gasket in my Prius V. Great prices and friendly service. Highly recommended!' },
  { name: 'Alfred Ramirez', date: '4 years ago', text: 'From the initial phone call, I knew the owner understood the Prius. Very polite, fast, quality work and the price was exactly as quoted. My Prius is running great!' },
  { name: 'Allan Fisher', date: '3 years ago', text: 'Mo and his technician quickly diagnosed the issue on my Prius and had it repaired the same day. Trustworthy, reliable, affordable, and I will definitely be coming back for future work.' },
  { name: 'Phelps Rivera', date: '3 years ago', text: 'The best mechanics in San Diego. I wish I had called them before going to another mechanic and the dealership. Amazing prices, professional work, and exceptional customer service.' },
  { name: 'Kyle Nguyen', date: 'a year ago', text: 'Very knowledgeable on hybrid cars. Mohamed was honest and straightforward about the repairs my Prius needed. I could not be happier with the results.' },
  { name: 'Ramon O.', date: '2 years ago', text: '10/10. The best Prius mechanics in San Diego. Friendly, fast, and honest. They do not guess or upsell—they diagnose correctly, stand behind their work, and get you back on the road.' },
  { name: 'Justin Estrada', date: '2 years ago', text: 'They helped me over the phone with great advice before I even brought my Prius in. Friendly, timely, fairly priced, and they took great care of my car. I will definitely be back.' },
  { name: 'Tracy Lewin', date: '5 years ago', text: 'Toyota wanted to charge me over $5k, but Mo and his team were able to replace my whole engine for less than half. Incredibly knowledgeable with Toyotas and Priuses. Highly recommend!' }
];

const track = document.getElementById('reviewTrack');
const dots = document.getElementById('reviewDots');
let index = 0;
let timer;

function visibleCards() {
  if (window.innerWidth <= 700) return 1;
  if (window.innerWidth <= 1050) return 2;
  return 3;
}

function buildReviews() {
  reviews.forEach((review, i) => {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="review-head">
        <div class="stars">★★★★★</div>
        <div class="google-mark">G</div>
      </div>
      <p>“${review.text}”</p>
      <cite>— ${review.name}</cite>
      <small>${review.date} · Verified Google Review</small>
    `;
    track.appendChild(card);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.addEventListener('click', () => goToReview(i));
    dots.appendChild(dot);
  });
  updateDots();
}

function goToReview(i) {
  const max = Math.max(0, reviews.length - visibleCards());
  index = Math.max(0, Math.min(i, max));
  const card = track.querySelector('.review-card');
  if (!card) return;
  const gap = 24;
  track.scrollTo({ left: index * (card.offsetWidth + gap), behavior: 'smooth' });
  updateDots();
  restartAutoSlide();
}

function updateDots() {
  [...dots.children].forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function nextReview() {
  const max = Math.max(0, reviews.length - visibleCards());
  goToReview(index >= max ? 0 : index + 1);
}

function prevReview() {
  const max = Math.max(0, reviews.length - visibleCards());
  goToReview(index <= 0 ? max : index - 1);
}

function restartAutoSlide() {
  clearInterval(timer);
  timer = setInterval(nextReview, 6500);
}

document.getElementById('nextReview').addEventListener('click', nextReview);
document.getElementById('prevReview').addEventListener('click', prevReview);
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('siteNav').classList.toggle('open');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => document.getElementById('siteNav').classList.remove('open'));
});

buildReviews();
restartAutoSlide();
window.addEventListener('resize', () => goToReview(index));
