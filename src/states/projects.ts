import { Project, Task } from "@/types";
import { create } from "zustand";

type ProjectState = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  updateProject: (projectId: string, data: Project) => void;
  addActivity: (projectId: string, activity: string) => void;
  deleteProject: (projectId: string) => void;
};

export const useProjectsState = create<ProjectState>((set) => ({
  projects: [],
  setProjects: (projects: Project[]) => set(() => ({ projects })),
  deleteProject: (projectId: string) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
  updateProject: (projectId: string, data: Project) =>
    set((state) => {
      return {
        projects: state.projects.map((project) => {
          if (project.id === projectId) {
            return data;
          }
          return project;
        }),
      };
    }),
  addActivity: (projectId: string, activity: string) =>
    set((state) => {
      const newProjects = [...state.projects];
      newProjects.map((project) => {
        if (project.id === projectId) {
          project.activities.push({ description: activity, time: new Date() });
        }

        return project;
      });

      return { projects: newProjects };
    }),
}));
