import DashboardLayout from "@/components/DashboardLayout"
import { PrivateRoute } from "@/hooks/useAuth"
import React from "react"

const ProjectsOverview = () => {
	return (
		<PrivateRoute>
			<div className="container mx-auto">
				<h1 className="text-4xl font-semibold text-center py-5">Projects Overview</h1>
                
                <div className="mt-10">

                </div>
			</div>
		</PrivateRoute>
	)
}

export default ProjectsOverview
