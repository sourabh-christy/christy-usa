 
function loadProductQuickView() {


    // scroll to reviews on click
    if (document.querySelector('#trustpilot-wrap')) {
        document.querySelector('#trustpilot-wrap').addEventListener('click', function () {
            let reviews = document.querySelector('#reviews');
            document.querySelector('#reviews').classList.add('open');
            setTimeout(function () {
                if (reviews) {
                    let reviewsTop = (document.querySelector('.product').getBoundingClientRect().top + window.scrollY + document.querySelector('.product').offsetHeight) - document.querySelector('.header-bar').offsetHeight - document.querySelector('#reviews').offsetHeight;
                    window.scrollTo({
                        top: reviewsTop,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            }, 100);
        });
    }

    const el = document.querySelector('#modalViewContent');
    const mobOptions = document.querySelector('[data-moboptions]');
    let mobOptionsHeight = 0;


    // colour picker
    const toggleColours = document.querySelector('[data-togglecolours]');
    const colourPickerMobile = document.querySelector('#colour-picker-mobile');
    let colourPickerMobileHeight = 0;

    el.classList.remove('max-md:opacity-0');

    if (mobOptions) {
        mobOptionsHeight = mobOptions.offsetHeight;
    }

    if (colourPickerMobile) {
        colourPickerMobileHeight = colourPickerMobile.offsetHeight;
    }

    let optionsOpen = false;


    let setBottom;
    let setTop;

    // mobile option switcher
    const mobOpNavBtns = document.querySelectorAll('#option-nav-mob > a');
    const opFieldsets = document.querySelectorAll('variant-radios fieldset');

    if (mobOpNavBtns.length && opFieldsets) {
        mobOpNavBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                
                e.preventDefault();
                let href = btn.getAttribute('href');

                mobOpNavBtns.forEach(function (mobOpNavBtn) {
                    mobOpNavBtn.classList.remove('selected-tab');
                });

                btn.classList.add('selected-tab');

                opFieldsets.forEach(function (fs) {
                    fs.classList.add('max-md:hidden');
                });

                let thisFs = document.querySelector(href);
                if (thisFs) {
                    thisFs.classList.remove('max-md:hidden');
                }

                setPanelHeight();
            });
        });
    }



    if (colourPickerMobile) {
        document.querySelector('#product-wrap')?.addEventListener('click', function () {
            colourPickerMobile.classList.remove('!-translate-y-full', '!opacity-100', '!visible');
        });

        window.addEventListener('scroll', function () {
            colourPickerMobile.classList.remove('!-translate-y-full', '!opacity-100', '!visible');
        });


        colourPickerMobile.addEventListener('click', function (e) {
            e.stopPropagation();
        });



        colourPickerMobile.querySelectorAll('button').forEach((btn) => {
            btn.addEventListener('click', function () {
                setTimeout(function () {
                    colourPickerMobile.classList.add('!-translate-y-full', '!opacity-100', '!visible');
                }, 1);
            });
        });

        if (toggleColours) {
            toggleColours.addEventListener('click', function (e) {
                e.stopPropagation();

                colourPickerMobile.classList.toggle('!-translate-y-full');
                colourPickerMobile.classList.toggle('!opacity-100');
                colourPickerMobile.classList.toggle('!visible');

                if (colourPickerMobile) {
                    let coloursTop = (document.querySelector('.product__info-wrapper').getBoundingClientRect().top - document.querySelector('#colour-picker-mobile').offsetHeight) + window.scrollY;
                    let currentScroll = window.scrollY + document.querySelector('.header-bar').offsetHeight;

                    if (currentScroll > coloursTop && colourPickerMobile.classList.contains('!opacity-100')) {
                        window.scrollTo({
                            top: coloursTop - document.querySelector('.header-bar').offsetHeight,
                            left: 0,
                            behavior: "smooth",
                        });
                    }
                }

            });
        }
    }

    // on click mobile variant buttons
    const variantButtons = document.querySelectorAll('button.variant-button');
    if (variantButtons.length) {
        variantButtons.forEach((btn) => {
            btn.addEventListener('click', function () {
                let forId = btn.dataset.for;
                document.querySelector('#' + forId).click();
            });
        });
    }

    function isIE() {
        const ua = window.navigator.userAgent;
        const msie = ua.indexOf('MSIE ');
        const trident = ua.indexOf('Trident/');

        return msie > 0 || trident > 0;
    }

    if (!isIE()) return;
    const hiddenInput = document.querySelector('#{{ product_form_id }} input[name="id"]');
    const noScriptInputWrapper = document.createElement('div');
    const variantSwitcher =
        document.querySelector('variant-radios[data-section="{{ section.id }}"]') ||
        document.querySelector('variant-selects[data-section="{{ section.id }}"]');
    noScriptInputWrapper.innerHTML = document.querySelector(
        '.product-form__noscript-wrapper-{{ section.id }}'
    ).textContent;
    variantSwitcher.outerHTML = noScriptInputWrapper.outerHTML;

    document.querySelector('#Variants-{{ section.id }}').addEventListener('change', function (event) {
        hiddenInput.value = event.currentTarget.value;
    });
}

