import Breadcrumb2 from '@/components/Breadcrumb'
import Container from '@/components/Container'
import ProductCreateComponent from '@/components/ProductCreateComponent'
import { Layers } from 'lucide-react'
import React from 'react'

const ProductCreate = () => {
  return (
    <div>
        <Container>
            <Breadcrumb2
            name="Create Product"
            url={[{ name: "Products", url: "/product" ,icon: <Layers className="size-5" /> }]}
       />
    <ProductCreateComponent/>
        </Container>
    </div>
  )
}

export default ProductCreate