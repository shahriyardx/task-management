import DashboardLayout from '@/components/DashboardLayout'
import { PrivateRoute } from '@/hooks/useAuth'
import React from 'react'

const ProjectDashboard = () => {
  return (
    <PrivateRoute>
      <DashboardLayout>
        Hello
      </DashboardLayout>
    </PrivateRoute>
  )
}

export default ProjectDashboard