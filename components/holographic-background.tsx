"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

const fragmentShader = `
uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;
  
  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  
  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
           
  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  
  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  
  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  float noise = snoise(vec3(vUv * 5.0, time * 0.1));
  
  // Create a base color with gradient
  vec3 color1 = vec3(0.1, 0.1, 0.4); // Deep blue
  vec3 color2 = vec3(0.8, 0.2, 0.8); // Purple
  vec3 color3 = vec3(0.0, 0.8, 0.8); // Cyan
  
  // Mix colors based on position and noise
  float mixFactor1 = sin(time * 0.2 + vUv.x * 3.0) * 0.5 + 0.5;
  float mixFactor2 = cos(time * 0.3 + vUv.y * 2.0) * 0.5 + 0.5;
  
  vec3 baseColor = mix(color1, color2, mixFactor1);
  baseColor = mix(baseColor, color3, mixFactor2);
  
  // Add noise-based distortion
  float distortion = noise * 0.3;
  vec2 distortedUV = vUv + vec2(sin(vUv.y * 10.0 + time) * 0.02, cos(vUv.x * 10.0 + time) * 0.02);
  
  // Create bubble/holographic effect
  float bubble = sin(distortedUV.x * 20.0 + time) * sin(distortedUV.y * 20.0 + time * 0.5);
  bubble = smoothstep(0.0, 1.0, bubble * bubble);
  
  // Create edge glow
  float edge = length(vUv - 0.5) * 2.0;
  edge = 1.0 - smoothstep(0.4, 1.0, edge);
  
  // Final color with holographic effect
  vec3 finalColor = baseColor;
  finalColor += vec3(0.9, 0.4, 0.7) * bubble * 0.3; // Add bubble highlights
  finalColor += vec3(0.2, 0.8, 1.0) * edge * 0.5;   // Add edge glow
  
  // Add rainbow effect
  float rainbow = sin(distortedUV.x * 20.0 + time) * 0.5 + 0.5;
  finalColor += vec3(sin(rainbow + 0.0), sin(rainbow + 2.0), sin(rainbow + 4.0)) * 0.1;
  
  // Adjust brightness based on position
  float brightness = 0.8 + 0.2 * sin(time * 0.5 + vUv.x * 10.0) * sin(time * 0.5 + vUv.y * 10.0);
  finalColor *= brightness;
  
  // Add subtle scanlines
  float scanline = sin(vUv.y * 100.0) * 0.02 + 0.98;
  finalColor *= scanline;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 pixels;
float PI = 3.141592653589793238;

void main() {
  vUv = uv;
  vPosition = position;
  
  // Add subtle vertex displacement for more organic feel
  vec3 newPosition = position;
  newPosition.z += sin(position.x * 10.0 + time) * 0.02;
  newPosition.z += cos(position.y * 10.0 + time * 0.5) * 0.02;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

export default function HolographicBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const frameIdRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
    camera.position.z = 1
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create a plane geometry that covers the entire screen
    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32)

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    })
    materialRef.current = material

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Post-processing
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    // Add bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5, // strength
      0.4, // radius
      0.85, // threshold
    )
    composer.addPass(bloomPass)

    composerRef.current = composer

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !composerRef.current) return

      const width = window.innerWidth
      const height = window.innerHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
      composerRef.current.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      if (!materialRef.current || !composerRef.current) return

      materialRef.current.uniforms.time.value += 0.01
      composerRef.current.render()

      frameIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(frameIdRef.current)
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0" />
}
