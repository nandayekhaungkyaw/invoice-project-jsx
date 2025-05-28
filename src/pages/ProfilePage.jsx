import Breadcrumb2 from "@/components/Breadcrumb";
import Container from "@/components/Container";
import React, { useEffect } from "react";
import useUserStore from "./../store/userStore";
import { Pencil } from "lucide-react";

import EditProfile from "@/components/EditProfile";
import "flowbite";

import Dialogbox from "@/components/Dialogbox";
import EditImage from "@/components/EditImage";
import Editname from "@/components/Editname";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Logout } from "../services/auth.js";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { profile } = useUserStore();
const onSubmit = () => {
  Logout(navigate);

}
  return (
    <>
      <Container>
        <div className="flex flex-row justify-between items-center">
          <Breadcrumb2 name="User Profile"  />

          <button
            onClick={onSubmit}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Log out
          </button>
        </div>
        {!profile ? (
          <div>isLoading</div>
        ) : (
          <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img
                src={profile?.profile_image || "/avator.jpg"}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-2 border-gray-300"
              />
              <button
                data-modal-target="dialog-edit-image"
                data-modal-toggle="dialog-edit-image"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition"
              >
                ✎
              </button>
              <Dialogbox children={<EditImage />} name="dialog-edit-image" />
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <div className="flex flex-row justify-center items-center">
                  <input
                    type="name"
                    value={profile?.name || ""}
                    readOnly
                    className="w-full  px-3 py-2 border  bg-gray-100"
                  />
                  <button
                    data-modal-target="dialog-edit-name"
                    data-modal-toggle="dialog-edit-name"
                    className="h-full  flex flex-row gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    <Pencil className="size-4" /> Edit
                  </button>
                  <Dialogbox children={<Editname />} name="dialog-edit-name" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  value={profile?.email || ""}
                  readOnly
                  className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <div className="flex flex-row  justify-center items-center">
                  <input
                    type="password"
                    defaultValue="********"
                    readOnly
                    className="w-full  px-3 py-2 border bg-gray-100"
                  />
                  <button
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="h-full border-[0.8] flex flex-row gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    <Pencil className="size-4" /> Edit
                  </button>
                </div>
                <EditProfile />
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProfilePage;
