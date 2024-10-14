import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { HeartIcon, MessageCircleIcon } from "lucide-react";

interface PostProps {
  key: number;
}

const Post = ({ key }: PostProps) => {
  return (
    <Card key={key} className="aspect-square relative group cursor-pointer">
      <Image
        src={`/placeholder.svg?height=300&width=300&text=Post+${key + 1}`}
        alt={`Post ${key + 1}`}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-4 text-white">
          <span className="flex items-center gap-1">
            <HeartIcon className="h-6 w-6" />
            1.2K
          </span>
          <span className="flex items-center gap-1">
            <MessageCircleIcon className="h-6 w-6" />
            100
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Post;
