namespace SpecialEffects{
	export class EffectBrightnessContrast extends IEffect {
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

		F_SHADER =`
		precision lowp float;
		varying vec4 vColor;
		uniform sampler2D uSampler;
		uniform float brightness;
		uniform float contrast;
		varying vec2 vTextureCoord;
		void main(){
			vec4 color=texture2D(uSampler,vTextureCoord)*vColor;
			color.rgb+=brightness;
			if(contrast>0.0){
				color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;
			}else{
				color.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;
			}
			gl_FragColor=color;
		}`;

		protected uniform = {
		  brightness: 0,
		  contrast: 0,
		};
		/**
		 * 明亮对比度
		 */
		public constructor(target) {
		  super(target);
		  this.refreshData();
		  target.filters = [
			  new egret.CustomFilter(this.V_SHADER, this.F_SHADER, this.uniform),
		  ];
		}
		/**b -1~1 d -1~1 */
		public refreshData(b = 0, d = 0) {
		  this.uniform.brightness = b;
		  this.uniform.contrast = d;
		}
	  }
}