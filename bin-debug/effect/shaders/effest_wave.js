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
    var EffectWave = (function (_super) {
        __extends(EffectWave, _super);
        function EffectWave(target) {
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
            _this.F_SHADER = "\n      precision lowp float;\n\t  varying vec2 vTextureCoord;\n      varying vec4 vColor;\n      uniform sampler2D uSampler;\n\n      uniform vec2 center;\n      uniform vec3 params;\n      uniform float uTime;\n\n      void main()\n      {\n\t\tvec2 uv = vTextureCoord.xy;\n\t\tvec2 texCoord = uv;\n\n\t\tfloat dist = distance(uv, center);\n\n\t\tfloat time = mod(uTime * 0.01, 90.0) / 90.0;\n\n\t\tif ( (dist <= (time + params.z)) && (dist >= (time - params.z)) ){\n\t\t\tfloat diff = (dist - time);\n\t\t\tfloat powDiff = 1.0 - pow(abs(diff*params.x), params.y);\n\n\t\t\tfloat diffTime = diff  * powDiff;\n\t\t\tvec2 diffUV = normalize(uv - center);\n\t\t\ttexCoord = uv + (diffUV * diffTime);\n\t\t}\n\n\t\tgl_FragColor = texture2D(uSampler, texCoord);\n      }";
            _this.uniform = {
                center: { x: 0.5, y: 0.5 },
                params: { x: 10, y: 0.8, z: 0.1 },
            };
            target.filters = [
                new egret.CustomFilter(_this.V_SHADER, _this.F_SHADER, _this.uniform),
            ];
            return _this;
        }
        /**hue 0~360 saturation 0~1 */
        EffectWave.prototype.refreshData = function (cx, cy, px, py, pz) {
            if (cx === void 0) { cx = 0; }
            if (cy === void 0) { cy = 0.5; }
            if (px === void 0) { px = 0; }
            if (py === void 0) { py = 0; }
            if (pz === void 0) { pz = 0; }
            this.uniform.center = { x: cx, y: cy };
            this.uniform.params = { x: px, y: py, z: pz };
        };
        return EffectWave;
    }(SpecialEffects.IEffect));
    SpecialEffects.EffectWave = EffectWave;
    __reflect(EffectWave.prototype, "SpecialEffects.EffectWave");
})(SpecialEffects || (SpecialEffects = {}));
