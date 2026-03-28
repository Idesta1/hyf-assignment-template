"use strict";
var UniqueTypewriter = /** @class */ (function () {
    function UniqueTypewriter(element, text, speed) {
        if (speed === void 0) { speed = 100; }
        this.element = element;
        this.text = text;
        this.speed = speed;
    }
    UniqueTypewriter.prototype.type = function () {
        var _this = this;
        var index = 0;
        var interval = setInterval(function () {
            if (index < _this.text.length) {
                _this.element.textContent += _this.text[index];
                index++;
            }
            else {
                clearInterval(interval);
            }
        }, this.speed);
    };
    return UniqueTypewriter;
}());
// Usage example:
document.addEventListener("DOMContentLoaded", function () {
    var infoBox = document.querySelector(".info-box h1");
    if (infoBox) {
        var text = "Hello, I am Iglesia A Front-end Developer based in Denmark";
        var typewriter = new UniqueTypewriter(infoBox, text, 100);
        typewriter.type();
    }
});
