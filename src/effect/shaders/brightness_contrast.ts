let BRIGHTNESS_CONTRAST_F_SHADER =`
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
