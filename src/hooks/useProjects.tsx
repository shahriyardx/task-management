import { useProjectsState } from "@/states/projects"
import { Project } from "@/types"
import { useEffect } from "react"
import { useQuery } from "react-query"

export const useProjects = () => {
  const { projects, setProjects, updateProject, addActivity } = useProjectsState();

  const { data, isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    initialData: [],
    queryFn: () => fetch('/projects.json').then(response => response.json()),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (projects.length <= 0 && data) {
      setProjects(data)
    }
  }, [data, projects.length, setProjects])

  return { projects, isLoading, updateProject, addActivity };
}