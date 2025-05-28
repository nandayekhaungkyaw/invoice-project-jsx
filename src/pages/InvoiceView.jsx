import Breadcrumb2 from '@/components/Breadcrumb'
import Container from '@/components/Container'
import InvoiceViewComponent from '@/components/VoucherViewComponent'
import { TicketPlus } from 'lucide-react'
import React from 'react'


const InvoiceView = () => {
  return (
    <div>
        <Container>
            <Breadcrumb2
            name="Invoice View"
            url={[{ name: "Invoice", url: "/invoice" ,icon: <TicketPlus className="size-5" /> }]}/>
            <InvoiceViewComponent/>
        </Container>
    </div>
  )
}

export default InvoiceView