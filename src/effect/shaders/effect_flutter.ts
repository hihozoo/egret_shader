namespace SpecialEffects {
	export class EffectFlutter extends IEffect {
	    V_SHADER = `
		attribute vec2 aVertexPosition;
		attribute vec2 aTextureCoord;
		attribute vec4 aColor;
		uniform vec2 projectionVector;
		varying vec2 vTextureCoord;
		varying vec4 vColor;
		const vec2 center = vec2(-1.0, 1.0);
		void main(void) {
			gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
			vTextureCoord = aTextureCoord;
			vColor = aColor;
		}`;
  
	  F_SHADER = `
		precision lowp float;
		varying vec2 vTextureCoord;
		varying vec4 vColor;
		uniform sampler2D uSampler;
		
		uniform float uTime;
		uniform float u_frequency;
		uniform float u_amplitude;
		uniform float u_amplitude_y_scale;
		
		void main()
		{
			float pi2 = 6.2831852;
			float local = sin(pi2 * fract(vTextureCoord.x * 0.5 + vTextureCoord.y - fract(u_frequency * uTime * 0.1)));
			float texcoord_offset = u_amplitude * local * vTextureCoord.y;
			float texcoord_offset_x = texcoord_offset * (vTextureCoord.x - 0.5);
			float texcoord_offset_y = texcoord_offset * u_amplitude_y_scale;

			vec2 v_textcoord_format = vec2(vTextureCoord.x + texcoord_offset_x, vTextureCoord.y + texcoord_offset_y);
			gl_FragColor = texture2D(uSampler, v_textcoord_format) * vColor;
		}`;
  
	  protected uniform = {
		u_frequency: 0.4,
		u_amplitude: 0.1,
		u_amplitude_y_scale: 0.13
	  };
	  public constructor(target: egret.DisplayObject) {
		super(target);
		target.filters = [
		  new egret.CustomFilter(this.V_SHADER, this.F_SHADER, this.uniform),
		];
	  }
  
	  /**hue 0~360 saturation 0~1 */
	  public refreshData(frequency = 0.0, amplitude = 0.0, amplitude_y_scale = 0.0) {
		this.uniform.u_frequency = frequency;
		this.uniform.u_amplitude = amplitude;
		this.uniform.u_amplitude_y_scale = amplitude_y_scale;
	  }
	}
  }
  