import { useEffect, useRef, useState } from "react";
import { mountLogo } from "@/logo3d/engine.js";

export function LogoFilm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const player = mountLogo(canvas, {
      src: "/logo3d/assets/intro.mp4",
      poster: "/logo3d/assets/poster.png",
      reduced,
    });
    return () => player.destroy();
  }, [reduced]);

  return <canvas ref={canvasRef} className="logo-film" aria-label="G-PSI, GovTech Solutions" />;
}
