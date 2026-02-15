import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import MahaShivaratriWebsite from "./MahaShivaratriWebsite";

export default function App() {
  const mountRef = useRef(null);
  const audioRef = useRef(null);

  /* =========================
     SAFE COUNTDOWN STATE
  ========================== */
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function getNextShivaratri() {
    const today = new Date();
    const year = today.getFullYear();

    const shivaratri2026 = new Date("2026-02-15T00:00:00");
    const shivaratri2027 = new Date("2027-03-06T00:00:00");

    if (today < shivaratri2026) return shivaratri2026;
    if (today < shivaratri2027) return shivaratri2027;

    return new Date(`${year + 1}-02-20T00:00:00`);
  }

  const [selectedTemple, setSelectedTemple] = useState(null);

  /* =========================
     AUDIO (Starts After First Click)
  ========================== */
  useEffect(() => {
  const audio = new Audio("/audio/shiv-web-audio.mp3");
  audio.loop = true;
  audio.volume = 0.8;
  audioRef.current = audio;

  const startAudio = () => {
    audio.play().catch(() => {}); // Start after first click
    window.removeEventListener("click", startAudio);
  };

  window.addEventListener("click", startAudio);

  return () => {
    window.removeEventListener("click", startAudio);
    audio.pause();
    audio.currentTime = 0;
  };
}, []);


  /* =========================
     SAFE THREE.JS BACKGROUND
  ========================== */
  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 4;

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  /* =========================
     WORKING COUNTDOWN TIMER
  ========================== */
  useEffect(() => {
    const targetDate = getNextShivaratri().getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* =========================
     12 JYOTIRLINGAS DATA
  ========================== */
  const jyotirlingas = [
    { name: "Somnath", location: "Gujarat", img: "/images/Somanth_Temple.png", details: "First Jyotirlinga of India." },
    { name: "Mallikarjuna", location: "Andhra Pradesh", img: "/images/Mallikarjuna_Swamy.png", details: "Sacred shrine of Shiva & Parvati." },
    { name: "Mahakaleshwar", location: "Ujjain", img: "/images/Mahakaleshwar_jyotirlinga.png", details: "South-facing Jyotirlinga." },
    { name: "Omkareshwar", location: "Madhya Pradesh", img: "/images/Omkareshwar_Temple.png", details: "Located on Om-shaped island." },
    { name: "Kedarnath", location: "Uttarakhand", img: "/images/Kedarnath_Temple.png", details: "Himalayan holy temple." },
    { name: "Bhimashankar", location: "Maharashtra", img: "/images/Bhimashankar_Temple.png", details: "Origin of Bhima River." },
    { name: "Kashi Vishwanath", location: "Varanasi", img: "/images/Kashi_Vishwanath_temple.png", details: "Sacred temple of Varanasi." },
    { name: "Trimbakeshwar", location: "Maharashtra", img: "/images/Trimbakeshwar_Temple.png", details: "Origin of Godavari River." },
    { name: "Vaidyanath", location: "Jharkhand", img: "/images/baidyanath_dham.png", details: "Divine healer form." },
    { name: "Nageshwar", location: "Gujarat", img: "/images/Nageshwar_Jyotirlinga.png", details: "Symbol of protection." },
    { name: "Ramanathaswamy", location: "Tamil Nadu", img: "/images/Ramanathaswamy_Temple.png", details: "Established by Lord Rama." },
    { name: "Grishneshwar", location: "Maharashtra", img: "/images/Grishneshwar_Temple.png", details: "Last Jyotirlinga mentioned." },
  ];

  return (
    <div className="relative text-white font-sans">

      <div ref={mountRef} className="fixed inset-0 -z-10 bg-black" />

      <MahaShivaratriWebsite />

      {/* COUNTDOWN */}
      <section className="py-20 text-center bg-black/80 backdrop-blur-md">
        <h2 className="text-4xl font-bold text-indigo-400 mb-10">
          ⏳ Countdown to Maha Shivaratri
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="bg-slate-900 px-8 py-6 rounded-2xl shadow-lg hover:scale-110 transition duration-300"
            >
              <p className="text-3xl font-bold text-white">
                {timeLeft[unit]}
              </p>
              <span className="text-sm text-gray-400 uppercase">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      {/* VIDEO SECTION */}
<section className="py-20 px-6 bg-black">
  <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">
    Sacred Maha Shivaratri Video
  </h2>

  <div className="mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700 hover:shadow-purple-500/40 transition duration-500"
       style={{ width: "800px", height: "450px" }}> {/* Fixed Size */}
    <video
      src="/video/शिवनवरात्रि महा शिवरात्रि महोत्सव 2026 पंचम दिवस 🚩___ujjain _mahakal _mahakaa(.mp4"
      controls
      autoPlay
      loop
      muted={false} // Will play with sound after first user click
      className="w-full h-full object-cover"
    />
  </div>
</section>


      {/* JYOTIRLING CARDS */}
      <section className="py-24 px-6 bg-black/90">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-16">
          12 Sacred Jyotirlingas
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {jyotirlingas.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedTemple(item)}
              className="cursor-pointer bg-slate-800 rounded-2xl overflow-hidden shadow-xl 
              hover:shadow-purple-500/50 hover:scale-105 transition duration-500"
            >
              <img src={item.img} alt={item.name} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-indigo-400">{item.name}</h3>
                <p className="text-sm text-purple-300">📍 {item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedTemple && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl max-w-md text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">
              {selectedTemple.name}
            </h3>
            <p className="text-purple-300 mb-4">{selectedTemple.location}</p>
            <p className="text-gray-300 mb-6">{selectedTemple.details}</p>

            <button
              onClick={() => setSelectedTemple(null)}
              className="bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="py-10 text-center bg-black border-t border-slate-800">
        <p className="text-gray-500">
          © 2026 Maha Shivaratri Celebration | Designed with Devotion 🕉️
        </p>
      </footer>
    </div>
  );
}
