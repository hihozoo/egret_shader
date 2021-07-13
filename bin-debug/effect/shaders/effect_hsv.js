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
    var EffectHSV = (function (_super) {
        __extends(EffectHSV, _super);
        function EffectHSV(target) {
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
            _this.F_SHADER = "\n\tprecision lowp float;\n\tuniform sampler2D uSampler;\n\tvarying vec2 vTextureCoord;\n\n\tuniform float hue;\n\tuniform float saturation;\n\tuniform float value;\n\n\t// https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl\n\tvec3 rgb2hsv(vec3 c)\n\t{\n\t\tvec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n\t\tvec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n\t\tvec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\n\t\tfloat d = q.x - min(q.w, q.y);\n\t\tfloat e = 1.0e-10;\n\t\treturn vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n\t}\n\n\tvec3 hsv2rgb(vec3 c)\n\t{\n\t\tvec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n\t\tvec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n\t\treturn c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n\t}\n\n\tvoid main(){\n\t\tvec4 ori_rgb = texture2D(uSampler, vTextureCoord);\n\t\tvec3 rgb = vec3(ori_rgb.r, ori_rgb.g, ori_rgb.b);\n\n\t\tmediump vec3 hsv = rgb2hsv(rgb);\n\n\t\t// \u8C03\u6574h\u503C\n\t\tmediump float new_hue = hue + hsv.x;\n\t\tmediump float new_saturation = saturation + hsv.y;\n\t\tmediump float new_value = hsv.z;\n\n\t\tmediump vec3 new_hsv = vec3(new_hue, new_saturation, new_value);\n\t\trgb = hsv2rgb(new_hsv);\n\n\t\tif (value > 0.0){\n\t\t\trgb.r = rgb.r + (1.0 - rgb.r) * value;\n\t\t\trgb.g = rgb.g + (1.0 - rgb.g) * value;\n\t\t\trgb.b = rgb.r + (1.0 - rgb.b) * value;\n\t\t} else {\n\t\t\trgb.r = rgb.r + rgb.r * value;\n\t\t\trgb.g = rgb.g + rgb.g * value;\n\t\t\trgb.b = rgb.b + rgb.b * value;\n\t\t}\n\n\t\tgl_FragColor = vec4(rgb * ori_rgb.a, ori_rgb.a);\n\t}";
            _this.uniform = {
                hue: 0,
                saturation: 0,
                value: 0,
            };
            _this.refreshData();
            target.filters = [
                new egret.CustomFilter(_this.V_SHADER, _this.F_SHADER, _this.uniform),
            ];
            return _this;
        }
        /**hue 0~360 saturation 0~1 */
        EffectHSV.prototype.refreshData = function (hue, saturation, value) {
            if (hue === void 0) { hue = 0; }
            if (saturation === void 0) { saturation = 0; }
            if (value === void 0) { value = 0; }
            this.uniform.hue = hue / 360;
            this.uniform.saturation = saturation / 100;
            this.uniform.value = value / 100;
        };
        return EffectHSV;
    }(SpecialEffects.IEffect));
    SpecialEffects.EffectHSV = EffectHSV;
    __reflect(EffectHSV.prototype, "SpecialEffects.EffectHSV");
})(SpecialEffects || (SpecialEffects = {}));
