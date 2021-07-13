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
    var EffectHueSaturation = (function (_super) {
        __extends(EffectHueSaturation, _super);
        /**饱和度 */
        function EffectHueSaturation(target) {
            var _this = _super.call(this, target) || this;
            _this.V_SHADER = "attribute vec2 aVertexPosition;\n" +
                "attribute vec2 aTextureCoord;\n" +
                "attribute vec2 aColor;\n" +
                "uniform vec2 projectionVector;\n" +
                "varying vec2 vTextureCoord;\n" +
                "varying vec4 vColor;\n" +
                "const vec2 center = vec2(-1.0, 1.0);\n" +
                "void main(void) {\n" +
                "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
                "   vTextureCoord = aTextureCoord;\n" +
                "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
                "}";
            _this.F_SHADER = "\n\t\t\tprecision lowp float;\n\t\t\tvarying vec4 vColor;\n\t\t\tuniform sampler2D uSampler;\n\t\t\tuniform float hue;\n\t\t\tuniform float saturation;\n\t\t\tvarying vec2 vTextureCoord;\n\t\t\tvoid main(){\n\t\t\t\tvec4 color=texture2D(uSampler,vTextureCoord)*vColor;\n\t\t\t\tfloat angle=hue*3.14159265;\n\t\t\t\tfloat s=sin(angle),c=cos(angle);\n\t\t\t\tvec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;\n\t\t\t\tfloat len=length(color.rgb);\n\t\t\t\tcolor.rgb=vec3(dot(color.rgb,weights.xyz),dot(color.rgb,weights.zxy),dot(color.rgb,weights.yzx));\n\t\t\t\tfloat average=(color.r+color.g+color.b)/3.0;\n\t\t\t\tif(saturation>0.0){\n\t\t\t\t\tcolor.rgb+=(average-color.rgb)*(1.0-1.0/(1.001-saturation));\n\t\t\t\t}else{\n\t\t\t\t\tcolor.rgb+=(average-color.rgb)*(-saturation);\n\t\t\t\t}\n\t\t\t\tgl_FragColor=color;\n\t\t\t}";
            _this.uniform = {
                hue: 0,
                saturation: 0,
            };
            _this.refreshData();
            target.filters = [
                new egret.CustomFilter(_this.V_SHADER, _this.F_SHADER, _this.uniform),
            ];
            return _this;
        }
        /**hue -1~1 saturation -1~1 */
        EffectHueSaturation.prototype.refreshData = function (hue, saturation) {
            if (hue === void 0) { hue = 0; }
            if (saturation === void 0) { saturation = 0; }
            this.uniform.hue = hue;
            this.uniform.saturation = saturation;
        };
        return EffectHueSaturation;
    }(SpecialEffects.IEffect));
    SpecialEffects.EffectHueSaturation = EffectHueSaturation;
    __reflect(EffectHueSaturation.prototype, "SpecialEffects.EffectHueSaturation");
})(SpecialEffects || (SpecialEffects = {}));
