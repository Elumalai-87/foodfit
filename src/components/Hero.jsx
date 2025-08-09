
import { useEffect, useState } from "react";
import abcPowder from '../assets/abc_powder.jpg';
import sambarMasala from '../assets/sambar_masala.jpg';
import fishMasala from '../assets/fish_masala.jpg';
import pregnantLadyPowder from '../assets/pregnant_lady_powder.jpg';
import childrenBiscuits from '../assets/children_biscuits.jpg';

export default function ContinuousSlider() {
  const originalImages = [
    abcPowder,
    sambarMasala,
    fishMasala,
    pregnantLadyPowder,
    childrenBiscuits

  ];

  // Duplicate the images for seamless loop
  const images = [...originalImages, ...originalImages];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= images.length - 1) {
          return 0; // Reset to start when reaching end of duplicated list
        }
        return prev + 1;
      });
    }, 1000); // Wait 1 sec before moving to next image

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider">
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 0.5s ease-in-out"
        }}
      >
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i}`} />
        ))}
      </div>
    </div>
  );
}
