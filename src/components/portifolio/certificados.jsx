import React, { useState, useRef } from "react";
import "./certificados.css";
import chromeImg from "../../assets/chrome.png";
import ccisco from "../../assets/cisco.png";
import calura from "../../assets/python.png";
import castro from "../../assets/castro.jpg";
import cbest from "../../assets/thebest.jpg";
import c19 from "../../assets/canguru19.jpg";
import c22 from "../../assets/canguru22.jpg";
import { bringToFront } from "./modalZ";

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

      <div className="modal-content">
        <h1>Certificados</h1>

        <div className="certificados">
          <div>
            <img className="imgcer1" id="rotate" src={cbest} alt="" />
            <p className="txte">
              2024-Certificado Cotemig The Best of The class 2º etapa
            </p>
          </div>

          <div>
            <img className="imgcer" src={c22} alt="" />
            <p>2022- Medalha Bronze olimpíadas de Matemática Canguru </p>
          </div>

          <div>
            <img className="imgcer" src={c19} alt="" />
            <p>2019- Medalha Bronze olimpíadas de Matemática Canguru</p>
          </div>

          <div>
            <img className="imgcer" src={calura} alt="" />
            <p>2025-Certificado ALURA imersão dados com python</p>
          </div>

          <div>
            <img id="rotate" className="imgcer1" src={castro} alt="" />
            <p className="txte">
              2022- certificado olimpíada Brasileira de Astronomia e
              Astronáutica
            </p>
          </div>

          <div>
            <img className="imgcer" src={ccisco} alt="" />
            <p>2025-Certificado CISCO fundamentos do hardware do computador</p>
          </div>
        </div>
      </div>
    </div>
  );
}
