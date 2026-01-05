"use client"
import UserCreateForm from '../components/UserCreateForm'
import DashboardLayout from '../../dashboard/components/DashboardLayout'

const UserCreatePage = () => {
  return (
    <DashboardLayout>
      <UserCreateForm/>
    </DashboardLayout>
  )
}

export default UserCreatePage