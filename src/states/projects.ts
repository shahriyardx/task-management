import { Project, Task } from '@/types'
import { create } from 'zustand'

type ProjectState = {
  projects: Project[],
  setProjects: (projects: Project[]) => void
  updateTasks: (projectId: string, data: Project) => void
}

export const useProjectsState = create<ProjectState>((set) => ({
  projects: [],
  setProjects: (projects: Project[]) => set(() => ({ projects })),
  updateTasks: (projectId: string, data: Project) => set((state) => {
    return { projects: state.projects.map(project => {
      if (project.id === projectId) {
        return data
      }

      return project
    })}
    
  }),
}))