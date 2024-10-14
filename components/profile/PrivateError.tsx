import React from "react";
import { FaLock } from "react-icons/fa";

interface PrivateErrorProps {
  username: string;
}

const PrivateError = ({ username }: PrivateErrorProps) => {
  return (
    <div className="w-full mt-20 flex items-center text-center flex-col">
      <div>
        <FaLock size={80} />
      </div>
      <p className="text-muted-foreground">{username}&apos;s profile private</p>
    </div>
  );
};

export default PrivateError;
