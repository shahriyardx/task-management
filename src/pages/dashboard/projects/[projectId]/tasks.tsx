import DashboardLayout from "@/components/DashboardLayout";
import TaskColumn from "@/components/TaskColumn";
import { PrivateRoute } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useRouter } from "next/router";
import React, { ComponentProps, useMemo } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const TaskList = (props: ComponentProps<"div">) => {
  return <div className="flex flex-col gap-2"></div>;
};

const ProjectTasks = () => {
  const router = useRouter();
  const { projects } = useProjects();
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
    console.log(result);
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-4xl font-bold">Tasks</h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-5 mt-10 select-none">
            <TaskColumn title="Todo" tasks={todoTasks} id="to-do" />
            <TaskColumn title="In Progress" tasks={inProgressTasks} id="in-progress" />
            <TaskColumn title="Done" tasks={doneTasks} id="done" />
          </div>
        </DragDropContext>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default ProjectTasks;
