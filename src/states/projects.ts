import { Project } from '@/types'
import { create } from 'zustand'

type ProjectState = {
  projects: Project[],
  setProjects: (projects: Project[]) => void
}

export const useProjectsState = create<ProjectState>((set) => ({
  projects: [],
  setProjects: (projects: Project[]) => set(() => ({ projects })) 
}))