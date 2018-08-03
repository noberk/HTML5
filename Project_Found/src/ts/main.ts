
interface HeaderContent {
    files: string[];
}
function Component(content: HeaderContent) {
    return (target: any) => {

        var head = document.getElementsByTagName("head")[0]
        if (head) {
            content.files.forEach((file: any) => {
                let element = undefined;
                if (file.endsWith("css") === true) {
                    console.log('css');
                    element = doElement("link");
                    element.href = file;
                    element.rel = 'stylesheet';

                } else if (file.endsWith("js") === true) {
                    console.log('js');
                    element = doElement("script");
                    element.src = file;
                } else if (file.endsWith("ico")) {
                    element = doElement("link");
                    element.href = file;
                    element.type = "image/x-icon";
                    element.rel = "shortcut icon"
                }

                if (element) {
                    head.appendChild(element)
                }

            });
        }

    }
}

function doElement<K extends keyof HTMLElementTagNameMap>(name: K) {
    return document.createElement(name);
}
@Component({
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

class Main {
    constructor() {
        $(() => {
            $(".owl-carousel").owlCarousel({
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
            });
        })
    }
}


new Main();
