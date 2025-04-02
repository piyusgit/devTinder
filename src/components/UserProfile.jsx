import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();

  // State management for user details
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age || 0);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError(""); // Clear previous error message
    try {
      const payload = { firstName, lastName, photoUrl, age, gender, about };
      console.log("Sending data:", payload);

      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });

      console.log("Response:", res.data);
      dispatch(addUser(res?.data?.data));
      setIsEditing(false);
      setShowToast(true); // Show toast notification
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex justify-center gap-10">
        <div className="p-6 bg-base-300 shadow-xl rounded-xl max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white-900">Profile</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary btn-sm"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* Email (Read-Only) */}
          <div className="form-control flex flex-col mb-4 ">
            <label className="label font-semibold">Email ID</label>
            <input
              type="email"
              value={user?.emailId || ""}
              disabled
              className="input input-bordered"
            />
          </div>

          {/* About */}
          <div className="form-control flex flex-col mb-4">
            <label className="label font-semibold">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              disabled={!isEditing}
              className="textarea textarea-bordered"
            />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                className="input input-bordered"
              />
            </div>
          </div>

          {/* Gender & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-control">
              <label className="label font-semibold">Gender</label>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditing}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setAge(isNaN(value) ? 0 : value);
                }}
                disabled={!isEditing}
                className="input input-bordered"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="form-control flex flex-col mb-4">
            <label className="label font-semibold">Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              disabled={!isEditing}
              className="input input-bordered"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Save & Cancel Buttons */}
          {isEditing && (
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveProfile}>
                Save
              </button>
            </div>
          )}
        </div>

        {/* User Card */}
        <UserCard
          users={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
