import React from "react";
import { motion } from "framer-motion";

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  zoom: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  rotate: {
    hidden: { rotate: 0, opacity: 0 },
    visible: { rotate: 360, opacity: 1 },
  },
  bounce: {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: [0, -10, 0, -5, 0],
      opacity: 1,
      transition: { repeat: Infinity, duration: 1 },
    },
  },
  flip: {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1 },
  },
};

const CustomAnimatedDiv = ({
  children,
  animationType = "fade",
  duration = 0.5,
  delay = 0,
  loop = false,
  repeat = 0,
  trigger,
  sx = {},
}) => {
  const animationProps = {
    initial: "hidden",
    animate: "visible",
    variants: animationVariants[animationType],
    transition: { duration, delay, repeat: loop ? Infinity : repeat },
    style: { ...sx },
  };

  if (trigger === "hover") animationProps.whileHover = animationVariants[animationType].visible;
  if (trigger === "tap") animationProps.whileTap = animationVariants[animationType].visible;
  if (trigger === "scroll") animationProps.whileInView = animationVariants[animationType].visible;

  return <motion.div {...animationProps}>{children}</motion.div>;
};

export default CustomAnimatedDiv;
