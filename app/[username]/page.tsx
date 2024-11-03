import { getUser } from "@/actions/user/getUser";
import UnothorizedError from "@/components/auth/UnothorizedError";
import EditProfileButton from "@/components/profile/EditProfileButton";
import NoSavedPostError from "@/components/profile/NoSavedPostError";
import PostsContainer from "@/components/profile/PostsContainer";
import PostsContainerSkeleton from "@/components/profile/PostsContainerSkeleton";
import UserNotFound from "@/components/profile/UserNotFound";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookmarkIcon,
  Grid3x3Icon,
  MoreHorizontalIcon,
  Plus,
  UserPlusIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const ProfilePage = async (props: {
  params: Promise<{ username: string }>;
}) => {
  const params = await props.params;
  if (!params) return null;

  const {
    error,
    bio,
    followerCount,
    followingCount,
    image,
    isOwner,
    isPrivate,
    name,
    postCount,
    surname,
    username,
  } = await getUser(params.username);

  if (error === "Unauthorized") {
    return <UnothorizedError />;
  }
  if (error === "User not found") {
    return <UserNotFound />;
  }

  return (
    <div className="pt-24 max-w-4xl mx-auto p-4 space-y-6 ">
      <section className="flex flex-row items-center mx-auto space-x-6">
        <Avatar className="w-40 h-40">
          <AvatarImage src={image || undefined} alt={`${name} ${surname}`} />
          <AvatarFallback>test</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center sm:text-left space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h1 className="text-2xl font-semibold">{username}</h1>
            <div className="flex gap-2">
              {isOwner ? (
                <>
                  <EditProfileButton bio={bio} image={image || undefined} />
                  <Link href={"/create-post"}>
                    <Button variant="outline">
                      <Plus className="mr-2" />
                      <span>New Post</span>
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button>Follow</Button>
                  <Button variant="outline">Message</Button>
                  <Button variant="outline" size="icon">
                    <UserPlusIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center sm:justify-start gap-6">
            <span>
              <strong>{postCount}</strong> posts
            </span>
            <span>
              <strong>{followerCount}</strong> followers
            </span>
            <span>
              <strong>{followingCount}</strong> following
            </span>
          </div>
          <div className="text-left">
            <p className="font-semibold">{`${name} ${surname}`}</p>
            <p className="font-normal text-sm">{bio}</p>
          </div>
        </div>
      </section>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-center flex">
          <TabsTrigger value="posts" className="flex items-center w-full gap-2">
            <Grid3x3Icon className="h-4 w-4" />
            <span className="hidden sm:inline">Posts</span>
          </TabsTrigger>
          {isOwner && (
            <TabsTrigger
              value="saved"
              className="flex items-center w-full gap-2"
            >
              <BookmarkIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <Suspense fallback={<PostsContainerSkeleton />}>
            <PostsContainer
              username={params.username}
              isPrivate={isPrivate ?? false}
            />
          </Suspense>
        </TabsContent>
        {isOwner && (
          <TabsContent value="saved">
            <NoSavedPostError />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ProfilePage;
