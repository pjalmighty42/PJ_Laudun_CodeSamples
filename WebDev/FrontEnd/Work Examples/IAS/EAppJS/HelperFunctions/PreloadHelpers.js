
function openCollapsible() {
    var collapsible = document.getElementsByClassName("collapsible");
    var i;

    for (var i = 0; i < collapsible.length; i++) {
        collapsible[i].addEventListener("click", function () {
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = "0";
            }
            else {
                content.style.padding = "5%";
                content.style.maxHeight = (content.scrollHeight + content.offsetHeight) + "px";

            }
        });
    }
}