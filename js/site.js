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
      if (activeFilter === 'B2C') return p.b2c;
      return true;
    });
    grid.innerHTML = list.map(p => `
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
            <button class="btn btn-primary btn-sm" data-enquire="${p.id}">Enquire</button>
          </div>
        </div>
      </article>
    `).join('');
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
            <button class="btn btn-primary" data-enquire="${p.id}">Enquire Now</button>
            <a class="btn btn-wa" href="${waLink('Hello Verdanta Naturals, I am interested in ' + p.name + ' (' + p.id + '). Please share product details, pack sizes and pricing.')}" target="_blank">
              <svg class="wa-ic" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1s-.5-.15-.7.15-.8 1-1 1.2-.4.2-.7.05c-1.8-.9-3-1.6-4.2-3.6-.3-.55.3-.5.9-1.7.1-.2 0-.4-.05-.55S9 6.5 8.8 6c-.2-.5-.4-.4-.55-.4h-.5c-.15 0-.4.05-.6.3-.2.25-.8.8-.8 1.9s.8 2.2 1 2.4c.15.2 1.7 2.6 4.1 3.6 1.5.65 2.1.7 2.8.6.4-.05 1.35-.55 1.55-1.1.2-.55.2-1 .15-1.1-.05-.1-.25-.15-.55-.3zM12 2C6.5 2 2 6.5 2 12c0 1.75.5 3.4 1.3 4.85L2 22l5.25-1.35A9.94 9.94 0 0012 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18a8 8 0 01-4.15-1.15l-.3-.2-3.15.8.85-3.05-.2-.3A8 8 0 1112 20z"/></svg>
              WhatsApp
            </a>
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
    const enq  = e.target.closest('[data-enquire]');
    const rfq  = e.target.closest('[data-rfq]');
    const b2c  = e.target.closest('[data-b2c-enq]');
    const req  = e.target.closest('[data-requirement]');
    const exp  = e.target.closest('[data-export]');
    if (view) { openProduct(view.dataset.view); }
    if (enq)  { openEnquiry(enq.dataset.enquire); }
    if (rfq)  { openEnquiry(null, 'rfq'); }
    if (b2c)  { openEnquiry(b2c.dataset.b2cEnq || null, 'b2c'); }
    if (req)  { openEnquiry(null, 'requirement'); }
    if (exp)  { openEnquiry(null, 'export'); }
  });

  // ---------- Enquiry modal ----------
  const enqModal = $('#enq-modal');
  const enqBody = $('#enq-body');
  const enqTitle = $('#enq-title');
  const enqSubtitle = $('#enq-subtitle');

  function openEnquiry(productId, mode = 'b2b'){
    let title = 'Tell Us Your Requirement';
    let subtitle = 'Share your product, quantity and specifications. Our team reviews every enquiry personally.';
    if (mode === 'rfq') { title = 'Request a Quote'; subtitle = 'Get a personalised quotation for any product in our range.'; }
    if (mode === 'b2c') { title = 'Product Enquiry'; subtitle = 'Tell us what you need. We will get back to you with pack size, availability and pricing.'; }
    if (mode === 'requirement') { title = 'Submit Your Requirement'; subtitle = 'Detailed requirement form for manufacturers, importers and OEM buyers.'; }
    if (mode === 'export') { title = 'Export Enquiry'; subtitle = 'For international buyers, distributors and importers.'; }

    enqTitle.textContent = title;
    enqSubtitle.textContent = subtitle;
    enqBody.innerHTML = enquiryFormHTML(productId, mode);
    openModal(enqModal);
    // Bind submit
    const form = $('#enq-form', enqBody);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const eid = 'VN-2026-' + String(Math.floor(10000 + Math.random()*89999));
      const productName = form.product ? form.product.value : '—';
      const successMsg = `Hello Verdanta Naturals, I've submitted enquiry ${eid} for ${productName}. Please follow up.`;
      enqBody.innerHTML = `
        <div class="form-success">
          <div class="ok-ic">✓</div>
          <h2>Thank You!</h2>
          <p>Your requirement has been received successfully and forwarded to our team for review.</p>
          <div class="eid">Enquiry ID: ${eid}</div>
          <p style="max-width:480px;margin:0 auto 24px;font-size:.9rem;">A confirmation has been recorded. You can also reach us on WhatsApp to expedite the response.</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
            <a class="btn btn-wa" href="${waLink(successMsg)}" target="_blank">
              <svg class="wa-ic" viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px;"><path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1s-.5-.15-.7.15-.8 1-1 1.2-.4.2-.7.05c-1.8-.9-3-1.6-4.2-3.6-.3-.55.3-.5.9-1.7.1-.2 0-.4-.05-.55S9 6.5 8.8 6c-.2-.5-.4-.4-.55-.4h-.5c-.15 0-.4.05-.6.3-.2.25-.8.8-.8 1.9s.8 2.2 1 2.4c.15.2 1.7 2.6 4.1 3.6 1.5.65 2.1.7 2.8.6.4-.05 1.35-.55 1.55-1.1.2-.55.2-1 .15-1.1-.05-.1-.25-.15-.55-.3zM12 2C6.5 2 2 6.5 2 12c0 1.75.5 3.4 1.3 4.85L2 22l5.25-1.35A9.94 9.94 0 0012 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18a8 8 0 01-4.15-1.15l-.3-.2-3.15.8.85-3.05-.2-.3A8 8 0 1112 20z"/></svg>
              WhatsApp Us
            </a>
            <button class="btn btn-ghost" data-close>Back to Products</button>
          </div>
        </div>
      `;
      enqBody.querySelector('[data-close]').addEventListener('click', () => closeModal(enqModal));
    });
  }

  function enquiryFormHTML(productId, mode){
    const p = productId ? window.VN_PRODUCTS.find(x => x.id === productId) : null;
    const isB2C = mode === 'b2c';
    const isExport = mode === 'export';
    const isRFQ = mode === 'rfq';

    const productOptions = window.VN_PRODUCTS.map(x => `<option value="${x.name}" ${p && p.id === x.id ? 'selected' : ''}>${x.name}</option>`).join('');

    // B2C — simpler form
    if (isB2C) {
      return `
        <form id="enq-form">
          <div class="form-section">
            <div class="form-grid">
              <div class="field"><label>Name <span class="req">*</span></label><input required></div>
              <div class="field"><label>Mobile <span class="req">*</span></label><input required></div>
              <div class="field full"><label>Email</label><input type="email"></div>
              <div class="field"><label>Product <span class="req">*</span></label><select name="product" required>${productOptions}</select></div>
              <div class="field"><label>Pack Size</label><select><option>100g</option><option>250g</option><option>500g</option><option>1kg</option></select></div>
              <div class="field"><label>Quantity</label><input type="number" min="1" value="1"></div>
              <div class="field"><label>Delivery City</label><input placeholder="e.g. Mumbai"></div>
              <div class="field full"><label>Message</label><textarea placeholder="Anything specific we should know?"></textarea></div>
              <div class="field full">
                <label class="check-row"><input type="checkbox" required> I agree that Verdanta Naturals LLP may contact me regarding this enquiry.</label>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button type="button" class="btn btn-ghost" data-close>Cancel</button>
            <button type="submit" class="btn btn-primary">Enquire / Buy</button>
          </div>
        </form>
      `;
    }

    // B2B / RFQ / Export / Requirement — full form
    return `
      <form id="enq-form">
        <div class="form-section">
          <div class="form-section-title"><span>1</span>Customer Information</div>
          <div class="form-grid">
            <div class="field"><label>Full Name <span class="req">*</span></label><input required></div>
            <div class="field"><label>Company Name <span class="req">*</span></label><input required></div>
            <div class="field"><label>Designation</label><input placeholder="e.g. Procurement Manager"></div>
            <div class="field"><label>Email <span class="req">*</span></label><input type="email" required></div>
            <div class="field"><label>Mobile / WhatsApp <span class="req">*</span></label><input required></div>
            <div class="field"><label>Country <span class="req">*</span></label><input required value="${isExport ? '' : 'India'}"></div>
            <div class="field"><label>State</label><input></div>
            <div class="field"><label>City</label><input></div>
            <div class="field full"><label>Company Website</label><input type="url" placeholder="https://"></div>
            <div class="field full">
              <label>Customer Type</label>
              <select>
                <option>Food Manufacturer</option>
                <option>Ingredient Buyer</option>
                <option>Distributor</option>
                <option>Wholesaler</option>
                <option>HoReCa</option>
                <option>Nutraceutical Company</option>
                <option>Pharmaceutical Company</option>
                <option>Cosmetics / Personal Care</option>
                <option>Retailer</option>
                <option>Importer</option>
                <option>Exporter</option>
                <option>OEM</option>
                <option>Private Label</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-title"><span>2</span>Product Requirement</div>
          <div class="form-grid">
            <div class="field"><label>Product <span class="req">*</span></label><select name="product" required>${productOptions}</select></div>
            <div class="field">
              <label>Required Form</label>
              <select><option>Powder</option><option>Flakes</option><option>Granules</option><option>Slices</option><option>Chopped</option><option>Kibbled</option><option>Dice / Cubes</option><option>Other</option></select>
            </div>
            <div class="field"><label>Required Quantity</label><input type="number" placeholder="e.g. 500"></div>
            <div class="field">
              <label>Unit</label>
              <select><option>KG</option><option>MT (Metric Tonne)</option><option>Grams</option><option>Other</option></select>
            </div>
            <div class="field"><label>Monthly Requirement</label><input placeholder="e.g. 500 kg / month"></div>
            <div class="field"><label>Annual Requirement</label><input placeholder="e.g. 6 MT / year"></div>
            <div class="field full">
              <label>Application — what will the product be used for?</label>
              <select>
                <option>Food Manufacturing</option><option>Seasoning</option><option>Bakery</option><option>Beverage</option><option>Ready-to-Eat Food</option><option>Nutraceutical</option><option>HoReCa</option><option>Retail</option><option>Other</option>
              </select>
            </div>
            <div class="field full"><label>Application details (optional)</label><textarea placeholder="Describe your product / recipe / brand context"></textarea></div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-title"><span>3</span>Specification Requirements</div>
          <div class="form-grid">
            <div class="field"><label>Moisture</label><input placeholder="e.g. ≤ 6%"></div>
            <div class="field"><label>Particle / Mesh Size</label><input placeholder="e.g. 80 mesh"></div>
            <div class="field"><label>Cut Size</label><input placeholder="e.g. 3–5 mm"></div>
            <div class="field"><label>Color Requirement</label><input placeholder="e.g. natural / bright"></div>
            <div class="field"><label>Shelf Life</label><input placeholder="e.g. 18 months"></div>
            <div class="field"><label>Microbiological Requirements</label><input placeholder="e.g. TPC < 10⁴ cfu/g"></div>
            <div class="field"><label>Allergen Requirements</label><input></div>
            <div class="field"><label>Food Grade / Organic</label><input placeholder="e.g. Food Grade, USDA Organic"></div>
            <div class="field full"><label>Other Specifications</label><textarea placeholder="Any additional technical requirements"></textarea></div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-title"><span>4</span>Packaging & OEM</div>
          <div class="form-grid">
            <div class="field">
              <label>Preferred Packaging</label>
              <select><option>Retail</option><option>Bulk</option><option>Custom</option><option>Private Label</option><option>Other</option></select>
            </div>
            <div class="field"><label>Preferred Pack Size</label><input placeholder="e.g. 25 kg woven bag"></div>
            <div class="field full">
              <label>Interested in OEM / Private Label?</label>
              <div class="radio-row">
                <label><input type="radio" name="oem" value="yes"> Yes</label>
                <label><input type="radio" name="oem" value="no" checked> No</label>
                <label><input type="radio" name="oem" value="explore"> Exploring</label>
              </div>
            </div>
            <div class="field"><label>Brand Name (if OEM)</label><input></div>
            <div class="field"><label>Artwork Available?</label><select><option>N/A</option><option>Yes</option><option>No — need support</option></select></div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-title"><span>5</span>Commercial & Delivery</div>
          <div class="form-grid">
            <div class="field">
              <label>Purchase Frequency</label>
              <select><option>One Time</option><option>Monthly</option><option>Quarterly</option><option>Annual Contract</option><option>Regular Supply</option><option>To Be Decided</option></select>
            </div>
            <div class="field"><label>Required Delivery Location</label><input placeholder="City, Country / Port"></div>
            <div class="field"><label>Required Delivery Date</label><input type="date"></div>
            <div class="field"><label>Target Budget / Price (optional)</label><input placeholder="e.g. USD 4.5 / kg"></div>
            <div class="field full"><label>Upload Document (RFQ, Spec, Artwork)</label><input type="file"></div>
            <div class="field full"><label>Additional Requirements / Remarks</label><textarea placeholder="Anything else our team should know"></textarea></div>
          </div>
        </div>

        <label class="check-row">
          <input type="checkbox" required>
          I agree that Verdanta Naturals LLP may contact me regarding this enquiry and process the information I've provided.
        </label>

        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">
          <button type="button" class="btn btn-ghost" data-close>Cancel</button>
          <button type="submit" class="btn btn-primary btn-lg">Submit Requirement</button>
        </div>
      </form>
    `;
  }

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
      if (nav.classList.contains('open')) nav.classList.remove('open');
    });
  });
})();
