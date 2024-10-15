export type PostType = {
  id: string;
  author: {
    username: string;
    name: string;
    surname: string;
    image: string;
  };
  image: string;
  description?: string;
};
