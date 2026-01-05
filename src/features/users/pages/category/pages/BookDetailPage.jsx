import React from 'react'
import BookDetailSection from '../components/BookDetailSection'
import Header from '@/features/users/components/Header'
import HomeFooter from '@/features/users/components/HomeFooter'

const BookDetailPage = () => {
  return (
    <div>
        <Header/>
        <BookDetailSection/>
        <HomeFooter/>
    </div>
  )
}

export default BookDetailPage