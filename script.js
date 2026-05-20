// VOUMIK DEV SHARMA | CYBER DON'S — Portfolio Scripts

// ── CURSOR ──
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top = e.clientY + 'px';
});
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.transform = 'translate(-50%,-50%) scale(1.8)'; ring.style.borderColor = 'var(--cyan)'; });
  el.addEventListener('mouseleave', () => { ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.borderColor = 'rgba(0,240,255,0.5)'; });
});

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startTyping();
    animateCounters();
  }, 800);
});

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── TYPING ANIMATION ──
const phrases = [
  'Cybersecurity • AI Automation • Digital Innovation',
  'Bug Bounty Hunter & OSINT Expert',
  'Building Futuristic Security Systems',
  'Gen-Z Tech Creator from Bangladesh 🇧🇩',
];
let pIdx = 0, cIdx = 0, deleting = false;
function startTyping() {
  const el = document.getElementById('typed-text');
  function tick() {
    const phrase = phrases[pIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) { deleting = true; setTimeout(tick, 2000); return; }
    } else {
      el.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 35 : 70);
  }
  tick();
}

// ── COUNTERS ──
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    let cur = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { el.textContent = target + '+'; clearInterval(timer); return; }
      el.textContent = Math.floor(cur) + '+';
    }, 30);
  });
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.08) + 's';
      e.target.classList.add('visible');
      // animate skill bars
      e.target.querySelectorAll('.skill-bar[data-width]').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal,.skill-card,.service-card,.highlight').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ── FORM ──
function submitForm() {
  const name = document.getElementById('f-name').value;
  const email = document.getElementById('f-email').value;
  const msg = document.getElementById('f-msg').value;
  if (!name || !email || !msg) { alert('Please fill all fields.'); return; }
  document.getElementById('formMsg').classList.add('success');
  document.getElementById('f-name').value = '';
  document.getElementById('f-email').value = '';
  document.getElementById('f-subject').value = '';
  document.getElementById('f-msg').value = '';
  setTimeout(() => document.getElementById('formMsg').classList.remove('success'), 5000);
}

// ── MATRIX RAIN ──
const mc = document.getElementById('matrix-canvas');
const mctx = mc.getContext('2d');
mc.width = window.innerWidth; mc.height = window.innerHeight;
const cols = Math.floor(mc.width / 20);
const drops = Array(cols).fill(1);
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>{}[]¥€£';
function drawMatrix() {
  mctx.fillStyle = 'rgba(10,10,10,0.05)';
  mctx.fillRect(0, 0, mc.width, mc.height);
  mctx.fillStyle = '#00F0FF';
  mctx.font = '14px Orbitron,monospace';
  drops.forEach((y, i) => {
    mctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 20, y * 20);
    drops[i] = (y * 20 > mc.height && Math.random() > 0.975) ? 0 : y + 1;
  });
}
setInterval(drawMatrix, 50);

// ── PARTICLES ──
const pc = document.getElementById('particle-canvas');
const pctx = pc.getContext('2d');
pc.width = window.innerWidth; pc.height = window.innerHeight;
const particles = Array.from({length: 70}, () => ({
  x: Math.random() * pc.width, y: Math.random() * pc.height,
  vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
  r: Math.random() * 1.5 + 0.3,
  c: ['#00F0FF','#7A00FF','#FF003C'][Math.floor(Math.random()*3)]
}));
function drawParticles() {
  pctx.clearRect(0, 0, pc.width, pc.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > pc.width) p.vx *= -1;
    if (p.y < 0 || p.y > pc.height) p.vy *= -1;
    pctx.beginPath();
    pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    pctx.fillStyle = p.c;
    pctx.shadowColor = p.c; pctx.shadowBlur = 8;
    pctx.fill();
  });
  // connections
  particles.forEach((a, i) => {
    particles.slice(i+1).forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        pctx.beginPath();
        pctx.strokeStyle = `rgba(0,240,255,${(1 - d/120) * 0.08})`;
        pctx.lineWidth = 0.5;
        pctx.moveTo(a.x, a.y);
        pctx.lineTo(b.x, b.y);
        pctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── RESIZE ──
window.addEventListener('resize', () => {
  mc.width = pc.width = window.innerWidth;
  mc.height = pc.height = window.innerHeight;
});

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const sy = window.scrollY + 100;
  sections.forEach(s => {
    const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
    if (!link) return;
    if (sy >= s.offsetTop && sy < s.offsetTop + s.offsetHeight) link.style.color = 'var(--cyan)';
    else link.style.color = '';
  });
});