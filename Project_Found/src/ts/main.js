"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../@types/jquery/index.d.ts" />
function Component(content) {
    return (target) => {
        var head = document.getElementsByTagName("head")[0];
        let firstLoadElement = setElementURL(content.priority.firstLoad);
        if (firstLoadElement != null) {
            let scriptElement = firstLoadElement;
            head.appendChild(scriptElement);
            scriptElement.onload = () => {
                console.log(`${scriptElement.src} was loaded`);
                content.priority.thenLoad.forEach(filePath => {
                    let element = setElementURL(filePath);
                    if (element) {
                        console.log(`${filePath} was loaded`);
                        head.appendChild(element);
                    }
                });
            };
        }
        if (head) {
            content.files.forEach((filePath) => {
                let element = setElementURL(filePath);
                if (element) {
                    console.log(`${filePath} was loaded`);
                    head.appendChild(element);
                }
            });
        }
    };
}
function doElement(name) {
    return document.createElement(name);
}
function setElementURL(filePath) {
    var element;
    if (filePath.endsWith("css") === true) {
        element = doElement("link");
        element.href = filePath;
        element.rel = 'stylesheet';
    }
    else if (filePath.endsWith("less") === true) {
        element = doElement("link");
        element.href = filePath;
        element.type = "text/css";
        element.rel = 'stylesheet/less';
    }
    else if (filePath.endsWith("js") === true) {
        element = doElement("script");
        element.src = filePath;
    }
    else if (filePath.endsWith("ico")) {
        element = doElement("link");
        element.href = filePath;
        element.type = "image/x-icon";
        element.rel = "shortcut icon";
    }
    else {
        return null;
    }
    return element;
}
const fetchUrl = {
    invest: 'src/assets/Invest.json',
    preservationInvest: 'src/assets/preservationInvest.json',
    safe: 'src/assets/safe.json'
};
let Main = class Main {
    async safe() {
        let response = await fetch(fetchUrl.safe);
        let data = await response.json();
        var tags = data.map(d => {
            return `
            <div class="col-lg-4" name="safeblock>
            <span class="disInlineBlock" name="safe">${d.name}</span>
            <div class="disInlineBlock" name="safeArtice">
                    ${d.values.map(val => {
                return `<p>${val.Record}</p>`;
            })}
            </div>
            </div>
            `.trim();
        });
        tags.forEach(row => $("#safe").append(row.replace(/,/g, '')));
    }
    init() {
        $(() => {
            this.safe();
        });
    }
};
Main = __decorate([
    Component({
        files: [
            './src/css/bootstrap.css',
            './src/css/index.css',
            './src/js/less.min.js',
            './src/img/favicon.ico'
        ],
        priority: { firstLoad: './src/js/jquery.min.js', thenLoad: ['./src/js/bootstrap.min.js'] }
    })
], Main);
var main = new Main();
var shotdown = setTimeout(() => {
    try {
        if ($) {
            clearInterval(shotdown);
            main.init();
        }
    }
    catch (error) {
        console.log("jquery is loading");
    }
}, 100);
window.onmousemove = mouse => {
    console.log(`${window.innerWidth} ,${window.innerHeight}`);
};
