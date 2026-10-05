/* ==========================================================================
   yiy.io - Mobile Menu & Clipboard Helper Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Menu Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Download Warning License Modal Logic
  const downloadModal = document.getElementById('downloadModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalConfirmDownloadBtn = document.getElementById('modalConfirmDownloadBtn');
  const navDownloadBtn = document.getElementById('nav-download-btn');
  const heroDownloadBtn = document.getElementById('hero-download-btn');

  function openDownloadModal(e) {
    if (e) e.preventDefault();
    if (downloadModal) {
      downloadModal.classList.add('active');
      downloadModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeDownloadModal() {
    if (downloadModal) {
      downloadModal.classList.remove('active');
      downloadModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (navDownloadBtn) navDownloadBtn.addEventListener('click', openDownloadModal);
  if (heroDownloadBtn) heroDownloadBtn.addEventListener('click', openDownloadModal);

  // Attach modal to all download ZIP links on the page (except inside the modal itself)
  document.querySelectorAll('a[href*="main.zip"]').forEach(btn => {
    if (btn !== modalConfirmDownloadBtn) {
      btn.addEventListener('click', openDownloadModal);
    }
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDownloadModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeDownloadModal);

  if (modalConfirmDownloadBtn) {
    modalConfirmDownloadBtn.addEventListener('click', () => {
      setTimeout(closeDownloadModal, 400);
    });
  }

  if (downloadModal) {
    downloadModal.addEventListener('click', (e) => {
      if (e.target === downloadModal) {
        closeDownloadModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && downloadModal && downloadModal.classList.contains('active')) {
      closeDownloadModal();
    }
  });

  // Image Lightbox Zoom Logic
  const imageLightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function openLightbox(imgElement) {
    if (!imageLightbox || !lightboxImg) return;
    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt || 'Görsel';
    if (lightboxCaption) {
      lightboxCaption.textContent = imgElement.alt || '';
    }
    imageLightbox.classList.add('active');
    imageLightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!imageLightbox) return;
    imageLightbox.classList.remove('active');
    imageLightbox.setAttribute('aria-hidden', 'true');
  }

  // Attach click listener to showcase screenshots & images via event delegation
  document.addEventListener('click', (e) => {
    const zoomableImg = e.target.closest('.mockup-img, .phone-mockup-wrapper img, .field-img');
    if (zoomableImg) {
      openLightbox(zoomableImg);
    }
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);

  if (imageLightbox) {
    imageLightbox.addEventListener('click', (e) => {
      if (e.target === imageLightbox || e.target === lightboxCloseBtn) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageLightbox && imageLightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});

// Safe Copy Email / Contact Helper (with HTTP fallback)
function copyEmail(email) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      alert('E-posta adresi panoya kopyalandı: ' + email);
    }).catch(() => {
      fallbackCopyEmail(email);
    });
  } else {
    fallbackCopyEmail(email);
  }
}

function fallbackCopyEmail(email) {
  const textArea = document.createElement('textarea');
  textArea.value = email;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    alert('E-posta adresi panoya kopyalandı: ' + email);
  } catch (e) {
    prompt('E-posta adresini kopyalayın:', email);
  }
  document.body.removeChild(textArea);
}

// Hero Video Ambient Autoplay & Sound Toggle
document.addEventListener('DOMContentLoaded', () => {
  const heroPromoVideo = document.getElementById('heroPromoVideo');
  const heroSoundToggleBtn = document.getElementById('heroSoundToggleBtn');
  const heroSoundIcon = document.getElementById('heroSoundIcon');
  const heroSoundLabel = document.getElementById('heroSoundLabel');
  const videoOverlaySoundBtn = document.getElementById('videoOverlaySoundBtn');
  const overlaySoundIcon = document.getElementById('overlaySoundIcon');
  const overlaySoundText = document.getElementById('overlaySoundText');

  if (!heroPromoVideo) return;

  function toggleVideoSound(e) {
    if (e) e.stopPropagation();
    heroPromoVideo.muted = !heroPromoVideo.muted;
    const isMuted = heroPromoVideo.muted;

    // Update header button
    if (heroSoundIcon) {
      heroSoundIcon.className = isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
    }
    if (heroSoundLabel) {
      heroSoundLabel.textContent = isMuted ? 'Sesi Aç' : 'Sesi Kapat';
    }
    if (heroSoundToggleBtn) {
      heroSoundToggleBtn.classList.toggle('active', !isMuted);
    }

    // Update overlay pill
    if (overlaySoundIcon) {
      overlaySoundIcon.className = isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
    }
    if (overlaySoundText) {
      overlaySoundText.textContent = isMuted ? 'Sesi Aç' : 'Sesi Kapat';
    }
    if (videoOverlaySoundBtn) {
      videoOverlaySoundBtn.classList.toggle('unmuted', !isMuted);
    }
  }

  if (heroSoundToggleBtn) heroSoundToggleBtn.addEventListener('click', toggleVideoSound);
  if (videoOverlaySoundBtn) videoOverlaySoundBtn.addEventListener('click', toggleVideoSound);
});

/* ==========================================================================
   Living Twilight Beach (Waves & Shooting Stars Engine)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('beachEffectsCanvas');
  const bgContainer = document.getElementById('twilightBeachBg');
  if (!canvas || !bgContainer) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let animId = null;

  function resize() {
    const rect = bgContainer.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    initStars();
  }

  // --- 1. Ambient Twinkling Stars in Sky ---
  let stars = [];
  function initStars() {
    stars = [];
    const count = Math.floor(Math.min(width, 1600) / 22);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.48), // sky region
        baseAlpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        size: Math.random() * 1.6 + 0.6
      });
    }
  }

  // --- 2. Shooting Stars (Streaking across twilight sky) ---
  let shootingStars = [];
  let nextShootingStarTime = Date.now() + 1500;

  function spawnShootingStar() {
    const angle = (25 + Math.random() * 20) * (Math.PI / 180); // gentle downward diagonal
    const speed = 14 + Math.random() * 10;
    shootingStars.push({
      x: Math.random() * (width * 0.8),
      y: Math.random() * (height * 0.35),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: 120 + Math.random() * 100,
      alpha: 1.0,
      life: 0,
      maxLife: 35 + Math.random() * 20
    });
  }

  // --- 3. Living Shoreline Ocean Waves ---
  // Waves glide forward onto wet sand, foam washes up, then smoothly recedes
  const waveLayers = [
    { baseYRel: 0.88, amp: 22, freq: 0.0035, speed: 0.0016, color: 'rgba(255, 255, 255, 0.16)', foam: 'rgba(255, 255, 255, 0.45)', phase: 0 },
    { baseYRel: 0.82, amp: 18, freq: 0.0045, speed: 0.0019, color: 'rgba(125, 211, 252, 0.12)', foam: 'rgba(224, 242, 254, 0.35)', phase: 1.8 },
    { baseYRel: 0.76, amp: 14, freq: 0.0055, speed: 0.0022, color: 'rgba(6, 182, 212, 0.08)', foam: 'rgba(186, 230, 253, 0.25)', phase: 3.5 }
  ];

  // Glistening foam sparkles left on wet sand
  let wetSandSparkles = [];
  function addSparkles(x, y) {
    if (wetSandSparkles.length < 50 && Math.random() < 0.25) {
      wetSandSparkles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 8,
        alpha: 0.9,
        decay: 0.015 + Math.random() * 0.015,
        size: Math.random() * 1.8 + 0.8
      });
    }
  }

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    // Render Twinkling Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const a = s.baseAlpha + Math.sin(time * s.twinkleSpeed + s.phase) * 0.35;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 242, 254, ${Math.max(0.05, Math.min(1, a))})`;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 4;
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Spawn & Render Shooting Stars
    if (Date.now() > nextShootingStarTime) {
      spawnShootingStar();
      nextShootingStarTime = Date.now() + 3000 + Math.random() * 4000; // next in 3-7s
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life++;

      const progress = ss.life / ss.maxLife;
      const alpha = (1 - progress) * ss.alpha;

      if (progress >= 1 || ss.x > width + 200 || ss.y > height) {
        shootingStars.splice(i, 1);
        continue;
      }

      // Draw shooting star luminous streak
      const tailX = ss.x - (ss.vx / Math.hypot(ss.vx, ss.vy)) * ss.len;
      const tailY = ss.y - (ss.vy / Math.hypot(ss.vx, ss.vy)) * ss.len;

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      grad.addColorStop(0.6, `rgba(186, 230, 253, ${alpha * 0.4})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Glowing head
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Render Living Ocean Shoreline Waves (Tide coming & going)
    // Tide cycle: period ~ 7.5 seconds
    const tideMotion = Math.sin(time * 0.00085); // -1 (ebb) to +1 (flow)

    for (let l = 0; l < waveLayers.length; l++) {
      const layer = waveLayers[l];
      const tideOffset = tideMotion * layer.amp;
      const baseY = height * layer.baseYRel + tideOffset;

      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, baseY);

      // Generate undulating wave curve along the shore
      for (let x = 0; x <= width; x += 15) {
        const waveY = baseY + 
          Math.sin(x * layer.freq + time * layer.speed + layer.phase) * 9 +
          Math.cos(x * layer.freq * 0.6 + time * layer.speed * 0.8) * 6;

        ctx.lineTo(x, waveY);

        // When tide is near peak, add foam sparkles
        if (tideMotion > 0.4 && x % 45 === 0) {
          addSparkles(x, waveY);
        }
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      // Translucent water body
      ctx.fillStyle = layer.color;
      ctx.fill();

      // Frosted wave edge foam line
      ctx.strokeStyle = layer.foam;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Render Glistening Foam Sparkles on Shore
    for (let i = wetSandSparkles.length - 1; i >= 0; i--) {
      const sp = wetSandSparkles[i];
      sp.alpha -= sp.decay;
      if (sp.alpha <= 0) {
        wetSandSparkles.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${sp.alpha})`;
      ctx.shadowColor = '#67e8f9';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    animId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  animId = requestAnimationFrame(render);
});

/* ==========================================================================
   Horizontal Slide Presentation Deck Controller
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const slidesTrack = document.getElementById('slidesTrack');
  const slideSections = Array.from(document.querySelectorAll('.slide-section'));
  const slidePrevBtn = document.getElementById('slidePrevBtn');
  const slideNextBtn = document.getElementById('slideNextBtn');
  const navLinkItems = Array.from(document.querySelectorAll('.nav-link-item'));
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (!slidesTrack || slideSections.length === 0) return;

  const totalSlides = slideSections.length;
  let currentSlide = 0;
  let isTransitioning = false;

  const slideIdMap = {
    'hero': 0,
    'referanslar': 1,
    'ozellikler': 2,
    'mobil': 3,
    'saha': 4,
    'kurulum': 5,
    'iletisim': 6
  };

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    if (index === currentSlide && slidesTrack.style.transform) return;

    isTransitioning = true;
    currentSlide = index;

    // Slide track transition
    slidesTrack.style.transform = `translateX(-${currentSlide * 100}vw)`;

    // Update active classes on slide sections
    slideSections.forEach((section, i) => {
      if (i === currentSlide) {
        section.classList.add('active');
        section.scrollTop = 0;
      } else {
        section.classList.remove('active');
      }
    });

    // Update Prev / Next button states
    if (slidePrevBtn) {
      slidePrevBtn.disabled = currentSlide === 0;
    }
    if (slideNextBtn) {
      slideNextBtn.disabled = currentSlide === totalSlides - 1;
    }

    // Update Navbar Link active state
    navLinkItems.forEach((link) => {
      const sIndex = Number(link.dataset.slide);
      link.classList.toggle('active', sIndex === currentSlide);
    });

    // Update URL hash safely without vertical scroll jump
    const currentId = slideSections[currentSlide]?.id;
    if (currentId && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '#' + currentId);
    }

    // Close mobile hamburger menu if open
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    setTimeout(() => {
      isTransitioning = false;
    }, 700);
  }

  // Floating Arrow Button Listeners
  if (slidePrevBtn) {
    slidePrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentSlide - 1);
    });
  }

  if (slideNextBtn) {
    slideNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentSlide + 1);
    });
  }

  // Intercept all hash links pointing to slides
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      goToSlide(0);
      return;
    }
    const hash = href.replace('#', '');
    if (hash in slideIdMap) {
      e.preventDefault();
      goToSlide(slideIdMap[hash]);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Avoid interfering with modals or typing
    const isModalOpen = document.querySelector('.modal-overlay.active, .image-lightbox-overlay.active');
    if (isModalOpen) return;
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      goToSlide(currentSlide - 1);
    } else if (e.key === 'Home') {
      goToSlide(0);
    } else if (e.key === 'End') {
      goToSlide(totalSlides - 1);
    }
  });

  // Mouse Wheel / Trackpad navigation (debounced, supports internal slide scroll)
  let lastWheelTime = 0;
  window.addEventListener('wheel', (e) => {
    const isModalOpen = document.querySelector('.modal-overlay.active, .image-lightbox-overlay.active');
    if (isModalOpen) return;

    const activeSlide = slideSections[currentSlide];
    if (activeSlide) {
      // If active slide has internal overflow room, allow standard scroll first
      const canScrollDown = activeSlide.scrollTop + activeSlide.clientHeight < activeSlide.scrollHeight - 12;
      const canScrollUp = activeSlide.scrollTop > 12;

      if (e.deltaY > 0 && canScrollDown) return;
      if (e.deltaY < 0 && canScrollUp) return;
    }

    const now = Date.now();
    if (now - lastWheelTime < 750) return;

    if (Math.abs(e.deltaY) > 28 || Math.abs(e.deltaX) > 28) {
      if (e.deltaY > 0 || e.deltaX > 0) {
        if (currentSlide < totalSlides - 1) {
          lastWheelTime = now;
          goToSlide(currentSlide + 1);
        }
      } else {
        if (currentSlide > 0) {
          lastWheelTime = now;
          goToSlide(currentSlide - 1);
        }
      }
    }
  }, { passive: true });

  // Touch Swipe Gesture Support
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const isModalOpen = document.querySelector('.modal-overlay.active, .image-lightbox-overlay.active');
    if (isModalOpen) return;

    if (e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      const deltaTime = Date.now() - touchStartTime;

      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && deltaTime < 650) {
        if (deltaX < 0) {
          goToSlide(currentSlide + 1); // Swipe left -> Next
        } else {
          goToSlide(currentSlide - 1); // Swipe right -> Prev
        }
      }
    }
  }, { passive: true });

  // Check URL hash on page load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && initialHash in slideIdMap) {
    goToSlide(slideIdMap[initialHash]);
  } else {
    goToSlide(0);
  }
});


