import React from 'react'
import CheckoutSection from '../components/CheckoutSection'
import Header from '@/features/users/components/Header'
import HomeFooter from '@/features/users/components/HomeFooter'

const CheckOutPage = () => {
  return (
    <div>
        <Header/>
        <CheckoutSection/>
        {/* <HomeFooter/> */}
    </div>
  )
}

export default CheckOutPage