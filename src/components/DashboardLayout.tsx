import React from "react"
import Sidebar from "./Sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="grid grid-cols-[250px,auto]">
			<div>
				<h3 className="px-3 py-5 border-r font-bold text-center border-b-2">Dashboard</h3>
				<Sidebar />
			</div>
			{children}
		</div>
	)
}

export default DashboardLayout
