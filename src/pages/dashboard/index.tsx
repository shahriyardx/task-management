import { PrivateRoute } from "@/hooks/useAuth"
import React from "react"

const Dashboard = () => {
	return <PrivateRoute>Dashboard</PrivateRoute>
}

export default Dashboard
