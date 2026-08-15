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
