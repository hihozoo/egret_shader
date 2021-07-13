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
var EffectExamp = (function (_super) {
    __extends(EffectExamp, _super);
    function EffectExamp() {
        var _this = _super.call(this) || this;
        _this.curEffect = null;
        _this.curData = null;
        _this.skinName = "EffectExampSkin";
        _this.mataData = RES.getRes("effect_json").effect;
        _this.radioGroup = new eui.RadioButtonGroup();
        return _this;
    }
    EffectExamp.prototype.childrenCreated = function () {
        var _this = this;
        this.initEffectGroup();
        this.radioGroup.addEventListener(egret.Event.CHANGE, function (value) {
            var num = _this.radioGroup.selection.$indexNumber;
            _this.createEffect(num);
        }, this);
        this.createEffect(0);
    };
    EffectExamp.prototype.initEffectGroup = function () {
        var _this = this;
        var y = 0;
        this.mataData.forEach(function (item, index) {
            var t = new eui.RadioButton();
            if (index == 0) {
                t.selected = true;
            }
            t.label = item.name;
            _this.effTypeGroup.addChild(t);
            t.group = _this.radioGroup;
            t.y = y;
            y += t.height + 50;
        });
    };
    EffectExamp.prototype.createEffect = function (n) {
        var _this = this;
        if (this.curEffect) {
            this.curEffect.dispose();
            this.attrGroup.removeChildren();
            this.curEffect = null;
            if (this.touchPointComp) {
                this.removeChild(this.touchPointComp);
                this.touchPointComp = null;
            }
        }
        this.curData = JSON.parse(JSON.stringify(this.mataData[n]));
        var effectClass = SpecialEffects[this.curData["class"]];
        var effect = SpecialEffects.createEffects(this.img, effectClass);
        this.curEffect = effect;
        if (effectClass == SpecialEffects.EffectPerspective) {
            this.touchPointComp = new EffectPointsUI(this);
            this.addChild(this.touchPointComp);
            this.touchPointComp.x = this.img.x;
            this.touchPointComp.y = this.img.y;
            this.touchPointComp.width = this.img.width;
            this.touchPointComp.height = this.img.height;
            var arr1 = this.curData.initPoint;
            var arr2 = this.curData.usePoint;
            this.refreshSpecialEffects(arr2);
            for (var i = 0; i < arr2.length; i += 2) {
                this.touchPointComp.createPoint(arr2[i], arr2[i + 1]);
            }
        }
        else {
            var y_1 = 0;
            this.curData.attr.forEach(function (item) {
                var t = new EffectItemUI(_this);
                _this.attrGroup.addChild(t);
                t.y = y_1;
                t.initData(item);
                y_1 += t.height;
            });
        }
    };
    EffectExamp.prototype.refresh = function () {
        var m = this.curData.attr.map(function (item) { return item.curNum; });
        (_a = this.curEffect).refreshData.apply(_a, m);
        var _a;
    };
    EffectExamp.prototype.refreshSpecialEffects = function (data) {
        this.curEffect.refreshData(data, this.curData.initPoint);
    };
    return EffectExamp;
}(eui.Component));
__reflect(EffectExamp.prototype, "EffectExamp");
