import Breadcrumb2 from '@/components/Breadcrumb'
import Container from '@/components/Container'
import SaleForm from '@/components/SaleForm'


import React from 'react'

const Sale = () => {
  return (
       <>
    <Container>
        <Breadcrumb2
         
          name="Sale"
         
        />
        <SaleForm/>
        
    </Container>
    </>
  )
}

export default Sale