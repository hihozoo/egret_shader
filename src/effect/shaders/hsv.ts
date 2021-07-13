let HSV_F_SHADER = `
	uniform sampler2D uSampler;
	varying vec2 vTextureCoord;

	uniform float hue;
	uniform float saturation;
	uniform float value;

	mediump vec3 rgb2hsv(mediump vec3 rgb){
		mediump float mx = max(max(rgb.x, rgb.y), rgb.z);
		mediump float mn = min(min(rgb.x, rgb.y), rgb.z);
	
		mediump float h;
		mediump float s;
		mediump float v;
	
		mediump float df = mx - mn;
		if(mx == mn){
			h = 0.0;
		} else if (mx == rgb.x){
			h = (60.0 * ((rgb.y-rgb.z)/df) + 360.0);
		} else if (mx == rgb.y){
			h = (60.0 * ((rgb.z-rgb.x)/df) + 120.0);
		} else {
			h = (60.0 * ((rgb.x-rgb.y)/df) + 240.0);
		}
	
		if(mx == 0.0){
			s = 0.0;
		} else {
			s = df / mx;
		}
	
		v = mx;
		mediump vec3 hsv = vec3(h, s, v);
		return hsv;
	}

	mediump vec3 hsv2rgb (mediump vec3 hsv)
	{
		mediump float r = 0.0;
		mediump float g = 0.0;
		mediump float b = 0.0;
		if (hsv.y == 0.0){
			r = hsv.z;
			g = hsv.z;
			b = hsv.z;
		} else {
			mediump float h60 = hsv.x / 60.0;
			mediump float h60f = floor(h60);
			lowp int hi = int(mod(h60f, 6.0));
			mediump float f = h60 - h60f;

			if (hi == 0){
				r = hsv.z;
				g = hsv.z * (1.0 - (1.0 - f) * hsv.y);
				b = hsv.z * (1.0 - hsv.y);
			} else if (hi == 1) {
				r = hsv.z * (1.0 - f * hsv.y);
				g = hsv.z;
				b = hsv.z * (1.0 - hsv.y);
			} else if (hi == 2) {
				r = hsv.z * (1.0 - hsv.y);
				g = hsv.z;
				b = hsv.z * (1.0 - (1.0 - f) * hsv.y);
			} else if (hi == 3) {
				r = hsv.z * (1.0 - hsv.y);
				g = hsv.z * (1.0 - f * hsv.y);
				b = hsv.z;
			} else if (hi == 4) {
				r = hsv.z * (1.0 - (1.0 - f) * hsv.y);
				g = hsv.z * (1.0 - hsv.y);
				b = hsv.z;
			} else if (hi == 5) {
				r = hsv.z;
				g = hsv.z * (1.0 - hsv.y);
				b = hsv.z * (1.0 - f * hsv.y);
			}
		}

		mediump vec3 rgb = vec3(r, g, b);
		return rgb;
	}

	vec3 rgb2hsv2(vec3 c)
	{
		vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
		vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
		vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

		float d = q.x - min(q.w, q.y);
		float e = 1.0e-10;
		return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
	}

	vec3 hsv2rgb2(vec3 c)
	{
		vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
		vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
		return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
	}

	void main(){
		vec4 ori_rgb = texture2D(uSampler, vTextureCoord);
		vec3 rgb = ori_rgb.rgb;

		if (hue != 0.0){
			mediump vec3 hsv = rgb2hsv(rgb);

			// 调整h值
			mediump float new_hue = hue + hsv.x;
			if (new_hue > 360.0)
			{
				new_hue = new_hue - 360.0;
			}
			mediump float new_saturation = saturation + hsv.y;
			mediump float new_value = hsv.z;

			mediump vec3 new_hsv = vec3(new_hue, new_saturation, new_value);
			rgb = hsv2rgb(new_hsv);
		}

		if (value != 0.0){
			if (value > 0.0){
				rgb.r = rgb.r + (1.0 - rgb.r) * value;
				rgb.g = rgb.g + (1.0 - rgb.g) * value;
				rgb.b = rgb.r + (1.0 - rgb.b) * value;
			} else {
				rgb.r = rgb.r + rgb.r * value;
				rgb.g = rgb.g + rgb.g * value;
				rgb.b = rgb.b + rgb.b * value;
			}
		}

		gl_FragColor = vec4(rgb , ori_rgb.a);
	}

`