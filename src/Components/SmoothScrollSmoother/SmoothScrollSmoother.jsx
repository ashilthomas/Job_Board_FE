import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmoothScrollSmoother = ({ children }) => {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2,          // speed of smoothing, increase for very slow
      effects: true,      // allow animations on scroll
    });

    return () => smoother.kill();
  }, []);

  return <>{children}</>;
};

export default SmoothScrollSmoother;


