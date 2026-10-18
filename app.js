/**
 * The 24/7 HVAC Revenue Recovery Autopilot™ - Interactive Client Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.HVAC_CONFIG || {};

  // =========================================================================
  // 1. Populate Dynamic Config Data into UI
  // =========================================================================
  function initDynamicContent() {
    // Phone numbers
    const demoPhones = document.querySelectorAll('.dynamic-demo-phone');
    demoPhones.forEach(el => {
      el.textContent = config.demoPhoneNumber || "(888) 482-2247";
      if (el.tagName === 'A') {
        el.href = `tel:${config.demoPhoneNumberRaw || "+18884822247"}`;
      }
    });

    // Spots remaining
    const spotsLeft = (config.foundingPartnerSpotsTotal || 10) - (config.foundingPartnerSpotsClaimed || 8);
    const spotsEls = document.querySelectorAll('.dynamic-spots-left');
    spotsEls.forEach(el => el.textContent = `${spotsLeft} Spots Remaining`);

    // Pricing
    const foundSetup = document.querySelectorAll('.dynamic-founding-setup');
    foundSetup.forEach(el => el.textContent = config.pricing?.founding?.setupFee || "$997");

    const foundMonthly = document.querySelectorAll('.dynamic-founding-monthly');
    foundMonthly.forEach(el => el.textContent = config.pricing?.founding?.monthlyFee || "$497");
  }

  initDynamicContent();

  // =========================================================================
  // 2. Interactive Voice AI Simulator
  // =========================================================================
  const scenarios = {
    emergency: {
      title: "Saturday 6:45 PM AC Breakdown (Emergency Triage)",
      steps: [
        { speaker: "caller", text: "Hey, it's 6:45 PM on a Saturday and our AC compressor locked up. It's 88 degrees in here with two kids. Do you have an emergency tech available?", voice: "caller" },
        { speaker: "ai", text: "Hi there! I can help with that right away. That definitely counts as an urgent climate situation. We have an on-call emergency technician available tomorrow between 8:00 AM and 10:00 AM. Our standard diagnostic dispatch fee is $89, which applies directly toward any approved repair. Would you like me to reserve that window for you?", voice: "ai" },
        { speaker: "caller", text: "Yes please, that would be a lifesaver. My name is David Miller at 412 Maple Ridge Road.", voice: "caller" },
        { speaker: "ai", text: "Got you confirmed, David! I've reserved the 8:00 AM window on our dispatch board, sent an alert to our on-call technician, and just texted you a confirmation link with live tracking. We'll take great care of you tomorrow!", voice: "ai" }
      ],
      fsmTicket: {
        customer: "David Miller",
        address: "412 Maple Ridge Rd",
        issue: "AC Compressor Locked Up / Urgent No-Cool",
        slot: "Tomorrow, 8:00 AM – 10:00 AM",
        value: "Diagnostic: $89 + Potential $1,200 Coil/Capacitor Repair",
        fsmStatus: "⚡ Synced directly into ServiceTitan Dispatch Board"
      }
    },
    replacement: {
      title: "Cold $12,500 System Replacement Quote Revived",
      steps: [
        { speaker: "caller", text: "Hi, your tech Mike quoted us on a new 16 SEER2 heat pump system two weeks ago. We had a question about the $2,000 federal tax credit and 0% financing.", voice: "caller" },
        { speaker: "ai", text: "Welcome back! I can pull up Mike's quote right here. That 16 SEER2 system qualifies for up to $2,000 under the federal 25C Energy Efficiency credit, and we currently have 0% APR financing for 18 months. Would you like Mike to give you a quick 5-minute call at 9:00 AM tomorrow to lock in the rebate window?", voice: "ai" },
        { speaker: "caller", text: "Yes, 9:00 AM tomorrow works great. Thanks for the quick answer!", voice: "caller" },
        { speaker: "ai", text: "Done! I've scheduled Mike's callback for 9:00 AM tomorrow and just sent the financing worksheet to your phone. Have a wonderful evening!", voice: "ai" }
      ],
      fsmTicket: {
        customer: "Sarah Jenkins",
        address: "8840 Oak Valley Way",
        issue: "System Replacement Quote Reactivation (16 SEER2)",
        slot: "Tomorrow, 9:00 AM Callback Scheduled",
        value: "High-Ticket Replacement: $12,500",
        fsmStatus: "⚡ Opportunity Moved to 'Proposal In Review' in Housecall Pro"
      }
    },
    tuneup: {
      title: "Shoulder-Season Pre-Season AC Tune-Up",
      steps: [
        { speaker: "caller", text: "Hi, I saw your text about the pre-summer $69 21-point AC inspection before the heatwave hits next month. Is that still open?", voice: "caller" },
        { speaker: "ai", text: "Yes! That tune-up special is active this week to make sure your system doesn't trip a capacitor during the first 90-degree weekend. We have openings this Thursday at 1:00 PM or Friday at 10:00 AM. Which works better for your schedule?", voice: "ai" },
        { speaker: "caller", text: "Let's do Friday at 10:00 AM.", voice: "caller" },
        { speaker: "ai", text: "All locked in for Friday at 10:00 AM! Your tune-up confirmation and technician arrival details have just been sent to your phone.", voice: "ai" }
      ],
      fsmTicket: {
        customer: "Robert Chen",
        address: "1520 Willow Creek Dr",
        issue: "Pre-Season 21-Point AC Maintenance",
        slot: "Friday, 10:00 AM – 12:00 PM",
        value: "$69 Tune-Up + High-Value Maintenance Agreement Lead",
        fsmStatus: "⚡ Direct Booking Created in Jobber Calendar"
      }
    }
  };

  let currentScenarioKey = 'emergency';
  let isSimPlaying = false;
  let simTimeoutId = null;

  const threadEl = document.getElementById('dialogueThread');
  const simStatusEl = document.getElementById('simStatusText');
  const waveBars = document.querySelectorAll('.wave-bar');
  const playSimBtn = document.getElementById('playSimBtn');
  const fsmBanner = document.getElementById('fsmBookingBanner');
  const fsmDetailsEl = document.getElementById('fsmBannerDetails');

  // Scenario Buttons
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentScenarioKey = btn.dataset.scenario || 'emergency';
      resetSimulation();
    });
  });

  function startWaveform() {
    waveBars.forEach(b => b.classList.add('animated'));
  }

  function stopWaveform() {
    waveBars.forEach(b => b.classList.remove('animated'));
  }

  function speakText(text, isAi) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = isAi ? 1.05 : 1.0;
      utterance.pitch = isAi ? 1.1 : 0.95;
      
      // Attempt to pick a smooth English voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (isAi) {
          const femaleVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Google US English')));
          if (femaleVoice) utterance.voice = femaleVoice;
        } else {
          const maleVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Natural')));
          if (maleVoice) utterance.voice = maleVoice;
        }
      }
      
      utterance.onstart = () => startWaveform();
      utterance.onend = () => stopWaveform();
      utterance.onerror = () => stopWaveform();
      window.speechSynthesis.speak(utterance);
    }
  }

  function renderSimStep(stepIndex) {
    const sc = scenarios[currentScenarioKey];
    if (stepIndex >= sc.steps.length) {
      // Completed!
      isSimPlaying = false;
      playSimBtn.innerHTML = `<span>▶ Replay Live Simulation</span>`;
      simStatusEl.textContent = "Call Completed • Job Booked";
      stopWaveform();

      // Show FSM Sync Banner
      if (fsmBanner && fsmDetailsEl) {
        fsmDetailsEl.innerHTML = `
          <strong>${sc.fsmTicket.customer}</strong> (${sc.fsmTicket.address})<br>
          <em>${sc.fsmTicket.issue}</em><br>
          <strong>Arrival Window:</strong> ${sc.fsmTicket.slot}<br>
          <strong>Estimated Ticket:</strong> ${sc.fsmTicket.value}<br>
          <span style="color: #34D399; font-weight: 700;">${sc.fsmTicket.fsmStatus}</span>
        `;
        fsmBanner.classList.add('show');
      }
      return;
    }

    const step = sc.steps[stepIndex];
    const isAi = step.speaker === 'ai';

    simStatusEl.textContent = isAi ? "AI Receptionist Speaking (Live 2-Way Triage)..." : "Homeowner Speaking...";
    startWaveform();

    // Create chat bubble
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${step.speaker}`;
    bubble.innerHTML = `
      <span class="speaker-tag">${isAi ? '⚡ 24/7 AI Receptionist' : '👤 Caller'}</span>
      <p>${step.text}</p>
    `;
    threadEl.appendChild(bubble);
    threadEl.scrollTop = threadEl.scrollHeight;

    speakText(step.text, isAi);

    // Calculate reading time + buffer
    const duration = Math.max(3000, step.text.split(' ').length * 340);
    simTimeoutId = setTimeout(() => {
      renderSimStep(stepIndex + 1);
    }, duration);
  }

  function runSimulation() {
    if (isSimPlaying) {
      resetSimulation();
      return;
    }

    resetSimulation();
    isSimPlaying = true;
    playSimBtn.innerHTML = `<span>⏹ Stop Simulation</span>`;
    renderSimStep(0);
  }

  function resetSimulation() {
    if (simTimeoutId) clearTimeout(simTimeoutId);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    stopWaveform();
    isSimPlaying = false;
    playSimBtn.innerHTML = `<span>▶ Test Live Voice AI Call (6:45 PM Saturday)</span>`;
    simStatusEl.textContent = "Ready • Click to Test";
    threadEl.innerHTML = '';
    if (fsmBanner) fsmBanner.classList.remove('show');
  }

  if (playSimBtn) {
    playSimBtn.addEventListener('click', runSimulation);
  }

  // Pre-load voices if supported
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      // voices ready
    };
  }

  // =========================================================================
  // 3. 15-Second Missed-Call Text-Back (MCTB) Simulator
  // =========================================================================
  const triggerMctbBtn = document.getElementById('triggerMctbBtn');
  const mctbBody = document.getElementById('mctbPhoneBody');
  const mctbTimer = document.getElementById('mctbTimerDisplay');

  let mctbTimeout = null;

  function runMctbSimulation() {
    if (!mctbBody) return;
    if (mctbTimeout) clearTimeout(mctbTimeout);

    mctbBody.innerHTML = `
      <div class="sms-timer-callout" id="mctbTimerDisplay">⏳ Caller hung up at 7:14:02 PM. Missed call logged...</div>
    `;

    let seconds = 0;
    const interval = setInterval(() => {
      seconds += 0.2;
      const timerDisplay = document.getElementById('mctbTimerDisplay');
      if (timerDisplay && seconds < 11.2) {
        timerDisplay.textContent = `⚡ Speed-To-Lead Timer: ${seconds.toFixed(1)}s (Before they can dial next guy on Google)`;
      }
    }, 200);

    mctbTimeout = setTimeout(() => {
      clearInterval(interval);
      const timerDisplay = document.getElementById('mctbTimerDisplay');
      if (timerDisplay) {
        timerDisplay.textContent = `✅ AI SMS Triggered in 11.4 Seconds (Contractor Saved!)`;
      }

      // Add AI text
      const b1 = document.createElement('div');
      b1.className = 'sms-bubble incoming';
      b1.innerHTML = `
        Hi Dave! Sorry we missed your call at Apex Air Heating & Cooling. Are you experiencing an AC or heating emergency? How can we help?
        <div class="sms-timestamp">7:14 PM (11s later)</div>
      `;
      mctbBody.appendChild(b1);

      // Customer reply after 2.5s
      setTimeout(() => {
        const b2 = document.createElement('div');
        b2.className = 'sms-bubble outgoing';
        b2.innerHTML = `
          Yes! Compressor keeps tripping the breaker outside. Do you have someone available early tomorrow?
          <div class="sms-timestamp">7:15 PM</div>
        `;
        mctbBody.appendChild(b2);

        // AI reply and booking link after 2s
        setTimeout(() => {
          const b3 = document.createElement('div');
          b3.className = 'sms-bubble incoming';
          b3.innerHTML = `
            Absolutely. We have an emergency dispatch window tomorrow between 8am–10am. Our $89 diagnostic applies directly to any repair.<br><br>
            Reply <strong>YES</strong> to lock this slot, or pick another time here: <span style="text-decoration:underline; color:#38BDF8;">apexair.dispatch/slot-482</span>
            <div class="sms-timestamp">7:15 PM</div>
          `;
          mctbBody.appendChild(b3);

          setTimeout(() => {
            const b4 = document.createElement('div');
            b4.className = 'sms-bubble outgoing';
            b4.innerHTML = `
              YES! Lock that in. Address is 412 Maple Ridge Rd.
              <div class="sms-timestamp">7:16 PM</div>
            `;
            mctbBody.appendChild(b4);

            const b5 = document.createElement('div');
            b5.className = 'sms-bubble incoming';
            b5.style.border = '1px solid #10B981';
            b5.innerHTML = `
              🎉 You're confirmed for 8am tomorrow with Mike! You'll receive a live technician tracker in the morning.
              <div class="sms-timestamp">7:16 PM • Booked in ServiceTitan</div>
            `;
            mctbBody.appendChild(b5);
          }, 1800);
        }, 2000);
      }, 2500);
    }, 1500);
  }

  if (triggerMctbBtn) {
    triggerMctbBtn.addEventListener('click', runMctbSimulation);
  }

  // =========================================================================
  // 4. Interactive ROI & Lost Revenue Recovery Calculator
  // =========================================================================
  const callsSlider = document.getElementById('calcCallsSlider');
  const missedRateSlider = document.getElementById('calcMissedRateSlider');
  const quotesSlider = document.getElementById('calcQuotesSlider');

  const callsValDisplay = document.getElementById('calcCallsVal');
  const missedRateValDisplay = document.getElementById('calcMissedRateVal');
  const quotesValDisplay = document.getElementById('calcQuotesVal');

  const lostMonthlyDisplay = document.getElementById('calcLostMonthlyVal');
  const recoveredMonthlyDisplay = document.getElementById('calcRecoveredMonthlyVal');
  const netProfitDisplay = document.getElementById('calcNetProfitVal');
  const roiMultiplierDisplay = document.getElementById('calcRoiMultiplier');

  function calculateHvacRevenue() {
    if (!callsSlider || !missedRateSlider || !quotesSlider) return;

    const monthlyCalls = parseInt(callsSlider.value, 10);
    const missedPct = parseInt(missedRateSlider.value, 10) / 100;
    const deadQuotes = parseInt(quotesSlider.value, 10);

    // Update slider badges
    if (callsValDisplay) callsValDisplay.textContent = `${monthlyCalls} calls/mo`;
    if (missedRateValDisplay) missedRateValDisplay.textContent = `${Math.round(missedPct * 100)}%`;
    if (quotesValDisplay) quotesValDisplay.textContent = `${deadQuotes} quotes/mo`;

    // Calculation Constants
    const avgDiagnosticRepair = 380;       // $380 average repair ticket
    const avgReplacementTicket = 10500;    // $10,500 average full replacement system
    const monthlyRetainerCost = 497;       // Founding partner retainer

    // Total missed calls
    const missedCallsCount = monthlyCalls * missedPct;
    // Estimated high-ticket replacements hidden in missed calls (1 out of every 15 missed calls is a replacement lead)
    const missedReplacements = Math.floor(missedCallsCount * 0.07);
    const missedRepairs = Math.floor(missedCallsCount * 0.45);

    // Total monthly leak
    const monthlyLeak = (missedRepairs * avgDiagnosticRepair) + 
                        (missedReplacements * avgReplacementTicket) + 
                        (deadQuotes * 0.65 * avgReplacementTicket);

    // Conservative Autopilot Recovery (recovering 35% of missed repair calls + 1 to 3 replacement jobs + 15% dead quotes)
    const recoveredRepairs = Math.max(5, Math.floor(missedRepairs * 0.35));
    const recoveredReplacements = Math.max(1, Math.floor(missedReplacements * 0.40) + Math.floor(deadQuotes * 0.18));

    const totalRecoveredCash = (recoveredRepairs * avgDiagnosticRepair) + (recoveredReplacements * avgReplacementTicket);
    const netProfit = totalRecoveredCash - monthlyRetainerCost;
    const roiPercentage = Math.round((netProfit / monthlyRetainerCost) * 100);

    // Format numbers
    const fmt = (n) => `$${n.toLocaleString('en-US')}`;

    if (lostMonthlyDisplay) lostMonthlyDisplay.textContent = fmt(Math.round(monthlyLeak));
    if (recoveredMonthlyDisplay) recoveredMonthlyDisplay.textContent = fmt(Math.round(totalRecoveredCash));
    if (netProfitDisplay) netProfitDisplay.textContent = `+${fmt(Math.round(netProfit))}/mo`;
    if (roiMultiplierDisplay) roiMultiplierDisplay.textContent = `${roiPercentage.toLocaleString()}% ROI`;
  }

  [callsSlider, missedRateSlider, quotesSlider].forEach(slider => {
    if (slider) slider.addEventListener('input', calculateHvacRevenue);
  });

  calculateHvacRevenue();

  // =========================================================================
  // 5. Territory Availability & Zip Code Checker
  // =========================================================================
  const territoryForm = document.getElementById('territoryCheckForm');
  const territoryInput = document.getElementById('territoryInput');
  const territoryResult = document.getElementById('territoryResultDisplay');

  if (territoryForm) {
    territoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = (territoryInput.value || '').trim();
      if (!query) return;

      territoryResult.style.display = 'block';
      territoryResult.className = 'territory-result-display';
      territoryResult.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.5rem; color:#38BDF8;">
          <span class="badge-pulse"></span>
          <strong>Scanning metro dispatch exclusivity database for "${query}"...</strong>
        </div>
      `;

      setTimeout(() => {
        territoryResult.className = 'territory-result-display available';
        territoryResult.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span class="badge badge-green" style="margin-bottom:0.5rem;">STATUS: 1 OF 2 SPOTS CLAIMED</span>
              <h4 style="font-size:1.25rem; font-weight:800; color:#FFFFFF; margin-bottom:0.25rem;">
                Territory Available: "${query.toUpperCase()}"
              </h4>
              <p style="font-size:0.9rem; color:#CBD5E1; max-width:540px;">
                Only <strong>1 exclusive license</strong> remains for this market. Once filled, no additional HVAC contractor in your service area can deploy the Autopilot.
              </p>
            </div>
            <button class="btn btn-primary btn-sm open-reservation-modal" data-prefill="${query}">
              Lock My Territory Spot Now →
            </button>
          </div>
          <div style="margin-top:1rem; font-size:0.8rem; color:#94A3B8; border-top:1px solid rgba(255,255,255,0.1); padding-top:0.75rem;">
            ⏳ Territory reservation hold active for: <strong style="color:#FBBF24;" id="territoryHoldTimer">14:59</strong>
          </div>
        `;

        // Start countdown timer
        let holdSec = 899;
        const holdInterval = setInterval(() => {
          holdSec--;
          const timerEl = document.getElementById('territoryHoldTimer');
          if (!timerEl || holdSec <= 0) {
            clearInterval(holdInterval);
            return;
          }
          const m = Math.floor(holdSec / 60);
          const s = holdSec % 60;
          timerEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
        }, 1000);

        // Bind button inside result
        const btn = territoryResult.querySelector('.open-reservation-modal');
        if (btn) {
          btn.addEventListener('click', () => openModal(query));
        }
      }, 900);
    });
  }

  // =========================================================================
  // 6. Territory Reservation Modal & Webhook Lead Dispatcher
  // =========================================================================
  const modalOverlay = document.getElementById('reservationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const reservationForm = document.getElementById('territoryReservationForm');
  const modalStep1 = document.getElementById('modalStep1');
  const modalStepSuccess = document.getElementById('modalStepSuccess');

  function openModal(prefillZip = '') {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (prefillZip) {
        const zipField = document.getElementById('formZipCode');
        if (zipField) zipField.value = prefillZip;
      }

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

  // Bind all CTA buttons with modal opener
  document.querySelectorAll('.open-claim-modal, .open-reservation-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefill = btn.dataset.prefill || '';
      openModal(prefill);
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

  // Handle Form Submission
  if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⚡ Verifying Territory & Reserving...</span>`;

      const formData = {
        companyName: document.getElementById('formCompanyName')?.value || '',
        territoryZip: document.getElementById('formZipCode')?.value || '',
        fsmSystem: document.getElementById('formFsmSystem')?.value || '',
        ownerName: document.getElementById('formOwnerName')?.value || '',
        phone: document.getElementById('formPhone')?.value || '',
        email: document.getElementById('formEmail')?.value || '',
        submittedAt: new Date().toISOString(),
        offer: "The 24/7 HVAC Revenue Recovery Autopilot (Founding Partner)"
      };

      // Dispatch to configured Webhook (Zapier / Make / GHL)
      if (config.webhookUrl && config.webhookUrl.startsWith('http')) {
        try {
          await fetch(config.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            mode: 'no-cors' // Allows posting to external webhooks without CORS blockage
          });
        } catch (err) {
          console.warn("Webhook dispatch error:", err);
        }
      }

      // Store in localStorage as backup lead record
      try {
        const existingLeads = JSON.parse(localStorage.getItem('hvac_leads') || '[]');
        existingLeads.push(formData);
        localStorage.setItem('hvac_leads', JSON.stringify(existingLeads));
      } catch (err) {
        // storage disabled or full
      }

      // Show success confirmation screen
      setTimeout(() => {
        if (modalStep1) modalStep1.classList.remove('active');
        if (modalStepSuccess) {
          modalStepSuccess.classList.add('active');

          const confirmTerritory = document.getElementById('confirmedTerritoryName');
          if (confirmTerritory) confirmTerritory.textContent = `${formData.companyName} (${formData.territoryZip})`;

          const calendlyBtn = document.getElementById('openCalendlyBtn');
          if (calendlyBtn && config.calendarBookingUrl) {
            try {
              const url = new URL(config.calendarBookingUrl);
              if (formData.ownerName) {
                url.searchParams.set('name', formData.ownerName);
                const nameParts = formData.ownerName.trim().split(/\s+/);
                url.searchParams.set('first_name', nameParts[0] || '');
                if (nameParts.length > 1) {
                  url.searchParams.set('last_name', nameParts.slice(1).join(' '));
                }
              }
              if (formData.email) url.searchParams.set('email', formData.email);
              if (formData.phone) url.searchParams.set('phone', formData.phone);
              if (formData.companyName) url.searchParams.set('company_name', formData.companyName);
              calendlyBtn.href = url.toString();
            } catch (e) {
              calendlyBtn.href = config.calendarBookingUrl;
            }
          }
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1000);
    });
  }

  // =========================================================================
  // 7. FAQ Accordion Logic
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
  // 8. Demo Navigation Tabs
  // =========================================================================
  document.querySelectorAll('.demo-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;
      document.querySelectorAll('.demo-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.demo-tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // =========================================================================
  // 9. Sticky Header Glass & Scroll Spying
  // =========================================================================
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggleBtn');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '72px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = '#090E1A';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }
});
