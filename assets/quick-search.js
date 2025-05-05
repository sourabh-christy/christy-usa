;(() => {
  const predsearchEl = document.querySelector("#predsearch");
  const predsearchPlaceholder = document.querySelector("#predsearchPlaceholder");
  const predsearchErrorEl = document.querySelector("#predsearchErrorMsg");

  if (!predsearchEl) return;

  const resetToPlaceholder = () => {
    predsearchEl.hidden = true;
    predsearchPlaceholder.hidden = false;
  }

  const openResults = () => {
    predsearchEl.hidden = false;
    predsearchPlaceholder.hidden = true;
  }

// Handle input in search bar
  document.querySelector("#search-bar-input")?.addEventListener('input', debounce(async (e) => {
    const search_term = e.target.value;

    predsearchErrorEl.hidden = !(search_term.length < 3 && search_term.length > 0);

    if (search_term.length > 2) {
      await reload_results(search_term);
      return
    }

    if (search_term.length === 0) {
      resetToPlaceholder();
    }
  }, 100));

// Handle Enter key for search
  document.querySelector("#search-bar-input")?.addEventListener('keyup', (e) => {
    let search_term = e.target.value;
    if (e.key === 'Enter' && search_term.length > 0) {
      window.location.href = `${window.location.origin}/search?q=${encodeURIComponent(search_term)}`;
    }
  });

// Reload search results
  function reload_results(search_term) {
    return fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(search_term)}&resources[options][fields]=title,product_type,variants.title,tag&section_id=quick-search`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.text();
    })
    .then((text) => {
      const resultsMarkup = new DOMParser().parseFromString(text, 'text/html');
      const predsearchResultEl = resultsMarkup.querySelector("#predsearch");
      const predsearchNoResultEl = resultsMarkup.querySelector("#predsearchErrorNoResult");

      if (predsearchResultEl === null) {
        predsearchEl.hidden = false;
        predsearchEl.innerHTML = predsearchNoResultEl.outerHTML;
        predsearchPlaceholder.hidden = false;
        return
      }

      predsearchEl.innerHTML = predsearchResultEl.innerHTML;
      openResults();

      // Trigger lazy loading for images
      const lazyimg = new Event('lazyimg');
      window.dispatchEvent(lazyimg);

      // reinit colour selectors
      const initcolourselector = new Event('initcolourselector');
      window.dispatchEvent(initcolourselector);

      // Refresh wishlist buttons
      const wishlistRefresh = new Event('shopify-wishlist:setup-buttons');
      document.dispatchEvent(wishlistRefresh);

      document.getElementById("search-bar-input").focus();
    })
    .catch((error) => {
      if (error.code === 20) return; // Code 20: aborted call
      throw error;
    });
  }

// Reusable references
  const bodyEl = document.body;
  const searchBar = document.getElementById('searchBar');
  const searchBarInput = document.getElementById('search-bar-input');
  const searchClearIcon = document.getElementById('search-clear-icon');
  const searchCloseButtons = document.querySelectorAll('[data-close-search]');
  const navMob = document.querySelector('#NavMob');
  const header = document.querySelector('#header');
  const overlay = document.querySelector('[data-overlay]');

  const handleClose = () => {
    searchBar.classList.add('search-bar-hidden');
    searchBar.classList.remove('opacity-100');
    handleState(true);
  }

  const handleState = (isHidden) => {
    if (isHidden) {
      overlay.removeEventListener('click', handleClose);
      header.removeAttribute('style');
    } else {
      overlay.addEventListener('click', handleClose);
      header.setAttribute('style', 'transform: none !important;');
    }

    overlay.hidden = isHidden;
    header.classList.toggle('fixed', !isHidden);
    header.classList.toggle('top-0', !isHidden);
    bodyEl.classList.toggle('overflow-hidden', !isHidden);
    document.documentElement.classList.toggle('overflow-hidden', !isHidden);
    document.documentElement.style.scrollBehavior = isHidden ? '' : 'auto';
  };

// Toggle search bar visibility
  document.querySelectorAll('.search-icon-js').forEach((el) => {
    el.addEventListener('click', () => {
      if (searchBar.classList.contains('search-bar-hidden')) {
        header.classList.remove('[&>.header-bar]:!translate-y-0');
        navMob.classList.remove('open');
        searchBar.classList.remove('search-bar-hidden');
        searchBar.classList.add('opacity-100');
        handleState(false);
        searchBarInput.focus();
      } else {
        handleState(true);
        handleClose();
      }
    });
  });

// Handle input keyup for clearing
  searchBarInput.addEventListener('keyup', (e) => {
    if (e.target.value.trim() !== '') {
      searchClearIcon.classList.remove('hidden');
    } else {
      searchClearIcon.classList.add('hidden');
    }
  });

// Clear input and hide clear icon
  searchClearIcon.addEventListener('click', () => {
    searchBarInput.value = '';
    searchClearIcon.classList.add('hidden');
    resetToPlaceholder();
  });

// Close search bar and reset section
  searchCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      handleClose();
      handleState(true);
    });
  })

})()

// Clear quick search input
function handleClearQuickSearch() {
  setTimeout(() => {
    document.querySelector("#Search-In-Template").value = "";
  }, 100);
}
// console.log("quick-search.js loaded");
function handleQuickSearchIconBtnClick () {
  setTimeout(() => {
    const searchInput = document.getElementById('search-bar-input');
    const searchPageInput = document.getElementById('Search-In-Template');
    if (searchPageInput) {
      searchPageInput.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    searchInput?.click();
  }, 300);
}