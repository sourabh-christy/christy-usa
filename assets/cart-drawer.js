class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.boundClose = this.close.bind(this);
    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.attachOverlayListener();
    this.setHeaderCartIconAccessibility();
    this.setPromocodeAppListeners();
    this.setSearchCartIconAccessibility();
  }

  setPromocodeAppListeners = () => {
    window.addEventListener('lit:discount:removed', (e) => {
      this.refreshCart()
    })
    window.addEventListener('lit:discount:applied', (e) => {
      this.refreshCart()
    })
    // window.addEventListener('lit:discount:invalid', (e) => { // leave it here to know that we have such event
    //   console.log('invalid', e)
    // })
  }

  attachOverlayListener() {
    const overlay = this.querySelector('#CartDrawer-Overlay');
    if (overlay) {
      overlay.removeEventListener('click', this.boundClose);
      overlay.addEventListener('click', this.boundClose);
    }
  }

  setHeaderCartIconAccessibility() {
    const cartLink = document.querySelector('#cart-icon-bubble');
    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.open(cartLink);
    });
    cartLink.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this.open(cartLink);
      }
    });
  }

  setSearchCartIconAccessibility() {
    const cartLink = document.querySelector('#cart-icon-bubble-search');
    if (!cartLink) return;
    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.open(cartLink);
    });
    cartLink.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this.open(cartLink);
      }
    });
  }
  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
    if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => {
      this.classList.add('animate', 'active');
    });

    this.addEventListener(
      'transitionend',
      () => {
        const containerToTrapFocusOn = this.classList.contains('is-empty')
          ? this.querySelector('.drawer__inner-empty')
          : document.getElementById('CartDrawer');
        const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
        trapFocus(containerToTrapFocusOn, focusElement);
      },
      { once: true }
    );

    document.querySelector('html').classList.add('overflow-hidden');
    // App.dropdown();
    // setupDropdowns();
    App.accordion();
    this.attachOverlayListener();
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.querySelector('html').classList.remove('overflow-hidden');
  }

  setSummaryAccessibility(cartDrawerNote) {
    cartDrawerNote.setAttribute('role', 'button');
    cartDrawerNote.setAttribute('aria-expanded', 'false');

    if (cartDrawerNote.nextElementSibling.getAttribute('id')) {
      cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
    }

    cartDrawerNote.addEventListener('click', (event) => {
      event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
    });

    cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  }

  renderContents(parsedState, preventOpen = false) {
    this.querySelector('.drawer__inner').classList.contains('is-empty') && this.querySelector('.drawer__inner').classList.remove('is-empty');
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach((section) => {
      const sectionElement = section.selector
        ? document.querySelector(section.selector)
        : document.getElementById(section.id);

      const sectionRenderedHtml = parsedState.sections[section.id];
      if (!sectionElement || !sectionRenderedHtml) return;

      sectionElement.innerHTML = this.getSectionInnerHTML(sectionRenderedHtml, section.selector);
    });

    App.accordion();
   // App.dropdown();
    // setupDropdowns();

    if (preventOpen) return

    setTimeout(() => {
      this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
      this.open();
    });
  }

  refreshCart = () => {
    const currentScrollTop = this.querySelector('.cart-inner-scrolled')?.scrollTop ?? 0;
    // use section render api to refresh cart
    fetch(`${window.location.href}?section_id=cart-drawer`)
      .then((response) => response.text())
      .then((responseText) => {
        this.renderContents({ id: this.productId, sections: { 'cart-drawer': responseText } }, true);

        const cartInnerScrolled = this.querySelector('.cart-inner-scrolled');
        if (cartInnerScrolled) cartInnerScrolled.scrollTop = currentScrollTop;

        App.accordion();
        // App.dropdown();

        // setupDropdowns();
        App.overflowFloatedStyle();
      });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer',
      },
      {
        id: 'cart-icon-bubble',
      },

      {
        id: 'cart-icon-bubble-search',
      },
    ];
  }

  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {

  getSectionsToRender() {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      },

      {
        id: 'cart-icon-bubble-search',
        section: 'cart-icon-bubble-search',
        selector: '.shopify-section',
      },
    ];
  }
}

customElements.define('cart-drawer-items', CartDrawerItems);
