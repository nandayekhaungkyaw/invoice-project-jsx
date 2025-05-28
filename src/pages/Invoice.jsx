
import Breadcrumb2 from '@/components/Breadcrumb'
import Container from '@/components/Container'

import { TicketPlus } from 'lucide-react'
import VoucherTable from '../components/VoucherTable';



const Invoice = () => {
  return (
    <>
    <Container>
        <Breadcrumb2
         
          name="Invoice"
         
        />
      
        <VoucherTable/>
    </Container>
    </>
  )
}

export default Invoice