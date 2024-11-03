import React from "react";
import { MdBookmarkBorder } from "react-icons/md";

const NoSavedPostError = () => {
  return (
    <div className="w-full mt-20 flex items-center text-center flex-col">
      <div>
        <MdBookmarkBorder size={80} />
      </div>
      <p className="text-muted-foreground">You have no saved post</p>
    </div>
  );
};

export default NoSavedPostError;
