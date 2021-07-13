var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var EffectPointsUI = (function (_super) {
    __extends(EffectPointsUI, _super);
    function EffectPointsUI(m) {
        var _this = _super.call(this) || this;
        _this.pointImgArr = [];
        _this.isActive = false;
        _this._m = m;
        return _this;
    }
    EffectPointsUI.prototype.childrenCreated = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
        var r = new eui.Rect(this.width, this.height);
        r.alpha = 0;
        this.addChild(r);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.handleTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.handleTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.handleTouchMove, this);
    };
    EffectPointsUI.prototype.handleTouchBegin = function (e) {
        if (this.pointImgArr.indexOf(e.target) > -1) {
            this.curPointImg = e.target;
        }
    };
    EffectPointsUI.prototype.handleTouchMove = function (e) {
        if (this.curPointImg) {
            this.curPointImg.x = e.stageX - this.x;
            this.curPointImg.y = e.stageY - this.y;
            this._m.refreshSpecialEffects(this.getData());
        }
    };
    EffectPointsUI.prototype.getData = function () {
        var data = [];
        this.pointImgArr.forEach(function (item) {
            data.push(item.x);
            data.push(item.y);
        });
        return data;
    };
    EffectPointsUI.prototype.handleTouchEnd = function () {
        this.curPointImg = null;
    };
    EffectPointsUI.prototype.createPoint = function (x, y) {
        var img = new eui.Image(RES.getRes("radiobutton_select_up_png"));
        img.width = img.height = 20;
        img.anchorOffsetX = 10;
        img.anchorOffsetY = 10;
        img.x = x;
        img.y = y;
        this.pointImgArr.push(img);
        this.addChild(img);
    };
    EffectPointsUI.prototype.partRemoved = function () {
        this.removeChildren();
        this.pointImgArr = null;
    };
    return EffectPointsUI;
}(eui.Group));
__reflect(EffectPointsUI.prototype, "EffectPointsUI");
