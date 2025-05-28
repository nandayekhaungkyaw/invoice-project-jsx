import Breadcrumb2 from '@/components/Breadcrumb'
import Container from '@/components/Container'
import ProductEditComponent from '@/components/ProductEditComponent'
import { Layers } from 'lucide-react'
import React from 'react'

const ProductEdit = () => {
  return (
     <div>
        <Container>
            <Breadcrumb2
            name="Edit Product"
            url={[{ name: "Products", url: "/product" ,icon: <Layers className="size-5" /> }]}
       />
       <ProductEditComponent/>

        </Container>
    </div>
  )
}

export default ProductEdit