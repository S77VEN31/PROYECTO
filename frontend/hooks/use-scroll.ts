import { useEffect, useState } from "react";

/**
 * Hook para detectar el scroll de la página con throttling
 * @param threshold - Umbral de scroll en píxeles para activar el cambio
 * @returns objeto con información del scroll
 */
export function useScroll(threshold: number = 200) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          setIsScrolled(currentScrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Agregar listener de scroll con throttling
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return {
    scrollY,
    isScrolled,
  };
}
