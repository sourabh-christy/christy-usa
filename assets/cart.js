class CartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.dataset.personalized === 'true') {
        let currentQuantity = Number(this.dataset.currentquantity);
        let newQuantity = Number(this.dataset.personalizationquantity) - currentQuantity;
        if (newQuantity < 0) newQuantity = 0;
        const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
        console.log(cartItems)
        cartItems.updatePersonalizedQuantity(this.dataset.itemKey, 0, '', this.dataset.key, { id: this.dataset.personalizationkey, quantity: newQuantity });
      } else {
        const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
        cartItems.updateQuantity(this.dataset.itemKey, 0);
      }

      // App.accordion();
      // App.dropdown();
      // setupDropdowns();
    });

  }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement =
      document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');

    const debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER ?? 300);

    this.addEventListener('change', debouncedOnChange.bind(this));
    this.initProductSamples();
    this.removeAutoItems();
    App.overflowFloatedStyle();

    // setupDropdowns();
    App.accordion();
  }

  cartUpdateUnsubscriber = undefined;

  connectedCallback() {
    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (event.source === 'cart-items') {
        return;
      }
      this.onCartUpdate();
    });
  }

  initializeSplideAfterCartUpdate() {
    const splides = document.querySelectorAll('.complete-look-cart .splide');

    splides.forEach((el) => {
      if (el.splide) {
        el.splide.destroy();
      }
      const splideInstance = new Splide(el, {
        arrows: true,
        pagination: false,
        type: 'slide',
        autoWidth: true,
        gap: '20px',
        omitEnd: true,
        perPage: 1,
        perMove: 1,
      });

      const bar = el.querySelector('.slider-progress-bar');
      const slideCounterPage = el.querySelector('[data-splide-current-page]');
      const slideCounterTotal = el.querySelector('[data-splide-total-pages]');

      const updateCounterAndProgressBar = () => {
        const { index, length } = splideInstance;
        const perPage = splideInstance.options.perPage;
        const totalPages = Math.ceil(length / perPage);
        const currentPage = Math.ceil((index + 1) / perPage);

        if (slideCounterPage && slideCounterTotal) {
          slideCounterPage.textContent = String(currentPage);
          slideCounterTotal.textContent = String(totalPages);
        }

        if (bar) {
          const rate = currentPage / totalPages;
          bar.style.width = `${rate * 100}%`;
        }
      };

      splideInstance.on('ready move', updateCounterAndProgressBar);
      splideInstance.mount();
    });
  }


  disconnectedCallback() {
    this.initializeSplideAfterCartUpdate()
    if (this.cartUpdateUnsubscriber) {
      this.cartUpdateUnsubscriber();
    }
  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.itemKey, event.target.value, document.activeElement.getAttribute('name'));
    App.overflowFloatedStyle();
  }

  onCartUpdate() {
    fetch(`${routes.cart_url}?section_id=main-cart-items`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const sourceQty = html.querySelector('cart-items');
        this.innerHTML = sourceQty.innerHTML;

        const updateWishBtns = new Event('shopify-wishlist:setup-buttons');
        document.dispatchEvent(updateWishBtns);
  
        this.initProductSamples();
        setTimeout(() => {
          console.log('Cart items updated');
          App.overflowFloatedStyle();
        }, 500);

    })
      .catch((e) => {
        console.error('Error during cart update:', e);
      });

    // setupDropdowns();
  }

  removeAutoItems () {
    const getItems = () => document.querySelectorAll('.cart-item[data-variant-id]');
    const getCheckedSample = () => document.querySelector('.product-sample-checkbox:checked');

    if (getItems().length > 1) return; // More than one item in cart

    if (getItems()[0]?.classList.contains('cart-item-gift')) {
      this.closest('cart-drawer')?.refreshCart();
      console.log('Gift item in cart, refreshing cart...');
      document.querySelector('#cart-icon-bubble .cart-count-bubble')?.remove();
    } else if (getCheckedSample()) {
      void this.updateCart(getCheckedSample().value, 'remove');
      this.closest('cart-drawer')?.refreshCart();
      document.querySelector('#cart-icon-bubble .cart-count-bubble')?.remove();
    }
  }

  async updateCart(productHandle, action) {
    this.enableLoading();

    const endpoint = action === 'add' ? '/cart/add.js' : '/cart/change.js';
    const payload = action === 'add'
      ? { items: [{ id: productHandle, quantity: 1 }] }
      : { id: productHandle, quantity: 0 };

    // App.dropdown();
    // setupDropdowns();
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error('API error:', error);
        throw new Error(error.message || 'Unknown error');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to ${action} product ${productHandle}.`, error);
    } finally {
      this.disableLoading();
    }

  }

  initProductSamples() {
    console.log('Initializing product samples...');

    const productSamples = document.querySelectorAll('.product-sample');
    const cartWrapper = document.querySelector('.drawer__cart-items-wrapper');
    const cartItems = cartWrapper?.querySelectorAll('[data-variant-id]') ?? [];
    const cartVariantIds = Array.prototype.reduce.call(cartItems, (acc, item) => {
      const variantId = item.getAttribute('data-variant-id');
      if (variantId) acc.push(variantId);
      return acc;
    }, []);
    
    const descriptionElement = document.querySelector('.product-sample-description');
  
    console.log('Cart variant IDs:', cartVariantIds);

    const overlay = document.querySelector('#CartDrawer-Overlay');
    overlay.addEventListener('click', (e) => {
      document.querySelector('cart-drawer').classList.remove('active');
      document.querySelector('html').classList.remove('overflow-hidden'); 
    });

    // App.dropdown();
    // App.accordion();
    productSamples.forEach((sample) => {
      const realCheckbox = sample.querySelector('.product-sample-checkbox');
      const fakeCheckbox = sample.querySelector('.sample-fake-checkbox');
      const sampleVariantId = realCheckbox.value;
      const sampleDescription = sample.dataset.sampleDescription;

      if (cartVariantIds.includes(sampleVariantId)) {
        this.hideSampleInCart(sampleVariantId);
        realCheckbox.checked = true;
        fakeCheckbox.classList.add('checked');
        this.updateSampleDescription(descriptionElement, sampleDescription);
      } else {
        realCheckbox.checked = false;
        fakeCheckbox.classList.remove('checked');
      }
  
      sample.addEventListener('click', async () => {
        const selectedSampleId = Array.from(productSamples)
          .find((s) => s.querySelector('.product-sample-checkbox').checked)
          ?.querySelector('.product-sample-checkbox').value;
  
        if (selectedSampleId === sampleVariantId) {
          await this.updateCart(sampleVariantId, 'remove');
          realCheckbox.checked = false;
          fakeCheckbox.classList.remove('checked');
          this.updateSampleDescription(descriptionElement, null);
          this.closest('cart-drawer')?.refreshCart()
          return;
        }
  
        if (selectedSampleId) {
          await this.updateCart(selectedSampleId, 'remove');
          const prevSample = Array.from(productSamples).find(
            (s) => s.querySelector('.product-sample-checkbox').value === selectedSampleId
          );
          if (prevSample) {
            prevSample.querySelector('.product-sample-checkbox').checked = false;
            prevSample.querySelector('.sample-fake-checkbox').classList.remove('checked');
          }
        }
  
        await this.updateCart(sampleVariantId, 'add');
        realCheckbox.checked = true;
        fakeCheckbox.classList.add('checked');
        this.updateSampleDescription(descriptionElement, sampleDescription);
        this.closest('cart-drawer')?.refreshCart()
      });
    });
  }
  
  hideSampleInCart(sampleVariantId) {
    const cartItems = document.querySelectorAll(`[data-variant-id="${sampleVariantId}"]`);
    cartItems.forEach((item) => {
      item.classList.add('hidden');
      item.nextElementSibling?.classList.add('hidden');
    });
  }
  
  updateSampleDescription(descriptionElement, text) {
    if (!descriptionElement) return;
  
    if (text) {
      descriptionElement.textContent = text;
      descriptionElement.classList.remove('hidden');
    } else {
      descriptionElement.textContent = '';
      descriptionElement.classList.add('hidden');
    }
  }

  updateQuantity(lineKey, quantity) {
    this.enableLoading();

    const body = JSON.stringify({
      id: lineKey,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname,
    });
    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => response.text())
      .then((state) => {
        const parsedState = JSON.parse(state);
        const quantityElement = document.getElementById(`Drawer-quantity-${lineKey}`);

        if (parsedState.errors) {
          if (this.querySelector('.cart-item-gift')) {
            this.closest('cart-drawer')?.refreshCart()
            console.log('Gift item in cart, refreshing cart...');
            return;
          }
          console.error('Update quantity error:', parsedState.errors);
          quantityElement.value = quantityElement.getAttribute('value');
          this.updateLiveRegions(lineKey, parsedState.errors);
          return;
        }
  
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');
  
        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section) => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML = this.getSectionInnerHTML(
            parsedState.sections[section.section],
            section.selector
          );
        });
      })
      .catch((error) => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
      })
      .finally(() => {
        this.disableLoading();
        App.overflowFloatedStyle();
        App.accordion();
      });

    // setupDropdowns();
  }
  updatePersonalizedQuantity(lineKey, quantity, name,key,personalization_product) {
    this.enableLoading();
    let update_data={
      [key]:quantity,
      [personalization_product.id]:personalization_product.quantity
    }
    const body = JSON.stringify({
      updates:update_data,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname,
    });

    fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        const quantityElement = document.getElementById(`Drawer-quantity-${lineKey}`);
        const items = document.querySelectorAll('.cart-item');

        if (parsedState.errors) {
          quantityElement.value = quantityElement.getAttribute('value');
          this.updateLiveRegions(lineKey, parsedState.errors);
          return;
        }

        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section) => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML = this.getSectionInnerHTML(
            parsedState.sections[section.section],
            section.selector
          );
        });

        // const updatedValue = parsedState.items[line - 1] ? parsedState.items[line - 1].quantity : undefined;
        // let message = '';
        // if (items.length === parsedState.items.length && updatedValue !== parseInt(quantityElement.value)) {
        //   if (typeof updatedValue === 'undefined') {
        //     message = window.cartStrings.error;
        //   } else {
        //     message = window.cartStrings.quantityError.replace('[quantity]', updatedValue);
        //   }
        // }
        this.updateLiveRegions(lineKey, message);

        const lineItem = document.getElementById(`CartDrawer-Item-${lineKey}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          cartDrawerWrapper
            ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`))
            : lineItem.querySelector(`[name="${name}"]`).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'));
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'));
        }
        publish(PUB_SUB_EVENTS.cartUpdate, { source: 'cart-items', cart_items: parsedState.items });

      })
      .catch(() => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
      })
      .finally(() => {
        this.disableLoading();
      });
  }

  updateLiveRegions(lineKey, message) {
    const lineItemError = document.getElementById(`CartDrawer-LineItemError-${lineKey}`);
    if (lineItemError) lineItemError.querySelector('.cart-item__error-text').innerHTML = message;

    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus =
      document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
    App.overflowFloatedStyle();

  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  enableLoading() {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.add('cart__items--disabled');

    document.querySelector('#CartDrawer-Checkout')?.setAttribute('disabled', 'true');

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading() {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.remove('cart__items--disabled');

    document.querySelector('#CartDrawer-Checkout')?.removeAttribute('disabled');
  }
}

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define(
    'cart-note',
    class CartNote extends HTMLElement {
      constructor() {
        super();

        this.addEventListener(
          'change',
          debounce((event) => {
            const body = JSON.stringify({ note: event.target.value });
            fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } });
          }, ON_CHANGE_DEBOUNCE_TIMER ?? 300)
        );
      }
    }
  );
}
