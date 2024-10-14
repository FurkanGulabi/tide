import React, { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

interface FramerMotionProviderProps {
  children: ReactNode;
}

const FramerMotionProvider: React.FC<FramerMotionProviderProps> = ({
  children,
}) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default FramerMotionProvider;
