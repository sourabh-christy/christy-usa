if (!customElements.get('quick-add-modal')) {
  customElements.define(
    'quick-add-modal',
    class QuickAddModal extends ModalDialog {
      constructor() {
        super();
        this.modalContent = this.querySelector('[id^="QuickAddInfo-"]');
        this.thankYouModal = document.querySelector('#QuickAddThankYou');
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      }

      hide(preventFocus = false) {
        const searchPanel = document.querySelector('#searchBar');
        if (!searchPanel || !searchPanel.classList.contains('opacity-100')) {
          document.documentElement.classList.remove('overflow-hidden');
        }
        const cartNotification = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        if (cartNotification) cartNotification.setActiveElement(this.openedBy);
        this.modalContent.innerHTML = '';

        if (preventFocus) this.openedBy = null;
        super.hide();
      }

      show(opener) {
        document.documentElement.classList.add('overflow-hidden');
        opener.setAttribute('aria-disabled', true);
        opener.classList.add('loading');
        opener.querySelector('.loading-overlay__spinner').classList.remove('hidden');
        opener.querySelector('.qatc-icon').classList.add('hidden');

        fetch(opener.getAttribute('data-product-url'))
          .then((response) => response.text())
          .then((responseText) => {
            const responseHTML = new DOMParser().parseFromString(responseText, 'text/html');
            this.productElement = responseHTML.querySelector('section[id^="MainProduct-"]');
            this.preventDuplicatedIDs();
            this.removeDOMElements();
            this.setInnerHTML(this.modalContent, this.productElement.innerHTML);

            if (window.Shopify && Shopify.PaymentButton) {
              Shopify.PaymentButton.init();
            }

            if (window.ProductModel) window.ProductModel.loadShopifyXR();

            this.removeGalleryListSemantic();
            this.updateImageSizes();
            this.preventVariantURLSwitching();
            super.show(opener);

            // // Refresh slider
            // const productGalleryRefresh = new Event('product-gallery-refresh');
            // this.dispatchEvent(productGalleryRefresh);

            // add event listener for upsell product
            initPriceChangeListeners(this.modalContent);

            // Refresh lazy images
            const lazyimg = new Event('lazyimg');
            window.dispatchEvent(lazyimg);

            // Trigger reloading all product info
            const variantOptionFirst = this.modalContent.querySelector('variant-radios .variant-option');
            if (variantOptionFirst) variantOptionFirst.dispatchEvent(new Event('change', { bubbles: true }));

            // Refresh wishlist buttons
            const wishlistRefresh = new Event('shopify-wishlist:setup-buttons');
            document.dispatchEvent(wishlistRefresh);
   
          document.body.dispatchEvent(new Event('quick-add-modal:opened'));

        })
          .finally(() => {
            opener.removeAttribute('aria-disabled');
            opener.classList.remove('loading');
            opener.querySelector('.loading-overlay__spinner').classList.add('hidden');
            opener.querySelector('.qatc-icon').classList.remove('hidden');

            if (this.thankYouModal) {
              this.thankYouModal.hide(true);
            }
          });
      }

      setInnerHTML(element, html) {
        element.innerHTML = html;

        // Reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
        element.querySelectorAll('script').forEach((oldScriptTag) => {
          const newScriptTag = document.createElement('script');
          Array.from(oldScriptTag.attributes).forEach((attribute) => {
            newScriptTag.setAttribute(attribute.name, attribute.value);
          });
          newScriptTag.appendChild(document.createTextNode(oldScriptTag.innerHTML));
          oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
        });
      }

      preventVariantURLSwitching() {
        const variantPicker = this.modalContent.querySelector('variant-radios,variant-selects');
        if (!variantPicker) return;

        variantPicker.setAttribute('data-update-url', 'false');
      }

      removeDOMElements() {
        const pickupAvailability = this.productElement.querySelector('pickup-availability');
        if (pickupAvailability) pickupAvailability.remove();

        const productModal = this.productElement.querySelector('product-modal');
        if (productModal) productModal.remove();

        const modalDialog = this.productElement.querySelectorAll('modal-dialog');
        if (modalDialog) modalDialog.forEach((modal) => modal.remove());
      }

      preventDuplicatedIDs() {
        const sectionId = this.productElement.dataset.section;
        this.productElement.innerHTML = this.productElement.innerHTML.replaceAll(sectionId, `quickadd-${sectionId}`);
        this.productElement.querySelectorAll('variant-selects, variant-radios, product-info').forEach((element) => {
          element.dataset.originalSection = sectionId;
        });
      }

      removeGalleryListSemantic() {
        const galleryList = this.modalContent.querySelector('[id^="Slider-Gallery"]');
        if (!galleryList) return;

        galleryList.setAttribute('role', 'presentation');
        galleryList.querySelectorAll('[id^="Slide-"]').forEach((li) => li.setAttribute('role', 'presentation'));
      }

      updateImageSizes() {
        const product = this.modalContent.querySelector('.product');
        const desktopColumns = product.classList.contains('product--columns');
        if (!desktopColumns) return;

        const mediaImages = product.querySelectorAll('.product__media img');
        if (!mediaImages.length) return;

        let mediaImageSizes =
          '(min-width: 1000px) 715px, (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)';

        if (product.classList.contains('product--medium')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '605px');
        } else if (product.classList.contains('product--small')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '495px');
        }

        mediaImages.forEach((img) => img.setAttribute('sizes', mediaImageSizes));
      }

      handleQuickAddThankYouModal(response) {
        const thankYouModal = document.querySelector('#QuickAddThankYou');
        const grid = thankYouModal?.querySelector('.splide__list');
        const relatedHandles = JSON.parse(this.querySelector('[data-related-handles]')?.textContent)?.related_handles?.split(',');

        if (!relatedHandles.length) {
          this.hide(true);
          this.cart.renderContents(response);
          return;
        }

        const fetchProductCardHTML = (handle) => {
          let productTileTemplateUrl = `/products/${handle}?view=card-mob-large-img`;

          return fetch(productTileTemplateUrl)
          .then((res) => res.text())
          .then((res) => {
            const text = res;
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, 'text/html');
            const productCard = htmlDocument.documentElement.querySelector('.product-card');
            if (!productCard) return '';
            return '<div class="splide__slide w-4/5  sm:w-[calc(50%-6px)] md:w-[calc(33.3333%-6px)]">' + productCard.outerHTML + '</div>';
          })
          .catch((err) => console.error(`[Shopify Recently Viewed] Failed to load content for handle: ${handle}`, err));
        };

        document.body.addEventListener(
          'modalClosed',
          async () => {
            if (!thankYouModal) return;
            const spinner = thankYouModal.querySelector('[data-spinner]');
            const splider = thankYouModal.querySelector('.splide');
            spinner.hidden = false;
            splider.hidden = true;

            thankYouModal.show();

            const requests = relatedHandles.map(fetchProductCardHTML);
            const responses = await Promise.all(requests);

            grid.innerHTML = responses.join('');
            spinner.hidden = true;
            splider.hidden = false;

            const openCartButton = thankYouModal.querySelector('.open-cart-button-js');
            if (openCartButton) {
              openCartButton.addEventListener('click', () => {
                thankYouModal.hide();
                this.cart.renderContents(response);
                App.overflowFloatedStyle();
              })
            }

            // lazy load images
            const lazyimg = new Event('lazyimg');
            window.dispatchEvent(lazyimg);

            const splideRefresh = new Event('spliderefresh');
            window.dispatchEvent(splideRefresh);

            // reinit colour selectors
            const initcolourselector = new Event('initcolourselector');
            window.dispatchEvent(initcolourselector);

            // Refresh wishlist buttons
            const wishlistRefresh = new Event('shopify-wishlist:setup-buttons');
            document.dispatchEvent(wishlistRefresh);
          },
          { once: true }
        );
        this.hide(true);
      }
    }
  );
}
