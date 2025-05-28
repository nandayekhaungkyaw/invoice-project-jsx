import axios, { Axios } from 'axios';
import Cookies from 'js-cookie';
import { set } from 'react-hook-form';
import toast from 'react-hot-toast';


export const getProducts = async (url = `${import.meta.env.VITE_BASE_URL}/products` ,setPagination) => {
 
    
    try{
        const response = await axios.get(`${url}`,{
        headers:{
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
setPagination(response.data)
    return response.data.data;
    }catch(error){
     if(axios.isAxiosError(error)){
        console.error('Error fetching products:', error.message);
        toast.error(error.message);
      
    }
     return ["Error fetching products"];
     // 🟢 Ensure it always returns an array
}}

export const storeProduct = async (data, navigate,reset) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/products`,
            {
            product_name: data.product_name,
                
                price: data.price,
               
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
                },
            }
        );
        toast.success("Product created successfully");
        reset();
       if(data.go_back===true){
         navigate("/product");
       }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Access the response sent from the backend
            console.error("data-profile", error.response?.data);
            toast.error(error.response?.data.message);
        }
    }
}

export const editProduct = async (data, navigate, reset) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BASE_URL}/products/${data.id}`,
            {
                product_name: data.product_name,
                price: data.price,
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
                },
            }
        );
        toast.success("Product updated successfully");
        reset();
       
          navigate("/product");
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Access the response sent from the backend
            console.error("data-profile", error.response?.data);
            toast.error(error.response?.data.message);
        }
    }}

    export const showProduct = async (id) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
                },
            }
        );
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Access the response sent from the backend
            console.error("data-profile", error.response?.data);
            toast.error(error.response?.data.message);
        }
    }   }


    export const deleteProduct = async (id, currentPage,setPagination,setProduct) => {
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_BASE_URL}/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
                },
            }
        );
        toast.success("Product deleted successfully");
      setProduct(await  getProducts(currentPage,setPagination)) 

        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Access the response sent from the backend
            console.error("data-profile", error.response?.data);
            toast.error(error.response?.data.message);
        }
    }}

  export  const  searchProduct = async (searchTerm, setPagination) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/products?q=${searchTerm}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
                },
            }
        );
        setPagination(response.data);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("data-profile", error.response?.data);
            toast.error(error.response?.data.message);
        }
    }}



    export const handleArrangeProducts=async (sortBy, setProducts, setPagination, sortType) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/products?sort_by=${sortBy}&sort_direction=${sortType}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`, // Use localStorage to get the token
                    },
                }
            );
            setProducts(response.data.data);
            setPagination(response.data);
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("data-profile", error.response?.data);
                toast.error(error.response?.data.message);
            }
    }
        
    }