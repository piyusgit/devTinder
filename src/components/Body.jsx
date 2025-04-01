import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    // Check if user is already logged in
    if (userData) {
      return; // User is already logged in, no need to fetch again
    }
    // Fetch user data from API
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data)); // Add user to redux store
    } catch (error) {
      // Handle error (e.g., user not logged in)
      if (error?.response?.status === 401) {
        navigate("/login");
        // Redirect to login page if not logged in
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data on component mount
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
