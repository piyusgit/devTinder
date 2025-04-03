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
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/received/requests", {
        withCredentials: true,
      });

      console.log(res.data);
      dispatch(setRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!allRequests) return null;
  if (allRequests?.length === 0) {
    return (
      <div className="flex justify-center items-center ">
        <h1 className="text-bold text-2xl">No Requests</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center ">
      <h1 className="text-bold text-2xl">Connections Requests</h1>

      {allRequests?.map((user) => (
        <div key={user?._id} className="flex justify-center items-center ">
          <div className=" items-center card w-96 bg-base-100 shadow-xl m-5">
            <img
              src={user?.fromUserId?.photoUrl}
              alt="Profile"
              className="rounded-full w-30"
            />

            <div className="card-body">
              <h2 className="card-title">
                {user?.fromUserId?.firstName + " " + user?.fromUserId?.lastName}
              </h2>
              <p>{user?.fromUserId?.emailId}</p>
            </div>
            <div>
              <span>{user?.fromUserId?.gender}</span>
              <span>{user?.fromUserId?.age}</span>
            </div>
            <div>
              <p>{user?.fromUserId?.about}</p>
            </div>
          </div>
          <div>
            <button
              className="btn btn-soft btn-primary"
              onClick={() => reviewRequest("rejected", user._id)}
            >
              Reject
            </button>
            <button
              className="btn btn-soft btn-secondary"
              onClick={() => reviewRequest("accepted", user._id)}
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
