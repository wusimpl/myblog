/**
 * Retro-Futurism Theme - Main JavaScript
 */

(function() {
  'use strict';

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Reading Progress Bar
  const progressBar = document.getElementById('readingProgress');
  
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // 防止除以 0 或负数
      if (docHeight <= 0) {
        progressBar.style.width = '100%';
        return;
      }
      
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      progressBar.style.width = progress + '%';
    };
    
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress(); // 初始化
  }

  // TOC Active State
  const tocLinks = document.querySelectorAll('.toc-content a');
  const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3');

  if (tocLinks.length && headings.length) {
    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    headings.forEach(heading => {
      if (heading.id) observer.observe(heading);
    });
  }

  // Smooth scroll for TOC links
  document.querySelectorAll('.toc-content a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        const offset = 100;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Card Hover Glow Effect
  const cards = document.querySelectorAll('.bento-item, .dynamic-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Page Transition Effect
  const transitionTarget = document.querySelector('.main-container') || document.body;

  document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname && !link.hasAttribute('target')) {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          e.preventDefault();
          transitionTarget.style.opacity = '0';
          transitionTarget.style.transform = 'translateX(-20px)';
          transitionTarget.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });
    }
  });

  // Restore styles on page load / bfcache restore
  const resetTransition = () => {
    transitionTarget.style.opacity = '';
    transitionTarget.style.transform = '';
    transitionTarget.style.transition = '';
  };
  resetTransition();
  window.addEventListener('pageshow', resetTransition);

  // Copy code button
  document.querySelectorAll('.highlight').forEach(block => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    copyBtn.style.cssText = `
      position: absolute;
      top: 6px;
      right: 50px;
      padding: 6px;
      background: transparent;
      border: none;
      color: #636D83;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s;
    `;
    
    copyBtn.addEventListener('mouseenter', () => {
      copyBtn.style.background = 'rgba(255,255,255,0.1)';
      copyBtn.style.color = '#ABB2BF';
    });
    
    copyBtn.addEventListener('mouseleave', () => {
      copyBtn.style.background = 'transparent';
      copyBtn.style.color = '#636D83';
    });
    
    copyBtn.addEventListener('click', async () => {
      const code = block.querySelector('code');
      if (code) {
        await navigator.clipboard.writeText(code.textContent);
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => {
          copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        }, 2000);
      }
    });
    
    block.style.position = 'relative';
    block.appendChild(copyBtn);
  });

})();
