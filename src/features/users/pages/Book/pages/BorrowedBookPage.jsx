import React from 'react'
import BorrowedBookSection from '../components/BorrowedBookSection'
import Header from '@/features/users/components/Header'
import HomeFooter from '@/features/users/components/HomeFooter'

const BorrowedBookPage = () => {
  return (
    <div>
        <Header/>
        <BorrowedBookSection/>
        <HomeFooter/>
    </div>
  )
}

export default BorrowedBookPage