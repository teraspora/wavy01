// Wavy01 - My first OpenGL shader;
// Author: John Lynch (teraspora);
// Date: 09 SEP 2018.

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    const float TWO_PI = 6.283185307;
    const vec4 colours[3] = vec4[3](vec4(1., 0.5, 0., 1.), vec4(0., 0.7, 1., 1.), vec4(0.8, 0., 1., 1.)); 

    float px = fragCoord.x;
    float py = fragCoord.y;
    float w = iResolution.x;
    float h = iResolution.y;

    vec2 wh2 = vec2(px - w / 2., py - h / 2.);

    // rotate each point
    float phi = mod(iTime, TWO_PI);
    float c = cos(phi);
    float s = sin(phi);
    float x = wh2.x * c - wh2.y * s + w / 2.;
    float y = wh2.x * s + wh2.y * c + h / 2.;
    
    wh2 = vec2(x - w / 2., y - h / 2.);
    
    fragColor = vec4(2. * cos(iTime * 0.2)  * x / w, 0., iMouse.y / h, 1.);
    float factor = mod(iTime, 40.);
    float yt = 100. + 50. * (sin(factor * x * 13. / w) * cos(factor * x * 1.3 / w));
    float yu = h - yt;
    
    if (y < yt || y > yu) fragColor = vec4(sin(float(iFrame) / 100.), cos(iTime) / 4., 0.5, 1.);      
    
    float r2 = wh2.x * wh2.x + wh2.y * wh2.y;
    // angle determines cutoff radius so we get a star;
    if (r2 < 20000. - mod(iTime * 80000., 20000.) - mod(atan(wh2.y, wh2.x), 0.5) * r2 * 6.) {
    	fragColor = colours[int(mod(float(iFrame) / 120., 3.))];
    }
}