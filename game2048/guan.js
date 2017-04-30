/**
* 选择难度
*/
var Difficult;
(function (Difficult) {
    /**
    * 简单难度
    */
    Difficult[Difficult["Easy"] = 0] = "Easy";
    /**
     * 普通难度
     */
    Difficult[Difficult["Normal"] = 1] = "Normal";
    /**
     * 困难模式
     */
    Difficult[Difficult["Hard"] = 2] = "Hard";
    /**
     * 专家模式
     */
    Difficult[Difficult["Expert"] = 3] = "Expert";
    /**
     * 大神模式
     */
    Difficult[Difficult["Boss"] = 4] = "Boss";
    /**
     * 大神模式
     */
    Difficult[Difficult["God"] = 5] = "God";
})(Difficult || (Difficult = {}));
/**
 * 方向
 */
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
/**
 * 画刷
 */
var ColorPan = (function () {
    function ColorPan() {
    }
    return ColorPan;
}());
ColorPan.Lv1 = "#cdbfb2";
ColorPan.Lv2 = "#b89e8e";
ColorPan.Lv3 = "#f5e280";
ColorPan.Lv4 = "#ba97aa";
ColorPan.Lv5 = "#f8a591";
ColorPan.Lv6 = "#8c6912";
ColorPan.backgroundDivBig = "#b8ac9e";
ColorPan.backgroundDivSmall = "#d5cdc2";
var TileDictionary = (function () {
    function TileDictionary() {
        /**
      * 索引
      */
        this.index = 0;
        /**
     * 数值
     */
        this.value = 0;
        /**
    * 元素宽度
    */
        this.width = 0;
        /**
    * 元素高度
    */
        this.height = 0;
        /**
    * 边框宽度
    */
        this.borderWidth = 0;
        this.borderHeight = 0;
        /**
    * 上偏移
    */
        this.top = 0;
        /**
    * 左偏移
    */
        this.left = 0;
        /**
     * 瓦片
     */
        this.own = null;
    }
    TileDictionary.prototype.currentRowIndex = function () {
        return this.index / Constpoint.col;
    };
    TileDictionary.prototype.currentColIndex = function () {
        return this.index % Constpoint.col;
    };
    TileDictionary.prototype.currentTableSize = function () {
        return Constpoint;
    };
    TileDictionary.prototype.update = function () {
        this.left = parseInt(this.own.style.left);
        this.top = parseInt(this.own.style.top);
    };
    return TileDictionary;
}());
var Table = (
    function () {
    function Table(col, row) {
        this.col = col;
        this.row = row;
    }
    return Table;
}());
//公开难度
var Constpoint;
var Game = (function () {
    function Game(div, difficult) {
        var _this = this;
        this.canAnim = true;
        this.Name = "GameObject";
        this.dict = new Array();
        //开局生成随机多少个瓦片
        this.ranTileCount = 2;
        this.initDiff(difficult);
        this.div = div;
        this.div.tabIndex = 100;
        this.uIRender = new UIRender(this.div);
        this.tileCount = this.row * this.col;
        this.init();
        this.uIRender.createElement(this.width, this.height, this.row, this.col, "div");
        this.div.onkeydown = function (e) {
            switch (e.keyCode) {
                //是37: 就左移
                case 37:
                    console.log("左");
                    if (_this.canAnim) {
                        _this.dict.forEach(function (ele) {
                            _this.uIRender.TailMove(ele, Direction.Left);
                        });
                    }
                    //有问题.
                    break;
                //是38: 就上移
                case 38:
                    console.log("上");
                    _this.uIRender.move(Direction.Up);
                    break;
                //是39: 就右移
                case 39:
                    console.log("右");
                    _this.uIRender.move(Direction.Right);
                    if (_this.canAnim) {
                        _this.dict.forEach(function (ele) {
                            _this.uIRender.TailMove(ele, Direction.Right);
                        });
                    }
                    break;
                //是40: 就下移
                case 40:
                    console.log("下");
                    _this.uIRender.move(Direction.Down);
                    break;
                default:
                    console.log(e.code);
            }
        };
        this.div.onmouseover = this.mouseOver;
    }
    Game.prototype.getInstance = function () {
        if (this.instance == undefined || this.instance == null) {
            this.instance = this;
        }
        else {
            return this.instance;
        }
    };
    Game.refresh = function () {
    };
    Game.prototype.initDiff = function (diff) {
        switch (diff) {
            case Difficult.Normal:
                this.row = 4;
                this.col = 4;
                break;
            case Difficult.Easy:
                this.row = 8;
                this.col = 8;
                break;
            case Difficult.Hard:
                this.row = 16;
                this.col = 16;
                break;
            case Difficult.Expert:
                this.row = 32;
                this.col = 32;
                break;
            case Difficult.Boss:
                this.row = 64;
                this.col = 64;
                break;
            case Difficult.God:
                this.row = 100;
                this.col = 100;
                break;
            default:
        }
        this.diff = diff;
        Constpoint = new Table(this.col, this.row);
    };
    Game.prototype.init = function () {
        var _this = this;
        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;
        this.table = new Array(this.row);
        var tab = 0;
        //设置 棋盘格初始化数据
        for (var i = 0; i < this.row; i++) {
            var array1 = new Array(this.col);
            for (var j = 0; j < array1.length; j++) {
                array1[j] = new TileDictionary();
                array1[j].index = tab;
                tab++;
            }
            this.table[i] = array1;
        }
        //
        this.table.forEach(function (element) {
            element.forEach(function (innerElement) {
                _this.dict.push(innerElement);
            });
        });
        //设置初始化瓦片索引和值      
        for (var i = 0; i < this.ranTileCount; i++) {
            //开始创建2个随机的数字 2或者4
            var tileIndex = UIMath.createRandom(this.row * this.col);
            var tileValue = this.createNumber2or4();
            this.dict[tileIndex].value = tileValue;
        }
    };
    Game.prototype.mouseOver = function (mouse) {
        console.log(mouse.x);
    };
    Game.prototype.start = function () {
        var _this = this;
        console.dir(this.table);
        console.dir(this.dict);
        this.dict.forEach(function (value, index) {
            if (value.value > 0) {
                _this.uIRender.createTail(_this.width, _this.height, _this.row, _this.col, value);
            }
        });
    };
    /**
    * 创建随机数字 2 or 4
    */
    Game.prototype.createNumber2or4 = function () {
        var ran = UIMath.createRandom(10);
        var beginRan = ran % 2 == 0 ? 2 : 4;
        return beginRan;
    };
    return Game;
}());
var UIMath = (function () {
    function UIMath() {
    }
    UIMath.createRandom = function (n) {
        return Math.floor(Math.random() * n);
    };
    return UIMath;
}());
var Animation = (function () {
    function Animation() {
    }
    Animation.linear = function (t, b, c, d) {
        return c * t / d + b;
    };
    Animation.easeIn = function (t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    Animation.easeOut = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    Animation.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    /**
     *
     * @param currentTime（当前时间）
     * @param beginningValue（初始值） 当前的值
     * @param ChangeInValue（变化量） 坐标100-200  值写100    100-130 值写30
     * @param duration (帧率) t++   t<d   值120 每秒
     * @param animType
     * @param divElement (div元素)
     */
    Animation.BeginAnim = function (currentTime, beginningValue, ChangeInValue, duration, animType, divElement) {
        var _this = this;
        //var t = 0;
        //var b = parseInt(divElement.style.left);
        //var c = -400;
        //var d = 120;
        var ms = 1000;
        var colseID = setInterval(function () {
            switch (animType) {
                case 1:
                    var val = _this.linear(currentTime, beginningValue, ChangeInValue, duration);
                    var str;
                    if (currentTime <= duration) {
                        str = val + "px";
                        if (divElement != null) {
                            divElement.style.left = str;
                        }
                    }
                    currentTime++;
                    if (currentTime == duration) {
                        divElement.style.left = str;
                    }
                    break;
                case 2:
                    _this.easeIn(currentTime, beginningValue, ChangeInValue, duration);
                    break;
                case 3:
                    _this.easeOut(currentTime, beginningValue, ChangeInValue, duration);
                    break;
                case 4:
                    _this.easeInOut(currentTime, beginningValue, ChangeInValue, duration);
                    break;
                default:
                    _this.linear(currentTime, beginningValue, ChangeInValue, duration);
                    break;
            }
        }, ms / duration);
        setTimeout(function () { clearInterval(colseID); }, ms);
    };
    return Animation;
}());
var UIRender = (function () {
    function UIRender(div) {
        this.div = div;
        this.backgroundSkin();
    }
    UIRender.prototype.move = function (dir) {
        switch (dir) {
            case Direction.Left:
                break;
            case Direction.Right:
                break;
            case Direction.Up:
                break;
            case Direction.Down:
                break;
            default:
                break;
        }
    };
    UIRender.prototype.randomRGB = function () {
        var Max = 2 << 7 - 1;
        var R = UIMath.createRandom(Max);
        var G = UIMath.createRandom(Max);
        var B = UIMath.createRandom(Max);
        return "RGB(" + R + "," + G + "," + B + ")";
    };
    UIRender.prototype.backgroundSkin = function () {
        this.div.style.backgroundColor = ColorPan.backgroundDivBig;
        this.div.style.margin = "auto";
        this.div.style.position = "relative";
        this.div.style.borderRadius = "6px";
    };
    UIRender.prototype.createElement = function (canvasWidth, canvasHeight, row, col, eleName) {
        var borderWidth = canvasWidth * (1 / 6);
        var borderHeight = canvasHeight * (1 / 6);
        var width = (canvasWidth - borderWidth) / col;
        var height = (canvasHeight - borderHeight) / row;
        var pieceOfRectangle = row * col;
        var singleborderWidth = borderWidth / (col + 1);
        var singleborderHeight = borderHeight / (row + 1);
        for (var i = 0; i < pieceOfRectangle; i++) {
            var element = document.createElement(eleName);
            element.style.width = width + "px";
            element.style.height = height + "px";
            element.style.backgroundColor = ColorPan.backgroundDivSmall;
            element.style.borderRadius = "10px";
            element.style.position = "absolute";
            var x = ((singleborderWidth + ((singleborderWidth + width) * (i % col))));
            element.style.left = x + "px";
            var y = singleborderHeight + (singleborderHeight + height) * (Math.floor(i / col));
            element.style.top = y + "px";
            this.div.appendChild(element);
        }
    };
    UIRender.prototype.createTail = function (canvasWidth, canvasHeight, row, col, dict) {
        if (dict == null) {
            console.log("dict is null");
        }
        var index = dict.index;
        var value = dict.value;
        var borderWidth = canvasWidth * (1 / 6);
        var borderHeight = canvasHeight * (1 / 6);
        var width = (canvasWidth - borderWidth) / col;
        var height = (canvasHeight - borderHeight) / row;
        var pieceOfRectangle = row * col;
        var singleborderWidth = borderWidth / (col + 1);
        var singleborderHeight = borderHeight / (row + 1);
        var eleDiv = document.createElement("div");
        eleDiv.style.width = width + "px";
        eleDiv.style.height = height + "px";
        eleDiv.style.backgroundColor = ColorPan.Lv2;
        eleDiv.style.borderRadius = "10px";
        eleDiv.style.position = "absolute";
        eleDiv.style.lineHeight = height + "px";
        eleDiv.style.textAlign = "center";
        var x = ((singleborderWidth + ((singleborderWidth + width) * (index % col))));
        eleDiv.style.left = x + "px";
        var y = singleborderHeight + (singleborderHeight + height) * (Math.floor(index / col));
        eleDiv.style.top = y + "px";
        dict.own = eleDiv;
        dict.width = width;
        dict.height = height;
        dict.borderWidth = singleborderWidth;
        dict.borderHeight = singleborderHeight;
        dict.left = x;
        dict.top = y;
        var a = document.createElement("a");
        a.style.fontSize = (height / 2.5) + "px";
        a.innerText = dict.value.toString();
        eleDiv.appendChild(a);
        this.div.appendChild(eleDiv);
        return eleDiv;
    };
    UIRender.prototype.TailMove = function (tile, dir) {
        if (tile) {
            if (dir != null) {
                if (dir == Direction.Left) {
                    Animation.BeginAnim(0, tile.left, tile.borderWidth - tile.left, 120, 1, tile.own);
                    setTimeout(function () {
                        tile.update();
                    }, 1000);
                }
                if (dir == Direction.Right) {
                    var tileWidth = tile.width + tile.borderWidth;
                    Animation.BeginAnim(0, tile.left, (tileWidth * (tile.currentTableSize().col - 1)) - (tileWidth * tile.currentColIndex()), 120, 1, tile.own);
                    setTimeout(function () {
                        tile.update();
                    }, 1000);
                }
            }
        }
        else {
            console.log("div不存在");
        }
    };
    return UIRender;
}());
//# sourceMappingURL=Guan.js.map