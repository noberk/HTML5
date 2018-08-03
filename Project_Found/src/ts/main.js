var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Component(content) {
    return function (target) {
        var head = document.getElementsByTagName("head")[0];
        if (head) {
            content.files.forEach(function (file) {
                var element = undefined;
                if (file.endsWith("css") === true) {
                    console.log('css');
                    element = doElement("link");
                    element.href = file;
                    element.rel = 'stylesheet';
                }
                else if (file.endsWith("js") === true) {
                    console.log('js');
                    element = doElement("script");
                    element.src = file;
                }
                else if (file.endsWith("ico")) {
                    element = doElement("link");
                    element.href = file;
                    element.type = "image/x-icon";
                    element.rel = "shortcut icon";
                }
                if (element) {
                    head.appendChild(element);
                }
            });
        }
    };
}
function doElement(name) {
    return document.createElement(name);
}
var Main = /** @class */ (function () {
    function Main() {
        $(function () {
            $(".owl-carousel").owlCarousel({
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true
            });
        });
    }
    Main = __decorate([
        Component({
            files: [
                './src/js/vendor/OwlCarousel2-2.2.1/dist/assets/owl.carousel.min.css',
                './src/js/vendor/OwlCarousel2-2.2.1/dist/assets/owl.theme.default.min.css',
                './src/css/bootstrap.css',
                './src/css/index.css',
                './src/js/vendor/OwlCarousel2-2.2.1/docs/assets/vendors/jquery.min.js',
                './src/js/bootstrap.js',
                './src/js/angular.min.js',
                './src/img/favicon.ico'
            ]
        })
    ], Main);
    return Main;
}());
new Main();
