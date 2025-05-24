/**
 * GitAnalytics - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      });
    }
  
    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  
    // Back to Top Button
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
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // Handle authentication modals
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (loginModal && registerModal) {
      // Login form submission
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const email = document.getElementById('loginEmail').value;
          const password = document.getElementById('loginPassword').value;
          
          // Here you would typically make an API call to your authentication endpoint
          console.log('Login attempt with:', { email, password });
          
          // For demo purposes, show success message
          alert('Login successful! (Demo mode)');
          
          // Close the modal
          const modal = bootstrap.Modal.getInstance(loginModal);
          if (modal) {
            modal.hide();
          }
        });
      }
      
      // Register form submission
      const registerForm = document.getElementById('registerForm');
      if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const name = document.getElementById('fullName').value;
          const email = document.getElementById('registerEmail').value;
          const password = document.getElementById('registerPassword').value;
          const confirmPassword = document.getElementById('confirmPassword').value;
          
          // Simple validation
          if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
          }
          
          // Here you would typically make an API call to your registration endpoint
          console.log('Registration attempt with:', { name, email, password });
          
          // For demo purposes, show success message
          alert('Registration successful! (Demo mode)');
          
          // Close the modal
          const modal = bootstrap.Modal.getInstance(registerModal);
          if (modal) {
            modal.hide();
          }
        });
      }
    }
  
    // GitHub input functionality
    const analyzeForm = document.querySelector('.github-input-container form, #analyzerForm');
    if (analyzeForm) {
      analyzeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputField = e.target.querySelector('input');
        if (!inputField) return;
        
        const repoUrl = inputField.value.trim();
        
        // Simple validation
        if (!repoUrl) {
          alert('Please enter a GitHub repository URL');
          return;
        }
        
        // Extract username/repo from various possible formats
        let repoPath = repoUrl;
        
        if (repoUrl.includes('github.com')) {
          // Handle full URL
          try {
            const url = new URL(repoUrl);
            repoPath = url.pathname;
          } catch {
            // If not a valid URL, try to extract from string
            const match = repoUrl.match(/github\.com\/([^\/]+\/[^\/]+)/);
            if (match) {
              repoPath = match[1];
            }
          }
        }
        
        // Remove leading slash if present
        repoPath = repoPath.replace(/^\//, '');
        
        // Navigate to analysis page if not already there
        if (!window.location.href.includes('analyzer.html')) {
          window.location.href = `analyzer.html?repo=${encodeURIComponent(repoPath)}`;
        } else {
          // If already on analyzer page, show the results section
          const analysisResults = document.getElementById('analysisResults');
          if (analysisResults) {
            analysisResults.style.display = 'block';
            
            // Scroll to results
            analysisResults.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  
    // Popular repo tags in analyzer page
    const repoTags = document.querySelectorAll('.repo-tag');
    if (repoTags.length > 0) {
      repoTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
          e.preventDefault();
          
          const repoName = e.target.getAttribute('data-repo');
          if (!repoName) return;
          
          // Find the input field and set its value
          const inputField = document.querySelector('.github-input');
          if (inputField) {
            inputField.value = repoName;
          }
          
          // Auto-submit the form
          const analyzeBtn = document.querySelector('.github-input-container button[type="submit"]');
          if (analyzeBtn) {
            analyzeBtn.click();
          }
        });
      });
    }
  
    // Initialize any Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (tooltipTriggerList.length > 0) {
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  
    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    if (newsletterForms.length > 0) {
      newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const emailInput = form.querySelector('input[type="email"]');
          if (!emailInput) return;
          
          const email = emailInput.value.trim();
          
          // Simple validation
          if (!email) {
            alert('Please enter your email address');
            return;
          }
          
          // Here you would typically make an API call to subscribe the user
          console.log('Newsletter subscription for:', email);
          
          // For demo purposes, show success message
          alert('Thanks for subscribing! (Demo mode)');
          
          // Reset the form
          form.reset();
        });
      });
    }
  });