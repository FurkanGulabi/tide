"use client";
import { likePost } from "@/actions/user/post/updatePost";
import { PostType } from "@/types/PostType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HeartIcon, MapPinIcon, MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface PostProps {
  keyProp: number;
  post: PostType;
  username: string;
}

const Post = ({ keyProp, post, username }: PostProps) => {
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(
    post.likes.find((like) => like.userId === post.author.id) ? true : false
  );

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => await likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      setIsLiked(!isLiked);
    },
  });

  const handleLike = () => {
    likeMutation.mutate(post.id);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Card
          key={`Card ${keyProp}`}
          className="aspect-square relative group cursor-pointer overflow-hidden"
        >
          <Image
            src={post.image}
            alt={`Post ${keyProp}`}
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-4 text-white">
              <span className="flex items-center gap-1">
                <HeartIcon className="h-6 w-6" />
                {post.likes.length}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircleIcon className="h-6 w-6" />
                {post.comments.length}
              </span>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="grid gap-4">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center justify-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={post.author.image || undefined}
                  alt={post.author.username || ""}
                />
                <AvatarFallback>
                  {post?.author?.name?.[0] ?? ""}
                  {post?.author?.surname?.[0] ?? ""}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{post.author.username}</h4>
                <p className="text-sm text-gray-500">
                  {post.author.name} {post.author.surname}
                </p>
              </div>
            </div>
            {post.location && (
              <div className="flex items-center gap-1 mr-5 text-sm text-gray-500">
                <MapPinIcon className="h-4 w-4" />
                {post.location}
              </div>
            )}
          </div>
          <div className="relative aspect-square">
            <Image
              src={post.image}
              alt={`Post by ${post.author.username}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handleLike}
              size="icon"
              disabled={likeMutation.isPending}
            >
              {isLiked ? (
                <GoHeartFill className="h-4 w-4 text-red-500" />
              ) : (
                <GoHeart className="h-4 w-4 text-red-500" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircleIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm font-medium">{post.likes.length} likes</div>
          {post.description && <p className="text-sm">{post.description}</p>}

          {post.comments.length > 0 && (
            <div className="text-sm text-gray-500">
              View all {post.comments.length} comments
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Post;
