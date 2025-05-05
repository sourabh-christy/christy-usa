document.getElementById("faq-list").addEventListener("click", function(event) {
    event.preventDefault();
    var answer = document.getElementById('faq-list-left');
    answer.style.display = answer.style.display === "none" ? "block" : "none";

    var answer = document.getElementById('faq-list-right');
    answer.style.display = answer.style.display === "none" ? "block" : "none";

    var btn1 = document.getElementById('right-arr');
    btn1.style.display = btn1.style.display === "none" ? "inline" : "none";

    var btn2 = document.getElementById('down-arr');
    btn2.style.display = btn2.style.display === "none" ? "inline" : "none";
});