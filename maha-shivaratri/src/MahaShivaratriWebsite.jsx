import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Moon, Sparkles } from "lucide-react";

export default function MahaShivaratriWebsite() {
  const moreRef = useRef(null);

  const handleLearnMore = () => {
    moreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-white">

      {/* ================= BACKGROUND VIDEO ================= */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          src="/video/Aerial view of Lingraj Temple.mp4" // ✅ Make sure this path is correct
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50"></div> {/* optional overlay to darken video */}
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <Moon className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />

          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Maha Shivaratri 2026
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            The Divine Night of Lord Shiva — a sacred celebration of devotion,
            meditation, fasting, and spiritual awakening.
          </p>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Click anywhere to listen to music
          </p>

          <button
            onClick={handleLearnMore}
            className="rounded-2xl px-8 py-3 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition duration-300 shadow-lg"
          >
            Learn More
          </button>
        </motion.div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section
        ref={moreRef}
        className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-indigo-400">
            About Maha Shivaratri
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Maha Shivaratri is one of the most sacred Hindu festivals dedicated
            to Lord Shiva. Devotees observe fasting, meditate, chant sacred
            mantras like "Om Namah Shivaya", and stay awake throughout the night.
          </p>

          <p className="text-gray-400 leading-relaxed">
            It represents the victory over darkness and ignorance in life.
            Spiritually, this night is considered powerful for self-reflection,
            inner awakening, and divine connection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-800/70 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-700 p-8"
        >
          <h3 className="text-2xl font-semibold text-purple-400 mb-6">
            Spiritual Significance
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>✨ Overcoming darkness and ignorance</li>
            <li>✨ Awakening inner consciousness</li>
            <li>✨ Devotion and surrender to Lord Shiva</li>
            <li>✨ Inner peace and self-realization</li>
          </ul>
        </motion.div>
      </section>

      {/* ================= CELEBRATION HIGHLIGHTS ================= */}
      <section className="py-24 px-6 bg-gradient-to-r from-slate-900 via-black to-slate-900">
        <h2 className="text-4xl font-bold text-center text-indigo-400 mb-16">
          Celebration Highlights
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            "Night-long Vigil",
            "Sacred Chanting",
            "Temple Decorations",
            "Rudra Abhishek",
            "Meditation & Yoga",
            "Bhajan & Kirtan"
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-slate-800/70 backdrop-blur-xl shadow-xl border border-slate-700 text-center transition duration-300"
            >
              <Sparkles className="mx-auto mb-4 text-purple-400" />
              <h3 className="text-2xl font-semibold mb-4">{item}</h3>
              <p className="text-gray-400">
                Experience divine bliss and spiritual transformation on this sacred night.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
