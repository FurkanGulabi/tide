import React from "react";
import Post from "./Post";
import NoPostError from "./NoPostError";
import PrivateError from "./PrivateError";

interface PostsContainerProps {
  username: string;
  posts: any[];
  isPrivate: boolean;
}

const PostsContainer = ({
  posts,
  username,
  isPrivate,
}: PostsContainerProps) => {
  if (isPrivate) {
    return <PrivateError username={username} />;
  }

  if (posts.length === 0 || !posts) {
    return <NoPostError username={username} />;
  }

  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-4 w-full">
      {posts.map((post, i) => (
        <Post key={i} />
      ))}
    </div>
  );
};

export default PostsContainer;
