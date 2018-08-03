/// <reference path="../@types/jquery/index.d.ts" />
interface ISafe {
    name: string,
    values: { Record: string }[]
}
interface IInvest {
    month?: string;
    monthKey?: string;
    rate?: string,
    total?: string
}
interface IPreservation extends IInvest { }
interface IHighRisk extends IInvest {
    monthNotice?: string;
    button?: string
}
interface String {
    clear: () => string
}
interface HeadContent {
    files: string[];
    priority: { firstLoad: string, thenLoad: string[] }
}
function Component(content: HeadContent) {
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
async function insert<T>(id: string, url: string, tagArray: (data: T) => string[]) {
    let data = await take<T>(url);
    var tags = tagArray(data);
    tags.forEach(row => $(`#${id}`).append(row.clear().trim()))
}

String.prototype.clear = function () {
    console.log(this);
    return this.replace(/,/g, '')
}


async function take<T>(url: string) {
    let response = await fetch(url);
    let data = await response.json() as T;
    return data;
}

const fetchUrl = {
    highRiskInvest: 'src/assets/Invest.json',
    preservationInvest: 'src/assets/preservationInvest.json',
    safe: 'src/assets/safe.json'
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
    async safe() {
        insert<ISafe[]>("safe", fetchUrl.safe, data => {
            return data.map(d => {
                return `
            <div class="col-lg-4" name="safeblock>
            <span class="disInlineBlock" name="safe">${d.name}</span>
            <div class="disInlineBlock" name="safeArtice">
                    ${d.values.map(val => {
                        return `<p>${val.Record}</p>`
                    })}
            </div>
            </div>
            `
            })
        })
    }

    async preservationInvest() {

        insert<IPreservation[]>("preservationInvest", fetchUrl.preservationInvest, data => {
            return data.map(d => {
                return `
            <tr ng-repeat="(key,val) in table">
                            <td class="text-center tdMonth">
                                <span class="month">
                                   ${d.month}
                                </span>
                                <span>
                                    ${d.monthKey}
                                </span>
                            </td>
                            <td>

                                <div class="text-center bold moneyUnit">约定年化收益率:</div>
                                <div class="text-center">
                                    <span span class="money">${d.rate}</span>
                                    <span class="moneyUnit">起</span>
                                </div>
                            </td>
                            <td>
                                <div class="text-center bold moneyUnit">总成交金额:</div>
                                <div class="text-center">
                                    <span class="money">${d.total}</span>
                                    <span class="moneyUnit">万元</span>
                                </div>

                            </td>
                            <td class="paddingTop20"><button class="btn btn btn-warning orangeBtn center-block">购买</button></td>
            </tr>
               `
            })
        })

    }
    async highRiskInvest() {
        insert<IHighRisk[]>("highRiskInvest", fetchUrl.highRiskInvest, data => {
            return data.map(d => {
                return `
                     <tr ng-repeat="(key,val) in table2">
                            <td class="text-center tdMonth">
                                <div>
                                    <span class="month">
                                      ${d.month}
                                    </span>
                                    <span>
                                        ${d.monthKey}
                                    </span>
                                </div>
                                <div>
                                    <span>${d.monthNotice}</span>
                                </div>
                            </td>
                            <td>
                                <div class="text-center bold moneyUnit">约定年化收益率:</div>
                                <div class="text-center">
                                    <span span class="money">${d.rate}</span>
                                    <span class="moneyUnit">起</span>
                                </div>
                            </td>
                            <td>
                                <div class="text-center bold moneyUnit">金额:</div>
                                <div class="text-center">
                                    <span class="money">${d.total}</span>
                                    <span class="moneyUnit">元</span>
                                </div>
                            </td>
                            <td class="paddingTop20"><button class="btn btn btn-warning orangeBtn center-block ">${d.button}</button></td>
                        </tr>
               `
            })
        })
    }

    init() {
        $(() => {
            this.safe()
            this.preservationInvest()
            this.highRiskInvest()
        })
    }
}



var main = new Main();

var shutdown = setTimeout(() => {
    try {
        if ($) {
            clearInterval(shutdown);
            main.init();
        }
    } catch (error) {
        console.log("jquery is loading");
    }
}, 100)



window.onresize = mouse => {
    // console.log(`${window.innerWidth} ,${window.innerHeight}`);
      console.log(`${window.innerWidth} `);
}