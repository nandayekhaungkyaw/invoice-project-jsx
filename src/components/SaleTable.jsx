import React, { useEffect, useState } from "react";
import { productAll } from "./../services/sale";
import { Controller, set, useForm } from "react-hook-form";
import productStore from "./../store/productStore";
import { CircleMinus, CirclePlus } from "lucide-react";
import Select from 'react-select';

const SaleTable = () => {
  const [products, setProducts] = useState([]);

  const { VoucherProducts, setVoucherProducts,deleteVoucherProduct,setTotal,total,tax,setTax,setNetTotal,netTotal } = productStore();
  const [totalAmount, setTotalAmount] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    productAll(setProducts);
    console.log("Products fetched:", products);
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const productOptions = products?.map((product) => ({
  value: product.id,
  label: product.product_name,
}));
  const onSubmit = async (data) => {

    const Addedproduct = products.find(
      (product) => product.id === parseInt(data.product_id)
    );
   
    await setVoucherProducts({
      product_name: Addedproduct.product_name,
      quantity: parseInt(data.quantity),
      price: Addedproduct.price,
      
      amount: parseInt(data.quantity) * Addedproduct.price,
      id: Addedproduct.id,
    });

    reset(); // Reset the form after submission

    // Here you can handle the form submission, e.g., send data to an API
  };

  const updatedVoucherProducts = productStore((state) => state.VoucherProducts);

 
  useEffect(() => {
    const amount = updatedVoucherProducts.reduce(
      (acc, item) => acc + item.amount,
      0
    );
    setTotalAmount(amount);
    setTotal(amount);
    setTax(amount * 0.05); // Assuming tax is 10% of total
    setNetTotal((amount + amount * 0.05).toFixed(2)); // Net total is total + tax
    
  }, [updatedVoucherProducts]);

  const handleAdded = async (id) => {
    console.log(id)
    console.log(updatedVoucherProducts)
    const updatedProducts =await updatedVoucherProducts.find(
      (product) => product.id == id
    );
    console.log(updatedProducts);
    

await  setVoucherProducts({
      product_name: updatedProducts.product_name,
      price: updatedProducts.price,
      

      quantity: 1,
  
      amount: updatedProducts.price,
      id: updatedProducts.id,
    });

   
  };


  const handleReduced=async (id) => {
    const updatedProducts = await updatedVoucherProducts.find(
      (product) => product.id == id
    );
    if (updatedProducts.quantity > 1) {
      await setVoucherProducts({
        product_name: updatedProducts.product_name,
        price: updatedProducts.price,
        quantity: - 1,
        amount: -updatedProducts.price,
        id: updatedProducts.id,
      });
    } else {
      deleteVoucherProduct(id);
      
     
    
    }
  }

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#3b82f6' : '#d1d5db', // your blue focus or gray border
    boxShadow: state.isFocused ? '0 0 0 2px #3b82f6' : 'none',
    borderRadius: '0.375rem',   // rounded-md
    padding: '8px',         // p-3
    minHeight: 'auto',
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    border: 'none',        // REMOVE border inside input
    boxShadow: 'none',     // REMOVE shadow/outline inside input
    outline: 'none',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#6b7280', // gray-500
  }),
  // indicatorsContainer: (provided) => ({
  //   ...provided,
  //   // Remove border if you want clean edges on the right side
  //   border: 'none',
  // }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0, // you can adjust padding here if needed
  }),
};

  return (
    <div className=" flex flex-col gap-6 mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-6">
          {/* Product Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product
            </label>
<Controller
  name="product_id"
  control={control}
  rules={{ required: "Please select a product" }}
  render={({ field }) => (
    <>
      <Select
      styles={customStyles}
        {...field}
        options={productOptions}
        placeholder="Select a product"
         value={productOptions.find(option => option.value === field.value )|| null} //
        onChange={(selectedOption) => {
          field.onChange(selectedOption?.value ?? "xedf"); // empty string if cleared
          const selectedProduct = products.find(
            (product) => product.id === selectedOption?.value
          );
          if (selectedProduct) {
            setProductPrice(selectedProduct.price);
          }
        }}
      />
      {errors.product_id && (
        <p className="text-red-500 text-sm mt-1">
          {errors.product_id.message}
        </p>
      )}
    </>
  )}
/>
      </div>

            {/* price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
            Unit Price
            </label>
            <input
              type="number"
              value={productPrice}
              readOnly
              min={1}
              
              placeholder="Enter quantity"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* Quantity */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              defaultValue={1}
              {...register("quantity", { required: true, min: 1 })}
              placeholder="Enter quantity"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-row justify-end h-full">
            <button
              type="submit"
              className=" bg-blue-600 w-2/3 self-end  h-full    text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {updatedVoucherProducts && updatedVoucherProducts.length > 0 ? (
              updatedVoucherProducts.map((item, index) => (
             
                  <tr  
                  onMouseEnter={() => setHoveredRow(item.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.product_name}
                    </th>
                    <td className="px-6 py-4  flex flex-row justify-center items-center gap-2">
                       {hoveredRow === item.id && (
    <span>
      <CirclePlus onClick={() => handleAdded(item.id)} className="size-6 cursor-pointer" />
    </span>
  )}
                      <span> {item.quantity}</span>
                     {hoveredRow === item.id && (
    <span>
      <CircleMinus onClick={() => handleReduced(item.id)} className="size-6 cursor-pointer" />
    </span>
  )}
                    </td>
                    <td className="px-6 py-4">${item.price?.toFixed(2)}</td>
                    <td className="px-6 py-4">${item.amount?.toFixed(2)}</td>
                  </tr>
                
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No products added yet.
                </td>
              </tr>
            )}
            {updatedVoucherProducts && updatedVoucherProducts.length > 0 && (
              <>
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap text-center dark:text-white"
                >
                  Total Amount
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                  ${totalAmount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4   text-center font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Tax
                </td>
                <td className="px-6 py-4  font-bold text-gray-900 whitespace-nowrap dark:text-white">
                  ${tax.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 font-bold  text-center text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Net Total
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                  ${(total+tax).toFixed(2)}
                </td>
              </tr>
              
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleTable;
