import React, { useState, Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { supabase } from "../lib/supabase";

// --- 3D Scene Components ---
const AbstractShapes = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, 0, -5]} color="#dc2626" intensity={6} distance={30} />
      <pointLight position={[10, -10, 5]} color="#ffffff" intensity={2} distance={20} />

      {/* Central Geometric Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[4, 1, -6]}>
        <mesh>
          <icosahedronGeometry args={[2.5, 0]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} wireframe={true} transparent opacity={0.2} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[2.3, 0]} />
          <meshPhysicalMaterial color="#0a0a0a" metalness={1} roughness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
        </mesh>
      </Float>

      {/* Floating Monolith */}
      <Float speed={2.0} rotationIntensity={1.5} floatIntensity={1} position={[-5, -1, -8]}>
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
          <boxGeometry args={[2, 3, 2]} />
          <meshPhysicalMaterial color="#111" metalness={0.8} roughness={0.3} />
        </mesh>
      </Float>

      {/* Distant Orbiting Sphere */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2} position={[-3, 4, -10]}>
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshPhysicalMaterial color="#1a1a1a" metalness={1} roughness={0.1} clearcoat={1} />
        </mesh>
      </Float>

      {/* Wide Accent Ring */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5} position={[0, -2, -12]}>
        <mesh rotation-x={Math.PI / 2.5} rotation-y={Math.PI / 8}>
          <torusGeometry args={[10, 0.02, 16, 100]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.8} metalness={1} />
        </mesh>
      </Float>

      {/* Background depth ring */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[2, 5, -15]}>
        <mesh rotation-x={Math.PI / 3}>
          <torusGeometry args={[15, 0.01, 16, 100]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} transparent opacity={0.3} />
        </mesh>
      </Float>

      <Environment preset="city" />
    </group>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.name },
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/dashboard");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden font-display bg-[#0a0a0a] selection:bg-red-500/30 selection:text-white pb-12 md:pb-0">

      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] via-[#0a0a0a]/80 to-[#0a0a0a] z-10 pointer-events-none" />
        <Canvas className="w-full h-full" dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <Suspense fallback={null}>
            <AbstractShapes />
          </Suspense>
        </Canvas>
      </div>

      {/* Glowing atmospheric layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <div className="relative z-50 px-6 py-6 w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-white/10 group-hover:scale-105 transition-transform duration-500">
            <span className="text-black font-black text-2xl">T</span>
          </div>
          <span className="text-3xl font-black tracking-tighter text-white uppercase">
            TRIBE
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-xs font-bold tracking-[0.15em] uppercase text-slate-400">
          <div className="relative group cursor-pointer h-full flex items-center">
            <span className="hover:text-white transition-colors py-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              About Platform
            </span>
            {/* Elegant Tooltip */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 mt-4 w-[360px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
              <div className="bg-[#111]/95 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#111]/95 border-t border-l border-white/5 rotate-45"></div>
                <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 text-slate-300">About TRIBE</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  TRIBE is a centralized digital ecosystem engineered to organize and elevate college communities. It unifies event tracking, club exploration, and campus interactions within an elite, high-performance web interface.
                </p>
              </div>
            </div>
          </div>
          <span className="hover:text-white transition-colors cursor-pointer py-2">Clubs</span>
          <span className="hover:text-white transition-colors cursor-pointer py-2">Features</span>
        </nav>

        <button
          onClick={() => setShowLoginModal(true)}
          className="px-8 py-3 text-xs font-bold tracking-widest uppercase bg-transparent text-white border border-white/20 hover:bg-white hover:text-black rounded-full transition-all"
        >
          Sign In
        </button>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-xl p-4">
          <div className="bg-[#111] border border-white/5 p-12 rounded-[40px] shadow-[0_0_80px_rgba(0,0,0,0.8)] w-full max-w-[440px] relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-8 right-8 size-10 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#333] text-slate-400 hover:text-white hover:border-white transition-all"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] mx-auto mb-8">
                <span className="text-black font-black text-3xl">T</span>
              </div>
              <h2 className="text-[32px] font-black tracking-tighter text-white mb-2 uppercase leading-none">Welcome Back</h2>
              <p className="text-slate-400 font-medium text-xs tracking-widest uppercase">Sign in to your account</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-600/10 border border-red-600/30 rounded-2xl px-6 py-3 text-red-400 text-xs font-medium">
                  {error}
                </div>
              )}

              <input
                required
                value={loginData.email}
                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Email Address"
                type="email"
                className="h-[60px] bg-[#0a0a0a] border border-[#222] rounded-2xl px-6 outline-none text-white text-sm placeholder:text-slate-600 focus:border-white transition-colors"
              />

              <input
                required
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Password"
                type="password"
                className="h-[60px] bg-[#0a0a0a] border border-[#222] rounded-2xl px-6 outline-none text-white text-sm placeholder:text-slate-600 focus:border-white transition-colors tracking-widest"
              />

              <button
                type="submit"
                disabled={loading}
                className="h-[60px] mt-4 bg-white text-black font-black tracking-[0.15em] text-xs uppercase rounded-2xl hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>


            </form>
          </div>
        </div>
      )}

      {/* MAIN HERO COMPOSITION */}
      <main className="flex-grow flex items-center justify-center relative z-10 w-full px-6">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.2fr,1fr] gap-16 lg:gap-24 items-center">

          {/* LEFT SIDE - HERO TEXT */}
          <div className="flex flex-col relative z-20">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase w-max mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              The Premier Campus Ecosystem
            </div>

            <h1 className="text-[100px] md:text-[140px] font-black leading-[0.85] tracking-tighter uppercase text-white mb-6 drop-shadow-2xl">
              <span className="text-white relative z-10 animate-pulse-glow">TRIBE</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed font-medium mb-12 border-l-2 border-red-600/50 pl-6 bg-gradient-to-r from-white/5 to-transparent py-2">
              Discover campus clubs, explore upcoming events, and unite with your community. The central hub for technical innovation, cultural expression, and athletic excellence.
            </p>

            <div className="flex flex-wrap gap-8 text-xs font-black tracking-[0.1em] uppercase text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-red-600/60"></span> Curated Communities
              </span>
              <span className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-red-600/60"></span> Global Calendar
              </span>
            </div>
          </div>

          {/* RIGHT SIDE - FLOATING FORM CARD */}
          <div className="w-full max-w-[480px] lg:justify-self-end relative z-20">
            {/* Depth shadow base */}
            <div className="absolute inset-0 bg-red-600/5 blur-[50px] rounded-full scale-110"></div>

            <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 p-10 md:p-12 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative z-10 hover:-translate-y-2 transition-transform duration-700 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="mb-10">
                <h2 className="text-[28px] font-black tracking-tighter uppercase text-white mb-2 leading-none">
                  Start Your Journey
                </h2>
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                  Create an account to join the network
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="bg-red-600/10 border border-red-600/30 rounded-2xl px-6 py-3 text-red-400 text-xs font-medium">
                    {error}
                  </div>
                )}

                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Full Name"
                  className="w-full h-[55px] bg-[#0a0a0a] border border-[#222] rounded-2xl px-6 outline-none text-white text-sm placeholder:text-slate-600 focus:border-white transition-all"
                />

                <input
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Email Address"
                  type="email"
                  className="w-full h-[55px] bg-[#0a0a0a] border border-[#222] rounded-2xl px-6 outline-none text-white text-sm placeholder:text-slate-600 focus:border-white transition-all"
                />

                <input
                  required
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Create Password"
                  type="password"
                  className="w-full h-[55px] bg-[#0a0a0a] border border-[#222] rounded-2xl px-6 outline-none text-white text-sm placeholder:text-slate-600 focus:border-white transition-all tracking-widest"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="h-[60px] mt-6 bg-white text-black font-black tracking-[0.15em] text-xs uppercase rounded-2xl hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>


              </form>

              <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold mt-8">
                By joining, you agree to our <span className="text-white hover:underline cursor-pointer">Terms & Privacy</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;