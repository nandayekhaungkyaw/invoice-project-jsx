import toast from "react-hot-toast";
import Cookies from "js-cookie";

import axios from "axios";
import { set } from "react-hook-form";

export const SignIn = async (formData, navigate,setProfileData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/login`,
      {
        email: formData.email,
        password: formData.password,
      }
    );
  
    toast.success("Login successful");
    Cookies.set("token", response.data.token, { expires: 7 }); // Set the token in cookies
    console.log(Cookies.get("token"));

    navigate("/"); // Redirect to the dashboard or home page

    console.log("Login success:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access the response sent from the backend
      console.error("Login failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Login failed");

      // Show toast message (you can customize this)
    } else {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong");
    }
  }
};

export const Registration = async (data, navigate) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/register`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        }, // Use localStorage to get the token
      }
    );
    toast.success("Registration successful");
    Cookies.set("token", response.data.token, { expires: 7 }); // Set
    navigate("/"); // Redirect to the dashboard or home page
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access the response sent from the backend
      console.error("data-profile", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
};

 export const Logout = (navigate) => {
    Cookies.remove("token");
    if (Cookies.get("token") === undefined) {
      toast.success("Logout successfully");
      navigate("/login");
    }
  };