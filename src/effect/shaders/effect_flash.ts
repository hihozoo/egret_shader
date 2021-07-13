namespace SpecialEffects {
  export class EffectFlash extends IEffect {
    V_SHADER =
      "attribute vec2 aVertexPosition;\n" +
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

    F_SHADER =
      "precision lowp float;\n" +
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

    constructor(target) {
      super(target);
      target.filters = [new egret.CustomFilter(this.V_SHADER, this.F_SHADER)];
    }

    refreshData() {}
  }
}
