import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest, setRequest } from "../redux/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const allRequests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      console.log("Review Response:", res.data);

      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/received/requests`, {
        withCredentials: true,
      });

      console.log("API Response:", res.data);

      if (res.data?.data) {
        dispatch(setRequest(res.data.data)); // Ensure correct API response structure
      } else {
        dispatch(setRequest([])); // Handle empty response safely
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!allRequests) {
    return null; // Handle loading state or error state if needed
  }

  if (allRequests.length === 0) {
    return (
      <div className="flex justify-center items-center ">
        <h1 className="text-bold text-2xl">No Requests</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-bold text-2xl my-4">Connection Requests</h1>

      {allRequests.map((user) => {
        const userInfo = user?.fromUserId;
        if (!userInfo) return null; // Ensure userInfo exists before rendering

        return (
          <div key={userInfo._id} className="flex flex-col items-center my-5">
            <div className="card w-96 bg-base-100 shadow-xl p-4">
              <img
                src={userInfo.photoUrl || "/default-profile.png"}
                alt="Profile"
                className="rounded-full w-20 h-20 object-cover mx-auto"
              />

              <div className="text-center mt-4">
                <h2 className="font-semibold text-lg">
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <p className="text-gray-600">{userInfo.emailId}</p>
              </div>

              <div className="text-center mt-2">
                <span className="text-gray-500">{userInfo.gender}, </span>
                <span className="text-gray-500">{userInfo.age} years</span>
              </div>

              <div className="text-center mt-2">
                <p className="text-gray-700">
                  {userInfo.about || "No bio available"}
                </p>
              </div>

              <div className="flex justify-around mt-4">
                <button
                  className="btn btn-error"
                  onClick={() => reviewRequest("rejected", user._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequest("accepted", user._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
