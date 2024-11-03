import { AnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";

interface FramerMotionProviderProps {
  children: ReactNode;
}

const FramerMotionProvider: React.FC<FramerMotionProviderProps> = ({
  children,
}) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default FramerMotionProvider;
