import React from 'react'
import DashboardLayout from '../../dashboard/components/DashboardLayout'
import BookCreateForm from '../components/BookCreateForm'

const BookCreatePage = () => {
  return (
        <DashboardLayout>
      <BookCreateForm/>
    </DashboardLayout>
  )
}

export default BookCreatePage