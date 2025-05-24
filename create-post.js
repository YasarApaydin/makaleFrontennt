/**
 * GitAnalytics - Blog Post Creation JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize text editor
  initEditor();

  // Handle featured image upload
  initImageUpload();

  // Setup action buttons
  setupActionButtons();

  // Handle modals
  setupModals();
});

/**
 * Initialize the rich text editor functionality
 */
function initEditor() {
  const toolbar = document.querySelector('.editor-toolbar');
  const editor = document.getElementById('editor');

  if (!toolbar || !editor) return;

  // Handle basic formatting buttons
  const buttons = toolbar.querySelectorAll('[data-command]');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const command = button.getAttribute('data-command');
      
      if (['bold', 'italic', 'underline', 'insertOrderedList', 'insertUnorderedList'].includes(command)) {
        document.execCommand(command, false, null);
        editor.focus();
      } else if (command === 'h2') {
        document.execCommand('formatBlock', false, '<h2>');
        editor.focus();
      } else if (command === 'h3') {
        document.execCommand('formatBlock', false, '<h3>');
        editor.focus();
      } else if (command === 'blockquote') {
        document.execCommand('formatBlock', false, '<blockquote>');
        editor.focus();
      } else if (command === 'createLink') {
        const linkModal = new bootstrap.Modal(document.getElementById('linkModal'));
        linkModal.show();
      } else if (command === 'insertImage') {
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
      } else if (command === 'code') {
        const codeModal = new bootstrap.Modal(document.getElementById('codeModal'));
        codeModal.show();
      }
    });
  });

  // Make editor focused on load
  setTimeout(() => {
    editor.focus();
  }, 500);
}

/**
 * Initialize featured image upload
 */
function initImageUpload() {
  const imageInput = document.getElementById('featuredImage');
  const imagePreview = document.getElementById('imagePreview');

  if (!imageInput || !imagePreview) return;

  imageInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        // Clear previous content
        imagePreview.innerHTML = '';
        
        // Create image element
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Featured Image';
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'cover';
        img.style.borderRadius = 'var(--border-radius)';
        
        // Add image to preview
        imagePreview.appendChild(img);
        
        // Reset classes
        imagePreview.classList.remove('featured-image-placeholder');
        imagePreview.classList.add('featured-image-preview');
      };
      
      reader.readAsDataURL(this.files[0]);
    }
  });

  // Make the preview clickable
  imagePreview.addEventListener('click', () => {
    imageInput.click();
  });
}

/**
 * Setup action buttons functionality
 */
function setupActionButtons() {
  const saveBtn = document.getElementById('savePostBtn');
  const previewBtn = document.getElementById('previewPostBtn');
  const cancelBtn = document.getElementById('cancelPostBtn');

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      // Validate form
      const title = document.getElementById('postTitle').value.trim();
      const content = document.getElementById('editor').innerHTML.trim();
      const category = document.getElementById('postCategory').value;
      
      if (!title) {
        alert('Please enter a post title');
        document.getElementById('postTitle').focus();
        return;
      }
      
      if (!content || content === '<br>') {
        alert('Please enter post content');
        document.getElementById('editor').focus();
        return;
      }
      
      if (!category) {
        alert('Please select a category');
        document.getElementById('postCategory').focus();
        return;
      }
      
      // In a real app, you would send this data to the server
      alert('Post saved successfully!');
      console.log({
        title,
        content,
        category,
        status: document.getElementById('postStatus').value,
        tags: document.getElementById('postTags').value,
        excerpt: document.getElementById('postExcerpt').value,
        publishDate: document.getElementById('scheduleDate').value,
        publishTime: document.getElementById('scheduleTime').value,
        seoTitle: document.getElementById('seoTitle').value,
        seoDescription: document.getElementById('seoDescription').value,
        seoKeywords: document.getElementById('seoKeywords').value
      });
    });
  }

  if (previewBtn) {
    previewBtn.addEventListener('click', () => {
      // In a real app, you might save a draft and redirect to a preview URL
      // For demo purposes, we'll just show an alert
      alert('Preview functionality would open a new tab with the post preview');
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      const unsavedChangesModal = new bootstrap.Modal(document.getElementById('unsavedChangesModal'));
      unsavedChangesModal.show();
    });
  }
}

/**
 * Setup modals functionality
 */
function setupModals() {
  // Link modal
  const insertLinkBtn = document.getElementById('insertLinkBtn');
  if (insertLinkBtn) {
    insertLinkBtn.addEventListener('click', () => {
      const linkText = document.getElementById('linkText').value.trim();
      const linkUrl = document.getElementById('linkUrl').value.trim();
      const openNewTab = document.getElementById('openNewTab').checked;
      
      if (!linkUrl) {
        alert('Please enter a URL');
        return;
      }
      
      const editor = document.getElementById('editor');
      const selection = window.getSelection();
      
      let linkHtml = '';
      if (linkText) {
        linkHtml = `<a href="${linkUrl}" ${openNewTab ? 'target="_blank" rel="noopener noreferrer"' : ''}>${linkText}</a>`;
      } else {
        linkHtml = `<a href="${linkUrl}" ${openNewTab ? 'target="_blank" rel="noopener noreferrer"' : ''}>${linkUrl}</a>`;
      }
      
      document.execCommand('insertHTML', false, linkHtml);
      
      // Reset form and close modal
      document.getElementById('linkText').value = '';
      document.getElementById('linkUrl').value = '';
      document.getElementById('openNewTab').checked = false;
      
      const linkModal = bootstrap.Modal.getInstance(document.getElementById('linkModal'));
      linkModal.hide();
      
      // Focus back on editor
      editor.focus();
    });
  }

  // Image modal
  const insertImageBtn = document.getElementById('insertImageBtn');
  if (insertImageBtn) {
    insertImageBtn.addEventListener('click', () => {
      const imageUrl = document.getElementById('imageUrl').value.trim();
      const imageAlt = document.getElementById('imageAlt').value.trim();
      const imageCaption = document.getElementById('imageCaption').value.trim();
      
      if (!imageUrl) {
        alert('Please enter an image URL');
        return;
      }
      
      const editor = document.getElementById('editor');
      
      let imageHtml = `<img src="${imageUrl}" alt="${imageAlt || 'Image'}" class="img-fluid rounded-3">`;
      
      if (imageCaption) {
        imageHtml += `<span class="image-caption">${imageCaption}</span>`;
      }
      
      document.execCommand('insertHTML', false, imageHtml);
      
      // Reset form and close modal
      document.getElementById('imageUrl').value = '';
      document.getElementById('imageAlt').value = '';
      document.getElementById('imageCaption').value = '';
      
      const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
      imageModal.hide();
      
      // Focus back on editor
      editor.focus();
    });
  }

  // Code modal
  const insertCodeBtn = document.getElementById('insertCodeBtn');
  if (insertCodeBtn) {
    insertCodeBtn.addEventListener('click', () => {
      const codeLanguage = document.getElementById('codeLanguage').value;
      const codeContent = document.getElementById('codeContent').value;
      
      if (!codeContent) {
        alert('Please enter code content');
        return;
      }
      
      const editor = document.getElementById('editor');
      
      const codeHtml = `
        <div class="code-block">
          <pre><code class="language-${codeLanguage}">${escapeHtml(codeContent)}</code></pre>
        </div>
      `;
      
      document.execCommand('insertHTML', false, codeHtml);
      
      // Reset form and close modal
      document.getElementById('codeContent').value = '';
      
      const codeModal = bootstrap.Modal.getInstance(document.getElementById('codeModal'));
      codeModal.hide();
      
      // Focus back on editor
      editor.focus();
    });
  }

  // Unsaved changes modal
  const discardChangesBtn = document.getElementById('discardChangesBtn');
  if (discardChangesBtn) {
    discardChangesBtn.addEventListener('click', () => {
      // In a real app, you would redirect to the blog page
      window.location.href = 'blog.html';
    });
  }

  const saveChangesBtn = document.getElementById('saveChangesBtn');
  if (saveChangesBtn) {
    saveChangesBtn.addEventListener('click', () => {
      document.getElementById('savePostBtn').click();
      
      const unsavedChangesModal = bootstrap.Modal.getInstance(document.getElementById('unsavedChangesModal'));
      unsavedChangesModal.hide();
    });
  }
}

/**
 * Helper function to escape HTML 
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Detect unsaved changes when leaving the page
 */
window.addEventListener('beforeunload', (e) => {
  const editor = document.getElementById('editor');
  const title = document.getElementById('postTitle');
  
  if ((editor && editor.innerHTML.trim() !== '' && editor.innerHTML.trim() !== '<br>') || 
      (title && title.value.trim() !== '')) {
    e.preventDefault();
    e.returnValue = '';
  }
});