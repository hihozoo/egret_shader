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
    var EffectFlash = (function (_super) {
        __extends(EffectFlash, _super);
        function EffectFlash(target) {
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
            _this.F_SHADER = "precision lowp float;\n" +
                "varying vec2 vTextureCoord;\n" +
                "varying vec4 vColor;\n" +
                "uniform sampler2D uSampler;\n" +
                "uniform float uTime;\n" +
                "void main(void) {\n" +
                "vec2 uvs = vTextureCoord.xy;\n" +
                "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
                "float cos_val = cos(uTime * 0.01);\n" +
                "fg.rgb += sin(cos_val + uvs.x * 2. + uvs.y * 2.) * 0.2;\n" +
                "gl_FragColor = fg * vColor;\n" +
                "}";
            target.filters = [new egret.CustomFilter(_this.V_SHADER, _this.F_SHADER)];
            return _this;
        }
        EffectFlash.prototype.refreshData = function () { };
        return EffectFlash;
    }(SpecialEffects.IEffect));
    SpecialEffects.EffectFlash = EffectFlash;
    __reflect(EffectFlash.prototype, "SpecialEffects.EffectFlash");
})(SpecialEffects || (SpecialEffects = {}));
