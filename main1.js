/**
 * GitAnalytics - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (Animate on Scroll) library
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
  
  // Handle preloader
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });
  
  // Add active class to navbar links based on current page
  const currentLocation = location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    // Get the href attribute and clean it up
    const linkPath = link.getAttribute('href');
    
    // Check if this link corresponds to the current page
    if (currentLocation.endsWith(linkPath) || 
        (currentLocation === '/' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Handle login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      // In a real app, you would send these credentials to your server
      console.log('Login attempt with:', { email, password });
      
      // Show a success message (for demo purposes)
      alert('Login successful!');
      
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (modal) {
        modal.hide();
      }
    });
  }
  
  // Handle registration form submission
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      // Simple validation
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // In a real app, you would send this data to your server
      console.log('Registration with:', { fullName, email, password });
      
      // Show a success message (for demo purposes)
      alert('Registration successful! Please check your email to confirm your account.');
      
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
      if (modal) {
        modal.hide();
      }
    });
  }
  
  // Handle newsletter subscription
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  if (newsletterForms.length > 0) {
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput) return;
        
        const email = emailInput.value;
        
        // In a real app, you would send this to your server
        console.log('Newsletter subscription for:', email);
        
        // Show a success message
        alert('Thank you for subscribing to our newsletter!');
        
        // Clear the form
        form.reset();
      });
    });
  }
  
  // Initialize back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Make external links open in a new tab
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  externalLinks.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});