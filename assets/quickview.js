var checkPageIsReloaded =  
    window.performance
      .getEntriesByType('navigation')
      .map((nav) => nav.type)
      .includes('reload')
 

if (!checkPageIsReloaded && window.location.href == location.origin.toString() + '/') {
  if (document.referrer.endsWith('/cart') || document.referrer.endsWith('/cart?logged_in=true')) {
    document.getElementById('cart-icon-bubble').click();
  } else if (document.referrer.endsWith('/account/register')) {
    // hack for redirecting after account creation to redirect to again account page
    window.location.href = '/account'
  }
}


async function myfun(t, e){

    var rect = t.getBoundingClientRect(); 
    localStorage.setItem('currentTop', rect.top);
  e.preventDefault();
       const slug = t.dataset.slug;
       const proURI = `/products/${slug}?view=ajax`;
       // const proURI = '/products/supreme-hygro?view=ajax';
 
       const req = await fetch(proURI);
       const res = await req.text();
       // document.getElementById('modalViewContent').innerHTML = res;
       // QT-SP @17-July2024
       jQuery('#modalViewContent').html(res)
       jQuery('#modalViewContent').trigger('create')
       typeof loadProductQuickView == 'function' && loadProductQuickView();
       //document.getElementById('quickViewModal').style.display = 'block';
       document.getElementById('quickViewModal').classList.add('slideMe');
       document.body.classList.add('quick-view-modal-open')

       var quickViewOpenIntrval = setInterval(function () {
        if ($('#CartDrawer').parent('cart-drawer').hasClass('active')) {
          clearInterval(quickViewOpenIntrval)
          document.getElementById('modalCloseBtn').click()
        }
      }, 10)
      setTimeout(() => {
        $('#modalViewContent #option-color input[type="radio"]')[1].click()
        $('#modalViewContent  #option-color input[type="radio"]')[0].click()
      }, 10);
 }
 
 
   /*const qBtns = document.querySelectorAll('.QuickView');
   qBtns.forEach((btn) => {
     btn.addEventListener('click', async (event) => {
       event.preventDefault();
       const slug = event.target.dataset.slug;
       const proURI = `/products/${slug}?view=ajax`;
 
       const req = await fetch(proURI);
       const res = await req.text();
       document.getElementById('modalViewContent').innerHTML = res;
       //document.getElementById('quickViewModal').style.display = 'block';
       document.getElementById('quickViewModal').classList.add('slideMe');
     });
   });
 */
   var closeBtn = document.getElementById('modalCloseBtn');
   closeBtn.addEventListener('click', async (event) => {
     event.preventDefault();
     document.getElementById('modalViewContent').innerHTML = '';
     //document.getElementById('quickViewModal').style.display = 'none';
     document.getElementById('quickViewModal').classList.remove('slideMe');
     document.body.classList.remove('quick-view-modal-open')
  
     window.scrollTo({
       top: Math.round(localStorage.getItem('currentTop') + document.documentElement.scrollTop),
       behavior: 'smooth',
    })
   localStorage.removeItem('currentTop')
   });
 
   var container = document.getElementById('modalView');
   document.addEventListener('click', function (event) {
     if (container !== event.target && !container.contains(event.target)) {
       document.getElementById('modalViewContent').innerHTML = '';
       //document.getElementById('quickViewModal').style.display = 'none';
       document.getElementById('quickViewModal').classList.remove('slideMe');
       document.body.classList.remove('quick-view-modal-open')
     /*
       window.scrollTo({
         top: Math.round(localStorage.getItem('currentTop') + document.documentElement.scrollTop),
         behavior: 'smooth',
     })
 
     localStorage.removeItem('currentTop')
     */
     }
   });