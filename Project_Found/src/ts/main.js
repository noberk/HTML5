"use strict";
/// <reference path="../@types/jquery/index.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Component(content) {
    return function (target) {
        var head = document.getElementsByTagName("head")[0];
        var firstLoadElement = setElementURL(content.priority.firstLoad);
        if (firstLoadElement != null) {
            var scriptElement_1 = firstLoadElement;
            head.appendChild(scriptElement_1);
            scriptElement_1.onload = function () {
                console.log(scriptElement_1.src + " was loaded");
                content.priority.thenLoad.forEach(function (filePath) {
                    var element = setElementURL(filePath);
                    if (element) {
                        console.log(filePath + " was loaded");
                        head.appendChild(element);
                    }
                });
            };
        }
        if (head) {
            content.files.forEach(function (filePath) {
                var element = setElementURL(filePath);
                if (element) {
                    console.log(filePath + " was loaded");
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
var Main = /** @class */ (function () {
    function Main() {
    }
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
    return Main;
}());
var main = new Main();
