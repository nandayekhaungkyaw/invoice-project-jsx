
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import axios from "axios";


export const getVouchers = async (url=`${import.meta.env.VITE_BASE_URL}/vouchers`) => {
  try {
    const response = await axios.get(
      `${url}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
  
    toast.success("Vouchers fetched successfully");
    console.log(response.data)
    return response.data; // Return the fetched vouchers
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access the response sent from the backend
      console.error("data-voucher", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
}

export const viewVoucher = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/vouchers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
        },
      }
    );
    console.log(response.data.data)
    toast.success("Voucher details fetched successfully");
    return response.data.data; // Return the voucher details
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access the response sent from the backend
      console.error("data-voucher", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
}


export const searchVoucher = async (searchTerm, setVouchers) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/vouchers?q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
        },
      }
    );
    setVouchers(response.data);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("data-profile", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
};

export const handleArrangement = async (sortType, setData,sortby) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/vouchers?sort_by=${sortby}&sort_direction=${sortType}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
        },
      }
    );
    setData(response.data);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("data-profile", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }}