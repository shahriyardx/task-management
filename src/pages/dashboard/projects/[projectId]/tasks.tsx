import DashboardLayout from "@/components/DashboardLayout";
import TaskColumn from "@/components/TaskColumn";
import TaskEditForm from "@/components/TaskEditForm";
import { PrivateRoute } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { Task } from "@/types";
import { Button, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import dayjs from "dayjs";
import TaskCreateForm from "@/components/TaskCreateForm";
import ProjectSelector from "@/components/ProjectSelector";

type TaskStatus = "to-do" | "in-progress" | "done";

const ProjectTasks = () => {
  const router = useRouter();
  const { projects, updateProject, addActivity } = useProjects();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = useForm();
  const [createForm] = useForm();

  const [createModalOpen, setCreateModalOpen] = useState(false);

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
          addActivity(
            project.id,
            `Task '${task.title}' moved from '${result.source.droppableId}' to '${result.destination?.droppableId}'`
          );
        }

        return task;
      });
      updateProject(project.id, newProject);
    }
  };

  const showModal = (task: Task) => {
    setEditingTask(task);
    form.setFields([
      { name: "title", value: task.title },
      { name: "deadline", value: dayjs(new Date(task.deadline)) },
      { name: "members", value: task.members.map((m) => m.username) },
    ]);
  };

  const handleOk = () => {
    // setEditingTask(null);
    form.submit();
  };

  const handleCreateTask = () => {
    createForm.submit();
  };

  const handleCancel = () => setEditingTask(null);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            Tasks{" "}
            <Button type="primary" onClick={() => setCreateModalOpen(true)}>
              Add new
            </Button>
          </h1>
          <ProjectSelector />
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-5 mt-10 select-none">
            <TaskColumn
              title="Todo"
              tasks={todoTasks}
              id="to-do"
              showModal={showModal}
            />
            <TaskColumn
              title="In Progress"
              tasks={inProgressTasks}
              id="in-progress"
              showModal={showModal}
            />
            <TaskColumn
              title="Done"
              tasks={doneTasks}
              id="done"
              showModal={showModal}
            />
          </div>
        </DragDropContext>

        <Modal
          title="Edit Task"
          open={Boolean(editingTask)}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {editingTask && project && (
            <TaskEditForm
              project={project}
              task={editingTask}
              form={form}
              closeModal={handleCancel}
            />
          )}
        </Modal>

        <Modal
          title="Create Task"
          open={createModalOpen}
          onOk={handleCreateTask}
          onCancel={() => setCreateModalOpen(false)}
        >
          {project && (
            <TaskCreateForm
              form={createForm}
              project={project}
              closeModal={() => setCreateModalOpen(false)}
            />
          )}
        </Modal>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default ProjectTasks;
