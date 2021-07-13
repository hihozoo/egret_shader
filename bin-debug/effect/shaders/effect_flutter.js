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
    var EffectFlutter = (function (_super) {
        __extends(EffectFlutter, _super);
        function EffectFlutter(target) {
            var _this = _super.call(this, target) || this;
            _this.V_SHADER = "\n\t\tattribute vec2 aVertexPosition;\n\t\tattribute vec2 aTextureCoord;\n\t\tattribute vec4 aColor;\n\t\tuniform vec2 projectionVector;\n\t\tvarying vec2 vTextureCoord;\n\t\tvarying vec4 vColor;\n\t\tconst vec2 center = vec2(-1.0, 1.0);\n\t\tvoid main(void) {\n\t\t\tgl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n\t\t\tvTextureCoord = aTextureCoord;\n\t\t\tvColor = aColor;\n\t\t}";
            _this.F_SHADER = "\n\t\tprecision lowp float;\n\t\tvarying vec2 vTextureCoord;\n\t\tvarying vec4 vColor;\n\t\tuniform sampler2D uSampler;\n\t\t\n\t\tuniform float uTime;\n\t\tuniform float u_frequency;\n\t\tuniform float u_amplitude;\n\t\tuniform float u_amplitude_y_scale;\n\t\t\n\t\tvoid main()\n\t\t{\n\t\t\tfloat pi2 = 6.2831852;\n\t\t\tfloat local = sin(pi2 * fract(vTextureCoord.x * 0.5 + vTextureCoord.y - fract(u_frequency * uTime * 0.1)));\n\t\t\tfloat texcoord_offset = u_amplitude * local * vTextureCoord.y;\n\t\t\tfloat texcoord_offset_x = texcoord_offset * (vTextureCoord.x - 0.5);\n\t\t\tfloat texcoord_offset_y = texcoord_offset * u_amplitude_y_scale;\n\n\t\t\tvec2 v_textcoord_format = vec2(vTextureCoord.x + texcoord_offset_x, vTextureCoord.y + texcoord_offset_y);\n\t\t\tgl_FragColor = texture2D(uSampler, v_textcoord_format) * vColor;\n\t\t}";
            _this.uniform = {
                u_frequency: 0.4,
                u_amplitude: 0.1,
                u_amplitude_y_scale: 0.13
            };
            target.filters = [
                new egret.CustomFilter(_this.V_SHADER, _this.F_SHADER, _this.uniform),
            ];
            return _this;
        }
        /**hue 0~360 saturation 0~1 */
        EffectFlutter.prototype.refreshData = function (frequency, amplitude, amplitude_y_scale) {
            if (frequency === void 0) { frequency = 0.0; }
            if (amplitude === void 0) { amplitude = 0.0; }
            if (amplitude_y_scale === void 0) { amplitude_y_scale = 0.0; }
            this.uniform.u_frequency = frequency;
            this.uniform.u_amplitude = amplitude;
            this.uniform.u_amplitude_y_scale = amplitude_y_scale;
        };
        return EffectFlutter;
    }(SpecialEffects.IEffect));
    SpecialEffects.EffectFlutter = EffectFlutter;
    __reflect(EffectFlutter.prototype, "SpecialEffects.EffectFlutter");
})(SpecialEffects || (SpecialEffects = {}));
