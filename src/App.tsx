"use client";
import { useState } from "react";
import "./App.css";

export default function Page() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const yesScale = Math.min(1 + noCount * 0.45, 18);
  const noShiftX = Math.min(noCount * 18, 260);
  const noShiftY = Math.min(noCount * 8, 120);

  const baseUrl = import.meta.env.BASE_URL;
  const assetBase = `${window.location.origin}${baseUrl}`;
  const galleryPhotos = [
    { id: "1", src: new URL("el1.jpg", assetBase).toString(), alt: "" },
    { id: "2", src: new URL("el2.jpg", assetBase).toString(), alt: "" },
    { id: "3", src: new URL("el3.jpg", assetBase).toString(), alt: "" },
    { id: "4", src: new URL("el4.jpg", assetBase).toString(), alt: "" },
    { id: "5", src: new URL("el5.jpg", assetBase).toString(), alt: "" },
    { id: "6", src: new URL("el6.jpg", assetBase).toString(), alt: "" },
  ];

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Wait...",
      "Are you sure?",
      "Think again...",
      "The sunset fades...",
      "Please reconsider",
      "Don't break my heart",
      "One more chance?",
      "The stars are waiting",
      "But... but...",
      "My heart...",
      "Please say yes",
      "I'm counting on you",
      "Don't leave me",
      "The moon is sad now",
      "Forever waiting...",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="react-app">
      <div className="scene">
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="bg-dots" />
        <div className="floaters" aria-hidden>
          <span className="floater one" />
          <span className="floater two" />
          <span className="floater three" />
        </div>

        {yesPressed ? (
          showGallery ? (
            <div className="card gallery-card">
              <div className="badge">Our Journey</div>
              <h1 className="title">Moments with you</h1>
              <p className="subtitle">Every sunset is better with you</p>
              <div className="gallery-grid">
                {galleryPhotos.map((photo) => (
                  <div className="gallery-item" key={photo.id}>
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn next"
                style={{ marginTop: '24px' }}
                onClick={() => {
                  window.location.href = baseUrl;
                }}
              >
                ← Back to the sunset
              </button>
            </div>
          ) : (
            <div className="card success-card">
              <div className="badge">You said yes!</div>
              <img
                className="hero-gif"
                src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
                alt="Happy bears"
              />
              {!envelopeOpen && (
                <>
                  <h1 className="title">YESSSS!!!</h1>
                  <p className="subtitle">The sunset is even more beautiful now</p>
                </>
              )}
              <button
                type="button"
                className={`envelope-button ${envelopeOpen ? "open" : ""}`}
                onClick={() => setEnvelopeOpen(true)}
                aria-label="Open the love letter"
              >
                <div className={`envelope ${envelopeOpen ? "open" : ""}`}>
                  <div className="envelope-back" />
                  <div className="envelope-flap">
                    <div className="envelope-seal">💕</div>
                  </div>
                  <div className="envelope-pocket" />
                  <div className="letter">
                    <div className="letter-content">
                      <p className="letter-date">Feb 14, 2026</p>
                      <p className="letter-body">
                        Happy valentine's day my baby!! i made this little website just for u and i really hope you like it.
                        i'm not the best at stuff like this but I wanted to do something special that shows how much you mean to me.
                        just know that i love you so much, and every single day i find more reasons to love you even more.
                        you make me so happy and i'm so grateful for you, always and forever
                      </p>
                      <p className="letter-sign">yours truly,</p>
                      <p className="letter-name">eldrin</p>
                    </div>
                  </div>
                </div>
              </button>
              <p className="tap-note">
                {envelopeOpen
                  ? "Letter opened 💌"
                  : "Click to open the letter"}
              </p>
              {envelopeOpen && (
                <button
                  type="button"
                  className="btn next"
                  onClick={() => setShowGallery(true)}
                >
                  View our memories
                </button>
              )}
            </div>
          )
        ) : (
          <div className="card ask-card">
            <div className="pixel-hearts pixel-heart-1"></div>
            <div className="pixel-hearts pixel-heart-2"></div>
            <div className="pixel-hearts pixel-heart-3"></div>
            <div className="badge">From Eldrin the cat</div>
            <img
              className="hero-gif"
              src={`${baseUrl}el7.gif`}
              alt="Solemn"
            />
            <h1 className="title">Be My Valentine?</h1>
            <p className="subtitle">The sunset awaits your answer...</p>
            <div className="button-row">
              <button
                className="btn yes"
                style={{ transform: `scale(${yesScale})` }}
                onClick={() => {
                  setEnvelopeOpen(false);
                  setShowGallery(false);
                  setYesPressed(true);
                }}
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className="btn no"
                style={{ transform: `translate(${noShiftX}px, ${noShiftY}px)` }}
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
