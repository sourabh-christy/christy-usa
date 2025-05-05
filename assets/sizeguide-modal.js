document.addEventListener('DOMContentLoaded', function () {
    const modalTrigger = document.querySelector('[data-modaltrigger="sizeguide"]');
    const modal = document.querySelector('[data-modal="sizeguide"]');
    const overlay = document.getElementById('overlay');
    const closeModalBtn = document.querySelector('[data-modalclose="sizeguide"]');
    const htmlElement = document.documentElement;

    const openModal = () => {
      overlay?.classList.add('active');
    };
    const closeModal = () => {
      modal?.classList.remove('active');
      overlay?.classList.remove('active');
      htmlElement.classList.remove('overflow-hidden');
    };

    modalTrigger?.addEventListener('click', openModal);
    closeModalBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
});