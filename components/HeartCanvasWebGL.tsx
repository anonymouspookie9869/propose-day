import React, { useEffect, useRef } from 'react';

const HeartCanvasWebGL: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Performance optimization: Lower resolution for the heavy shader
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const gl = canvas.getContext('webgl', { antialias: false, depth: false });
    if (!gl) return;

    let time = 0.0;

    const vertexSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision mediump float;
      uniform float width;
      uniform float height;
      vec2 resolution = vec2(width, height);
      uniform float time;
      #define POINT_COUNT 6
      vec2 points[POINT_COUNT];
      const float speed = -0.5;
      const float len = 0.3;
      float intensity = 1.2;
      float radius = 0.007;

      float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C){    
        vec2 a = B - A;
        vec2 b = A - 2.0*B + C;
        vec2 c = a * 2.0;
        vec2 d = A - pos;
        float kk = 1.0 / dot(b,b);
        float kx = kk * dot(a,b);
        float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
        float kz = kk * dot(d,a);      
        float res = 0.0;
        float p = ky - kx*kx;
        float p3 = p*p*p;
        float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
        float h = q*q + 4.0*p3;
        if(h >= 0.0){ 
          h = sqrt(h);
          vec2 x = (vec2(h, -h) - q) / 2.0;
          vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
          float t = clamp(uv.x + uv.y - kx, 0.0, 1.0);
          res = length(d + (c + b*t)*t);
        } else {
          float z = sqrt(-p);
          float v = acos( q/(p*z*2.0) ) / 3.0;
          float m = cos(v);
          float n = sin(v)*1.732050808;
          vec3 t = clamp(vec3(m + m, -n - m, n - m) * z - kx, 0.0, 1.0);
          vec2 qos = d + (c + b*t.x)*t.x;
          float dis = dot(qos,qos);
          res = dis;
          qos = d + (c + b*t.y)*t.y;
          dis = dot(qos,qos);
          res = min(res,dis);
          qos = d + (c + b*t.z)*t.z;
          dis = dot(qos,qos);
          res = min(res,dis);
          res = sqrt(res);
        }
        return res;
      }

      vec2 getHeartPosition(float t){
        return vec2(16.0 * sin(t) * sin(t) * sin(t),
                    -(13.0 * cos(t) - 5.0 * cos(2.0*t)
                    - 2.0 * cos(3.0*t) - cos(4.0*t)));
      }

      float getSegment(float t, vec2 pos, float offset, float scale){
        for(int i = 0; i < POINT_COUNT; i++){
          points[i] = getHeartPosition(offset + float(i)*len + fract(speed * t) * 6.28);
        }
        vec2 c = (points[0] + points[1]) / 2.0;
        vec2 c_prev;
        float dist = 10000.0;
        for(int i = 0; i < POINT_COUNT-1; i++){
          c_prev = c;
          c = (points[i] + points[i+1]) / 2.0;
          dist = min(dist, sdBezier(pos, scale * c_prev, scale * points[i], scale * c));
        }
        return max(0.0, dist);
      }

      void main(){
        vec2 uv = gl_FragCoord.xy/resolution.xy;
        float widthHeightRatio = resolution.x/resolution.y;
        vec2 pos = vec2(0.5, 0.5) - uv;
        pos.y /= widthHeightRatio;
        pos.y += 0.02;
        float scale = 0.000015 * height;
        float t = time;
        float dist1 = getSegment(t, pos, 0.0, scale);
        float dist2 = getSegment(t, pos, 3.4, scale);
        vec3 col = vec3(0.0);
        col += pow(radius/dist1, intensity) * vec3(1.0,0.05,0.3);
        col += pow(radius/dist2, intensity) * vec3(0.1,0.4,1.0);
        col = 1.0 - exp(-col);
        gl_FragColor = vec4(pow(col, vec3(0.4545)), 0.6);
      }
    `;

    function compileShader(source: string, type: number) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, compileShader(vertexSource, gl.VERTEX_SHADER)!);
    gl.attachShader(program, compileShader(fragmentSource, gl.FRAGMENT_SHADER)!);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertexData = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 8, 0);

    const timeHandle = gl.getUniformLocation(program, 'time');
    const widthHandle = gl.getUniformLocation(program, 'width');
    const heightHandle = gl.getUniformLocation(program, 'height');

    const draw = () => {
      time += 0.016;
      gl.uniform1f(timeHandle, time);
      gl.uniform1f(widthHandle, canvas.width);
      gl.uniform1f(heightHandle, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen pointer-events-none" />;
};

export default HeartCanvasWebGL;