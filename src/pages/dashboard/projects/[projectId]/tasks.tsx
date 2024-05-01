import DashboardLayout from "@/components/DashboardLayout";
import TaskColumn from "@/components/TaskColumn";
import { PrivateRoute } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { Task } from "@/types";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

type TaskStatus = "to-do" | "in-progress" | "done";

const ProjectTasks = () => {
  const router = useRouter();
  const { projects, updateTasks } = useProjects();
  const project = useMemo(
    () => projects.find((project) => project.id === router.query.projectId),
    [projects, router.query.projectId]
  );

  const todoTasks = useMemo(
    () =>
      project ? project.tasks.filter((task) => task.status == "to-do") : [],
    [project]
  );
  const inProgressTasks = useMemo(
    () =>
      project
        ? project.tasks.filter((task) => task.status == "in-progress")
        : [],
    [project]
  );
  const doneTasks = useMemo(
    () =>
      project ? project.tasks.filter((task) => task.status == "done") : [],
    [project]
  );

  const handleDragEnd = (result: DropResult) => {
    if (
      project &&
      result.destination &&
      result.source.droppableId !== result.destination.droppableId
    ) {
      const newProject = { ...project };
      newProject.tasks = project.tasks.map((task) => {
        if (task.id == result.draggableId) {
          task.status = result.destination?.droppableId as TaskStatus;
        }

        return task;
      });
      updateTasks(project.id, newProject);
    }
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-4xl font-bold">Tasks</h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-5 mt-10 select-none">
            <TaskColumn title="Todo" tasks={todoTasks} id="to-do" />
            <TaskColumn
              title="In Progress"
              tasks={inProgressTasks}
              id="in-progress"
            />
            <TaskColumn title="Done" tasks={doneTasks} id="done" />
          </div>
        </DragDropContext>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default ProjectTasks;
