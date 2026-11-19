
/* =================================
   JAPANESE AVANT-GARDE
   Main JavaScript
================================= */

// Wait until the page is ready
document.addEventListener('DOMContentLoaded', () => {

    // Find all elements with the reveal class
    const revealElements = document.querySelectorAll('.reveal');
  
    // Check if the browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
  
      const observer = new IntersectionObserver((entries, observer) => {
  
        entries.forEach(entry => {
  
          // Show element when it enters the screen
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
  
            // Stop observing after the animation
            observer.unobserve(entry.target);
          }
  
        });
  
      }, {
        threshold: 0.12
      });
  
      // Start observing each element
      revealElements.forEach(element => {
        observer.observe(element);
      });
  
    } else {
  
      // Fallback for older browsers
      revealElements.forEach(element => {
        element.classList.add('visible');
      });
  
    }
  
  });
  
/* Red cursor trail — homepage only */

document.addEventListener('DOMContentLoaded', () => {
    
  
    const hasMouse = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
  
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  
    if (!hasMouse || reducedMotion) return;
  
    const dotCount = 7;
    const dots = [];
    const positions = Array.from(
      { length: dotCount },
      () => ({ x: 0, y: 0 })
    );
  
    let mouseX = 0;
    let mouseY = 0;
    let started = false;
  
    // Create the trail dots
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('span');
  
      dot.className = 'cursor-trail-dot';
  
      const size = 9 - i * 0.8;
      const opacity = 0.25 - i * 0.025;
  
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor =
        `rgba(190, 25, 42, ${opacity})`;
  
      document.body.appendChild(dot);
      dots.push(dot);
    }
  
    // Track the mouse
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
  
      mouseX = event.clientX;
      mouseY = event.clientY;
  
      if (!started) {
        positions.forEach(position => {
          position.x = mouseX;
          position.y = mouseY;
        });
  
        dots.forEach(dot => {
          dot.classList.add('is-visible');
        });
  
        started = true;
      }
    });
  
    // Animate the trail
    function animateTrail() {
      positions[0].x += (mouseX - positions[0].x) * 0.45;
      positions[0].y += (mouseY - positions[0].y) * 0.45;
  
      for (let i = 1; i < dotCount; i++) {
        positions[i].x +=
          (positions[i - 1].x - positions[i].x) * 0.35;
  
        positions[i].y +=
          (positions[i - 1].y - positions[i].y) * 0.35;
      }
  
      dots.forEach((dot, i) => {
        dot.style.transform =
          `translate3d(${positions[i].x}px, ${positions[i].y}px, 0) translate(-50%, -50%)`;
      });
  
      requestAnimationFrame(animateTrail);
    }
  
    animateTrail();
  
    // Hide the trail when leaving the browser window
    document.addEventListener('mouseleave', () => {
      dots.forEach(dot => dot.classList.remove('is-visible'));
    });
  
    document.addEventListener('mouseenter', () => {
      if (started) {
        dots.forEach(dot => dot.classList.add('is-visible'));
      }
    });
  });
  