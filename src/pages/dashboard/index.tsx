import DashboardLayout from "@/components/DashboardLayout"
import { PrivateRoute } from "@/hooks/useAuth"
import React from "react"

const Dashboard = () => {
	return (
		<PrivateRoute>
			<DashboardLayout>Dashboard</DashboardLayout>
		</PrivateRoute>
	)
}

export default Dashboard
