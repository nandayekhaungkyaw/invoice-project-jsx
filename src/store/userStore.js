// store/useUserStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";


const  useUserStore = create(
  persist(
    (set) => ({
      profile: null,
      setProfile: (data) => set({ profile: data }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "user-profile", // key in localStorage
    }
  )
);

export default useUserStore;