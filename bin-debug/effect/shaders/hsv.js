var HSV_F_SHADER = "\n\n\tuniform sampler2D uSampler;\n\n\tvarying vec2 vTextureCoord;\n\n\tuniform float hue;\n\tuniform float saturation;\n\tuniform float value;\n\n\n\tmediump vec3 rgb2hsv(mediump vec3 rgb){\n\t\tmediump float mx = max(max(rgb.x, rgb.y), rgb.z);\n\t\tmediump float mn = min(min(rgb.x, rgb.y), rgb.z);\n\t\n\t\tmediump float h;\n\t\tmediump float s;\n\t\tmediump float v;\n\t\n\t\tmediump float df = mx - mn;\n\t\tif(mx == mn){\n\t\t\th = 0.0;\n\t\t} else if (mx == rgb.x){\n\t\t\th = (60.0 * ((rgb.y-rgb.z)/df) + 360.0);\n\t\t} else if (mx == rgb.y){\n\t\t\th = (60.0 * ((rgb.z-rgb.x)/df) + 120.0);\n\t\t} else {\n\t\t\th = (60.0 * ((rgb.x-rgb.y)/df) + 240.0);\n\t\t}\n\t\n\t\tif(mx == 0.0){\n\t\t\ts = 0.0;\n\t\t} else {\n\t\t\ts = df / mx;\n\t\t}\n\t\n\t\tv = mx;\n\t\tmediump vec3 hsv = vec3(h, s, v);\n\t\treturn hsv;\n\t}\n\n\tmediump vec3 hsv2rgb (mediump vec3 hsv)\n\t{\n\t\tmediump float r = 0.0;\n\t\tmediump float g = 0.0;\n\t\tmediump float b = 0.0;\n\t\tif (hsv.y == 0.0){\n\t\t\tr = hsv.z;\n\t\t\tg = hsv.z;\n\t\t\tb = hsv.z;\n\t\t} else {\n\t\t\tmediump float h60 = hsv.x / 60.0;\n\t\t\tmediump float h60f = floor(h60);\n\t\t\tlowp int hi = int(mod(h60f, 6.0));\n\t\t\tmediump float f = h60 - h60f;\n\n\t\t\tif (hi == 0){\n\t\t\t\tr = hsv.z;\n\t\t\t\tg = hsv.z * (1.0 - (1.0 - f) * hsv.y);\n\t\t\t\tb = hsv.z * (1.0 - hsv.y);\n\t\t\t} else if (hi == 1) {\n\t\t\t\tr = hsv.z * (1.0 - f * hsv.y);\n\t\t\t\tg = hsv.z;\n\t\t\t\tb = hsv.z * (1.0 - hsv.y);\n\t\t\t} else if (hi == 2) {\n\t\t\t\tr = hsv.z * (1.0 - hsv.y);\n\t\t\t\tg = hsv.z;\n\t\t\t\tb = hsv.z * (1.0 - (1.0 - f) * hsv.y);\n\t\t\t} else if (hi == 3) {\n\t\t\t\tr = hsv.z * (1.0 - hsv.y);\n\t\t\t\tg = hsv.z * (1.0 - f * hsv.y);\n\t\t\t\tb = hsv.z;\n\t\t\t} else if (hi == 4) {\n\t\t\t\tr = hsv.z * (1.0 - (1.0 - f) * hsv.y);\n\t\t\t\tg = hsv.z * (1.0 - hsv.y);\n\t\t\t\tb = hsv.z;\n\t\t\t} else if (hi == 5) {\n\t\t\t\tr = hsv.z;\n\t\t\t\tg = hsv.z * (1.0 - hsv.y);\n\t\t\t\tb = hsv.z * (1.0 - f * hsv.y);\n\t\t\t}\n\t\t}\n\n\t\tmediump vec3 rgb = vec3(r, g, b);\n\t\treturn rgb;\n\t}\n\n\tvec3 rgb2hsv2(vec3 c)\n\t{\n\t\tvec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n\t\tvec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n\t\tvec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\n\t\tfloat d = q.x - min(q.w, q.y);\n\t\tfloat e = 1.0e-10;\n\t\treturn vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n\t}\n\n\tvec3 hsv2rgb2(vec3 c)\n\t{\n\t\tvec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n\t\tvec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n\t\treturn c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n\t}\n\n\tvoid main(){\n\t\tvec4 ori_rgb = texture2D(uSampler, vTextureCoord);\n\t\tvec3 rgb = ori_rgb.rgb;\n\n\t\tif (hue != 0.0){\n\t\t\tmediump vec3 hsv = rgb2hsv2(rgb);\n\n\t\t\t// \u8C03\u6574h\u503C\n\t\t\tmediump float new_hue = hue + hsv.x;\n\t\t\tif (new_hue > 360.0)\n\t\t\t{\n\t\t\t\tnew_hue = new_hue - 360.0;\n\t\t\t}\n\t\t\tmediump float new_saturation = saturation + hsv.y;\n\t\t\tmediump float new_value = hsv.z;\n\n\t\t\tmediump vec3 new_hsv = vec3(new_hue, new_saturation, new_value);\n\t\t\trgb = hsv2rgb2(new_hsv);\n\t\t}\n\n\t\tif (value != 0.0){\n\t\t\tif (value > 0.0){\n\t\t\t\trgb.r = rgb.r + (1.0 - rgb.r) * value;\n\t\t\t\trgb.g = rgb.g + (1.0 - rgb.g) * value;\n\t\t\t\trgb.b = rgb.r + (1.0 - rgb.b) * value;\n\t\t\t} else {\n\t\t\t\trgb.r = rgb.r + rgb.r * value;\n\t\t\t\trgb.g = rgb.g + rgb.g * value;\n\t\t\t\trgb.b = rgb.b + rgb.b * value;\n\t\t\t}\n\t\t}\n\n\t\tgl_FragColor = vec4(rgb, ori_rgb.a);\n\t}\n\n";
