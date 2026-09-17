// Verdanta Naturals — Site JS
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const WA = '919925551736';
  const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  // ---------- Nav toggle ----------
  const menuBtn = $('.menu-toggle');
  const nav = $('.nav');
  if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

  // ---------- Product grid render ----------
  const grid = $('#p-grid');
  const filters = $('#p-filters');
  let activeFilter = 'All';

  function renderProducts(){
    const list = window.VN_PRODUCTS.filter(p => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Powders') return p.category === 'Powders';
      if (activeFilter === 'Flakes') return p.category === 'Flakes';
      if (activeFilter === 'Vegetables') return ['Onion Powder','Onion Flakes','Garlic Powder','Garlic Flakes','Potato Powder','Potato Flakes','Tomato Powder','Carrot Powder','Beetroot Powder','Spinach Powder'].includes(p.name);
      if (activeFilter === 'Fruits') return ['Banana Powder','Banana Flakes','Mango Powder (Amchur alt.)','Guava Powder','Lemon Powder','Pineapple Powder','Papaya Powder'].includes(p.name);
      return true;
    });
    grid.innerHTML = list.map(p => {
      const waMsg = `Hello Verdanta Naturals, I am interested in ${p.name} (${p.id}). Please share product details, pack sizes and pricing.`;
      return `
      <article class="p-card">
        <div class="p-img">
          <img src="${p.img}" alt="${p.name} — dehydrated ingredient by Verdanta Naturals" loading="lazy">
          ${p.featured ? '<span class="p-tag">Featured</span>' : ''}
        </div>
        <div class="p-body">
          <div class="p-cat">${p.category}</div>
          <h3>${p.name}</h3>
          <p class="p-desc">${p.short}</p>
          <div class="p-forms">${p.forms.slice(0,4).map(f => `<span>${f}</span>`).join('')}</div>
          <div class="p-actions">
            <button class="btn btn-ghost btn-sm" data-view="${p.id}">View</button>
            <a class="btn btn-wa btn-sm" href="${waLink(waMsg)}" target="_blank">
              <svg style="width:14px;height:14px;" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1s-.5-.15-.7.15-.8 1-1 1.2-.4.2-.7.05c-1.8-.9-3-1.6-4.2-3.6-.3-.55.3-.5.9-1.7.1-.2 0-.4-.05-.55S9 6.5 8.8 6c-.2-.5-.4-.4-.55-.4h-.5c-.15 0-.4.05-.6.3-.2.25-.8.8-.8 1.9s.8 2.2 1 2.4c.15.2 1.7 2.6 4.1 3.6 1.5.65 2.1.7 2.8.6.4-.05 1.35-.55 1.55-1.1.2-.55.2-1 .15-1.1-.05-.1-.25-.15-.55-.3zM12 2C6.5 2 2 6.5 2 12c0 1.75.5 3.4 1.3 4.85L2 22l5.25-1.35A9.94 9.94 0 0012 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18a8 8 0 01-4.15-1.15l-.3-.2-3.15.8.85-3.05-.2-.3A8 8 0 1112 20z"/></svg>
              Enquire
            </a>
          </div>
        </div>
      </article>`;
    }).join('');
  }

  if (filters) {
    filters.addEventListener('click', e => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;
      $$('.filter-chip', filters).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts();
    });
  }

  // ---------- Product detail modal ----------
  const productModal = $('#product-modal');
  const productBody = $('#product-body');

  function openProduct(id){
    const p = window.VN_PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const waMsg = `Hello Verdanta Naturals, I am interested in ${p.name} (${p.id}). Please share product details, pack sizes and pricing.`;
    productBody.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
        <div>
          <img src="${p.img}" alt="${p.name}" style="width:100%;border-radius:12px;">
          <div style="margin-top:16px;padding:16px;background:var(--off);border-radius:8px;font-size:.85rem;">
            <b style="color:var(--green-deep);display:block;margin-bottom:6px;">Product ID</b>
            <code style="font-family:'JetBrains Mono',monospace;color:var(--purple);">${p.id}</code>
          </div>
        </div>
        <div>
          <div class="p-cat" style="margin-bottom:6px;">${p.category}</div>
          <h2 style="font-size:2rem;margin:0 0 12px;">${p.name}</h2>
          <p style="font-size:1rem;">${p.short}</p>

          <h4 style="margin-top:20px;">Available Forms</h4>
          <div class="p-forms">${p.forms.map(f => `<span>${f}</span>`).join('')}</div>

          <h4 style="margin-top:20px;">Pack Sizes</h4>
          <div class="p-forms">${p.packSizes.map(s => `<span>${s}</span>`).join('')}</div>

          <h4 style="margin-top:20px;">Applications</h4>
          <div class="p-forms">${p.applications.map(a => `<span>${a}</span>`).join('')}</div>

          <h4 style="margin-top:20px;">Highlights</h4>
          <ul style="padding-left:20px;font-size:.9rem;color:var(--char-soft);">
            ${p.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>

          <div style="display:flex;gap:8px;margin-top:24px;flex-wrap:wrap;">
            <a class="btn btn-wa btn-lg" href="${waLink(waMsg)}" target="_blank">
              <svg class="wa-ic" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1s-.5-.15-.7.15-.8 1-1 1.2-.4.2-.7.05c-1.8-.9-3-1.6-4.2-3.6-.3-.55.3-.5.9-1.7.1-.2 0-.4-.05-.55S9 6.5 8.8 6c-.2-.5-.4-.4-.55-.4h-.5c-.15 0-.4.05-.6.3-.2.25-.8.8-.8 1.9s.8 2.2 1 2.4c.15.2 1.7 2.6 4.1 3.6 1.5.65 2.1.7 2.8.6.4-.05 1.35-.55 1.55-1.1.2-.55.2-1 .15-1.1-.05-.1-.25-.15-.55-.3zM12 2C6.5 2 2 6.5 2 12c0 1.75.5 3.4 1.3 4.85L2 22l5.25-1.35A9.94 9.94 0 0012 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18a8 8 0 01-4.15-1.15l-.3-.2-3.15.8.85-3.05-.2-.3A8 8 0 1112 20z"/></svg>
              Enquire on WhatsApp
            </a>
            <button class="btn btn-ghost" data-quick data-product="${p.name}">Quick Enquiry Form</button>
          </div>
        </div>
      </div>
    `;
    openModal(productModal);
  }

  // ---------- Modal system ----------
  function openModal(m){
    document.body.style.overflow = 'hidden';
    m.classList.add('open');
  }
  function closeModal(m){
    document.body.style.overflow = '';
    m.classList.remove('open');
  }
  $$('.modal-backdrop').forEach(bd => {
    bd.addEventListener('click', e => { if (e.target === bd) closeModal(bd); });
    bd.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(bd)));
  });

  // ---------- Event delegation ----------
  document.addEventListener('click', e => {
    const view = e.target.closest('[data-view]');
    const quick = e.target.closest('[data-quick]');
    if (view) { openProduct(view.dataset.view); }
    if (quick) {
      const productName = quick.dataset.product || '';
      openQuickEnquiry(productName);
    }
  });

  // ---------- Quick Enquiry Form (short — 4 fields) ----------
  const enqModal = $('#enq-modal');
  const enqBody = $('#enq-body');
  const enqTitle = $('#enq-title');
  const enqSubtitle = $('#enq-subtitle');

  function openQuickEnquiry(productHint = ''){
    enqTitle.textContent = 'Send Your Enquiry';
    enqSubtitle.textContent = 'Fill 4 quick details — we\'ll respond on WhatsApp within business hours.';
    enqBody.innerHTML = `
      <form id="enq-form">
        <div class="form-grid">
          <div class="field full">
            <label>Name <span class="req">*</span></label>
            <input name="name" required placeholder="Your full name">
          </div>
          <div class="field full">
            <label>Phone Number <span class="req">*</span></label>
            <input name="phone" required placeholder="+91 ..." inputmode="tel">
          </div>
          <div class="field full">
            <label>Email</label>
            <input name="email" type="email" placeholder="you@company.com">
          </div>
          <div class="field full">
            <label>Requirement Details <span class="req">*</span></label>
            <textarea name="requirement" required rows="4" placeholder="Product, quantity, application, delivery location, timeline…">${productHint ? `Product of interest: ${productHint}\n\nQuantity: \nApplication: \nDelivery location: ` : ''}</textarea>
          </div>
          <div class="field full">
            <label class="check-row">
              <input type="checkbox" required>
              I agree that Verdanta Naturals LLP may contact me on WhatsApp regarding this enquiry.
            </label>
          </div>
        </div>
        <p style="font-size:.82rem;color:var(--char-soft);margin:14px 0 0;display:flex;align-items:center;gap:8px;">
          <svg style="width:16px;height:16px;color:#25D366;flex-shrink:0;" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1s-.5-.15-.7.15-.8 1-1 1.2-.4.2-.7.05c-1.8-.9-3-1.6-4.2-3.6-.3-.55.3-.5.9-1.7.1-.2 0-.4-.05-.55S9 6.5 8.8 6c-.2-.5-.4-.4-.55-.4h-.5c-.15 0-.4.05-.6.3-.2.25-.8.8-.8 1.9s.8 2.2 1 2.4c.15.2 1.7 2.6 4.1 3.6 1.5.65 2.1.7 2.8.6.4-.05 1.35-.55 1.55-1.1.2-.55.2-1 .15-1.1-.05-.1-.25-.15-.55-.3zM12 2C6.5 2 2 6.5 2 12c0 1.75.5 3.4 1.3 4.85L2 22l5.25-1.35A9.94 9.94 0 0012 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18a8 8 0 01-4.15-1.15l-.3-.2-3.15.8.85-3.05-.2-.3A8 8 0 1112 20z"/></svg>
          On submit, your enquiry opens directly in WhatsApp addressed to <b style="color:var(--green-deep);">+91 99255 51736</b>.
        </p>
        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">
          <button type="button" class="btn btn-ghost" data-close>Cancel</button>
          <button type="submit" class="btn btn-wa btn-lg">
            <svg style="width:18px;height:18px;" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1s-.5-.15-.7.15-.8 1-1 1.2-.4.2-.7.05c-1.8-.9-3-1.6-4.2-3.6-.3-.55.3-.5.9-1.7.1-.2 0-.4-.05-.55S9 6.5 8.8 6c-.2-.5-.4-.4-.55-.4h-.5c-.15 0-.4.05-.6.3-.2.25-.8.8-.8 1.9s.8 2.2 1 2.4c.15.2 1.7 2.6 4.1 3.6 1.5.65 2.1.7 2.8.6.4-.05 1.35-.55 1.55-1.1.2-.55.2-1 .15-1.1-.05-.1-.25-.15-.55-.3zM12 2C6.5 2 2 6.5 2 12c0 1.75.5 3.4 1.3 4.85L2 22l5.25-1.35A9.94 9.94 0 0012 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18a8 8 0 01-4.15-1.15l-.3-.2-3.15.8.85-3.05-.2-.3A8 8 0 1112 20z"/></svg>
            Send via WhatsApp
          </button>
        </div>
      </form>
    `;
    openModal(enqModal);

    const form = $('#enq-form', enqBody);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get('name') || '').toString().trim();
      const phone = (fd.get('phone') || '').toString().trim();
      const email = (fd.get('email') || '').toString().trim();
      const req = (fd.get('requirement') || '').toString().trim();
      const eid = 'VN-2026-' + String(Math.floor(10000 + Math.random()*89999));

      const msg =
`Hello Verdanta Naturals,

New Enquiry — ${eid}

Name: ${name}
Phone: ${phone}${email ? '\nEmail: ' + email : ''}

Requirement:
${req}

— Sent from verdantanaturals.com`;

      // Persist locally (for the team to review if needed)
      try {
        const store = JSON.parse(localStorage.getItem('vn_enquiries') || '[]');
        store.push({ eid, name, phone, email, requirement: req, at: new Date().toISOString() });
        localStorage.setItem('vn_enquiries', JSON.stringify(store));
      } catch(_) {}

      // Show success + auto-open WhatsApp
      enqBody.innerHTML = `
        <div class="form-success">
          <div class="ok-ic">✓</div>
          <h2>Opening WhatsApp…</h2>
          <p>Your enquiry is ready to send. If WhatsApp didn't open, tap the button below.</p>
          <div class="eid">Reference: ${eid}</div>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px;">
            <a class="btn btn-wa btn-lg" href="${waLink(msg)}" target="_blank">
              <svg style="width:18px;height:18px;" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1s-.5-.15-.7.15-.8 1-1 1.2-.4.2-.7.05c-1.8-.9-3-1.6-4.2-3.6-.3-.55.3-.5.9-1.7.1-.2 0-.4-.05-.55S9 6.5 8.8 6c-.2-.5-.4-.4-.55-.4h-.5c-.15 0-.4.05-.6.3-.2.25-.8.8-.8 1.9s.8 2.2 1 2.4c.15.2 1.7 2.6 4.1 3.6 1.5.65 2.1.7 2.8.6.4-.05 1.35-.55 1.55-1.1.2-.55.2-1 .15-1.1-.05-.1-.25-.15-.55-.3zM12 2C6.5 2 2 6.5 2 12c0 1.75.5 3.4 1.3 4.85L2 22l5.25-1.35A9.94 9.94 0 0012 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18a8 8 0 01-4.15-1.15l-.3-.2-3.15.8.85-3.05-.2-.3A8 8 0 1112 20z"/></svg>
              Open WhatsApp
            </a>
            <button class="btn btn-ghost" data-close>Close</button>
          </div>
        </div>
      `;
      // Auto-navigate
      window.open(waLink(msg), '_blank');
      enqBody.querySelector('[data-close]').addEventListener('click', () => closeModal(enqModal));
    });
  }

  // Expose for inline handlers
  window.openQuickEnquiry = openQuickEnquiry;

  // ---------- Init ----------
  renderProducts();

  // Smooth scroll
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
      if (nav && nav.classList.contains('open')) nav.classList.remove('open');
    });
  });
})();
