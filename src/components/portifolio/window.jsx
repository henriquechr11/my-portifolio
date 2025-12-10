import React, { useState, useRef } from "react";
import "./window.css";
import arquivosImg from "../../assets/arquivos.png";
import criptohivelogo from "../../assets/logo.png";
import aluraimg from "../../assets/alura.jpg";
import loginimg from "../../assets/login.png";
import users from "../../assets/users.png";
import { FaGithub, FaPlay } from "react-icons/fa";
import { bringToFront } from "./modalZ";

export default function FloatingModal({ onClose, origin = { x: 0, y: 0 } }) {
  const modalRef = useRef(null);
  const [closing, setClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
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

  // animation: compute delta from modal center to origin and run enter animation
  React.useLayoutEffect(() => {
    const el = modalRef.current;
    if (!el || !origin) return;
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
    return () => {};
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
        <div className="criptohive" id="cripto">
          <div className="c1">
            <img className="clogo" src={criptohivelogo} alt="" />
          </div>
          <div className="c2">
            <div className="ctext">
              <h1>Cripto Hive</h1>
              <p>
                Site que acompanha em tempo real os preços das principais
                criptomoedas e sua volatilidade no mercado. Utiliza a API
                Coingecko Phyton e Flask
              </p>
            </div>
            <div className="cbtn">
              <a
                href="https://github.com/henriquechr11/Cripto-Hive"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <div className="btngit">
                  <FaGithub className="githubimg2" />
                  <p>GitHub</p>
                </div>
              </a>
              <a
                href="https://cripto-hive.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <div className="btngit">
                  <FaPlay className="githubimg2" />
                  <p>Demo</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* 2 projeto---------------------------------------------------------------------------------------*/}
        <div className="criptohive" id="alura">
          <div className="c1">
            <img className="alogo" src={aluraimg} alt="" />
          </div>
          <div className="c2">
            <div className="ctext">
              <h1>Jobs Graphics</h1>
              <p>
                Site com gráficos interativos e filtros para análise de dados do
                mercado de trabalho em TI. Visualize tendências, salários e
                áreas mais requisitadas de forma rápida. Utiliza Phyton e
                Streamlit
              </p>
            </div>
            <div className="cbtn">
              <a
                href="https://github.com/henriquechr11/Jobs_graphics"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <div className="btngit">
                  <FaGithub className="githubimg2" />
                  <p>GitHub</p>
                </div>
              </a>
              <a
                href="https://imersao-alura-python-henrique.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <div className="btngit">
                  <FaPlay className="githubimg2" />
                  <p>Demo</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* 3 projeto---------------------------------------------------------------------------------------*/}
        <div className="criptohive" id="login">
          <div className="c1">
            <img className="alogo" src={loginimg} alt="" />
          </div>
          <div className="c2">
            <div className="ctext">
              <h1>Login Page</h1>
              <p>
                Site simples de login A interface é objetiva, com campos de
                email e senha para autenticação imediata. Meus primeiros passos
                com React.
              </p>
            </div>
            <div className="cbtn">
              <a
                href="https://github.com/henriquechr11/login-page"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <div className="btngit">
                  <FaGithub className="githubimg2" />
                  <p>GitHub</p>
                </div>
              </a>
              <a
                href="https://login-page-iota-seven.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <div className="btngit">
                  <FaPlay className="githubimg2" />
                  <p>Demo</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* 4 projeto---------------------------------------------------------------------------------------*/}
        <div className="criptohive" id="appes">
          <div className="c1">
            <img className="alogo" src={users} alt="" />
          </div>
          <div className="c2">
            <div className="ctext">
              <h1>student storage</h1>
              <p>
                Programa de armazenamento de dados de alunos. Permite aos
                usuários salvar, editar e excluir informações de forma
                organizada. Utiliza C# e MySql
              </p>
            </div>
            <div className="cbtn">
              <a
                href="https://github.com/henriquechr11/projeto-app-escola"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <div className="btngit">
                  <FaGithub className="githubimg2" />
                  <p>GitHub</p>
                </div>
              </a>
              <a
                href="https://login-page-iota-seven.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              ></a>
            </div>
          </div>
        </div>
        {/* 5 projeto---------------------------------------------------------------------------------------*/}
        {/* <div className="criptohive" id="login">
          <div className="c1">
            <img className="alogo" src={loginimg} alt="" />
          </div>
          <div className="c2">
            <div className="ctext">
              <h1>Login Page</h1>
              <p>
                Site simples de login A interface é objetiva, com campos de
                email e senha para autenticação imediata. Meus primeiros passos
                com React.
              </p>
            </div>
            <div className="cbtn">
              <a
                href="https://github.com/henriquechr11/login-page"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <div className="btngit">
                  <FaGithub className="githubimg2" />
                  <p>GitHub</p>
                </div>
              </a>
              <a
                href="https://login-page-iota-seven.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <div className="btngit">
                  <FaPlay className="githubimg2" />
                  <p>Demo</p>
                </div>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
