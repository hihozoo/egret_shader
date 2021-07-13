namespace SpecialEffects{
	export class EffectHueSaturation extends IEffect {
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
			uniform float hue;
			uniform float saturation;
			varying vec2 vTextureCoord;
			void main(){
				vec4 color=texture2D(uSampler,vTextureCoord)*vColor;
				float angle=hue*3.14159265;
				float s=sin(angle),c=cos(angle);
				vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;
				float len=length(color.rgb);
				color.rgb=vec3(dot(color.rgb,weights.xyz),dot(color.rgb,weights.zxy),dot(color.rgb,weights.yzx));
				float average=(color.r+color.g+color.b)/3.0;
				if(saturation>0.0){
					color.rgb+=(average-color.rgb)*(1.0-1.0/(1.001-saturation));
				}else{
					color.rgb+=(average-color.rgb)*(-saturation);
				}
				gl_FragColor=color;
			}`;

		protected uniform = {
		  hue: 0,
		  saturation: 0,
		};
		/**饱和度 */
		public constructor(target) {
		  super(target);
		  this.refreshData();
		  target.filters = [
			  new egret.CustomFilter(this.V_SHADER, this.F_SHADER, this.uniform),
		  ];
		}
		/**hue -1~1 saturation -1~1 */
		public refreshData(hue = 0, saturation = 0) {
		  this.uniform.hue = hue;
		  this.uniform.saturation = saturation;
		}
	  }
}