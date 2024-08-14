if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.form.querySelector('[name=id]').disabled = false;
        this.submitButton = this.querySelector('[type="submit"]');
        // if(this.submitButton.getAttribute('data-personalized') === 'true'){
        //   this.form.addEventListener('submit', this.onPersonalizedSubmitHandler.bind(this));
        // }else{
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        //}
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');

        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      // onPersonalizedSubmitHandler(evt) {
      //   evt.preventDefault();
      //   const config = fetchConfig('javascript');
      //   config.headers['X-Requested-With'] = 'XMLHttpRequest';
      //   delete config.headers['Content-Type'];
      //   const formData = new FormData()
      //   formData.set('id',this.submitButton.getAttribute('data-personalize-variant-id'))
      //   formData.set('product-id',this.submitButton.getAttribute('data-personalize-product-id'))
      //   config.body = formData;
      //   fetch(`${routes.cart_add_url}`, config)
      //   .then((response) => response.json())
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((e) => {
      //     console.error(e);
      //   })
      //   .finally(() => {
      //     this.onSubmitHandler(evt)
      //   });
      // }

      onSubmitHandler(evt) {

        evt.preventDefault();

        // on mobile, ensure options panel is visible
        let mobOptions = document.querySelector('[data-moboptions]');
        if (mobOptions) {

          if (window.innerWidth < 768 && mobOptions.dataset.moboptions !== 'true' && mobOptions.querySelectorAll('#option-nav-mob a').length) {

            // adjust panel height
            const openOptionsEvent = new Event("openoptions");
            window.dispatchEvent(openOptionsEvent);

            // adjust panel height
            const panelEvent = new Event("panelheight");
            window.dispatchEvent(panelEvent);


            return false;
          }

        }

        if (this.submitButton.getAttribute('data-personalized') === 'true') {
          if (document.querySelector("#monogram").value === "") {
            console.log("iN error");
            this.hideErrors = false;
            this.handleErrorMessage("Please Enter Monogram Text");
            return;
          }

        }

        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);

        if (this.cart) {

          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id)
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        console.log("aplus",formData.get("aplusproducts"))
        if(formData.get("aplusproducts")){
          let newFormData = new FormData();
          newFormData.append("items[0][id]",formData.get("id"))
          newFormData.append("sections",formData.get("sections"))
          newFormData.append("sections_url",formData.get("sections_url"))
          let aPlusProducts = formData.get("aplusproducts")
          let aplus_array = aPlusProducts.split(",")
          aplus_array.map((ap,i)=>{
            let t = ap.split("-")
            if(t.length > 1){
              newFormData.append(`items[${i+1}][id]`,t[0])
              newFormData.append(`items[${i+1}]][quantity]`,t[2])
            }
          })
          config.body = newFormData;  
        }else{
          config.body = formData;
        }
        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelectorAll('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButton.querySelector('span').classList.add('hidden');

              soldOutMessage.forEach((obj) => {
                obj.classList.remove('hidden');
              })
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location = window.routes.cart_url;
              return;
            }

            if (!this.error)
              publish(PUB_SUB_EVENTS.cartUpdate, { source: 'product-form', productVariantId: formData.get('id') });
            this.error = false;
            if (this.submitButton.getAttribute('data-personalized') === 'true') {
              document.querySelector(".personalize-drawer").classList.remove('active')
              const config = fetchConfig('javascript');
              config.headers['X-Requested-With'] = 'XMLHttpRequest';
              delete config.headers['Content-Type'];
              const formData1 = new FormData()
              formData1.set('id', this.submitButton.getAttribute('data-personalize-variant-id'))
              formData1.set('product-id', this.submitButton.getAttribute('data-personalize-product-id'))
              if (this.cart) {

                formData1.append(
                  'sections',
                  this.cart.getSectionsToRender().map((section) => section.id)
                );
                formData1.append('sections_url', window.location.pathname);
                this.cart.setActiveElement(document.activeElement);
              }
              config.body = formData1;
              fetch(`${routes.cart_add_url}`, config)
                .then((response1) => response1.json())
                .then((response1) => {

                  const quickAddModal = this.closest('quick-add-modal');
                  if (quickAddModal) {
                    document.body.addEventListener(
                      'modalClosed',
                      () => {
                        setTimeout(() => {
                          this.cart.renderContents(response1);
                        });
                      },
                      { once: true }
                    );
                    quickAddModal.hide(true);
                  } else {
                    this.cart.renderContents(response1);
                  }
                  this.clearSelection();
                })
                .catch((e) => {
                  console.error(e);
                })
                .finally(() => {

                });
            } else {

              const quickAddModal = this.closest('quick-add-modal');
              if (quickAddModal) {
                document.body.addEventListener(
                  'modalClosed',
                  () => {
                    setTimeout(() => {
                      this.cart.renderContents(response);
                    });
                  },
                  { once: true }
                );
                quickAddModal.hide(true);
              } else {
                this.cart.renderContents(response);
              }
            }
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading-overlay__spinner').classList.add('hidden');
            App.overflowFloatedStyle();
          });
      }

      clearSelection() {
        document.querySelector('#monogram').value = "";
        document.querySelector("#personalization_text_input").value = "";
        document.querySelector(".personalization_image .personalization_text .mono-text").innerHTML = "";
        document.querySelectorAll(".personalize-font-selector")[0].click()
        document.querySelectorAll(".personalize-color-selector")[0].click()
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }
  );
}