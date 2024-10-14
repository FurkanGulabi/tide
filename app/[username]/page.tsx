import { getUser } from "@/actions/user/getUser";
import ProfilePageComponent from "@/components/profile/ProfilePage";
import UserNotFound from "@/components/profile/UserNotFound";
import React from "react";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const user = await getUser(params.username);

  if (user.error) {
    return <UserNotFound />;
  }

  return (
    <div className="pt-20 ">
      <ProfilePageComponent
        name={user.name || ""}
        surname={user.surname || ""}
        username={user.username || params.username}
        bio={user.bio || ""}
        postCount={user.posts?.length || 0}
        followerCount={user.followers?.length || 0}
        followingCount={user.following?.length || 0}
        image={user.image || ""}
        key={user.id || 0}
        posts={user.posts || []}
        isPrivate={user.isPrivate || false}
        isOwner={user.isOwner || false}
      />
    </div>
  );
};

export default ProfilePage;
