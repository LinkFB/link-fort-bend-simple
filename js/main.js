// ---------- Mobile nav toggle ----------
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // ---------- Opportunities: render from data + filter by organization ----------
  const oppContainer = document.getElementById('opportunities-container');
  if (oppContainer && typeof OPPORTUNITIES !== 'undefined') {
    oppContainer.innerHTML = OPPORTUNITIES.map(opp => {
      const tagClass = CATEGORY_TAG_CLASS[opp.category] || '';
      const tagLabel = CATEGORY_LABELS[opp.category] || '';
      const metaBits = [opp.due, opp.format, opp.age ? `Age ${opp.age}` : null, opp.training ? 'Training provided' : null, `${opp.commitment} commitment`]
        .filter(Boolean).join(' · ');
      const linkHtml = opp.link
        ? `<a href="${opp.link}" class="btn btn-ghost" style="margin-top:14px; align-self:flex-start; padding:9px 18px; font-size:0.72rem;" ${opp.link.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${opp.linkLabel}</a>`
        : `<a href="contact.html#signup" class="btn btn-ghost" style="margin-top:14px; align-self:flex-start; padding:9px 18px; font-size:0.72rem;">Contact us to sign up</a>`;
      return `<div class="card" data-org="${opp.orgKey}">
        <span class="tag ${tagClass}">${tagLabel}</span>
        <h3>${opp.title}</h3>
        <p>${opp.description}</p>
        <div class="meta">${opp.org}<br>${metaBits}</div>
        ${linkHtml}
      </div>`;
    }).join('');

    const filterBtns = document.querySelectorAll('.filter-btn');
    const oppCards = oppContainer.querySelectorAll('[data-org]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const org = btn.dataset.filter;
        oppCards.forEach(card => {
          const show = org === 'all' || card.dataset.org === org;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ---------- Volunteer signup form ----------
  const form = document.getElementById('volunteer-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // NOTE: This form currently only simulates a submission.
      // Connect it to a real backend (Formspree, Google Form, etc.)
      // before launch — see README.md for instructions.
      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }
});

// ---------- Hero network diagram ----------
// Mirrors the logo's icon: one hub connected to five satellite nodes,
// scaled up to fill the hero. Colors match the logo (navy/blue/red).
function buildNetworkSVG() {
  const stage = document.querySelector('.network-stage');
  if (!stage) return;

  const W = 480, H = 480;
  const hub = { x: 240, y: 240 };
  const satellites = [
    { x: 240, y: 80,  cls: 'gold' },  // top
    { x: 392, y: 191, cls: 'red' },   // upper-right
    { x: 334, y: 369, cls: 'blue' },  // lower-right
    { x: 146, y: 369, cls: 'red' },   // lower-left
    { x: 88,  y: 191, cls: 'blue' },  // upper-left
  ];

  let links = '';
  // Inbound: each outer node travels in toward the hub.
  satellites.forEach((s, i) => {
    links += `<path class="net-link ${s.cls}" d="M ${s.x} ${s.y} Q ${hub.x} ${hub.y} ${hub.x} ${hub.y}" style="animation-delay:${(i * 0.4).toFixed(2)}s"/>`;
  });
  // Outbound: the hub also sends a pulse out to a random node or two,
  // re-randomized on every page load, staggered after the inbound set.
  const shuffled = [...satellites].sort(() => Math.random() - 0.5);
  const outboundPicks = shuffled.slice(0, 2 + Math.floor(Math.random() * 2)); // 2 or 3 random targets
  outboundPicks.forEach((s, i) => {
    links += `<path class="net-link ${s.cls}" d="M ${hub.x} ${hub.y} Q ${hub.x} ${hub.y} ${s.x} ${s.y}" style="animation-delay:${(2.4 + i * 0.5).toFixed(2)}s"/>`;
  });

  let nodes = `<circle class="net-node" cx="${hub.x}" cy="${hub.y}" r="22"/>
    <circle class="net-pulse" cx="${hub.x}" cy="${hub.y}" r="0"/>`;
  satellites.forEach(s => nodes += `<circle class="net-node ${s.cls}" cx="${s.x}" cy="${s.y}" r="9"/>`);

  stage.innerHTML = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">${links}${nodes}</svg>`;
}
document.addEventListener('DOMContentLoaded', buildNetworkSVG);
