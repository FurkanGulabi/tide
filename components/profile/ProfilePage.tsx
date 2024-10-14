import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookmarkIcon,
  Grid3X3Icon,
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  PlaySquareIcon,
  PlusCircleIcon,
  SettingsIcon,
  UserPlusIcon,
} from "lucide-react";
import Image from "next/image";
import PostsContainer from "./PostsContainer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EditProfileButton from "./EditProfileButton";

interface ProfilePageComponentProps {
  username: string;
  name: string;
  surname: string;
  image: string;
  bio: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  posts: any[];
  isPrivate: boolean;
  isOwner: boolean;
}

export default function ProfilePageComponent({
  username,
  name,
  surname,
  image,
  bio,
  postCount,
  followerCount,
  followingCount,
  posts,
  isPrivate,
  isOwner,
}: ProfilePageComponentProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Avatar className="w-40 h-40">
          <AvatarImage src={image || undefined} alt={`${name} ${surname}`} />
          <AvatarFallback>
            {`${name[0]}${surname[0]}` || `${username[0]}`}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center sm:text-left space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h1 className="text-2xl font-semibold">{username}</h1>
            <div className="flex gap-2">
              {isOwner ? (
                <EditProfileButton bio={bio} image={image} />
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
            <p>{bio}</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-center flex">
          <TabsTrigger value="posts" className="flex items-center w-full gap-2">
            <Grid3X3Icon className="h-4 w-4" />
            <span className="hidden sm:inline">Posts</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center w-full gap-2">
            <BookmarkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Saved</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <PostsContainer
            posts={posts}
            username={username}
            isPrivate={isPrivate}
          />
        </TabsContent>
        <TabsContent value="reels">Reels content</TabsContent>
        <TabsContent value="saved">Saved content</TabsContent>
        <TabsContent value="tagged">Tagged content</TabsContent>
      </Tabs>
    </div>
  );
}
