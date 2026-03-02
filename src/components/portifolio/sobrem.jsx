import React, { useState, useRef } from "react";
import "./sobrem.css";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import config from "../../assets/settings.png";
import { bringToFront } from "./modalZ";

const layers = [
  {
    id: "frontend",
    label: "Frontend Layer",
    sublabel: "Interface & Experience",
    color: "#0ea5e9", // Lighter blue for better contrast
    glow: "rgba(14,165,233,0.35)",
    skills: ["React", "HTML", "CSS", "JavaScript"],
    icon: "◈",
  },
  {
    id: "state",
    label: "Animation & State",
    sublabel: "Motion & Data Flow",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
    skills: ["UX/UI", "API", "Git"],
    icon: "⬡",
  },
  {
    id: "backend",
    label: "API & Backend Layer",
    sublabel: "Logic & Business Rules",
    color: "#34d399",
    glow: "rgba(52,211,153,0.35)",
    skills: ["Python", "C#", "Flask"],
    icon: "⬢",
  },
  {
    id: "mobile",
    label: "Mobile Layer",
    sublabel: "Cross-platform Native",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.35)",
    skills: ["Dart", "Flutter", "Kotlin", "Swift"],
    icon: "◉",
  },
  {
    id: "database",
    label: "Database Layer",
    sublabel: "Persistence & Storage",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.35)",
    skills: ["MySQL", "Supabase"],
    icon: "◎",
  },
];

const DataFlow = ({ fromColor, toColor, active }) => (
  <div
    style={{
      position: "relative",
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "visible",
    }}
  >
    {/* Track line */}
    <div
      style={{
        width: 2,
        height: "100%",
        background: `linear-gradient(to bottom, ${fromColor}44, ${toColor}44)`,
        borderRadius: 4,
        position: "absolute",
      }}
    />
    {/* Animated pulse */}
    <AnimatePresence>
      {active && (
        <motion.div
          key="pulse"
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${fromColor}, ${toColor})`,
            boxShadow: `0 0 16px ${fromColor}`,
            top: 0,
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 28, opacity: [1, 0.8, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
    {/* Arrow */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: 0,
        height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop: `7px solid ${toColor}88`,
      }}
    />
  </div>
);

const SkillBadge = ({ skill, color }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 600,
      color,
      border: `1px solid ${color}55`,
      background: `${color}10`,
      margin: "3px 2px",
      letterSpacing: "0.03em",
    }}
  >
    {skill}
  </motion.span>
);

const ArchLayer = ({ layer, index, isActive, onHover, flowActive }) => {
  return (
    <motion.div
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      style={{
        position: "relative",
        borderRadius: 14,
        padding: "18px 24px",
        background: isActive
          ? `linear-gradient(135deg, ${layer.color}18, ${layer.color}08)`
          : "rgba(0,0,0,0.03)",
        border: `1px solid ${isActive ? layer.color + "66" : "rgba(0,0,0,0.05)"}`,
        boxShadow: isActive
          ? `0 0 32px ${layer.glow}, inset 0 1px 0 ${layer.color}22`
          : `inset 0 1px 0 rgba(0,0,0,0.02)`,
        cursor: "pointer",
        transition: "all 0.3s ease",
        overflow: "visible",
      }}
    >
      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          background: `radial-gradient(circle at top left, ${layer.color}22, transparent 70%)`,
          borderRadius: "14px 0 0 0",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <motion.span
          animate={isActive ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1.5, ease: "linear", repeat: isActive ? Infinity : 0 }}
          style={{
            fontSize: 22,
            color: layer.color,
            display: "block",
            lineHeight: 1,
            filter: isActive ? `drop-shadow(0 0 8px ${layer.color})` : "none",
          }}
        >
          {layer.icon}
        </motion.span>
        <div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: isActive ? layer.color : "#334155",
              letterSpacing: "0.02em",
              transition: "color 0.3s",
            }}
          >
            {layer.label}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#64748b",
              marginTop: 1,
            }}
          >
            {layer.sublabel}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isActive ? layer.color : layer.color + "44",
              boxShadow: isActive ? `0 0 10px ${layer.color}` : "none",
              transition: "all 0.3s",
            }}
          />
        </div>
      </div>

      <div>
        {layer.skills.map((s) => (
          <SkillBadge key={s} skill={s} color={layer.color} />
        ))}
      </div>

      {/* Scanning line on active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="scan"
            initial={{ top: 0, opacity: 0.5 }}
            animate={{ top: "100%", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "linear", repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(to right, transparent, ${layer.color}88, transparent)`,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FloatingModal({ onClose, origin = { x: 0, y: 0 } }) {
  const modalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 400, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [closing, setClosing] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const handleFocus = () => {
    setZIndex(bringToFront());
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  React.useLayoutEffect(() => {
    const el = modalRef.current;
    if (!el || !origin) return;
    // hide modal initially
    el.style.opacity = "0";
    const timer = setTimeout(() => {
      el.style.opacity = "";
      el.style.setProperty("--tx", `0px`);
      el.style.setProperty("--ty", `0px`);
      const rect = el.getBoundingClientRect();
      const mx = rect.left + rect.width / 2;
      const my = rect.top + rect.height / 2;
      const dx = origin.x - mx;
      const dy = origin.y - my;
      el.style.setProperty("--tx", `${dx}px`);
      el.style.setProperty("--ty", `${dy}px`);
      el.classList.add("anim-enter-start");
      requestAnimationFrame(() => {
        el.classList.remove("anim-enter-start");
        el.classList.add("anim-in");
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [origin]);

  const handleRequestClose = () => {
    const el = modalRef.current;
    if (!el) return onClose();
    setClosing(true);
    // compute delta from modal center to viewport center
    const rect = el.getBoundingClientRect();
    const mx = rect.left + rect.width / 2;
    const my = rect.top + rect.height / 2;
    const cx = window.innerWidth / 2;
    // target vertically near the bottom center
    const cy = window.innerHeight * 0.88;
    const dx = cx - mx;
    const dy = cy - my;
    el.style.setProperty("--tx", `${dx}px`);
    el.style.setProperty("--ty", `${dy}px`);
    el.classList.remove("anim-in");
    el.classList.add("anim-out");
    el.addEventListener("transitionend", () => onClose(), { once: true });
  };

  const [activeLayer, setActiveLayer] = useState(null);
  const [flowTriggers, setFlowTriggers] = useState({});

  const handleHover = (index) => {
    setActiveLayer(index);
    if (index !== null) {
      // Trigger cascade flow downward
      layers.forEach((_, i) => {
        if (i >= index && i < layers.length - 1) {
          const delay = (i - index) * 300;
          setTimeout(() => {
            setFlowTriggers((prev) => ({ ...prev, [i]: Date.now() }));
          }, delay);
        }
      });
    }
  };

  return (
    <>
      {/* Include Google Fonts for the imported mapping */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
      `}</style>
      <div
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleFocus}
        className="floating-modal"
        style={{
          top: pos.y,
          left: pos.x,
          cursor: isDragging ? "grabbing" : "grab",
          zIndex: zIndex,
        }}
        id="flutuante"
      >
        <div className="modal-header" onMouseDown={handleMouseDown}>
          <img src={config} alt="Arquivos" className="arquivosimg1" />
          <p>Sobre mim</p>
          <div className="modos">
            <div className="mods1">
              <div className="minimizar"></div>
            </div>
            <div className="mods2">
              <div className="max"></div>
            </div>
            <div className="modsc" onClick={handleRequestClose}>
              {" "}
              <svg
                width="22px"
                height="22px"
                className="close"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g id="icomoon-ignore"></g>
                <path
                  d="M10.722 9.969l-0.754 0.754 5.278 5.278-5.253 5.253 0.754 0.754 5.253-5.253 5.253 5.253 0.754-0.754-5.253-5.253 5.278-5.278-0.754-0.754-5.278 5.278z"
                  fill="#000000"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="modal-content">
          <div className="me">
            <div>
              <h1>Henrique Santos</h1>
              <p>
                Sou um desenvolvedor Full Stack estudo na escola técnica do
                COTEMIG apaixonado por tecnologia e inteligência artificial. Busco
                sempre criar soluções eficientes e elegantes para problemas
                complexos. Sou comprometido, proativo e disposto a aprender e
                crescer junto à equipe.
              </p>
            </div>
            <div>
              <img src="" alt="" />
            </div>
          </div>
          <div className="habilidades" style={{ background: "#ffffff", padding: "40px 20px", borderRadius: "12px", position: "relative" }}>
            {/* Background grid */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
              `,
                backgroundSize: "40px 40px",
                pointerEvents: "none",
              }}
            />

            <div style={{ maxWidth: 520, margin: "0 auto", position: "relative" }}>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                style={{ textAlign: "center", marginBottom: 48 }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#0ea5e9",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {"// Mapa das minhas //"}
                </div>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(28px, 5vw, 42px)",
                    color: "#0f172a",
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Habilidades
                </h2>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                    marginTop: 8,
                  }}
                >
                  Passe o mouse sobre uma camada para rastrear o fluxo de dados.
                </p>
              </motion.div>

              {/* Layers */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {layers.map((layer, i) => (
                  <div key={layer.id}>
                    <ArchLayer
                      layer={layer}
                      index={i}
                      isActive={activeLayer === i}
                      onHover={handleHover}
                      flowActive={!!flowTriggers[i]}
                    />
                    {i < layers.length - 1 && (
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ width: 60 }}>
                          <DataFlow
                            fromColor={layer.color}
                            toColor={layers[i + 1].color}
                            active={
                              activeLayer !== null &&
                              activeLayer <= i &&
                              !!flowTriggers[i]
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer tag */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  textAlign: "center",
                  marginTop: 36,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#1e293b",
                  letterSpacing: "0.2em",
                }}
              >
                FULL-STACK · MOBILE · DATABASE
              </motion.div>
            </div>
          </div>

          <div className="exped">
            <div>
              <h1>Experiencias</h1>
              <p>Desenvolvedor Front End - Agencia K21 Digital </p>
            </div>
            <div>
              <h1>Educação</h1>
              <p>Ensino técnico em informática - Escola COTEMIG</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
