import React, { useState } from "react";
import "./Carousel.css";
import SetaE from "../../assets/IMG/setaE.svg";
import SetaR from "../../assets/IMG/setaR.svg";

const images = [
  { src: "https://static.vecteezy.com/system/resources/previews/017/395/377/non_2x/google-meets-icon-free-png.png", alt: "Google Meet" },
  { src: "https://cdn-1.webcatalog.io/catalog/google-docs/google-docs-icon-filled-256.png?v=1757896981588", alt: "Google Docs" },
  { src: "https://cdn-icons-png.flaticon.com/512/5968/5968557.png", alt: "Google Calendar" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png", alt: "Microsoft Teams" },
  { src: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDaK1XdUso6cUMpI9hAdPUU_FNs11cY1X284vsHrnWtRw7oqRpN1m9YAg21d_aNKnIo-&format=source", alt: "Outlook" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg", alt: "Google Calendar" },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");
  const itemsPerPage = 5;

  const nextSlide = () => {
    
    if (current + itemsPerPage < images.length) {
      setDirection("next");
      setCurrent((prev) => prev + itemsPerPage);
    }
  };

  const prevSlide = () => {
    
    if (current > 0) {
      setDirection("prev");
      setCurrent((prev) => prev - itemsPerPage);
    }
  };

  const visibleImages = images.slice(current, current + itemsPerPage);

  return (
    <div className="carousel-container">
      <button
        className="arrow left"
        onClick={prevSlide}
        disabled={current === 0}
      >
        <img src={SetaE} alt="Seta esquerda" className="seta-img" />
      </button>

      <div className={`carousel slide-${direction}`}>
        {visibleImages.map((img, index) => (
          <div className="slide active" key={index}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      <button
        className="arrow right"
        onClick={nextSlide}
        disabled={current + itemsPerPage >= images.length}
      >
        <img src={SetaR} alt="Seta direita" className="seta-img" />
      </button>
    </div>
  );
}