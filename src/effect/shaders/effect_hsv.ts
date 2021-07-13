namespace SpecialEffects {
  export class EffectHSV extends IEffect {
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
	uniform sampler2D uSampler;
	varying vec2 vTextureCoord;

	uniform float hue;
	uniform float saturation;
	uniform float value;

	// https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
	vec3 rgb2hsv(vec3 c)
	{
		vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
		vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
		vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

		float d = q.x - min(q.w, q.y);
		float e = 1.0e-10;
		return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
	}

	vec3 hsv2rgb(vec3 c)
	{
		vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
		vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
		return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
	}

	void main(){
		vec4 ori_rgb = texture2D(uSampler, vTextureCoord);
		vec3 rgb = vec3(ori_rgb.r, ori_rgb.g, ori_rgb.b);

		mediump vec3 hsv = rgb2hsv(rgb);

		// 调整h值
		mediump float new_hue = hue + hsv.x;
		mediump float new_saturation = saturation + hsv.y;
		mediump float new_value = hsv.z;

		mediump vec3 new_hsv = vec3(new_hue, new_saturation, new_value);
		rgb = hsv2rgb(new_hsv);

		if (value > 0.0){
			rgb.r = rgb.r + (1.0 - rgb.r) * value;
			rgb.g = rgb.g + (1.0 - rgb.g) * value;
			rgb.b = rgb.r + (1.0 - rgb.b) * value;
		} else {
			rgb.r = rgb.r + rgb.r * value;
			rgb.g = rgb.g + rgb.g * value;
			rgb.b = rgb.b + rgb.b * value;
		}

		gl_FragColor = vec4(rgb * ori_rgb.a, ori_rgb.a);
	}`;

    protected uniform = {
      hue: 0,
      saturation: 0,
      value: 0,
    };
    public constructor(target) {
      super(target);
      this.refreshData();
      target.filters = [
        new egret.CustomFilter(this.V_SHADER, this.F_SHADER, this.uniform),
      ];
    }
    /**hue 0~360 saturation 0~1 */
    public refreshData(hue = 0, saturation = 0, value = 0) {
      this.uniform.hue = hue / 360;
      this.uniform.saturation = saturation / 100;
      this.uniform.value = value / 100;
    }
  }
}
