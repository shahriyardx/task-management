import { PrivateRoute } from "@/hooks/useAuth"
import { useProjects } from "@/hooks/useProjects"
import { Button } from "antd"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const ProjectsOverview = () => {
	const { projects, isLoading } = useProjects()
	return (
		<PrivateRoute>
			<div className="container mx-auto">
				<h1 className="text-4xl font-semibold text-center py-5">Projects Overview</h1>   
					<div className="mt-10">
						{isLoading && <p>Loading...</p>}

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
							{projects.map((project) => (
								<div className="border shadow-md rounded-md p-3" key={project.id}>
									<Image src={`/projects/${project.image}`} width={300} height={200} alt="image" className="rounded-md w-full aspect-video object-cover" />
									<h3 className="font-semibold mt-2">{project.title}</h3>
									<Button type="primary">
										<Link href={`/dashboard/projects/${project.id}`}>Manage</Link>
									</Button>
								</div>
							))}
						</div>
					</div>
			</div>
		</PrivateRoute>
	)
}

export default ProjectsOverview
