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
var SpecialEffects;
(function (SpecialEffects) {
    var EffectBrightnessContrast = (function (_super) {
        __extends(EffectBrightnessContrast, _super);
        /**
         * 明亮对比度
         */
        function EffectBrightnessContrast(target) {
            var _this = _super.call(this, target) || this;
            _this.V_SHADER = "\n\t\tattribute vec2 aVertexPosition;\n\t\tattribute vec2 aTextureCoord;\n\t\tattribute vec4 aColor;\n\t\tuniform vec2 projectionVector;\n\t\tvarying vec2 vTextureCoord;\n\t\tvarying vec4 vColor;\n\t\tconst vec2 center = vec2(-1.0, 1.0);\n\t\tvoid main(void) {\n\t\t\tgl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n\t\t\tvTextureCoord = aTextureCoord;\n\t\t\tvColor = aColor;\n\t\t}";
            _this.F_SHADER = "\n\t\tprecision lowp float;\n\t\tvarying vec4 vColor;\n\t\tuniform sampler2D uSampler;\n\t\tuniform float brightness;\n\t\tuniform float contrast;\n\t\tvarying vec2 vTextureCoord;\n\t\tvoid main(){\n\t\t\tvec4 color=texture2D(uSampler,vTextureCoord)*vColor;\n\t\t\tcolor.rgb+=brightness;\n\t\t\tif(contrast>0.0){\n\t\t\t\tcolor.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;\n\t\t\t}else{\n\t\t\t\tcolor.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;\n\t\t\t}\n\t\t\tgl_FragColor=color;\n\t\t}";
            _this.uniform = {
                brightness: 0,
                contrast: 0,
            };
            _this.refreshData();
            target.filters = [
                new egret.CustomFilter(_this.V_SHADER, _this.F_SHADER, _this.uniform),
            ];
            return _this;
        }
        /**b -1~1 d -1~1 */
        EffectBrightnessContrast.prototype.refreshData = function (b, d) {
            if (b === void 0) { b = 0; }
            if (d === void 0) { d = 0; }
            this.uniform.brightness = b;
            this.uniform.contrast = d;
        };
        return EffectBrightnessContrast;
    }(SpecialEffects.IEffect));
    SpecialEffects.EffectBrightnessContrast = EffectBrightnessContrast;
    __reflect(EffectBrightnessContrast.prototype, "SpecialEffects.EffectBrightnessContrast");
})(SpecialEffects || (SpecialEffects = {}));
