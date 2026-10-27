// =============================================
// FITSCALEZ - Main JavaScript
// =============================================

// ---- Auto-load Fitscalez Visitor Tracking & Analytics Engine ---- //
(function() {
  if (typeof window === 'undefined' || window.FitscalezTracker) return;
  try {
    const isSubdir = window.location.pathname.includes('/blog/') && !window.location.pathname.endsWith('blog.html');
    const script = document.createElement('script');
    script.src = (isSubdir ? '../' : '') + 'js/analytics.js';
    script.async = true;
    document.head.appendChild(script);
  } catch (e) {
    console.warn('[Fitscalez] Tracker load init:', e);
  }
})();

// ---- Navigation ---- //
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const scrollTopBtn = document.getElementById('scrollTop');

// Scroll-based navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  // Scroll top button
  if (scrollTopBtn) {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
});

// Hamburger toggle
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav?.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
  });
});

// Scroll to top
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNavLink();

// ---- Scroll Animations ---- //
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));

// ---- Counter Animation ---- //
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ---- Progress Bar Animation ---- //
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.progress-fill');
      fills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = width; }, 200);
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-list').forEach(el => {
  // Reset widths
  el.querySelectorAll('.progress-fill').forEach(f => f.style.width = '0%');
  progressObserver.observe(el);
});

// ---- Contact Form ---- //
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('.form-submit');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Save lead to localStorage with visitor & device intelligence
  try {
    const devContext = window.FitscalezTracker ? window.FitscalezTracker.getDeviceContext() : null;
    const lead = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: contactForm.querySelector('#name')?.value || '',
      email: contactForm.querySelector('#email')?.value || '',
      phone: contactForm.querySelector('#phone')?.value || '',
      company: contactForm.querySelector('#company')?.value || '',
      service: contactForm.querySelector('#service')?.value || '',
      budget: contactForm.querySelector('#budget')?.value || '',
      message: contactForm.querySelector('#message')?.value || '',
      status: 'new',
      timestamp: Date.now(),
      // Rich Visitor & Device Intelligence
      deviceId: devContext?.deviceId || (window.FitscalezTracker ? window.FitscalezTracker.getDeviceId() : 'DEV-DIRECT'),
      visitCount: devContext?.visitCount || 1,
      isReturning: devContext ? devContext.isReturning : false,
      pastVisitsCount: devContext?.pastVisitsCount || 0,
      lastVisit: devContext?.lastVisit || Date.now(),
      location: devContext?.location || null,
      device: devContext?.device || null,
      journey: devContext?.journey || []
    };
    const leads = JSON.parse(localStorage.getItem('fitscalez_leads') || '[]');
    leads.push(lead);
    localStorage.setItem('fitscalez_leads', JSON.stringify(leads));
  } catch (err) {
    console.warn('Could not save lead:', err);
  }

  setTimeout(() => {
    contactForm.style.display = 'none';
    if (formSuccess) formSuccess.style.display = 'block';
  }, 1500);
});

// ---- Typed Text Effect ---- //
function typeWriter(el, texts, speed = 80, pause = 2200) {
  let textIndex = 0;
  let charIndex = texts[0].length;
  let isDeleting = true;

  // Initial text is already rendered in HTML; pause before beginning first deletion
  setTimeout(type, pause);

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      charIndex--;
      const textToDisplay = currentText.substring(0, charIndex);
      // Non-breaking space prevents element height from collapsing to 0
      el.textContent = textToDisplay || '\u00A0';
    } else {
      charIndex++;
      el.textContent = currentText.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => { isDeleting = true; type(); }, pause);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, speed * 2);
      return;
    }

    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
}

const typedEl = document.getElementById('typedText');
if (typedEl) {
  typeWriter(typedEl, [
    'Web Development',
    'Digital Marketing',
    'SEO Optimization',
    'Social Media',
    'Brand Strategy',
    'Video Production'
  ]);
}

// ---- Smooth page link hover effects ---- //
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('http')) {
    link.addEventListener('mouseenter', () => {
      const prefetch = document.createElement('link');
      prefetch.rel = 'prefetch';
      prefetch.href = href;
      document.head.appendChild(prefetch);
    });
  }
});

// ---- FAQ Accordion ---- //
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isOpen = faqItem.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('open');
      item.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isOpen) {
      faqItem.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ---- Tabs (Services page) ---- //
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// ---- Notification toast ---- //
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
    <span>${message}</span>
  `;
  
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(80px);
    background: var(--card2);
    border: 1px solid ${type === 'success' ? 'rgba(67,233,123,0.3)' : 'rgba(239,68,68,0.3)'};
    color: var(--text);
    padding: 14px 24px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9999;
    transition: all 0.4s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 100);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ---- Hero particle subtle effect ---- //
function createParticle() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const particle = document.createElement('div');
  particle.style.cssText = `
    position: absolute;
    width: ${Math.random() * 3 + 1}px;
    height: ${Math.random() * 3 + 1}px;
    background: rgba(108, 99, 255, ${Math.random() * 0.5 + 0.2});
    border-radius: 50%;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    pointer-events: none;
    animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
    animation-delay: ${Math.random() * 5}s;
  `;
  hero.appendChild(particle);

  setTimeout(() => particle.remove(), 20000);
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
    25% { transform: translateY(-30px) translateX(15px) scale(1.2); opacity: 1; }
    50% { transform: translateY(-15px) translateX(-10px) scale(0.8); opacity: 0.4; }
    75% { transform: translateY(-40px) translateX(20px) scale(1.1); opacity: 0.8; }
  }
  
  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
  }
  
  .faq-item.open .faq-arrow {
    transform: rotate(180deg);
  }
  
  .tab-content {
    display: none;
  }
  
  .tab-content.active {
    display: block;
    animation: fadeIn 0.4s ease;
  }
`;
document.head.appendChild(style);

// Create a few particles
if (document.querySelector('.hero')) {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => createParticle(), i * 500);
  }
}
