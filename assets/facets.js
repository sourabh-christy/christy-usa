class FacetFiltersForm extends HTMLElement {
  constructor() {
    super();
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 500);

    const facetForm = this.querySelector('form');
    facetForm.addEventListener('input', (event) => this.collectFilterChanges(event));

    const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);

    const applyButton = this.querySelector('.btn-apply-filters');
    if (applyButton) {
      applyButton.addEventListener('click', () => {
        const maxInput = document.querySelector('.main-price-max-input');
        const minInput = document.querySelector('.main-price-min-input');
        const maxRange = document.querySelector('.price-range-max');
        const minRange = document.querySelector('.price-range-min');

        if (maxInput && maxRange) {
          const MAX = +maxRange.max;

          if (+maxInput.value > MAX) {
            maxInput.value = MAX;
          }

          if (minInput && minRange) {
            const MIN = +minRange.min;
            if (+minInput.value < MIN) {
              minInput.value = MIN;
            }
          }
        }

        const form = this.querySelector('form');
        if (form) {
          this.pendingSearchParams = this.createSearchParams(form);
        }

        if (this.pendingSearchParams) {
          this.onSubmitForm(this.pendingSearchParams, null);
          this.pendingSearchParams = null;
        }
      });
    }
    const sortSelect = this.querySelector('.facet-filters__sort'); 
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const sortParams = new URLSearchParams(window.location.search);
        sortParams.set('sort_by', sortSelect.value); 
        this.onSubmitForm(sortParams.toString(), null); 
      });
    }
    this.priceRangeSlider();
  }

  collectFilterChanges(event) {
  
    this.pendingSearchParams = this.createSearchParams(event.target.closest('form'));
    this.priceRangeSlider();
  }

  priceRangeSlider() {
    const minRange = this.querySelector('.price-range-min');
    const maxRange = this.querySelector('.price-range-max');
    const minInput = this.querySelector('.main-price-min-input');
    const maxInput = this.querySelector('.main-price-max-input');
    const rangeTrack = this.querySelector('.price-range-track');

    if (!minRange || !maxRange || !minInput || !maxInput || !rangeTrack) {
        return;
    }

    const MIN = +minRange.min;
    const MAX = +maxRange.max;

    const updateTrack = () => {
        const minPercent = ((+minRange.value - MIN) / (MAX - MIN)) * 100;
        const maxPercent = ((+maxRange.value - MIN) / (MAX - MIN)) * 100;

        rangeTrack.style.left = `${minPercent}%`;
        rangeTrack.style.width = `${maxPercent - minPercent}%`;
    };

    const syncFromSliders = () => {
        minInput.value = minRange.value;
        maxInput.value = maxRange.value;
        updateTrack();
    };

    const validateAndUpdate = (input, isMinInput) => {
        const value = Number(input.value);
        const min = isMinInput ? MIN : +minInput.value;
        const max = isMinInput ? +maxInput.value : MAX;

        if (value < min) input.value = '';
        if (value > max) input.value = '';
    };

    const syncFromInputs = () => {
        const minValue = Math.max(MIN, Math.min(+minInput.value || MIN, +maxInput.value - 1));
        const maxValue = Math.min(MAX, Math.max(+maxInput.value || MAX, +minInput.value + 1));

        minRange.value = minValue;
        maxRange.value = maxValue;

        updateTrack();
    };

    const onBlurOrEnter = (event) => {
        if (event.type === 'blur' || (event.type === 'keypress' && event.key === 'Enter')) {
            syncFromInputs();
        }
    };

    minRange.addEventListener('input', syncFromSliders);
    maxRange.addEventListener('input', syncFromSliders);

    minInput.addEventListener('blur', onBlurOrEnter);
    maxInput.addEventListener('blur', onBlurOrEnter);
    minInput.addEventListener('keypress', onBlurOrEnter);
    maxInput.addEventListener('keypress', onBlurOrEnter);

    updateTrack();
}

  updateTrack(minRange, maxRange, minInput, maxInput, rangeTrack, MIN, MAX) {
    const minPercent = ((+minRange.value - MIN) / (MAX - MIN)) * 100;
    const maxPercent = ((+maxRange.value - MIN) / (MAX - MIN)) * 100;

    rangeTrack.style.left = `${minPercent}%`;
    rangeTrack.style.width = `${maxPercent - minPercent}%`;
  }

  updateInputs(minRange, maxRange, minInput, maxInput, rangeTrack, MIN, MAX) {
    minInput.value = minRange.value;
    maxInput.value = maxRange.value;
    this.updateTrack(minRange, maxRange, minInput, maxInput, rangeTrack, MIN, MAX);
  }

  updateSliders(minRange, maxRange, minInput, maxInput, rangeTrack, MIN, MAX) {
    const minValue = Math.min(+minInput.value, +maxRange.value - 1);
    const maxValue = Math.max(+maxInput.value, +minRange.value + 1);

    minRange.value = Math.max(minValue, MIN);
    maxRange.value = Math.min(maxValue, MAX);
    this.updateTrack(minRange, maxRange, minInput, maxInput, rangeTrack, MIN, MAX);
  }


  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) return;
      FacetFiltersForm.renderPage(searchParams, null, false);
    };
    window.addEventListener('popstate', onHistoryChange);
  }

  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  static renderPage(searchParams, event, updateURLHash = true) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections();
    const countContainer = document.getElementById('ProductCount');
    const countContainers = document.querySelectorAll('.product-count');
    const countContainerDesktop = document.getElementById('ProductCountDesktop');
    document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
    if (countContainer) {
      countContainer.classList.add('loading');
    }

    if (countContainers) {
      countContainers.forEach((container) => {
        container.classList.add('loading');
      });
    }
    if (countContainerDesktop) {
      countContainerDesktop.classList.add('loading');
    }

    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = (element) => element.url === url;

      FacetFiltersForm.filterData.some(filterDataUrl)
        ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event)
        : FacetFiltersForm.renderSectionFromFetch(url, event);
    });



    if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
  }

  static renderSectionFromFetch(url, event) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = responseText;
        FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, { html, url }];
        FacetFiltersForm.renderFilters(html, event);

        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);

      const initcolourselector = new Event('initcolourselector');
      window.dispatchEvent(initcolourselector);
      });
  }



  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);

    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderProductCount(html);
    if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);

    // lazy load images
    const lazyimg = new Event('lazyimg');
    window.dispatchEvent(lazyimg);
  }

  static renderProductGridContainer(html) {
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('ProductGridContainer').innerHTML;

    let prodlistView = localStorage.getItem('prodlistView');
    const prodList = document.querySelector('#prodlist');

    if (prodlistView == 'true') {
      document
        .getElementById('ProductGridContainer')
        .querySelectorAll('.view-grid-only')
        .forEach((element) => {
          element.remove();
        });

      prodList.classList.add('list');
    } else if (prodlistView == 'false') {
      document
        .getElementById('ProductGridContainer')
        .querySelectorAll('.view-list-only')
        .forEach((element) => {
          element.remove();
        });

      prodList.classList.remove('list');
    }

    document
      .getElementById('ProductGridContainer')
      .querySelectorAll('.scroll-trigger')
      .forEach((element) => {
        element.classList.add('scroll-trigger--cancel');
      });


    // lazy load images
    const lazyimg = new Event('lazyimg');
    window.dispatchEvent(lazyimg);

    setTimeout(function () {
      App.productShowcase();
    }, 600);




    const event = new CustomEvent('shopify-facets:container-rendered', {
      detail: { view: 'prodlistView' }
    });
    document.dispatchEvent(event);
  }

  static renderProductCount(html) {
    const count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML;
    const breadcrumbHtml = new DOMParser().parseFromString(html, 'text/html').getElementById('breadcrumbs')?.innerHTML;

    const container = document.getElementById('ProductCount');
    const countContainers = document.querySelectorAll('.product-count');
    const containerDesktop = document.getElementById('ProductCountDesktop');
    const breadcrumbs = document.getElementById('breadcrumbs');

    if (breadcrumbs) {
      breadcrumbs.innerHTML = breadcrumbHtml;
    }
    container.innerHTML = count;
    container.classList.remove('loading');
    if (containerDesktop) {
      containerDesktop.innerHTML = count;
      containerDesktop.classList.remove('loading');
    }
    if (countContainers) {
      countContainers.forEach((container) => {
        container.classList.remove('loading');
      });
    }
  }

  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

    const facetDetailsElements = parsedHTML.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter'
    );
    const matchesIndex = (element) => {
      const jsFilter = event ? event.target.closest('.js-filter') : undefined;
      return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
    };
    const facetsToRender = Array.from(facetDetailsElements).filter((element) => !matchesIndex(element));
    const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);

    facetsToRender.forEach((element) => {
      document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
    });

    FacetFiltersForm.renderActiveFacets(parsedHTML);
    FacetFiltersForm.renderAdditionalElements(parsedHTML);

    if (countsToRender) FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
  }

  static renderActiveFacets(html) {
    const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

    activeFacetElementSelectors.forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) return;
      document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
    });

    FacetFiltersForm.toggleActiveFacets(false);
  }

  static renderAdditionalElements(html) {
    const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count'];

    mobileElementSelectors.forEach((selector) => {
      if (!html.querySelector(selector)) return;
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });

    document.getElementById('FacetFiltersFormMobile')?.closest('menu-drawer').bindEvents();
  }

  static renderCounts(source, target) {
    const targetElement = target.querySelector('.facets__selected');
    const sourceElement = source.querySelector('.facets__selected');

    const targetElementAccessibility = target.querySelector('.facets__summary');
    const sourceElementAccessibility = source.querySelector('.facets__summary');

    if (sourceElement && targetElement) {
      target.querySelector('.facets__selected').outerHTML = source.querySelector('.facets__selected').outerHTML;
    }

    if (targetElementAccessibility && sourceElementAccessibility) {
      target.querySelector('.facets__summary').outerHTML = source.querySelector('.facets__summary').outerHTML;
    }
  }

  static updateURLHash(searchParams) {
    history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
  }

  static getSections() {
    return [
      {
        section: document.getElementById('product-grid').dataset.id,
      },
    ];
  }

  createSearchParams(form) {
    let urlSearchParams = '';

    let forms;
    if (form == 'cleared') {
      forms = document.querySelectorAll('#FacetFiltersForm');
    } else {
      forms = document.querySelectorAll('#FacetFiltersFormMobile, #FacetFiltersForm');
    }

    if (forms) {
      forms.forEach((form) => {
        const formData = new FormData(form);
        if (urlSearchParams.length > 0) urlSearchParams += '&';
        urlSearchParams += new URLSearchParams(formData).toString()
      });
    }


    // get other attributes
    let sort_by = document.querySelector('#FacetFiltersFormMobile [name="sort_by"]:checked');

    if (sort_by) {
      if (urlSearchParams.length > 0) urlSearchParams += '&';
      urlSearchParams += 'sort_by=' + sort_by.value;
    }

    // remove '&filter.p.product_type=0' from urlSearchParams if exists
    if (urlSearchParams.includes('&filter.p.product_type=0')) {
      urlSearchParams = urlSearchParams.replace('&filter.p.product_type=0', '');
    }

    // remove '&filter.p.tag=0' from urlSearchParams if exists
    if (urlSearchParams.includes('&filter.p.tag=0')) {
      urlSearchParams = urlSearchParams.replace('&filter.p.tag=0', '');
    }


    // remove view param
    if (urlSearchParams.includes('&view=grid')) {
      urlSearchParams = urlSearchParams.replace('&view=grid', '');
    }

    if (urlSearchParams.includes('&view=list')) {
      urlSearchParams = urlSearchParams.replace('&view=list', '');
    }

    // remove Collection-shop-all-0
    if (urlSearchParams.includes('&Collection-shop-all-0=')) {
      urlSearchParams = urlSearchParams.replace('&Collection-shop-all-0=', '');
    }

    return urlSearchParams;
  }

  onSubmitForm(searchParams, event) {
    FacetFiltersForm.renderPage(searchParams, event);
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const sortFilterForms = document.querySelectorAll('facet-filters-form form');
    if (event.srcElement.className == 'mobile-facets__checkbox') {
      const searchParams = this.createSearchParams(event.target.closest('form'));

      this.onSubmitForm(searchParams, event);
    } else {
      const forms = [];
      const isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';

      sortFilterForms.forEach((form) => {
        if (!isMobile) {
          if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
            const noJsElements = document.querySelectorAll('.no-js-list');
            noJsElements.forEach((el) => el.remove());
            forms.push(this.createSearchParams(form));
          }
        } else if (form.id === 'FacetFiltersFormMobile') {
          forms.push(this.createSearchParams(form));
        }
      });


      this.onSubmitForm(forms.join('&'), event);
    }
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    const url =
      event.currentTarget.href.indexOf('?') == -1
        ? ''
        : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);

    let newUrl = this.createSearchParams('cleared');
    FacetFiltersForm.renderPage(newUrl);
  }
}

FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

class PriceRange extends HTMLElement {
  constructor() {
    super();
    this.querySelectorAll('input').forEach((element) =>
      element.addEventListener('change', this.onRangeChange.bind(this))
    );
    this.setMinAndMaxValues();
  }

  onRangeChange(event) {
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValues();
  }

  setMinAndMaxValues() {
    const inputs = this.querySelectorAll('input');
    const minInput = inputs[0];
    const maxInput = inputs[1];
    if (maxInput.value) minInput.setAttribute('max', maxInput.value);
    if (minInput.value) maxInput.setAttribute('min', minInput.value);
    if (minInput.value === '') maxInput.setAttribute('min', 0);
    if (maxInput.value === '') minInput.setAttribute('max', maxInput.getAttribute('max'));
  }

  adjustToValidValues(input) {
    const value = Number(input.value);
    const min = Number(input.getAttribute('min'));
    const max = Number(input.getAttribute('max'));

    if (value < min) input.value = min;
    if (value > max) input.value = max;
  }
}

customElements.define('price-range', PriceRange);

class FacetRemove extends HTMLElement {
  constructor() {
    super();
    const facetLink = this.querySelector('a');
    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', this.closeFilter.bind(this));
    facetLink.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') this.closeFilter(event);
    });

    const formOverlay = document.getElementById('FacetFiltersFormMobile');
    formOverlay.addEventListener('click', (e) => {
      if( e.target === e.currentTarget ) {
        document.querySelector('.mobile-facets__disclosure').classList.remove('menu-opening');
        document.querySelector('.mobile-facets__disclosure').removeAttribute('open');
        document.querySelector('body').classList.remove('overflow-hidden-undefined');
        document.querySelector('html').classList.remove('overflow-hidden');
      };
    });
  }

  closeFilter(event) {
    event.preventDefault();
    const form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
    form.onActiveFilterClick(event);
    document.querySelector('.mobile-facets__disclosure').classList.remove('menu-opening');
    document.querySelector('.mobile-facets__disclosure').removeAttribute('open');
    document.querySelector('body').classList.remove('overflow-hidden-undefined');
  }
}

customElements.define('facet-remove', FacetRemove);
