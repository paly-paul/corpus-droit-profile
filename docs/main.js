/* ==========================================================================
   CORPUS DROIT — Main Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // 1. Render inline SVG icons
  if (typeof window.renderIcons === 'function') {
    window.renderIcons();
  }

  // 2. BCI Disclaimer Modal
  injectDisclaimerModal();

  // 3. Mobile nav toggle
  var menuBtn = document.getElementById('menuBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      mobileNav.classList.toggle('is-open');
    });
  }

  // 4. Insights category filter
  var filterBtns = document.querySelectorAll('.filter-btn');
  var articleCards = document.querySelectorAll('.article-card[data-cat]');
  if (filterBtns.length && articleCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.dataset.cat;
        articleCards.forEach(function (card) {
          if (cat === 'all' || card.dataset.cat === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Contact form feedback
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('formSuccess');
      if (success) {
        contactForm.style.display = 'none';
        success.classList.add('is-visible');
      }
    });
  }

});

/* --------------------------------------------------------------------------
   BCI Disclaimer Modal
   -------------------------------------------------------------------------- */
function injectDisclaimerModal() {
  var STORAGE_KEY = 'corpus_droit_bci_accepted';

  if (sessionStorage.getItem(STORAGE_KEY) === 'true') return;

  var modal = document.createElement('div');
  modal.id = 'disclaimerModal';
  modal.className = 'disclaimer-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modalTitle');

  modal.innerHTML = [
    '<div class="disclaimer-modal__box">',
    '  <div class="disclaimer-modal__header">',
    '    <div class="disclaimer-modal__seal">',
    '      <i data-lucide="shield-alert" class="w-5 h-5"></i>',
    '    </div>',
    '    <div id="modalTitle" class="disclaimer-modal__title">CORPUS DROIT</div>',
    '    <div class="disclaimer-modal__subtitle">Legal Disclaimer — Bar Council of India Rules</div>',
    '  </div>',
    '  <div class="disclaimer-modal__body">',
    '    <div class="disclaimer-modal__notice">',
    '      This website is for informational purposes only. The information contained herein does not constitute legal advice and must not be relied upon as such.',
    '    </div>',
    '    <p class="disclaimer-modal__intro">As per the rules of the Bar Council of India, advocates are not permitted to solicit work or advertise in any manner. By accessing this website, you acknowledge and confirm that:</p>',
    '    <ul class="disclaimer-modal__list">',
    '      <li>You are seeking information about Corpus Droit of your own accord and no information or advertisement has been provided to you.</li>',
    '      <li>The information on this website is provided solely for the purpose of enabling you to know about Corpus Droit, its expertise, and its advocates.</li>',
    '      <li>You have not been solicited in any manner, directly or indirectly, to retain Corpus Droit or any of its advocates.</li>',
    '      <li>The content of this website is not to be construed as legal advice in any form whatsoever. No attorney-client relationship is created by accessing or reviewing this website.</li>',
    '    </ul>',
    '    <div class="disclaimer-modal__agree">',
    '      <label>',
    '        <input type="checkbox" id="agreeCheckbox">',
    '        I have read and understood the above disclaimer and confirm that I am seeking information about Corpus Droit on my own initiative.',
    '      </label>',
    '    </div>',
    '  </div>',
    '  <div class="disclaimer-modal__footer">',
    '    <button class="btn-decline" id="btnDecline">Decline &amp; Exit</button>',
    '    <button class="btn-enter" id="btnEnter" disabled>Enter Website</button>',
    '  </div>',
    '</div>',
  ].join('\n');

  document.body.appendChild(modal);
  document.body.classList.add('modal-open');

  if (typeof window.renderIcons === 'function') {
    window.renderIcons();
  }

  var checkbox = document.getElementById('agreeCheckbox');
  var btnEnter = document.getElementById('btnEnter');
  var btnDecline = document.getElementById('btnDecline');

  checkbox.addEventListener('change', function () {
    btnEnter.disabled = !checkbox.checked;
  });

  btnEnter.addEventListener('click', function () {
    if (!checkbox.checked) return;
    sessionStorage.setItem(STORAGE_KEY, 'true');
    modal.classList.add('is-hidden');
    document.body.classList.remove('modal-open');
  });

  btnDecline.addEventListener('click', function () {
    window.history.back();
    setTimeout(function () { window.location.href = 'about:blank'; }, 300);
  });
}

/* --------------------------------------------------------------------------
   Global: allow footer link to reopen disclaimer
   -------------------------------------------------------------------------- */
function reopenDisclaimer() {
  sessionStorage.removeItem('corpus_droit_bci_accepted');
  var existing = document.getElementById('disclaimerModal');
  if (existing) { existing.remove(); }
  injectDisclaimerModal();
}

window.reopenDisclaimer = reopenDisclaimer;
