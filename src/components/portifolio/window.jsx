import React, { useState, useRef, useEffect } from "react";
import "./window.css";
import arquivosImg from "../../assets/arquivos.png";
import criptohivelogo from "../../assets/logo.png";
import aluraimg from "../../assets/alura.jpg";
import loginimg from "../../assets/login.png";
import users from "../../assets/users.png";
import { FaGithub, FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { bringToFront } from "./modalZ";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ── project data ─────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title: "CriptoHive",
    description:
      "Plataforma de rastreamento de criptomoedas em tempo real com gráficos interativos e alertas personalizados.",
    tags: ["React", "API", "Charts"],
    image: null,
    logo: "criptohive",
    color: "#0a1c3a",
    github: "https://github.com/henriquechr11",
    demo: "https://cripto-hive.vercel.app/",
  },
  {
    id: 2,
    title: "Alura Studies",
    description:
      "Aplicação de gerenciamento de estudos com cronômetro Pomodoro e controle de tarefas diárias.",
    tags: ["React", "TypeScript", "CSS"],
    image: null,
    logo: "alura",
    color: "#7e7f81",
    github: "https://github.com/henriquechr11",
    demo: "#",
  },
  {
    id: 3,
    title: "Login System",
    description:
      "Sistema de autenticação completo com registro, login e recuperação de senha com JWT.",
    tags: ["Node.js", "JWT", "MongoDB"],
    image: null,
    logo: "login",
    color: "#362056",
    github: "https://github.com/henriquechr11",
    demo: "#",
  },
  {
    id: 4,
    title: "User Manager",
    description:
      "Dashboard de gerenciamento de usuários com CRUD completo, filtros e paginação avançada.",
    tags: ["React", "Node.js", "SQL"],
    image: null,
    logo: "users",
    color: "#0f3d2e",
    github: "https://github.com/henriquechr11",
    demo: "#",
  },
];

const logoMap = {
  criptohive: criptohivelogo,
  alura: aluraimg,
  login: loginimg,
  users: users,
};

/* ── framer variants ──────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3 },
  }),
};

/* ── 3D tilt card wrapper ─────────────────────────────────── */
function TiltCard({ children, project }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetMouse = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="proj-card"
      variants={cardVariants}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        "--accent": project.color,
      }}
      whileHover={{ scale: 1.012 }}
    >
      {children}
    </motion.div>
  );
}

/* ── main component ───────────────────────────────────────── */
export default function FloatingModal({ onClose, origin = { x: 0, y: 0 } }) {
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const [closing, setClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -20]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

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

  // animation: compute delta from modal center to origin and run enter animation with 1s delay
  React.useLayoutEffect(() => {
    const el = modalRef.current;
    if (!el || !origin) return;
    // hide modal initially
    el.style.opacity = "0";
    const timer = setTimeout(() => {
      el.style.opacity = "";
      // ensure vars default
      el.style.setProperty("--tx", `0px`);
      el.style.setProperty("--ty", `0px`);
      // force layout so bounding rect is correct
      const rect = el.getBoundingClientRect();
      const mx = rect.left + rect.width / 2;
      const my = rect.top + rect.height / 2;
      const dx = origin.x - mx;
      const dy = origin.y - my;
      el.style.setProperty("--tx", `${dx}px`);
      el.style.setProperty("--ty", `${dy}px`);
      // start state
      el.classList.add("anim-enter-start");
      // animate next frame
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
    // trigger leave animation to center of viewport then call onClose after transition
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
    <>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');`}</style>

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
          <img src={arquivosImg} alt="Arquivos" className="arquivosimg1" />
          <p>Meus Projetos</p>
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
                xmlnsXlink="http://www.w3.org/1999/xlink"
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

        <div className="modal-content proj-page" ref={scrollRef}>
          {/* ── Hero header ─────────────────────────────────── */}
          <motion.div
            className="proj-hero"
            style={{
              padding: "25px 30px",
              alignItems: "flex-start",
            }}
          >
            <motion.div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "2.2rem",
                fontWeight: "800",
                color: "#1e293b",
                borderBottom: "3px solid transparent",
                borderImage: "linear-gradient(90deg, #0072ff, transparent) 1",
                display: "inline-block",
                paddingBottom: "8px",
                textShadow: "0 4px 15px rgba(0, 114, 255, 0.15)",
                letterSpacing: "1px",
              }}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              Meus Projetos
            </motion.div>
          </motion.div>

          {/* ── Project cards ───────────────────────────────── */}
          <motion.div
            className="proj-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((proj) => (
              <TiltCard key={proj.id} project={proj}>
                {/* Accent top bar */}
                <motion.div
                  className="proj-card-accent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Image Banner + shimmer */}
                <div className="proj-card-image-wrap">
                  <motion.div
                    className="proj-card-shimmer"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />
                  <img
                    src={logoMap[proj.logo]}
                    alt={proj.title}
                    className="proj-card-image"
                  />
                  <div className="proj-card-image-overlay" />
                </div>

                {/* Content */}
                <div className="proj-card-body">
                  <h3 className="proj-card-title">{proj.title}</h3>
                  <p className="proj-card-desc">{proj.description}</p>

                  {/* Tags */}
                  <div className="proj-card-tags">
                    {proj.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="proj-tag"
                        custom={i}
                        variants={tagVariants}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="proj-card-actions">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-btn proj-btn-github"
                  >
                    <FaGithub /> Code
                  </a>
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-btn proj-btn-demo"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                </div>

                {/* Hover glow */}
                <div className="proj-card-glow" />
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </div >
    </>
  );
}
