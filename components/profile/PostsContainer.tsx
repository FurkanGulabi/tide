"use client";

import {
  getUserPostsByUsername,
  UserPostsResponse,
} from "@/actions/user/post/getPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import PostsContainerSkeleton from "./PostsContainerSkeleton";
import PrivateError from "./PrivateError";

interface PostContainerProps {
  username: string;
  isPrivate: boolean;
}

const PostsContainer = ({ username, isPrivate }: PostContainerProps) => {
  const userPostQuery = useQuery<UserPostsResponse>({
    queryKey: ["userPosts", username],
    queryFn: async () => getUserPostsByUsername(username),
  });

  if (isPrivate) return <PrivateError username={username} />;

  const { data, isLoading } = userPostQuery;
  if (isLoading) return <PostsContainerSkeleton />;

  // Check if `data` contains an error
  if (data && "error" in data) {
    return <h1>{data.error}</h1>;
  }

  // Check if `data` contains posts and display them
  if (data && "posts" in data && data.posts.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-1 sm:gap-4 w-full">
        {data.posts.map((post, index) => (
          <Post post={post} key={post.id} keyProp={index} username={username} />
        ))}
      </div>
    );
  }

  // Fallback if no posts are available
  return <div>No posts available.</div>;
};

export default PostsContainer;
