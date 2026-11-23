/* ==========================================================================
   CORPUS DROIT — Global Interactive Logic
   ========================================================================== */

// Tailwind Theme Config (Shared across all pages)
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: {
            red: {
              950: '#38070B',
              900: '#590D14',
              800: '#7A141D',
              700: '#991B26',
              100: '#F9ECEC',
            },
            ivory: {
              50: '#FDFCF8',
              100: '#F6F2E9',
              200: '#E8E1D3',
              300: '#D5CBB8',
            },
            ink: {
              950: '#181513',
              800: '#2F2A26',
              600: '#5E564F',
              400: '#8F867D',
            },
            brass: '#B08D57',
          },
        },
        fontFamily: {
          logo: ['Cinzel', 'serif'],
          serif: ['Playfair Display', 'serif'],
          sans: ['Plus Jakarta Sans', 'sans-serif'],
        },
      },
    },
  };
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Bar Council of India Disclaimer Modal
  injectDisclaimerModal();

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 3. Insights Category Filter (if on insights.html)
  const filterBtns = document.querySelectorAll('[data-filter]');
  const articleCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length && articleCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach((b) => {
          b.classList.remove('bg-brand-red-800', 'text-brand-ivory-50');
          b.classList.add('bg-brand-ivory-100', 'text-brand-ink-800');
        });
        btn.classList.remove('bg-brand-ivory-100', 'text-brand-ink-800');
        btn.classList.add('bg-brand-red-800', 'text-brand-ivory-50');

        articleCards.forEach((card) => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // 4. Contact Form Submission Feedback
  const inquiryForm = document.getElementById('inquiryForm');
  const formSuccess = document.getElementById('formSuccess');
  if (inquiryForm && formSuccess) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      inquiryForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
    });
  }
});

function injectDisclaimerModal() {
  const modalHTML = `
    <div id="disclaimerModal" class="fixed inset-0 bg-brand-red-950/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 z-[999999] transition-opacity duration-300">
      <div class="bg-brand-ivory-50 max-w-2xl w-full rounded-md shadow-2xl border-t-4 border-brand-red-800 flex flex-col max-h-[92vh] overflow-hidden">
        <div class="px-8 py-6 border-b border-brand-ivory-200 bg-brand-ivory-100/70 text-center">
          <div class="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-red-800 text-brand-ivory-50 mb-3 shadow-md">
            <i data-lucide="scale" class="w-5 h-5"></i>
          </div>
          <h2 class="font-logo text-2xl font-bold tracking-[0.18em] text-brand-red-950 uppercase">CORPUS DROIT</h2>
          <p class="text-[11px] font-bold text-brand-red-800 tracking-[0.16em] mt-1 uppercase">Acceptance of Understanding and Disclaimer</p>
        </div>

        <div class="p-6 sm:p-8 overflow-y-auto legal-scroll text-xs text-brand-ink-600 leading-relaxed space-y-4">
          <div class="p-3.5 bg-brand-red-100 border-l-4 border-brand-red-800 text-brand-red-950 rounded-r text-[11px] font-medium">
            Our law firm complies with the Rules of the Bar Council of India, and undertakes obligation not to solicit and/or to advertise work.
          </div>

          <p class="text-brand-ink-800 font-semibold">
            Agreeing to the below mentioned user terms by ticking "I AGREE", the user is presumed to have fully understood and undertaken the following:
          </p>

          <ul class="space-y-2.5 pl-1">
            <li class="flex items-start gap-2.5">
              <span class="text-brand-red-800 font-bold mt-0.5">&bull;</span>
              <span>That accessing the website the user had voluntarily exercised discretion and/or have requested to gain knowledge about the firm and its activities;</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-brand-red-800 font-bold mt-0.5">&bull;</span>
              <span>That the firm or the members associated with the firm have not exercised any attempt or efforts to advertise, personally communicate, solicit, invite, promote, canvas or publicize any work or willingness to undertake work through this website;</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-brand-red-800 font-bold mt-0.5">&bull;</span>
              <span>That any information so accessed or provided any/to the user is/are so obtained as desired by the user;</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-brand-red-800 font-bold mt-0.5">&bull;</span>
              <span>That any matter so downloaded or accessed or clarifications sought or use of this website and contents therein would not create any lawyer-client relationship, unless specifically and separately agreed by the firm;</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-brand-red-800 font-bold mt-0.5">&bull;</span>
              <span>That, the firm is not liable for any of the user's action relying on the information provided in this website and of any of the consequences so arising thereof.</span>
            </li>
          </ul>

          <div class="mt-4 p-4 bg-brand-ivory-100 border border-brand-ivory-200 rounded">
            <label class="flex items-start gap-3 cursor-pointer select-none">
              <input type="checkbox" id="agreeCheckbox" class="mt-0.5 w-4 h-4 accent-[#7A141D] cursor-pointer flex-shrink-0">
              <span class="text-[11px] text-brand-ink-950 leading-snug font-medium">
                <strong>I AGREE.</strong> I undertake that I have fully understood the terms and undertake that Corpus Droit or members associated with the firm has not advertised / solicited me/us in accessing this firm or in engaging the lawfirm in any of my/our matter.
              </span>
            </label>
          </div>
        </div>

        <div class="px-8 py-4 bg-brand-ivory-100 border-t border-brand-ivory-200 flex justify-end items-center gap-4">
          <button id="btnDecline" type="button" class="px-5 py-2.5 text-xs font-semibold text-brand-ink-600 hover:text-brand-ink-950 transition">Decline &amp; Exit</button>
          <button id="btnEnter" type="button" disabled class="px-7 py-2.5 text-xs font-bold uppercase tracking-wider bg-brand-red-800 text-brand-ivory-50 rounded-[3px] shadow-md disabled:bg-brand-ivory-300 disabled:text-brand-ink-600 disabled:cursor-not-allowed hover:bg-brand-red-700 transition">Enter Chambers</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', modalHTML);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  const modal = document.getElementById('disclaimerModal');
  const checkbox = document.getElementById('agreeCheckbox');
  const enterBtn = document.getElementById('btnEnter');
  const declineBtn = document.getElementById('btnDecline');

  if (sessionStorage.getItem('corpus_droit_bci_accepted') === 'true') {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  } else {
    document.body.classList.add('modal-open');
  }

  checkbox.addEventListener('change', () => {
    enterBtn.disabled = !checkbox.checked;
  });

  enterBtn.addEventListener('click', () => {
    if (checkbox.checked) {
      sessionStorage.setItem('corpus_droit_bci_accepted', 'true');
      modal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });

  declineBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
}

function reopenDisclaimer() {
  const modal = document.getElementById('disclaimerModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
}