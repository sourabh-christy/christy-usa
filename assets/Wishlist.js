
const Wishlist = (function () {

    const LOCAL_STORAGE_WISHLIST_KEY = 'shopify-wishlist';
    const LOCAL_STORAGE_DELIMITER = ',';
    const BUTTON_ACTIVE_CLASS = 'active';
    const GRID_LOADED_CLASS = 'loaded';

    const selectors = {
        button: '[button-wishlist]:not(.set)',
        grid: 'wishlist-drawer-items',
        productCard: '.product-card',
        drawerOpen: '[button-wishlist-drawer-toggle]',
        drawer: 'wishlist-drawer',
        itemCount: '[wishlist-count]',
        headerBtn: '[button-wishlist-header]'
    };

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initGrid();
            initButtons();
            initDrawerButtons();
        }, 1000);
    });

    document.addEventListener('shopify-wishlist:updated', (event) => {
        console.log('[Shopify Wishlist] Wishlist Updated ✅', event.detail.wishlist);
        initGrid();

    });

    document.addEventListener('shopify-wishlist:init-product-grid', (event) => {
        console.log('[Shopify Wishlist] Wishlist Product List Loaded ✅', event.detail.wishlist);

        initButtons();
        const lazyimg = new Event('lazyimg');
        window.dispatchEvent(lazyimg);

        App.overflowFloatedStyle();
    });

    document.addEventListener('shopify-wishlist:init-buttons', (event) => {
        console.log('[Shopify Wishlist] Wishlist Buttons Loaded ✅', event.detail.wishlist);
    });

    document.addEventListener('shopify-facets:container-rendered', (event) => {
        initButtons();
    });

    document.addEventListener('shopify-wishlist:setup-buttons', (event) => {
        const buttons = document.querySelectorAll(selectors.button) || [];
        if (buttons.length) setupButtons(buttons);
    });

    const fetchProductCardHTML = (handle) => {
        const productTileTemplateUrl = `/products/${handle}?view=card`;

        return fetch(productTileTemplateUrl)
            .then((res) => res.text())
            .then((res) => {
                const text = res;
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, 'text/html');
                const productCard = htmlDocument.documentElement.querySelector(selectors.productCard);

                return productCard.outerHTML;
            })
            .catch((err) => console.error(`[Shopify Wishlist] Failed to load content for handle: ${handle}`, err));
    };

    const setupGrid = async (grid) => {
        const wishlist = getWishlist();
        const requests = wishlist.map(fetchProductCardHTML);
        const responses = await Promise.all(requests);
        const wishlistProductCards = responses.join('');

        grid.innerHTML = wishlistProductCards;
        grid.classList.add(GRID_LOADED_CLASS);


        updateWishlistCounts();


        const event = new CustomEvent('shopify-wishlist:init-product-grid', {
            detail: { wishlist: wishlist }
        });
        document.dispatchEvent(event);
    };

    const setupButtons = (buttons) => {
        buttons.forEach((button) => {
            const productHandle = button.dataset.productHandle || false;
            if (!productHandle) return console.error('[Shopify Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist.');
            if (wishlistContains(productHandle)) button.classList.add(BUTTON_ACTIVE_CLASS);

            button.classList.add('set');
            button.classList.remove('opacity-0');
            button.addEventListener('click', () => {
                updateWishlist(productHandle);
                //button.classList.toggle(BUTTON_ACTIVE_CLASS);
                updateBtnClasses(productHandle)
            });
        });
    };

    const updateBtnClasses = (productHandle) => {
        const btns = document.querySelectorAll('[data-product-handle="' + productHandle + '"]');
        if (btns) {
            btns.forEach((btn) => {
                if (!wishlistContains(productHandle)) btn.classList.remove(BUTTON_ACTIVE_CLASS);
                else btn.classList.add(BUTTON_ACTIVE_CLASS);

            });
        }
    };

    const initGrid = () => {
        const grid = document.querySelector(selectors.grid) || false;
        if (grid) setupGrid(grid);
    };

    const initButtons = () => {
        const buttons = document.querySelectorAll(selectors.button) || [];
        if (buttons.length) setupButtons(buttons);
        else return;
        const event = new CustomEvent('shopify-wishlist:init-buttons', {
            detail: { wishlist: getWishlist() }
        });
        document.dispatchEvent(event);

    };

    const getWishlist = () => {
        const wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
        if (wishlist) return wishlist.split(LOCAL_STORAGE_DELIMITER);
        return [];
    };

    const setWishlist = (array) => {
        const wishlist = array.join(LOCAL_STORAGE_DELIMITER);
        if (array.length) localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist);
        else localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);

        updateWishlistCounts();



        const event = new CustomEvent('shopify-wishlist:updated', {
            detail: { wishlist: array }
        });
        document.dispatchEvent(event);

        return wishlist;
    };

    const updateWishlist = (handle) => {
        const wishlist = getWishlist();
        const indexInWishlist = wishlist.indexOf(handle);
        if (indexInWishlist === -1) wishlist.push(handle);
        else wishlist.splice(indexInWishlist, 1);
        return setWishlist(wishlist);
    };

    const wishlistContains = (handle) => {
        const wishlist = getWishlist();
        return wishlist.includes(handle);
    };

    const resetWishlist = () => {
        return setWishlist([]);
    };

    const initDrawerButtons = () => {
        const buttons = document.querySelectorAll(selectors.drawerOpen) || [];
        if (buttons.length) {
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    const drawer = document.querySelector(selectors.drawer);
                    drawer.classList.toggle('active');

                    if (drawer.classList.contains('active')) {
                        document.querySelector('html').classList.add('overflow-hidden')
                    } else {
                        document.querySelector('html').classList.remove('overflow-hidden')
                    }
                });
            });
        }
        else return;
        const event = new CustomEvent('shopify-wishlist:init-drawer-buttons');
        document.dispatchEvent(event);
    };

    const updateWishlistCounts = () => {
        const counts = document.querySelectorAll(selectors.itemCount);

        if (counts.length > 0) {
            counts.forEach((count) => {
                count.innerHTML = wishlistCount();
                if (wishlistCount() > 0) {
                    count.classList.remove('hidden');
                } else {
                    count.classList.add('hidden');
                }
            });
        }

        if (wishlistCount() > 0) {
            document.querySelector('wishlist-drawer-items').classList.remove('hidden');
            document.querySelector('wishlist-drawer-empty').classList.add('hidden');

            document.querySelector(selectors.headerBtn).classList.add('active');
        } else {
            document.querySelector('wishlist-drawer-items').classList.add('hidden');
            document.querySelector('wishlist-drawer-empty').classList.remove('hidden');

            document.querySelector(selectors.headerBtn).classList.remove('active');
        }


    };

    const wishlistCount = () => {
        if (!getWishlist().length) return 0;
        return getWishlist().length;
    };

})();
