document.addEventListener('DOMContentLoaded', () => {
    const stickyBar = document.getElementById('stickyBar');
  
    const toggleStickyBar = () => {
      const scrollPosition = window.scrollY;
      const windowWidth = window.innerWidth;
  
      if (windowWidth < 1280) {
        stickyBar.classList.remove('hidden');
        stickyBar.classList.add('visible');
      } else {
        if (scrollPosition > 550) {
          stickyBar.classList.remove('hidden');
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.add('hidden');
          stickyBar.classList.remove('visible');
        }
      }
    };
    toggleStickyBar();
    window.addEventListener('scroll', toggleStickyBar);
    window.addEventListener('resize', toggleStickyBar);

    const linksToSections = [
        { linkSelector: 'a[href="#DeliveryReturns"]', sectionId: 'DeliveryReturns', addClass: true },
        { linkSelector: 'a[href="#Description"]', sectionId: 'Description', addClass: true },
        { linkSelector: 'a[href="#ReviewsWidget"]', sectionId: 'ReviewsWidget', addClass: false },
    ];
    
    linksToSections.forEach(({ linkSelector, sectionId, addClass }) => {
        const link = document.querySelector(linkSelector);
        const section = document.getElementById(sectionId);

        if (!section) { link.remove(); return }
    
        if (link && section) {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            if (addClass) {
              section.classList.add('open');
            }
            section.scrollIntoView({ behavior: 'smooth' });
          });
        }
    });
});