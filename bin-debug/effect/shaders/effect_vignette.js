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
    var EffectVignette = (function (_super) {
        __extends(EffectVignette, _super);
        function EffectVignette(target) {
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
            _this.F_SHADER = "\n\t\tprecision lowp float;\n\t\tvarying vec4 vColor;\n\t\tuniform sampler2D uSampler;\n\t\tuniform float size;\n\t\tuniform float amount;\n\t\tvarying vec2 vTextureCoord;\n\t\tvoid main(){\n\t\t\tvec4 color=texture2D(uSampler,vTextureCoord)*vColor;\n\t\t\tfloat dist=distance(vTextureCoord,vec2(0.5,0.5));\n\t\t\tcolor.rgb*=smoothstep(0.8,size*0.799,dist*(amount+size));\n\t\t\tgl_FragColor=color;\n\t\t}";
            _this.uniform = {
                size: 0,
                amount: 0,
            };
            _this.refreshData(0, 0);
            target.filters = [new egret.CustomFilter(_this.V_SHADER, _this.F_SHADER, _this.uniform)];
            return _this;
        }
        /** 0-1 */
        EffectVignette.prototype.refreshData = function (b, d) {
            this.uniform.size = b;
            this.uniform.amount = d;
        };
        return EffectVignette;
    }(SpecialEffects.IEffect));
    SpecialEffects.EffectVignette = EffectVignette;
    __reflect(EffectVignette.prototype, "SpecialEffects.EffectVignette");
})(SpecialEffects || (SpecialEffects = {}));
