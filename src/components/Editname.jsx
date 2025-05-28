import React from "react";
import { useForm } from "react-hook-form";
import useUserStore from "./../store/userStore";

import { EditProfileName } from "../services/profile.js";
const Editname = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setProfile, profile } = useUserStore();

  const onSubmit = (data) => {
    EditProfileName(data, setProfile);
  };
  console.log(errors);
  return (
    <div className="flex flex-col gap-4 p-8 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          defaultValue={profile.name}
          {...register("name", { required: true })}
        />
        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Editname;
