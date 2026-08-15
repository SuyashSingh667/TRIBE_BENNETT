import React, { useEffect, useRef, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 3000);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas?.clientWidth || 1280;
      const h = canvas?.clientHeight || 720;
      if (canvas && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = v_texCoord;
    
    vec3 color1 = vec3(0.486, 0.086, 0.118); // #7c161e
    vec3 color2 = vec3(0.3, 0.05, 0.07);    // Darker crimson
    
    float n = snoise(uv * 3.0 + u_time * 0.1);
    float n2 = snoise(uv * 5.0 - u_time * 0.15);
    
    vec3 finalColor = mix(color1, color2, n * 0.5 + 0.5);
    finalColor = mix(finalColor, color1 * 0.8, n2 * 0.3);
    
    float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor -= grain * 0.04;
    
    float dist = distance(uv, vec2(0.5));
    finalColor *= smoothstep(1.2, 0.4, dist);
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;

    function cs(type: number, src: string) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    if (!prog) return;
    const vertexShader = cs(gl.VERTEX_SHADER, vs);
    const fragmentShader = cs(gl.FRAGMENT_SHADER, fs);
    if (vertexShader) gl.attachShader(prog, vertexShader);
    if (fragmentShader) gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let animationFrameId: number;
    let startTime = Date.now();

    function render() {
      if (typeof ResizeObserver === 'undefined') syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      const t = Date.now() - startTime;
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-primary h-screen w-screen overflow-hidden flex flex-col items-center justify-center relative selection:bg-tertiary selection:text-primary transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background Shader */}
      <div className="absolute inset-0 z-0">
        <div style={{ display: 'block', width: '100%', height: '100%', minHeight: '200px' }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} width="1280" height="1024"></canvas>
        </div>
      </div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 texture-overlay pointer-events-none z-0"></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-gutter fade-in">
        {/* Mandala Graphic */}
        <div className="mb-12 relative flex items-center justify-center w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
          <svg className="w-full h-full text-surface-dim fill-current" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Rotating Lotus Petals */}
            <g className="origin-center animate-[spin_30s_linear_infinite]">
              <path d="M100 10 C 130 40, 140 80, 100 100 C 60 80, 70 40, 100 10 Z" opacity="0.4"></path>
              <g transform="rotate(45 100 100)"><path d="M100 10 C 130 40, 140 80, 100 100 C 60 80, 70 40, 100 10 Z" opacity="0.4"></path></g>
              <g transform="rotate(90 100 100)"><path d="M100 10 C 130 40, 140 80, 100 100 C 60 80, 70 40, 100 10 Z" opacity="0.4"></path></g>
              <g transform="rotate(135 100 100)"><path d="M100 10 C 130 40, 140 80, 100 100 C 60 80, 70 40, 100 10 Z" opacity="0.4"></path></g>
              <g transform="rotate(180 100 100)"><path d="M100 10 C 130 40, 140 80, 100 100 C 60 80, 70 40, 100 10 Z" opacity="0.4"></path></g>
              <g transform="rotate(225 100 100)"><path d="M100 10 C 130 40, 140 80, 100 100 C 60 80, 70 40, 100 10 Z" opacity="0.4"></path></g>
              <g transform="rotate(270 100 100)"><path d="M100 10 C 130 40, 140 80, 100 100 C 60 80, 70 40, 100 10 Z" opacity="0.4"></path></g>
              <g transform="rotate(315 100 100)"><path d="M100 10 C 130 40, 140 80, 100 100 C 60 80, 70 40, 100 10 Z" opacity="0.4"></path></g>
            </g>
            {/* Middle Geometric */}
            <g className="origin-center animate-[spin_40s_linear_infinite_reverse]">
              <circle cx="100" cy="100" fill="none" opacity="0.6" r="60" stroke="currentColor" strokeDasharray="2 6" strokeWidth="1.5"></circle>
              <polygon fill="none" opacity="0.8" points="100,45 139,61 155,100 139,139 100,155 61,139 45,100 61,61" stroke="currentColor" strokeWidth="1"></polygon>
              <polygon fill="none" opacity="0.8" points="100,45 139,61 155,100 139,139 100,155 61,139 45,100 61,61" stroke="currentColor" strokeWidth="1" transform="rotate(22.5 100 100)"></polygon>
            </g>
            {/* Core Lotus */}
            <g className="origin-center pulse-slow">
              <path d="M100 60 C 115 80, 120 95, 100 110 C 80 95, 85 80, 100 60 Z" fill="currentColor"></path>
              <path d="M100 60 C 115 80, 120 95, 100 110 C 80 95, 85 80, 100 60 Z" fill="currentColor" transform="rotate(90 100 100)"></path>
              <path d="M100 60 C 115 80, 120 95, 100 110 C 80 95, 85 80, 100 60 Z" fill="currentColor" transform="rotate(180 100 100)"></path>
              <path d="M100 60 C 115 80, 120 95, 100 110 C 80 95, 85 80, 100 60 Z" fill="currentColor" transform="rotate(270 100 100)"></path>
              <circle cx="100" cy="100" fill="currentColor" opacity="0.5" r="8"></circle>
            </g>
          </svg>
        </div>
        
        {/* Typography */}
        <h1 className="font-headline-md text-headline-md text-surface-dim mb-8 tracking-widest text-center opacity-90">
          Accessing the Realm
        </h1>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-surface-variant/20 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-surface-dim w-full rounded-full loading-progress shadow-[0_0_10px_rgba(221,218,208,0.5)]"></div>
        </div>
        
        {/* Subtext */}
        <p className="font-label-caps text-label-caps text-surface-dim mt-6 opacity-70 tracking-[0.2em]">
          PREPARING ARTIFACTS
        </p>
      </div>
    </div>
  );
}
