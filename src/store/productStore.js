import { create } from 'zustand'

const productStore = create((set) => ({
VoucherProducts: [],
total:0,
setTotal: (amount) => set({ total: amount }),
tax:0,
setTax: (amount) => set({ tax: amount }),
netTotal:0,

setNetTotal: (amount) => set({ netTotal: amount }),
 

  setVoucherProducts: (data) =>

   set((state) => {
    const existingProduct = state.VoucherProducts.find((item) => item.id === data.id);
console.log("existingProduct", existingProduct)
        if (existingProduct) {
      // Product already in list, increase the amount
      const updatedProducts = state.VoucherProducts.map((item) =>
        item.id === data.id
          ? { ...item, amount: item.amount + data.amount,quantity: item.quantity + data.quantity, }
          : item
      );
      return { VoucherProducts: updatedProducts };
    }else {
      // New product, just add
      return { VoucherProducts: [...state.VoucherProducts, data] };
    }
      

    }),
clearVoucherProducts: () => set({ VoucherProducts: [] }),
deleteVoucherProduct: (id) => set((state) => ({
    VoucherProducts: state.VoucherProducts.filter((product) => product.id !== id)
  })),

   resetStore: () =>
    set({
      VoucherProducts: [],
      total: 0,
      tax: 0,
      netTotal: 0,
    }),
}))

export default productStore