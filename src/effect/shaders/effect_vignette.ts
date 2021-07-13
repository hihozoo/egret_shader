namespace SpecialEffects {
	export class EffectVignette extends IEffect {
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
		varying vec4 vColor;
		uniform sampler2D uSampler;
		uniform float size;
		uniform float amount;
		varying vec2 vTextureCoord;
		void main(){
			vec4 color=texture2D(uSampler,vTextureCoord)*vColor;
			float dist=distance(vTextureCoord,vec2(0.5,0.5));
			color.rgb*=smoothstep(0.8,size*0.799,dist*(amount+size));
			gl_FragColor=color;
		}`;
  
		protected uniform = {
			size: 0,
			amount: 0,
		  };
		  public constructor(target) {
			super(target);
			this.refreshData(0, 0);
			target.filters = [new egret.CustomFilter(this.V_SHADER, this.F_SHADER, this.uniform)];
		  }
		  /** 0-1 */
		  public refreshData(b, d) {
			this.uniform.size = b;
			this.uniform.amount = d;
		  }
	}
  }
  