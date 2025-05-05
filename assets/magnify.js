// create a container and set the full-size image as its background
function createOverlay(image) {
  const overlayImage = document.createElement('img');
  overlayImage.setAttribute('src', `${image.src}`);
  overlay = document.createElement('div');
  prepareOverlay(overlay, overlayImage);

  image.style.opacity = '50%';
  toggleLoadingSpinner(image);

  overlayImage.onload = () => {
    toggleLoadingSpinner(image);
    image.parentElement.insertBefore(overlay, image);
    image.style.opacity = '100%';
  };

  return overlay;
}

function prepareOverlay(container, image) {
  container.setAttribute('class', 'image-magnify-full-size');
  container.setAttribute('aria-hidden', 'true');
  container.style.backgroundImage = `url('${image.src}')`;
  container.style.backgroundColor = 'var(--gradient-background)';
}

function toggleLoadingSpinner(image) {
  const loadingSpinner = image.parentElement.parentElement.querySelector(`.loading-overlay__spinner`);
  if (loadingSpinner) {
    loadingSpinner.classList.toggle('hidden');
  }
}

function moveWithHover(image, event, zoomRatio) {
  // calculate mouse position
  const ratio = image.height / image.width;
  const container = event.target.getBoundingClientRect();

  let xPosition;
  let yPosition;
  if (event.clientX) {
    xPosition = event.clientX - container.left;
    yPosition = event.clientY - container.top;

  } else {
    xPosition = event.changedTouches[0].clientX;
    yPosition = event.changedTouches[0].clientY;
  }


  const xPercent = `${xPosition / (image.clientWidth / 100)}%`;
  const yPercent = `${yPosition / ((image.clientWidth * ratio) / 100)}%`;

  // determine what to show in the frame
  overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;
  overlay.style.backgroundSize = `${image.width * zoomRatio}px`;
}

function magnify(image, zoomRatio) {
  const overlay = createOverlay(image);
  overlay.onclick = () => overlay.remove();
  overlay.ontouchmove = (event) => moveWithHover(image, event, zoomRatio);
  overlay.onmousemove = (event) => moveWithHover(image, event, zoomRatio);
  overlay.onmouseleave = () => overlay.remove();
}

function enableZoomOnHover(zoomRatio) {
  const images = document.querySelectorAll('.image-magnify-hover');
  images.forEach((image) => {
    image.onclick = (event) => {
      magnify(image, zoomRatio);
      moveWithHover(image, event, zoomRatio);
    };


  });
}

enableZoomOnHover(2);



function initZoomer() {
  let zoomer = document.querySelector('#zoomer');
  let zoomerImg = document.querySelector('#zoomer .zoomer__img');
  let zoomerClose = document.querySelector('#zoomer button.close');
  let imgs = document.querySelectorAll('.product__gallery .splide-gallery-mob .click-zoom:not(.quick-add-modal__content .splide-gallery-mob .click-zoom)');

  zoomerClose.addEventListener('click', function () {
    zoomer.classList.remove('active');
    document.querySelector('html').classList.remove('overflow-hidden');
  });

  if (imgs.length) {
    imgs.forEach(function (img) {
      img.classList.add('cursor-zoom-in')
      img.addEventListener('click', function () {
        let imgClone = img.cloneNode();
        //imgClone.classList.remove('cursor-zoom-in');
        imgClone.setAttribute('draggable', false);
        zoomerImg.innerHTML = '';
        let div = document.createElement('div');
        div.classList.add('w-full', 'h-full');
        div.appendChild(imgClone);
        zoomerImg.appendChild(div);
        zoomer.classList.add('active');
        document.querySelector('html').classList.add('overflow-hidden');


        imgClone.onclick = (event) => {
          magnify(imgClone, 2);
          moveWithHover(imgClone, event, 2);
        };



        //zoomerImg.onmousemove = (event) => zoomMove(imgClone, event);
      });
    });
  }

  document.querySelectorAll('.quick-add-modal__content .product__gallery .splide-gallery-mob img').forEach((img) => {
    img.classList.remove('click-zoom', 'cursor-zoom-in');
  });
}
initZoomer();

window.addEventListener('initzoomer', initZoomer);
