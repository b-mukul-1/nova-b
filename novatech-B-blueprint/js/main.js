/**
 * NovaTech Solutions — "The Observability Suite"
 * Creative Director Pitch Edition // Mobile-First Interaction Engine
 * Pure Vanilla JS, zero dependencies, < 20KB.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION & COMMAND CENTER OVERLAY
  // --------------------------------------------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');

  if (menuToggle && mobileMenu) {
    function toggleMobileMenu(open) {
      const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('is-active');
      mobileMenu.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);

      if (isOpen) {
        const firstLink = mobileMenu.querySelector('a, button');
        if (firstLink) firstLink.focus();
      } else {
        menuToggle.focus();
      }
    }

    menuToggle.addEventListener('click', function () {
      toggleMobileMenu();
    });

    // Close on navigation link click
    mobileMenu.querySelectorAll('.mobile-menu-link, .btn').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMobileMenu(false);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
        toggleMobileMenu(false);
      }
    });

    // Close on backdrop tap outside links
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        toggleMobileMenu(false);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. TOUCH-REACTIVE TELEMETRY SIMULATOR
  // --------------------------------------------------------------------------
  const modeButtons = document.querySelectorAll('.mode-btn');
  const waveformPath = document.querySelector('.waveform-path');
  const metricP99 = document.querySelector('[data-metric="p99"]');
  const metricThroughput = document.querySelector('[data-metric="throughput"]');
  const metricErrors = document.querySelector('[data-metric="errors"]');

  const telemetryModes = {
    nominal: {
      path: "M 0 60 Q 50 45, 100 60 T 200 60 T 300 60 T 400 60 T 500 60",
      p99: "14ms",
      throughput: "85k/s",
      errors: "0.000%"
    },
    spike: {
      path: "M 0 75 Q 40 20, 80 70 T 160 15 T 240 85 T 320 25 T 400 70 T 500 40",
      p99: "38ms",
      throughput: "1.42M/s",
      errors: "0.001%"
    },
    failover: {
      path: "M 0 60 Q 60 90, 120 40 T 240 60 T 360 40 T 420 80 T 500 55",
      p99: "21ms",
      throughput: "910k/s",
      errors: "0.000%"
    }
  };

  if (modeButtons.length > 0 && waveformPath) {
    modeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        modeButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const modeKey = btn.dataset.mode;
        const modeData = telemetryModes[modeKey];
        if (modeData) {
          waveformPath.setAttribute('d', modeData.path);
          if (metricP99) metricP99.textContent = modeData.p99;
          if (metricThroughput) metricThroughput.textContent = modeData.throughput;
          if (metricErrors) metricErrors.textContent = modeData.errors;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. HORIZONTAL SWIPE CAROUSEL INDICATOR SYNC
  // --------------------------------------------------------------------------
  const carouselTracks = document.querySelectorAll('.swipe-carousel-track');

  carouselTracks.forEach(function (track) {
    const parent = track.closest('.carousel-wrapper') || track.parentElement;
    const indicators = parent.querySelectorAll('.carousel-dot');
    if (!indicators.length) return;

    track.addEventListener('scroll', function () {
      const scrollLeft = track.scrollLeft;
      const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth : 300;
      const activeIndex = Math.round(scrollLeft / cardWidth);

      indicators.forEach(function (dot, idx) {
        dot.classList.toggle('is-active', idx === activeIndex);
      });
    }, { passive: true });
  });

  // --------------------------------------------------------------------------
  // 4. INTERACTIVE INFRASTRUCTURE ROI CALCULATOR
  // --------------------------------------------------------------------------
  const spendSlider = document.querySelector('#spend-slider');
  const spendDisplay = document.querySelector('#spend-display');
  const savingsDisplay = document.querySelector('#savings-display');
  const latencyDisplay = document.querySelector('#latency-display');

  if (spendSlider && spendDisplay) {
    function updateCalculator() {
      const monthlySpend = parseInt(spendSlider.value, 10);
      spendDisplay.textContent = '$' + monthlySpend.toLocaleString() + ' / mo';

      // NovaTech historical average cloud cost optimization is 36%
      const annualSavings = Math.round(monthlySpend * 12 * 0.36);
      if (savingsDisplay) {
        savingsDisplay.textContent = '$' + annualSavings.toLocaleString() + ' / yr';
      }

      // Latency calculation curve
      if (latencyDisplay) {
        const estimatedLatency = monthlySpend > 100000 ? '18ms P99' : '28ms P99';
        latencyDisplay.textContent = estimatedLatency;
      }
    }

    spendSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // --------------------------------------------------------------------------
  // 5. CASE STUDY SPEC MODAL (KEYBOARD TRAP & ACCESSIBILITY)
  // --------------------------------------------------------------------------
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalTriggers = document.querySelectorAll('[data-open-case-modal]');

  const caseSpecs = {
    'case-1': {
      title: 'Apex Financial Core // Ledger Modernization',
      stack: 'Go 1.23, AWS EKS, Apache Kafka, Karpenter, Terraform',
      metric: 'Cut cloud expenditure by 38% | P99 Latency: 42ms',
      summary: 'Decomposed a monolithic relational database into event-sourced microservices with automated multi-zone failover and active-active ledger replication.'
    },
    'case-2': {
      title: 'Strata Health Systems // WebRTC Media Gateway',
      stack: 'WebRTC, Rust, Kubernetes, Envoy, Prometheus',
      metric: 'Zero packet loss | P95 Jitter: 8ms | SOC 2 Type II Audited',
      summary: 'Re-architected encrypted video and telemetry pipelines handling 14,000 concurrent patient consultation sessions under strict HIPAA compliance.'
    },
    'case-3': {
      title: 'Vanguard Logistics // High-Throughput Stream Ingestion',
      stack: 'Apache Kafka, Apache Flink, ClickHouse, Docker',
      metric: '1.4M events/sec sustained | 0% message loss over 14 months',
      summary: 'Transformed freight IoT container ingestion pipeline into an immutable event stream architecture with sub-300ms geofence alerting.'
    }
  };

  if (modalOverlay) {
    function openModal(caseId) {
      const spec = caseSpecs[caseId] || caseSpecs['case-1'];
      const titleEl = modalOverlay.querySelector('#modal-case-title');
      const bodyEl = modalOverlay.querySelector('#modal-case-body');

      if (titleEl) titleEl.textContent = spec.title;
      if (bodyEl) {
        bodyEl.innerHTML = `
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--sky-400); margin-bottom: 0.5rem;">PRIMARY STACK: ${spec.stack}</div>
          <div style="font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; color: var(--white); margin-bottom: 0.75rem;">${spec.metric}</div>
          <p style="font-size: 0.9375rem; line-height: 1.6; color: var(--white-75);">${spec.summary}</p>
        `;
      }

      modalOverlay.classList.add('is-open');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (modalCloseBtn) modalCloseBtn.focus();
    }

    function closeModal() {
      modalOverlay.classList.remove('is-open');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    modalTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        const caseId = trigger.getAttribute('data-case-id');
        openModal(caseId);
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. FORM UX & CLIENT-SIDE VALIDATION (NO RED / NO GREEN)
  // --------------------------------------------------------------------------
  const contactForms = document.querySelectorAll('form[data-validate]');

  contactForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;
      const statusAlert = form.querySelector('.form-status-alert');

      // Check required fields
      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(function (input) {
        const feedback = input.parentElement.querySelector('.form-feedback');
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('has-error');
          if (feedback) feedback.classList.add('is-error');
        } else {
          input.classList.remove('has-error');
          if (feedback) feedback.classList.remove('is-error');
        }
      });

      // Email format check
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const feedback = emailInput.parentElement.querySelector('.form-feedback');
        if (!emailPattern.test(emailInput.value.trim())) {
          isValid = false;
          emailInput.classList.add('has-error');
          if (feedback) {
            feedback.textContent = 'Please enter a valid work email address.';
            feedback.classList.add('is-error');
          }
        }
      }

      if (isValid) {
        // Honeypot check
        const honeypot = form.querySelector('input[name="website_probe"]');
        if (honeypot && honeypot.value) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Transmitting Discovery Packet...';
        }

        setTimeout(function () {
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request Discovery Session';
          }
          if (statusAlert) {
            statusAlert.classList.add('is-visible');
            statusAlert.innerHTML = `
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8FD3FF" stroke-width="2" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div>
                <strong>DISCOVERY TICKET LOGGED // NT-${Math.floor(1000 + Math.random() * 9000)}</strong>
                <p style="margin-top: 4px; font-size: 0.75rem; color: var(--sky-200);">
                  A principal systems architect has been notified. We will review your topology requirements and respond within one business day.
                </p>
              </div>
            `;
          }
        }, 600);
      }
    });

    // Clear error on input typing
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.classList.remove('has-error');
        const feedback = this.parentElement.querySelector('.form-feedback');
        if (feedback) feedback.classList.remove('is-error');
      });
    });
  });

  // --------------------------------------------------------------------------
  // 7. COPY TO CLIPBOARD BUTTONS
  // --------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy-text]');
  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const textToCopy = btn.getAttribute('data-copy-text');
      navigator.clipboard.writeText(textToCopy).then(function () {
        const originalText = btn.textContent;
        btn.textContent = 'Copied to Clipboard';
        setTimeout(function () {
          btn.textContent = originalText;
        }, 2000);
      });
    });
  });

  // --------------------------------------------------------------------------
  // 8. INTERACTIVE SPOTLIGHT POINTER TRACKING (LINEAR / STRIPE PHYSICS)
  // --------------------------------------------------------------------------
  const spotlightTargets = document.querySelectorAll(
    '.spotlight-card, .border-beam, .telemetry-console, .swipe-card, .telemetry-card, .discipline-card, .accordion-card, .spec-card'
  );

  spotlightTargets.forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --------------------------------------------------------------------------
  // 9. COMMAND PALETTE ENGINE (⌘K / QUICK NAVIGATION SWITCHER)
  // --------------------------------------------------------------------------
  const cmdRoutes = [
    { title: "Home // Observability Core & Architecture", url: "index.html", badge: "Core", keywords: "home landing hero latency telemetry" },
    { title: "Vanguard Logistics // Case Study (1.4M events/s)", url: "case-study.html", badge: "Case Study", keywords: "vanguard case kafka flink clickhouse freight stream" },
    { title: "Production Portfolio // 6 Scaled Systems", url: "portfolio.html", badge: "Portfolio", keywords: "portfolio apex strata kestrel work projects" },
    { title: "Engineering Disciplines & Delivery Models", url: "services.html", badge: "Services", keywords: "services kubernetes cloud distributed sre reliability devops" },
    { title: "Austin Systems Laboratory & Team Charter", url: "about.html", badge: "About", keywords: "about laboratory team austin marcus elena leadership" },
    { title: "Technical Field Dispatches // Insights", url: "insights.html", badge: "Insights", keywords: "insights articles blog architecture optimization cloud spend" },
    { title: "Kubernetes Cloud Optimization (38% Reduction)", url: "insight-article.html", badge: "Article", keywords: "article finops karpenter spot savings kubernetes" },
    { title: "Engineering Careers // 5 Open Roles", url: "careers.html", badge: "Careers", keywords: "careers jobs hiring staff architect sre rust distributed" },
    { title: "Initiate Discovery Intake // 1-Business-Day SLA", url: "contact.html", badge: "Contact", keywords: "contact discovery book consult inquiry austin email" },
    { title: "ROI Calculator // Infrastructure Sizing", url: "index.html#roi-calculator", badge: "Calculator", keywords: "roi calculator spend savings cost" },
    { title: "Data Privacy & Telemetry Protections", url: "privacy.html", badge: "Legal", keywords: "privacy gdpr soc2 hipaa" },
    { title: "Master Services Terms of Agreement", url: "terms.html", badge: "Legal", keywords: "terms master services sla contract" }
  ];

  let cmdPaletteOverlay = document.querySelector('.cmd-palette-overlay');

  function ensureCmdPalette() {
    if (cmdPaletteOverlay) return cmdPaletteOverlay;

    cmdPaletteOverlay = document.createElement('div');
    cmdPaletteOverlay.className = 'cmd-palette-overlay';
    cmdPaletteOverlay.setAttribute('aria-hidden', 'true');
    cmdPaletteOverlay.innerHTML = `
      <div class="cmd-palette-box" role="dialog" aria-modal="true" aria-label="Command Palette">
        <div class="cmd-search-bar">
          <svg class="cmd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" class="cmd-search-input" placeholder="Jump to practice, case study, or spec... (esc to exit)" aria-label="Search navigation">
        </div>
        <ul class="cmd-results-list" role="listbox"></ul>
        <div class="cmd-palette-footer">
          <span>NovaTech Navigation Engine</span>
          <div class="cmd-footer-keys">
            <span><kbd style="color:var(--sky-400)">↑</kbd> <kbd style="color:var(--sky-400)">↓</kbd> navigate</span>
            <span><kbd style="color:var(--sky-400)">↵</kbd> select</span>
            <span><kbd style="color:var(--sky-400)">esc</kbd> close</span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(cmdPaletteOverlay);

    const input = cmdPaletteOverlay.querySelector('.cmd-search-input');
    const list = cmdPaletteOverlay.querySelector('.cmd-results-list');

    function renderResults(query) {
      const q = (query || '').toLowerCase().trim();
      const filtered = q
        ? cmdRoutes.filter(r => r.title.toLowerCase().includes(q) || r.keywords.includes(q))
        : cmdRoutes;

      list.innerHTML = '';
      if (!filtered.length) {
        list.innerHTML = '<li style="padding: 1.5rem; text-align: center; color: var(--white-40); font-family: var(--font-mono); font-size: 0.8125rem;">No matching systems or routes found.</li>';
        return;
      }

      filtered.forEach((r, idx) => {
        const li = document.createElement('li');
        li.className = 'cmd-result-item' + (idx === 0 ? ' is-selected' : '');
        li.innerHTML = `
          <a href="${r.url}">
            <span>${r.title}</span>
            <span class="cmd-result-badge">${r.badge}</span>
          </a>
        `;
        list.appendChild(li);
      });
    }

    input.addEventListener('input', function () {
      renderResults(input.value);
    });

    cmdPaletteOverlay.addEventListener('click', function (e) {
      if (e.target === cmdPaletteOverlay) closeCmdPalette();
    });

    input.addEventListener('keydown', function (e) {
      const items = Array.from(list.querySelectorAll('.cmd-result-item'));
      if (!items.length) return;
      const currentIdx = items.findIndex(el => el.classList.contains('is-selected'));

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (currentIdx + 1) % items.length;
        items.forEach((el, i) => el.classList.toggle('is-selected', i === nextIdx));
        items[nextIdx].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (currentIdx - 1 + items.length) % items.length;
        items.forEach((el, i) => el.classList.toggle('is-selected', i === prevIdx));
        items[prevIdx].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = items[currentIdx] || items[0];
        if (selected) {
          const link = selected.querySelector('a');
          if (link) window.location.href = link.href;
        }
      } else if (e.key === 'Escape') {
        closeCmdPalette();
      }
    });

    renderResults('');
    return cmdPaletteOverlay;
  }

  function openCmdPalette() {
    const overlay = ensureCmdPalette();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    const input = overlay.querySelector('.cmd-search-input');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input'));
      setTimeout(() => input.focus(), 50);
    }
  }

  function closeCmdPalette() {
    if (cmdPaletteOverlay) {
      cmdPaletteOverlay.classList.remove('is-open');
      cmdPaletteOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  // Keyboard shortcut: Command+K or Ctrl+K or /
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPaletteOverlay && cmdPaletteOverlay.classList.contains('is-open')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
    } else if (e.key === 'Escape' && cmdPaletteOverlay && cmdPaletteOverlay.classList.contains('is-open')) {
      closeCmdPalette();
    }
  });

  // Header command triggers
  document.querySelectorAll('.cmd-palette-trigger').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openCmdPalette();
    });
  });

  // --------------------------------------------------------------------------
  // 10. INTERACTIVE BLUEPRINT MESH CANVAS ENGINE
  // --------------------------------------------------------------------------
  const meshCanvas = document.querySelector('#hero-mesh-canvas');
  if (meshCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = meshCanvas.getContext('2d');
    let width = 0, height = 0;
    let particles = [];
    const particleCount = 38;
    let pointer = { x: -1000, y: -1000, active: false };

    function resize() {
      width = meshCanvas.width = meshCanvas.offsetWidth;
      height = meshCanvas.height = meshCanvas.offsetHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (pointer.active) {
          const dx = this.x - pointer.x;
          const dy = this.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(143, 211, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    resize();
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    window.addEventListener('resize', resize, { passive: true });

    const heroSection = meshCanvas.closest('.hero') || meshCanvas.parentElement;
    if (heroSection) {
      heroSection.addEventListener('pointermove', function (e) {
        const rect = meshCanvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
      });

      heroSection.addEventListener('pointerleave', function () {
        pointer.active = false;
      });
    }

    let isVisible = true;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        isVisible = entries[0].isIntersecting;
      });
      observer.observe(meshCanvas);
    }

    function animate() {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.14;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(143, 211, 255, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // --------------------------------------------------------------------------
  // 11. REAL-TIME TELEMETRY JITTER SIMULATION (PULSING MONITOR)
  // --------------------------------------------------------------------------
  if (metricP99 && metricThroughput) {
    setInterval(function () {
      const activeBtn = document.querySelector('.mode-btn.is-active');
      const mode = activeBtn ? activeBtn.dataset.mode : 'nominal';
      if (mode === 'nominal') {
        const jitter = (13.6 + Math.random() * 0.8).toFixed(1);
        const kps = (84.8 + Math.random() * 1.2).toFixed(1);
        metricP99.textContent = jitter + 'ms';
        metricThroughput.textContent = kps + 'k/s';
      } else if (mode === 'spike') {
        const jitter = (37.5 + Math.random() * 1.8).toFixed(1);
        const mps = (1.40 + Math.random() * 0.05).toFixed(2);
        metricP99.textContent = jitter + 'ms';
        metricThroughput.textContent = mps + 'M/s';
      } else if (mode === 'failover') {
        const jitter = (20.8 + Math.random() * 1.1).toFixed(1);
        const kps = (905 + Math.floor(Math.random() * 15));
        metricP99.textContent = jitter + 'ms';
        metricThroughput.textContent = kps + 'k/s';
      }
    }, 2200);
  }

  // --------------------------------------------------------------------------
  // 12. ARCHITECTURE EXPLORER TAB SWITCHER
  // --------------------------------------------------------------------------
  const archTabButtons = document.querySelectorAll('.arch-tab-btn');
  const archCodePanels = document.querySelectorAll('.arch-code-panel');

  archTabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-tab-target');
      archTabButtons.forEach(b => b.classList.remove('is-active'));
      archCodePanels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      const targetPanel = document.querySelector(targetId);
      if (targetPanel) targetPanel.classList.add('is-active');
    });
  });

  // --------------------------------------------------------------------------
  // 13. VIEWPORT STATS COUNTER ANIMATION
  // --------------------------------------------------------------------------
  const statElements = document.querySelectorAll('.proof-val, .calc-res-val');
  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statElements.forEach(el => statObserver.observe(el));
  }

})();
