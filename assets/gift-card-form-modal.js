;(() => {
  const initGiftCardFormModal = () => {
    const checkbox = document.querySelector('[data-modaltrigger="giftform"]');
    const modal = document.querySelector('[data-modal="giftform"]');
    const overlay = document.getElementById('gift-form-overlay');
    const closeModalBtn = document.querySelector('[data-modalclose="giftform"]');
    const stickyBar = document.getElementById('stickyBar');
    const productInfoWrapper = document.querySelector('.product__info-wrapper');
    const formErrorMessage = document.querySelector('.product-form__gift-error-message-wrapper');
    const quickAddModalContent = modal.closest('.quick-add-modal__content-info');
    const quickAddModalGiftContent = modal.closest('.quick-add-modal__content--gift-card');
    const htmlElement = document.documentElement;

    const openModal = () => {
      modal.classList.add('active');
      overlay.classList.add('active');
      if (stickyBar) {
        stickyBar.classList.add('hidden');
        stickyBar.classList.remove('visible');
      }

      productInfoWrapper?.classList.add('modal-open-inside');
      quickAddModalContent?.classList.add('overflow-hidden');
      quickAddModalGiftContent?.classList.add('!overflow-visible');
    };

    const closeModal = (event) => {
      event.preventDefault();
      event.stopPropagation();
      modal.classList.remove('active');
      overlay.classList.remove('active');
      !quickAddModalContent && htmlElement.classList.remove('overflow-hidden');
      quickAddModalContent?.classList.remove('overflow-hidden');
      quickAddModalGiftContent?.classList.remove('!overflow-visible');
      if (stickyBar) {
        stickyBar.classList.remove('hidden');
        stickyBar.classList.add('visible');
      }
      checkbox.checked = false;

      productInfoWrapper?.classList.remove('modal-open-inside');
      formErrorMessage?.setAttribute('hidden', 'true');
    };

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        openModal();
      } else {
        closeModal();
      }
    });

    closeModalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    closeModalBtn.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  };

  document.addEventListener('DOMContentLoaded', initGiftCardFormModal);
  if (document.querySelector('[data-modal="giftform"]').closest('.quick-add-modal')) initGiftCardFormModal();

  document.querySelectorAll('.product-form').forEach((form) => {
    const submitButton = form.querySelector('button[type="submit"]');

    function checkForErrors() {
      const errors = validateForm(form);
      const errorWrapper = form.querySelector('.product-form__gift-error-message-wrapper');

      if (errors.length > 0) {
        errorWrapper.removeAttribute('hidden');
        errorWrapper.querySelector('.product-form__error-message').textContent = errors.join(', ');
        submitButton.disabled = true;
      } else {
        errorWrapper.setAttribute('hidden', 'true');
        submitButton.disabled = false;
      }
    }

    form.addEventListener('submit', (e) => {
      const errors = validateForm(form);

      if (errors.length > 0) {
        e.preventDefault();
      }
      checkForErrors();
    });

    form.addEventListener('input', () => {
      checkForErrors();
    });
  });

  function validateForm(form) {
    const errors = [];
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && !validateEmail(emailInput.value)) {
      errors.push('Invalid email address.');
    }
    return errors;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
})();