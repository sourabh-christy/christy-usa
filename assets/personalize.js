const initPersonalizeDrawers = (wrapper = document) => {
    wrapper.querySelectorAll('.personalize-drawer').forEach((drawer) => {
        let max_length = drawer.querySelector(
          ".personalize-style-selector.selected").getAttribute("data-length")
        drawer.querySelector('#monogram').setAttribute("maxlength", max_length)
        drawer.querySelector(
          '.monogram-error').innerHTML = "Max Character allowed - " + max_length

        const color_classList = [
            "Yellow",
            "Pink",
            "Pebble",
            "Pale_Blue",
            "Natural",
            "Liliac",
            "Berry",
            "Aqua",
            "Navy",
            "white",
            "black",
            "Red"]
        const font_classList = [
            "classic",
            "modern",
            "laurel",
            "mg-trio",
            "mg-dots",
            "ballantines",
            "mg-pair"]

        window.updateCanvas = () => {
            let font_value = drawer.querySelector(
              ".personalize-font-selector.selected").getAttribute('data-value');
            let text = drawer.querySelector('#monogram').value;
            if (["classic", "modern", "ballantines"].includes(font_value) ===
              false) {
                text = text.toUpperCase();
            }
            drawer.querySelector('#monogram').value = text;

            if (font_value === 'mg-dots') {
                text = text.replace(/.{1}/g, '$&.');
            }
            let final_html = "<span>"
            for (i = 0; i < text.length; i++) {
                final_html += text[i] + "</span><span>"
            }
            final_html += "</span>"

            drawer.querySelector("#personalization_text_input").value = text
            if (text.length === Number(max_length)) {
                drawer.querySelector(
                  '.monogram-error').innerHTML = "Max Character allowed - " +
                  max_length
            }
            drawer.querySelector(
              ".personalization_image .personalization_text .mono-text").innerHTML = final_html
        }

        drawer.querySelectorAll(".personalize-font-selector").forEach((ele) => {
            if (ele.classList.contains('initialized')) return;

            ele.addEventListener('click', (e) => {
                e.preventDefault()
                let obj = e.target
                let label = obj.getAttribute('data-label')
                let value = obj.getAttribute('data-value')
                let new_length = obj.getAttribute('data-length')
                if (new_length < max_length) {
                    drawer.querySelector(
                      '#monogram').value = drawer.querySelector('#monogram').
                      value.
                      slice(0, new_length)
                    updateCanvas()
                }
                max_length = new_length

                drawer.querySelector(".personalize-font-selector.selected").
                  classList.
                  remove("selected")
                obj.classList.add('selected')
                drawer.querySelector(
                  '.personalization-selected-style').innerHTML = ": " + label
                drawer.querySelector(
                  '#personalization_style_input').value = label
                drawer.querySelector(
                  ".personalization_image .personalization_text").
                  classList.
                  remove(...font_classList)
                drawer.querySelector(
                  ".personalization_image .personalization_text").
                  classList.
                  add(value)
                drawer.querySelector('#monogram').
                  setAttribute("maxlength", max_length)
                drawer.querySelector(
                  '.monogram-error').innerHTML = "Max Character allowed - " +
                  max_length
                updateCanvas()
            })
            ele.classList.add('initialized');
        })

        drawer.querySelectorAll(".personalize-color-selector").
          forEach((ele) => {
              if (ele.classList.contains('initialized')) return;
              ele.addEventListener('click', (e) => {
                  e.preventDefault()
                  let obj = e.target
                  let label = obj.getAttribute('data-label')
                  let value = obj.getAttribute('data-value')
                  drawer.querySelector(".personalize-color-selector.selected").
                    classList.
                    remove("selected")
                  obj.classList.add('selected')
                  drawer.querySelector(
                    '.personalization-selected-colour').innerHTML = ": " + label
                  drawer.querySelector(
                    '#personalization_colour_input').value = label
                  drawer.querySelector(
                    ".personalization_image .personalization_text").style.color = value
                  updateCanvas()
              })
              ele.classList.add('initialized');
          })
    });
}

initPersonalizeDrawers();

if (window.showHideDrawer === undefined) {
    window.showHideDrawer = (target) => {
        const mainProductSection = target.closest('.section-main-product-js') ?? target.closest('.quick-add-modal');
        const quickAddContent = target.closest('.quick-add-modal__content');
        const drawer = mainProductSection.querySelector('.personalize-drawer');
        if (drawer === null) return;
        const state = drawer.classList.contains('active');

        if (quickAddContent && window.matchMedia('(max-width: 767px)').matches) {
            !state ? quickAddContent.style.maxHeight = '100%' : quickAddContent.removeAttribute('style');
        }

        drawer.classList.toggle('animate', !state);
        drawer.classList.toggle('active', !state);
        const htmlEl = document.documentElement;
        htmlEl.classList.toggle('overflow-hidden', !state);
    }
}