var max_length = document.querySelector(".personalize-style-selector.selected").getAttribute("data-length")
document.querySelector('#monogram').setAttribute("maxlength",max_length)
document.querySelector('.monogram-error').innerHTML = "Max Character allowed - "+max_length

var color_classList=["Yellow","Pink","Pebble","Pale_Blue","Natural","Liliac","Berry","Aqua","Navy","white","black","Red"]
var font_classList=["classic","modern","laurel","mg-trio", "mg-dots","ballantines","mg-pair"]

function updateCanvas() {
    let font_value = document.querySelector(".personalize-font-selector.selected").getAttribute('data-value');
    let text = document.querySelector('#monogram').value;
    if(["classic","modern","ballantines"].includes(font_value) === false){
        text = text.toUpperCase();
    }
    document.querySelector('#monogram').value = text;
    
    if(font_value === 'mg-dots'){
        text = text.replace(/.{1}/g, '$&.');
    }
    let final_html = "<span>"
    for(i=0;i<text.length;i++){
        final_html += text[i]+"</span><span>"
    }
    final_html += "</span>"
    
    
    document.querySelector("#personalization_text_input").value = text
    if(text.length === Number(max_length)){
        document.querySelector('.monogram-error').innerHTML = "Max Character allowed - "+max_length
    }
    document.querySelector(".personalization_image .personalization_text .mono-text").innerHTML = final_html
}


document.querySelectorAll(".personalize-font-selector").forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        e.preventDefault()
        let obj = e.target
        let label = obj.getAttribute('data-label')
        let value = obj.getAttribute('data-value')
        let new_length = obj.getAttribute('data-length')
        if(new_length < max_length){
            document.querySelector('#monogram').value = document.querySelector('#monogram').value.slice(0,new_length)
            updateCanvas()
        }
        max_length = new_length
        
        document.querySelector(".personalize-font-selector.selected").classList.remove("selected")
        obj.classList.add('selected')
        document.querySelector('.personalization-selected-style').innerHTML =  ": "+label
        document.querySelector('#personalization_style_input').value = label
        document.querySelector(".personalization_image .personalization_text").classList.remove(...font_classList)
        document.querySelector(".personalization_image .personalization_text").classList.add(value)
        document.querySelector('#monogram').setAttribute("maxlength",max_length)
        document.querySelector('.monogram-error').innerHTML = "Max Character allowed - "+max_length
        updateCanvas()
    })
})

document.querySelectorAll(".personalize-color-selector").forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        e.preventDefault()
        let obj = e.target
        let label = obj.getAttribute('data-label')
        let value = obj.getAttribute('data-value')
        document.querySelector(".personalize-color-selector.selected").classList.remove("selected")
        obj.classList.add('selected')
        document.querySelector('.personalization-selected-colour').innerHTML =  ": "+label
        document.querySelector('#personalization_colour_input').value = label
        document.querySelector(".personalization_image .personalization_text").style.color = value
        updateCanvas()

    })
})

function showHideDrawer() {
    document.querySelector('.personalize-drawer').classList.contains('active')
    ? setTimeout(() => {document.querySelector('.personalize-drawer').classList.remove('animate','active')})
    : setTimeout(() => {document.querySelector('.personalize-drawer').classList.add('animate','active')})
}
