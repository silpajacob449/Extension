/*!
 * @author: Silpa Jacob,silpajacob449@gmail.com
 **/

var img = document.querySelectorAll('*');

function getMeta(url, leftVal, topVal) {
    var img = new Image();
    img.onload = function() {
        //var url = window.location.href;
        var iDiv = document.createElement('div');
        iDiv.id = 'block';
        iDiv.className = 'block';
        document.getElementsByTagName('body')[0].appendChild(iDiv);
        var newVal = document.getElementById('block');
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url);
        xhttp.onreadystatechange = function() {
            if (this.readyState == this.DONE) {
                var imgType = this.getResponseHeader("Content-Type");
                getImageType(imgType);
            }
        };
        xhttp.send();

        function getImageType(a) {
            iType = a;

        }
        iDiv.innerHTML = 'width: ' + this.naturalWidth + "px" + '</br>' + ' height: ' + this.naturalHeight + "px" + '</br>' + ' type: ' + iType;

        document.getElementsByTagName("BODY")[0].style.position = "relative";
        iDiv.style.position = "absolute";
        iDiv.style.left = leftVal + "px";
        iDiv.style.top = topVal + "px";
        iDiv.style.zIndex = "999999";
        iDiv.style.background = "#123d99";
        iDiv.style.color = "#ffffff";
    };
    img.src = url;
}
img.forEach(function(image) {
    image.addEventListener("click", function(e) {
        var x = e.pageX; // Get the horizontal coordinate
        var y = e.pageY; // Get the vertical coordinate

        if (typeof image.src !== 'undefined') {
            //e.preventDefault();
            var imageMeta = getMeta(image.src, x, y);
        } else if (this.style.background || window.getComputedStyle(this, null).getPropertyValue("background-image") || window.getComputedStyle(this, null).getPropertyValue("background")) {
            e.preventDefault();
            var bgUrl = window.getComputedStyle(this, null).getPropertyValue("background-image");
            image.src = bgUrl.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
            var imageMeta = getMeta(image.src, x, y);
        }
    });
});