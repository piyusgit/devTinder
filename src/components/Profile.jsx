import React from "react";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div>
        <UserProfile user={user} />
      </div>
    )
  );
};

export default Profile;
