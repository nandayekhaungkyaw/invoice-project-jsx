import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import productStore from "../store/productStore";


export const productAll= async (setProducts) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, 
        },
      }
    );
    setProducts(response.data.data);
    toast.success("Products fetched successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access the response sent from the backend
      console.error("data-products", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
};

export const voucherCreate = async (data, navigate, reset) => {
  const { resetStore } = productStore.getState(); // ✅ This is correct outside React
  console.log(data)
  try {
   await axios.post(
      `${import.meta.env.VITE_BASE_URL}/vouchers`,
      
       data
       
      ,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
        },
      }
    );
    toast.success("Voucher created successfully");
    reset();
    resetStore();
    navigate("/invoice"); // Redirect to the invoice page with the provided ID
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access the response sent from the backend
      console.error("data-voucher", error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
}