/// <reference path="../@types/jquery/index.d.ts" />

interface HeaderContent {
    files: string[];
    priority: { firstLoad: string, thenLoad: string[] }
}
function Component(content: HeaderContent) {
    return (target: any) => {

        var head = document.getElementsByTagName("head")[0]

        let firstLoadElement = setElementURL(content.priority.firstLoad);

        if (firstLoadElement != null) {
            let scriptElement = firstLoadElement as HTMLScriptElement;
            head.appendChild(scriptElement);

            scriptElement.onload = () => {
                console.log(`${scriptElement.src} was loaded`);

                content.priority.thenLoad.forEach(filePath => {
                    let element = setElementURL(filePath);
                    if (element) {
                        console.log(`${filePath} was loaded`);
                        head.appendChild(element)
                    }

                })
            }
        }
        if (head) {
            content.files.forEach((filePath: any) => {
                let element = setElementURL(filePath);
                if (element) {
                    console.log(`${filePath} was loaded`);
                    head.appendChild(element)
                }
            });
        }
    }
}

function doElement<K extends keyof HTMLElementTagNameMap>(name: K) {
    return document.createElement(name);
}
function setElementURL(filePath: any) {
    var element;
    if (filePath.endsWith("css") === true) {

        element = doElement("link");
        element.href = filePath;
        element.rel = 'stylesheet';

    } else if (filePath.endsWith("less") === true) {

        element = doElement("link");
        element.href = filePath;
        element.type = "text/css"
        element.rel = 'stylesheet/less';
    }
    else if (filePath.endsWith("js") === true) {

        element = doElement("script");
        element.src = filePath;
    } else if (filePath.endsWith("ico")) {

        element = doElement("link");
        element.href = filePath;
        element.type = "image/x-icon";
        element.rel = "shortcut icon"
    } else {
        return null;
    }

    return element;
}

@Component({
    files: [
        './src/css/bootstrap.css',
        './src/css/index.css',
        './src/js/less.min.js',
        './src/img/favicon.ico'
    ],
    priority: { firstLoad: './src/js/jquery.min.js', thenLoad: ['./src/js/bootstrap.min.js'] }
})
class Main {
    constructor() {

    }

}




var main = new Main();

