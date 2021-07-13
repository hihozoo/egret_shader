namespace SpecialEffects {
  export class EffectWave extends IEffect {
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

    F_SHADER = `
      precision lowp float;
	  varying vec2 vTextureCoord;
      varying vec4 vColor;
      uniform sampler2D uSampler;

      uniform vec2 center;
      uniform vec3 params;
      uniform float uTime;

      void main()
      {
		vec2 uv = vTextureCoord.xy;
		vec2 texCoord = uv;

		float dist = distance(uv, center);

		float time = mod(uTime * 0.01, 90.0) / 90.0;

		if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) ){
			float diff = (dist - time);
			float powDiff = 1.0 - pow(abs(diff*params.x), params.y);

			float diffTime = diff  * powDiff;
			vec2 diffUV = normalize(uv - center);
			texCoord = uv + (diffUV * diffTime);
		}

		gl_FragColor = texture2D(uSampler, texCoord);
      }`;

    protected uniform = {
      center: { x: 0.5, y: 0.5 },
      params: { x: 10, y: 0.8, z: 0.1 },
    };
    public constructor(target: egret.DisplayObject) {
      super(target);
      target.filters = [
        new egret.CustomFilter(this.V_SHADER, this.F_SHADER, this.uniform),
      ];
    }

    /**hue 0~360 saturation 0~1 */
    public refreshData(cx = 0, cy = 0.5, px = 0, py = 0, pz = 0) {
      this.uniform.center = { x: cx, y: cy };
      this.uniform.params = { x: px, y: py, z: pz };
    }
  }
}
