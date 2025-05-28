import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Modal } from "flowbite";
import axios from "axios";

export const uploadImage = async (file, setUploading, setProfile) => {
  if (!file) {
    toast.error("Please select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("profile_image", file);

  try {
    setUploading(true);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-profile/change-profile-image`,

      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const modalElement = document.getElementById("dialog-edit-image");
    const modal = new Modal(modalElement);

    modal.hide();

    toast.success("Image uploaded successfully");
    setProfile(response.data.user);
    setFile(null); // Clear the file after upload
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Upload error:", error.response?.data);
      toast.error(error.response?.data.message || "Upload failed");
    }
  } finally {
    setUploading(false);
  }
};

export const EditProfileName = async (data, setProfile) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/user-profile/change-name`,
      {
        name: data.name,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
        },
      }
    );
    setProfile(response.data.user);
    const modalElement = document.getElementById("dialog-edit-name");
    const modal = new Modal(modalElement);

    modal.hide();
    toast.success("Name updated successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access the response sent from the backend
      console.error("data-profile", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
};

export const EditProfilePassword = async (data, navigate) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/user-profile/change-password`,
      {
        old_password: data.old_password,

        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
        },
      }
    );
    const modalElement = document.getElementById("authentication-modal");
    const modal = new Modal(modalElement);

    modal.hide();

    Cookies.remove("token");
    if (Cookies.get("token") === undefined) {
      navigate("/login");
    }
    toast.success("Password updated successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access the response sent from the backend
      console.error("data-profile", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
};


export const getProfile = async (setProfile,setProfileData) => {
  try{
  const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/user-profile/profile`,{
    headers: {


      Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
    },
  } )

setProfileData(response.data.data)
setProfile(response.data.data)



}catch(error){
  if (axios.isAxiosError(error)) {  
    // Access the response sent from the backend
    console.error("data-profile", error.response?.data);
    toast.error(error.response?.data.message)
    setProfile(null)
   

  }}
  
}