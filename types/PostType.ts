export type PostType = {
  id: string;
  author: {
    id: string;
    username: string | null;
    name: string | null;
    surname: string | null;
    image: string | null;
  };
  authorId: string;
  image: string;
  description?: string | null;
  location?: string | null;
  likes: LikeType[] | [];
  comments: CommentType[] | [];
  createdAt: Date;
  updatedAt: Date;
};

// Define the LikeType
export type LikeType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string | null;
  userId: string;
  commentId: string | null;
};

// Define the CommentType
export type CommentType = {
  id: string; // Comment ID
  user: {
    id: string; // User ID of the comment's author
    username: string | null; // Username of the comment's author (can be null)
    image: string | null; // Image URL of the comment's author (can be null)
  };
  content: string; // Content of the comment
  postId: string; // ID of the post the comment belongs to
  createdAt: Date; // Timestamp of when the comment was created
  updatedAt: Date; // Timestamp of when the comment was updated
};
