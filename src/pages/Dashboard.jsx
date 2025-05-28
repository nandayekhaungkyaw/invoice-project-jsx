import Container from "@/components/Container";
import ModuleButton from "@/components/ModuleButton";

import { BadgeDollarSign, Grape, TicketPlus } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import useUserStore from "./../store/userStore";
import { getProfile } from "../services/profile.js";
import { Logout } from "../services/auth.js";

const Dashboard = () => {
  const navigate=useNavigate();
  const { setProfile, profile } = useUserStore();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getProfile(setProfile, setProfileData);
  }, []);

  console.log(profile);
  const onSubmit = () => {
   Logout(navigate);
  };
  return (
    <>
      <Container>
        {profile ? (
          <Link
            to={"/user-profile"}
            className="flex items-center justify-end self-end gap-2"
          >
            <img
              src={
                profile?.profile_image
                  ? profile?.profile_image
                  : "../../public/avator.jpg"
              }
              className=" size-14 rounded-full"
              alt=""
            />
            <div>
              <h1 className="text-xl font-bold">{profile?.name}</h1>
              <p className="text-sm text-gray-500">{profile?.email}</p>
            </div>
          </Link>
        ) : (
          <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Please Logout Session is expired</h1>
             <button
            onClick={onSubmit}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Log out
          </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          <ModuleButton name="Products" icon={<Grape />} url="/product" />
          <ModuleButton name="Sale" icon={<BadgeDollarSign />} url="/sale" />
          <ModuleButton name="Invoice" icon={<TicketPlus />} url="/invoice" />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
