import "./portifolio.css";
import { FaSearch, FaGithub } from "react-icons/fa";
import windowsImg from "../../assets/windows.webp";
import arquivosImg from "../../assets/arquivos.png";
import chromeImg from "../../assets/chrome.png";
import config from "../../assets/settings.png";
import { useRef, useState } from "react";
import FloatingModal from "../portifolio/window";
import FloatingModal2 from "../portifolio/sobrem";
import FloatingModal3 from "../portifolio/certificados";

const Portifolio = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [showWindow1, setShowWindow1] = useState(false);
  const [showWindow2, setShowWindow2] = useState(false);
  const [origin1, setOrigin1] = useState({ x: 0, y: 0 });
  const [origin2, setOrigin2] = useState({ x: 0, y: 0 });
  const [origin3, setOrigin3] = useState({ x: 0, y: 0 });

  // modal funcionality
  const hoverTimer = useRef(null);

  function abrirModal(id) {
    document.getElementById(id).style.display = "block";
    modal.classList.add("mostrar");
  }

  function fecharModal(id) {
    document.getElementById(id).style.display = "none";
    modal.classList.remove("mostrar");
  }

  function handleMouseEnter(id) {
    hoverTimer.current = setTimeout(() => {
      abrirModal(id);
    }, 500);
  }

  function handleMouseLeave(id) {
    clearTimeout(hoverTimer.current);
    setTimeout(() => {
      fecharModal(id);
    }, 300);
  }

  return (
    <div className="container">
      <div className="main"></div>

      <div className="bar">
        <div className="midle">
          <div className="divw" id="win">
            <img src={windowsImg} alt="Windows" className="winimg" />
          </div>
          <FaSearch className="icon-search" />
          <input type="text" placeholder="Pesquisar" className="inppes" />
          <div
            className="divw"
            onMouseEnter={() => handleMouseEnter("marquivos")}
            onMouseLeave={() => handleMouseLeave("marquivos")}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setOrigin1({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
              setShowWindow(true);
            }}
          >
            <img src={arquivosImg} alt="Arquivos" className="arquivosimg" />
          </div>

          {showWindow && (
            <FloatingModal
              origin={origin1}
              onClose={() => setShowWindow(false)}
            />
          )}

          <div
            className="divw"
            onMouseEnter={() => handleMouseEnter("msobre")}
            onMouseLeave={() => handleMouseLeave("msobre")}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setOrigin2({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
              setShowWindow1(true);
            }}
          >
            <img src={config} alt="Chrome" className="set" />
          </div>

          {showWindow1 && (
            <FloatingModal2
              origin={origin2}
              onClose={() => setShowWindow1(false)}
            />
          )}

          <div
            className="divw"
            onMouseEnter={() => handleMouseEnter("cer")}
            onMouseLeave={() => handleMouseLeave("cer")}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setOrigin3({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
              setShowWindow2(true);
            }}
          >
            <img src={chromeImg} alt="Chrome" className="chromeimg" />
          </div>

          {showWindow2 && (
            <FloatingModal3
              origin={origin3}
              onClose={() => setShowWindow2(false)}
            />
          )}

          <a
            href="https://github.com/henriquechr11"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="divw"
              onMouseEnter={() => handleMouseEnter("mgithub")}
              onMouseLeave={() => handleMouseLeave("mgithub")}
            >
              <FaGithub className="githubimg" />
            </div>
          </a>
          <div className="marquivos" id="marquivos">
            <p>Projetos</p>
          </div>
          <div className="msobre" id="msobre">
            <p>Sobre mim</p>
          </div>
          <div className="mgithub" id="mgithub">
            <p>Github</p>
          </div>
          <div className="cer" id="cer">
            <p>Certificados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portifolio;
