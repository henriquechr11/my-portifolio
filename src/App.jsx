import { useState } from "react";
import Portifolio from "./components/portifolio/portifolio";
import "./App.css";

function App() {
  const [showFsPrompt, setShowFsPrompt] = useState(true);

  const enterFullscreen = async () => {
    const el = document.documentElement;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
    } catch (err) {
      console.warn("Fullscreen request failed:", err);
    } finally {
      setShowFsPrompt(false);
    }
  };

  const skipFullscreen = () => {
    setShowFsPrompt(false);
  };

  return (
    <div className="app">
      {showFsPrompt && (
        <div
          className="fs-overlay"
          role="dialog"
          aria-label="Entrar em tela cheia"
        >
          <div className="fs-box">
            <p>Deseja visualizar o site em tela cheia Para mais Imersão? </p>
            <div className="fs-actions">
              <button className="fs-btn" onClick={enterFullscreen}>
                Entrar em tela cheia
              </button>
              <button className="fs-btn fs-skip" onClick={skipFullscreen}>
                Continuar sem
              </button>
            </div>
          </div>
        </div>
      )}

      <Portifolio />
    </div>
  );
}

export default App;
