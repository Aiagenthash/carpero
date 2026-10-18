/**
 * CARPERO™ - Autonomous Revenue Recovery Systems
 * Interactive Client Application Logic
 * Domain: carpero.com
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.CARPERO_CONFIG || window.HVAC_CONFIG || {};

  // =========================================================================
  // 1. Populate Dynamic Config Data into UI
  // =========================================================================
  function initDynamicContent() {
    // Demo phone numbers
    const demoPhones = document.querySelectorAll('.dynamic-demo-phone');
    demoPhones.forEach(el => {
      const phone = config.demoPhoneNumber || "(888) 482-2247";
      const raw = config.demoPhoneNumberRaw || "+18884822247";
      if (el.tagName === 'A') {
        el.href = `tel:${raw}`;
        if (el.textContent.includes('(') || el.textContent.trim().startsWith('📞')) {
          el.textContent = `📞 ${phone}`;
        }
      } else {
        el.textContent = phone;
      }
    });

    // Founding Partner Spots Scarcity
    const totalSpots = config.foundingPartnerSpotsTotal || 10;
    const claimedSpots = config.foundingPartnerSpotsClaimed || 8;
    const spotsLeft = Math.max(1, totalSpots - claimedSpots);
    const spotsEls = document.querySelectorAll('.dynamic-spots-left');
    spotsEls.forEach(el => {
      el.textContent = `${spotsLeft} of ${totalSpots} Spots Left`;
    });

    // Pricing
    const foundSetup = document.querySelectorAll('.dynamic-founding-setup');
    foundSetup.forEach(el => {
      el.textContent = config.pricing?.founding?.setupFee || "$997";
    });

    const foundMonthly = document.querySelectorAll('.dynamic-founding-monthly');
    foundMonthly.forEach(el => {
      const monthly = config.pricing?.founding?.monthlyFee || "$497";
      el.innerHTML = `${monthly}<span>/month</span>`;
    });

    // Current Year in Footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  initDynamicContent();

  // =========================================================================
  // 2. Interactive Revenue Leak Calculator
  // =========================================================================
  const calcCallsSlider = document.getElementById('calcCallsSlider');
  const calcDealSlider = document.getElementById('calcDealSlider');
  const calcDropSlider = document.getElementById('calcDropSlider');

  const calcCallsVal = document.getElementById('calcCallsVal');
  const calcDealVal = document.getElementById('calcDealVal');
  const calcDropVal = document.getElementById('calcDropVal');

  const calcLostVal = document.getElementById('calcLostVal');
  const calcRecoveredVal = document.getElementById('calcRecoveredVal');
  const calcMonthlyRecovered = document.getElementById('calcMonthlyRecovered');
  const calcRoiVal = document.getElementById('calcRoiVal');

  function calculateRevenueRecovery() {
    if (!calcCallsSlider || !calcDealSlider || !calcDropSlider) return;

    const leads = parseInt(calcCallsSlider.value, 10);
    const dealSize = parseInt(calcDealSlider.value, 10);
    const dropRate = parseInt(calcDropSlider.value, 10);

    // Update Slider Badges
    if (calcCallsVal) calcCallsVal.textContent = `${leads.toLocaleString('en-US')} leads/mo`;
    if (calcDealVal) calcDealVal.textContent = `$${dealSize.toLocaleString('en-US')}`;
    if (calcDropVal) calcDropVal.textContent = `${dropRate}%`;

    // Calculation Model (as per Carpero Brand Revamp Blueprint)
    // Leaked Cash Flow = Volume * Deal Size * (Drop Rate / 100)
    // 500 leads * $2,500 * 35% = $437,500 / year
    const annualLeak = leads * dealSize * (dropRate / 100);
    // Carpero Recapture Rate = 30% of leaked revenue
    const annualRecovered = annualLeak * 0.30;
    // Monthly Net & Founding Partner ROI
    const monthlyGrossRecovered = annualRecovered / 12;
    const monthlyCost = 497;
    const monthlyNet = monthlyGrossRecovered - monthlyCost;
    const roiPercentage = Math.round((monthlyNet / monthlyCost) * 100);

    // Update Dynamic UI Displays
    if (calcLostVal) {
      calcLostVal.textContent = `-$${Math.round(annualLeak).toLocaleString('en-US')} / yr`;
    }
    if (calcRecoveredVal) {
      calcRecoveredVal.textContent = `+$${Math.round(annualRecovered).toLocaleString('en-US')} / yr`;
    }
    if (calcMonthlyRecovered) {
      calcMonthlyRecovered.textContent = `+$${Math.round(monthlyNet).toLocaleString('en-US')}/mo Net`;
    }
    if (calcRoiVal) {
      calcRoiVal.textContent = `${roiPercentage.toLocaleString('en-US')}% ROI`;
    }
  }

  [calcCallsSlider, calcDealSlider, calcDropSlider].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', calculateRevenueRecovery);
      slider.addEventListener('change', calculateRevenueRecovery);
    }
  });

  // Run on initial load
  calculateRevenueRecovery();

  // =========================================================================
  // 3. Live Simulated Recovery Stream Telemetry
  // =========================================================================
  const feedStream = document.querySelector('.feed-stream');
  const simulatedEvents = [
    {
      action: "Resurrected 38-day cold B2B pipeline lead → Booked $14,500 discovery demo",
      val: "+$14,500 Pipeline"
    },
    {
      action: "Intercepted failed card on $2,400/yr SaaS annual plan via instant 1-click SMS portal",
      val: "+$2,400 Recovered"
    },
    {
      action: "After-hours emergency AC replacement lead triaged in 9 seconds → Synced to dispatch",
      val: "+$9,800 Replacement"
    },
    {
      action: "Abandoned checkout flow intercepted via conversational voice → Completed transaction",
      val: "+$3,200 ARR"
    },
    {
      action: "Revived 60-day stalled proposal via custom multi-channel touchpoint",
      val: "+$22,000 Pipeline"
    },
    {
      action: "Silent churn prevented: updated expired payment method before subscription drop",
      val: "+$1,800 ARR"
    }
  ];

  let eventIndex = 0;
  if (feedStream) {
    setInterval(() => {
      const ev = simulatedEvents[eventIndex % simulatedEvents.length];
      eventIndex++;

      const item = document.createElement('div');
      item.className = 'feed-item';
      item.style.opacity = '0';
      item.style.transform = 'translateY(-10px)';
      item.style.transition = 'all 0.4s ease';

      item.innerHTML = `
        <span class="feed-time">Just now</span>
        <span class="feed-action">${ev.action}</span>
        <span class="feed-val">${ev.val}</span>
      `;

      feedStream.insertBefore(item, feedStream.firstChild);

      // Animate in
      requestAnimationFrame(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });

      // Keep maximum 5 items visible in feed
      const items = feedStream.querySelectorAll('.feed-item');
      if (items.length > 5) {
        items[items.length - 1].remove();
      }
    }, 24000); // Pulse a new verified autonomous action every 24 seconds
  }

  // =========================================================================
  // 4. Frictionless 15-Minute Audit Modal & Webhook Dispatch
  // =========================================================================
  const modalOverlay = document.getElementById('reservationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const reservationForm = document.getElementById('territoryReservationForm');
  const modalStep1 = document.getElementById('modalStep1');
  const modalStepSuccess = document.getElementById('modalStepSuccess');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (modalStep1) modalStep1.classList.add('active');
      if (modalStepSuccess) modalStepSuccess.classList.remove('active');
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  // Bind all CTA buttons that open the modal
  document.querySelectorAll('.open-claim-modal, .open-reservation-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⚡ Securing Spot &amp; Generating Audit...</span>`;

      const ownerName = document.getElementById('formOwnerName')?.value || '';
      const email = document.getElementById('formEmail')?.value || '';
      const phone = document.getElementById('formPhone')?.value || '';
      const companyName = document.getElementById('formCompanyName')?.value || '';
      const revRange = document.getElementById('formFsmSystem')?.value || '';

      const formData = {
        ownerName,
        email,
        phone,
        companyName,
        revenueRange: revRange,
        submittedAt: new Date().toISOString(),
        offer: "CARPERO™ Autonomous Revenue Recovery Systems (Founding Partner)"
      };

      // Dispatch to configured Webhook (Make / Zapier / GHL)
      if (config.webhookUrl && config.webhookUrl.startsWith('http') && !config.webhookUrl.includes('your-webhook-id-here')) {
        try {
          await fetch(config.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            mode: 'no-cors'
          });
        } catch (err) {
          console.warn("Webhook dispatch error:", err);
        }
      }

      // Store in localStorage as backup lead record
      try {
        const existingLeads = JSON.parse(localStorage.getItem('carpero_leads') || '[]');
        existingLeads.push(formData);
        localStorage.setItem('carpero_leads', JSON.stringify(existingLeads));
      } catch (err) {
        // storage disabled or full
      }

      // Show success step with pre-filled GHL calendar URL
      setTimeout(() => {
        if (modalStep1) modalStep1.classList.remove('active');
        if (modalStepSuccess) {
          modalStepSuccess.classList.add('active');

          const confirmCompany = document.getElementById('confirmedTerritoryName');
          if (confirmCompany) {
            confirmCompany.textContent = companyName || ownerName || "your company";
          }

          const calendlyBtn = document.getElementById('openCalendlyBtn');
          if (calendlyBtn && config.calendarBookingUrl) {
            try {
              const url = new URL(config.calendarBookingUrl);
              if (ownerName) {
                url.searchParams.set('name', ownerName);
                const nameParts = ownerName.trim().split(/\s+/);
                url.searchParams.set('first_name', nameParts[0] || '');
                if (nameParts.length > 1) {
                  url.searchParams.set('last_name', nameParts.slice(1).join(' '));
                }
              }
              if (email) url.searchParams.set('email', email);
              if (phone) url.searchParams.set('phone', phone);
              if (companyName) url.searchParams.set('company_name', companyName);
              calendlyBtn.href = url.toString();
            } catch (err) {
              calendlyBtn.href = config.calendarBookingUrl;
            }
          }
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 700);
    });
  }

  // =========================================================================
  // 5. FAQ Accordion Logic
  // =========================================================================
  document.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const isActive = parent.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) item.classList.remove('active');
      });

      if (isActive) {
        parent.classList.remove('active');
      } else {
        parent.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 6. Sticky Header & Mobile Navigation Toggle
  // =========================================================================
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

  const mobileToggle = document.getElementById('mobileToggleBtn');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('mobile-open');
      if (isOpen) {
        navMenu.classList.remove('mobile-open');
        navMenu.style.display = 'none';
      } else {
        navMenu.classList.add('mobile-open');
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'rgba(7, 9, 14, 0.98)';
        navMenu.style.padding = '1.75rem 2rem';
        navMenu.style.borderBottom = '1px solid var(--carpero-border)';
        navMenu.style.gap = '1.25rem';
      }
    });

    // Close mobile menu when a nav link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('mobile-open');
          navMenu.style.display = 'none';
        }
      });
    });
  }

  // =========================================================================
  // 7. Smooth Scrolling for Internal Anchors
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
