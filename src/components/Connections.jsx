import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setConnection } from "../redux/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const allConnections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      console.log("Connections:", res?.data?.data);
      // Dispatch the connections data to redux store
      dispatch(setConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!allConnections) return null;
  if (allConnections?.length === 0) {
    return (
      <div className="flex justify-center items-center ">
        <h1 className="text-bold text-2xl">No Connections</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center ">
      <h1 className="text-bold text-2xl">Connections</h1>

      {allConnections?.map((user) => (
        <div key={user?._id} className="flex justify-center items-center ">
          <div className=" items-center card w-96 bg-base-100 shadow-xl m-5">
            <img
              src={user?.photoUrl}
              alt="Profile"
              className="rounded-full w-30"
            />

            <div className="card-body">
              <h2 className="card-title">
                {user?.firstName + " " + user?.lastName}
              </h2>
              <p>{user?.emailId}</p>
            </div>
            <div>
              <span>{user?.gender}</span>
              <span>{user?.age}</span>
            </div>
            <div>
              <p>{user?.about}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
