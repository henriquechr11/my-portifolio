import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import "./certificados.css";
import chromeImg from "../../assets/chrome.png";
import ccisco from "../../assets/cisco.png";
import calura from "../../assets/python.png";
import castro from "../../assets/castro.jpg";
import cbest from "../../assets/thebest.jpg";
import c19 from "../../assets/canguru19.jpg";
import c22 from "../../assets/canguru22.jpg";
import { bringToFront } from "./modalZ";

const certificates = [
  { id: 1, title: "2024 - Certificado Cotemig The Best of The class 2º etapa", img: cbest, rotate: true },
  { id: 2, title: "2022 - Medalha Bronze Olimpíadas de Matemática Canguru", img: c22, rotate: false },
  { id: 3, title: "2019 - Medalha Bronze Olimpíadas de Matemática Canguru", img: c19, rotate: false },
  { id: 4, title: "2025 - Certificado ALURA imersão dados com python", img: calura, rotate: false },
  { id: 5, title: "2022 - Certificado Olimpíada Brasileira de Astronomia e Astronáutica", img: castro, rotate: true },
  { id: 6, title: "2025 - Certificado CISCO fundamentos do hardware do computador", img: ccisco, rotate: false },
];

const CertificatesGallery = () => {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-10, 10]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
  };

  const [selectedCert, setSelectedCert] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        backgroundColor: "#f8f9fa", color: "#1a1a1a",
        position: "relative", overflow: "hidden",
        boxSizing: "border-box", borderRadius: "0 0 10px 10px"
      }}
      onMouseMove={handleMouseMove}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
          .cert-gallery-wrapper { font-family: 'Outfit', sans-serif; height: 100%; display: flex; flex-direction: column; padding: 25px 30px; box-sizing: border-box; background: radial-gradient(circle at top right, rgba(0, 114, 255, 0.08), transparent 50%), radial-gradient(circle at bottom left, #ffffff, #f8f9fa); }
          .cert-scroll-container::-webkit-scrollbar { height: 6px; }
          .cert-scroll-container::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 10px; }
          .cert-scroll-container::-webkit-scrollbar-thumb { background: rgba(0, 114, 255, 0.4); border-radius: 10px; }
          .cert-scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(0, 114, 255, 0.7); }
        `}
      </style>

      {mounted && (
        <div className="cert-gallery-wrapper">
          <motion.div
            style={{
              fontSize: "2.2rem", fontWeight: "800", marginBottom: "15px",
              color: "#1e293b", borderBottom: "3px solid transparent",
              borderImage: "linear-gradient(90deg, #0072ff, transparent) 1",
              display: "inline-block", paddingBottom: "8px", alignSelf: "flex-start",
              textShadow: "0 4px 15px rgba(0, 114, 255, 0.15)",
              letterSpacing: "1px"
            }}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            Meus Certificados
          </motion.div>

          <motion.div
            ref={containerRef}
            className="cert-scroll-container"
            style={{
              display: "flex", gap: "25px", overflowX: "auto", overflowY: "hidden",
              padding: "15px 10px 25px 10px", flexGrow: 1, alignItems: "center", perspective: "1200px"
            }}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCert(cert)}
                style={{
                  minWidth: "250px", height: "300px",
                  backgroundColor: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "space-between", padding: "18px",
                  cursor: "pointer", flexShrink: 0,
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.05)",
                  transition: "border-color 0.4s ease, box-shadow 0.4s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 114, 255, 0.3)";
                  e.currentTarget.style.boxShadow = "0px 15px 35px rgba(0, 114, 255, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                  e.currentTarget.style.boxShadow = "0px 10px 25px rgba(0,0,0,0.05)";
                }}
              >
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", background: "#f1f5f9", borderRadius: "12px", padding: "10px" }}>
                  <img
                    src={cert.img}
                    alt={cert.title}
                    style={{
                      maxWidth: "100%", maxHeight: "140px",
                      objectFit: "contain",
                      transform: cert.rotate ? "rotate(-90deg)" : "none",
                      filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.08))"
                    }}
                  />
                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "12px" }}>
                  <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)", width: "80%", margin: "0 0 10px 0" }}></div>
                  <p style={{
                    textAlign: "center", fontSize: "0.85rem", fontWeight: "600",
                    color: "#334155", lineHeight: "1.3", margin: 0
                  }}>
                    {cert.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ height: "4px", background: "rgba(0,0,0,0.05)", width: "100%", marginTop: "10px", borderRadius: "2px", position: "relative" }}>
            <motion.div style={{ position: "absolute", top: 0, left: 0, bottom: 0, background: "linear-gradient(90deg, #0072ff, #00c6ff)", transformOrigin: "0%", scaleX, width: "100%", borderRadius: "2px" }} />
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 100, backdropFilter: "blur(12px)"
            }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              style={{
                padding: "35px", background: "#ffffff",
                borderRadius: "24px", boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                maxWidth: "90%", maxHeight: "90%", display: "flex",
                flexDirection: "column", alignItems: "center",
                border: "1px solid rgba(0,0,0,0.05)",
                overflowY: "auto"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", background: "#f8f9fa", padding: "15px", borderRadius: "16px", boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02)" }}>
                <img
                  src={selectedCert.img}
                  alt={selectedCert.title}
                  style={{
                    maxWidth: "100%", maxHeight: "45vh", objectFit: "contain",
                    transform: selectedCert.rotate ? "rotate(-90deg)" : "none",
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))"
                  }}
                />
              </div>
              <h3 style={{ color: "#0f172a", textAlign: "center", marginTop: "25px", marginBottom: "25px", fontSize: "1.3rem", fontWeight: "700", maxWidth: "500px", lineHeight: "1.4" }}>
                {selectedCert.title}
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCert(null)}
                style={{
                  padding: "12px 40px", borderRadius: "30px",
                  border: "none", backgroundColor: "#1e293b", color: "#ffffff",
                  fontWeight: "600", fontSize: "1rem", cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0072ff";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 114, 255, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1e293b";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                }}
              >
                Fechar
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FloatingModal({ onClose, origin = { x: 0, y: 0 } }) {
  const modalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 700, y: 100 });
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
    // target vertically near the bottom center (meio da parte inferior)
    const cy = window.innerHeight * 0.88;
    const dx = cx - mx;
    const dy = cy - my;
    el.style.setProperty("--tx", `${dx}px`);
    el.style.setProperty("--ty", `${dy}px`);
    el.classList.remove("anim-in");
    el.classList.add("anim-out");
    el.addEventListener("transitionend", () => onClose(), { once: true });
  };

  return (
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
        <img src={chromeImg} alt="Arquivos" className="arquivosimg1" />
        <p>Certificados</p>
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

      <div className="modal-content" style={{ padding: 0 }}>
        <CertificatesGallery />
      </div>
    </div>
  );
}
