import React, { useState, useRef } from "react";
import "./sobrem.css";
import config from "../../assets/settings.png";
import { bringToFront } from "./modalZ";

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
        <div className="habilidades">
          <h1>Habilidades</h1>
          <div className="hab">
            <div className="habm">
              <div>Python</div>
              <div>HTML</div>
              <div>CSS</div>
              <div>Java SCRIPT</div>
            </div>
            <div className="habm">
              <div>React</div>
              <div>C#</div>
              <div>MySql</div>
              <div>Git</div>
              <div>API</div>
            </div>
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
  );
}
