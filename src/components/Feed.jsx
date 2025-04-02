import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res.data);
      // Dispatch the feed data to redux store if needed
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard users={feed.data[0]} />
      </div>
    )
  );
};

export default Feed;
