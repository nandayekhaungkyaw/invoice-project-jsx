import Breadcrumb2 from '@/components/Breadcrumb'
import Container from '@/components/Container'
import Pagination from '@/components/Pagination'
import ProductTable from '@/components/ProductTable'
import React, { useEffect, useState } from 'react'
import { getProducts } from './../services/products';
import ProductSearch from '@/components/ProductSearch'




const Product = () => {

  const [product, setProduct] = useState([]);
 const [pagination, setPagination] = useState({});

  useEffect(() => {

   const fetchProducts = async () => {
     const data = await getProducts(undefined,setPagination);
     setProduct(data);
    
      
if(product.length > 0){
   console.log(pagination)
   console.log(product)
   }}
   fetchProducts();

   
  },[])
  return (
    <>
    <Container>
        <Breadcrumb2
         
          name="Products"
          
        />
        
        <ProductTable product={product} pagination={pagination} setPagination={setPagination} setProduct={setProduct}/>
       {Array.isArray(product) && product.length  > 0 && (  <Pagination setPagination={setPagination}  setProduct={setProduct} data={pagination}/>)}
    </Container>
    </>
  )
}

export default Product