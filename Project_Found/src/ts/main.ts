/// <reference path="../@types/jquery/index.d.ts" />

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

                    element = doElement("link");
                    element.href = file;
                    element.rel = 'stylesheet';

                } else if (file.endsWith("less") === true) {

                    element = doElement("link");
                    element.href = file;
                    element.type = "text/css"
                    element.rel = 'stylesheet/less';
                }
                else if (file.endsWith("js") === true) {

                    element = doElement("script");
                    element.src = file;
                } else if (file.endsWith("ico")) {

                    element = doElement("link");
                    element.href = file;
                    element.type = "image/x-icon";
                    element.rel = "shortcut icon"
                }

                if (element) {
                    console.log(`${file} was loaded`);
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
        './src/css/bootstrap.css',
        './src/css/index.css',

        './src/js/less.min.js',
        './src/js/jquery.min.js',
        './src/js/bootstrap.js',
        './src/img/favicon.ico'
    ]
})
class Main {
    constructor() {

    }
    init() {
      

            let app = angular.module("body", ['ng']);
            app.controller("bodyController", ($scope) => {

                $scope.table = [
                    { month: "3", monthKey: "个月", rate: "3.50%", total: "1,880" },
                    { month: "3-6", monthKey: "个月", rate: "3.60%", total: "2,880 " },
                    { month: "6-12", monthKey: "个月", rate: "4.50%", total: "8,880" },
                    { month: "12-24", monthKey: "个月", rate: "5.60%", total: "5,880" },
                    { month: "24", monthKey: "个月以上", rate: "6.50%", total: "91,080" },]
                $scope.table2 = [
                    { month: "3", monthKey: "个月", monthNotice: "保健消费", rate: "4.90%", total: "18,000", button: "投标" },
                    { month: "5", monthKey: "个月", monthNotice: "资金周转", rate: "5.20%", total: "28,880 ", button: "投标" },
                    { month: "7", monthKey: "个月", monthNotice: "个人消费", rate: "5.50%", total: "38,880", button: "还款中" },
                    { month: "1", monthKey: "个月", monthNotice: "日常生活消费", rate: "4.60%", total: "59,880", button: "还款中" },]
                $scope.safe = [
                    {
                        name: "安全", values: [
                            { Record: "国家AAA信用平台" },
                            { Record: "银行资金托管" },
                            { Record: "上市公司北京保证" }]
                    },
                    {
                        name: "权威", values: [
                            { Record: "国家AAA信用平台" },
                            { Record: "银行资金托管" },
                            { Record: "上市公司北京保证" }]
                    },
                    {
                        name: "省心", values: [
                            { Record: "1000元起头" },
                            { Record: "用户利益保障机制" },
                            { Record: "保险公司承保" }]
                    },

                ]
            })
        })
    }
}


var main = new Main();
main.init()
