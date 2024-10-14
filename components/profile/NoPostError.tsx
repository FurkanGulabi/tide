import React from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";

interface NoPostErrorProps {
  username: string;
}

const NoPostError = ({ username }: NoPostErrorProps) => {
  return (
    <div className="w-full mt-20 flex items-center text-center flex-col">
      <div>
        <MdOutlinePhotoCamera size={80} />
      </div>
      <p className="text-muted-foreground">{username} has no posts</p>
    </div>
  );
};

export default NoPostError;
