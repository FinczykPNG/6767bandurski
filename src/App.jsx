import React, { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion'; 
import './index.css';

// UWAGA: Bezpośrednie odtwarzanie z TikTok jest blokowane. 
// Używamy zastępczego, działającego linku MP3.
const CHAOS_SOUND_SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"; 

const MEME_SRC = "/public/67.gif"; 

// --- WARIANTY ANIMACJI ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// --- KOMPONENT LICZNIKA (COUNTER) ---
function Counter({ from, to, label }) {
    const nodeRef = useRef();

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(from, to, {
            duration: 1.5,
            onUpdate: (value) => {
                node.textContent = Math.round(value);
            }
        });

        return () => controls.stop();
    }, [from, to]);

    return (
        <motion.div 
            className="card" 
            whileHover={{ scale: 1.05 }} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
        >
            <div className="counter-display" ref={nodeRef}>
                {from}
            </div>
            <p>{label}</p>
        </motion.div>
    );
}

// --- GŁÓWNY KOMPONENT: App ---
function App() {
  const [isChaos, setIsChaos] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const audioRef = useRef(null); 

  useEffect(() => {
    let interval;
    
    if (isChaos) {
      setShowDisclaimer(true);
      document.body.classList.add('chaos-background');
      
      // WŁĄCZANIE DŹWIĘKU
      if (audioRef.current) {
          audioRef.current.volume = 0.4; 
          audioRef.current.play().catch(e => console.warn("Przeglądarka zablokowała autoplay."));
      }

      interval = setInterval(() => {
        document.title = document.title === "67 67 67 !!!" ? "HEJ HEJ HEJ" : "67 67 67 !!!";
      }, 100);
    } else {
      document.body.classList.remove('chaos-background');
      document.title = "Wektor.67 - Przyszłość jest liczbą";
      
      // ZATRZYMYWANIE DŹWIĘKU
      if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0; 
      }
    }
    return () => clearInterval(interval);
  }, [isChaos]);

  const triggerChaos = () => {
    setIsChaos(true);
  };
  
  const stopChaos = () => {
    setIsChaos(false);
    setShowDisclaimer(false);
    document.title = "Wektor.67 - Przyszłość jest liczbą";
  };

  // --- WIDOK CHAOSU ---
  if (isChaos) {
    return (
      <div className="chaos-mode">
        {/* ELEMENT AUDIO: Zapętla dźwięk w tle */}
        <audio 
           ref={audioRef} 
           src={CHAOS_SOUND_SRC} 
           loop 
           preload="auto" 
        />

        {showDisclaimer && (
          <div className="disclaimer-overlay">
            ⚠️ OSTRZEŻENIE: KOLEGA ZACZYNA PŁAKAĆ! 😭😭😭 ⚠️
          </div>
        )}
        <h1 className="chaos-text" style={{ color: 'yellow' }}>67 67 67!</h1>
        <img src={MEME_SRC} alt="Meme 67" className="meme-gif" />
        <h1 className="chaos-text" style={{ color: 'red' }}>HEJ! HEJ!</h1>
        
        {/* Przycisk, który lata i jest mały */}
        <button onClick={stopChaos} className="btn-stop-chaos">
          Zatrzymaj to szaleństwo
        </button>
        
      </div>
    );
  }

  // --- WIDOK PROFESJONALNY (DARK MODE) ---
  return (
    <motion.div 
        className="prof-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.header className="header" variants={itemVariants}>
            <motion.div className="logo" variants={itemVariants}>
                Wektor.67
            </motion.div>
            
            <nav className="nav">
                <motion.a href="#omnie" variants={itemVariants}>O nas</motion.a>
                <motion.a href="#uslugi" variants={itemVariants}>Usługi</motion.a>
                <motion.a href="#kariera" variants={itemVariants}>Kariera</motion.a>
                <motion.a href="#kontakt" variants={itemVariants}>Kontakt</motion.a>
            </nav>
            {/* PRZYCISK HEJ! */}
            <motion.button 
                id="secret-btn" 
                className="secret-btn" 
                onClick={triggerChaos}
                variants={itemVariants}
            >
                HEJ!
            </motion.button>
        </motion.header>

        <motion.div className="main-content">
            <motion.div className="hero" variants={containerVariants}>
                <motion.h1 variants={itemVariants}>
                    Przyszłość jest <br />
                    liczbą. **67.**
                </motion.h1>
                <motion.p variants={itemVariants}>
                    Dostarczamy ultra-precyzyjne rozwiązania analityczne, które redefiniują skuteczność operacyjną. Nasza metodologia optymalizacji zwiększa Twoje zyski o co najmniej 67%.
                </motion.p>
                <motion.button className="cta-btn" variants={itemVariants}>
                    Zacznij Transformację
                </motion.button>
            </motion.div>

            <motion.div className="separator" style={{ height: '3px', background: '#333', margin: '40px 0' }} variants={itemVariants} />

            {/* SEKCJA Z ANIMOWANYMI LICZNIKAMI */}
            <motion.div className="cards-section" variants={containerVariants}>
                <Counter from={0} to={67} label="Lat doświadczenia (mentalnie)" />
                <Counter from={0} to={1987} label="Wektor Analizy Danych (Rok)" />
                <Counter from={0} to={99} label="% Satysfakcji Klienta" />
            </motion.div>
        </motion.div>

    </motion.div>
  );
}

export default App;