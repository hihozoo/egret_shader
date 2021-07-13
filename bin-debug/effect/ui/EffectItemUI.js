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
var EffectItemUI = (function (_super) {
    __extends(EffectItemUI, _super);
    function EffectItemUI(m) {
        var _this = _super.call(this) || this;
        _this._m = m;
        _this.skinName = "EffectItemSkin";
        return _this;
    }
    EffectItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.slider.addEventListener(egret.Event.CHANGE, this.onChangeData, this);
    };
    EffectItemUI.prototype.onChangeData = function () {
        this._data.curNum = this.slider.value;
        this._m.refresh();
        this.refreshValue();
    };
    EffectItemUI.prototype.refreshValue = function () {
        this.valueLabel.text = this.slider.value.toFixed(2);
    };
    EffectItemUI.prototype.getAttrName = function () {
        return this._data.name;
    };
    EffectItemUI.prototype.initData = function (data) {
        this._data = data;
        this.attrName.text = data.name;
        this.slider.maximum = data.max;
        this.slider.minimum = data.min;
        this.slider.value = data.curNum;
        this.slider.snapInterval = 0;
        this.refreshValue();
    };
    EffectItemUI.prototype.partRemoved = function () {
        this.slider.removeEventListener(egret.Event.CHANGE, this.onChangeData, this);
        this._m = null;
        this._data = null;
    };
    return EffectItemUI;
}(eui.Component));
__reflect(EffectItemUI.prototype, "EffectItemUI");
