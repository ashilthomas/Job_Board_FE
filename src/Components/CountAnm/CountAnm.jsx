
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function CountAnm() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 50, { duration: 2 });

    return animation.stop;
  }, []);

  return <motion.h1 className="text-8xl">{rounded}</motion.h1>;
}

