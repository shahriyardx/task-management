import React, { ComponentProps } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskList from "./TaskList";
import { Task as TaskType } from "@/types";
import Task from "./Task";

type Props = ComponentProps<"div"> & {
  title: string;
  tasks: TaskType[];
  id: string;
};

const TaskColumn = ({ tasks, title, id }: Props) => {
  return (
    <div className="border rounded-md shadow-md">
      <h2 className="block bg-zinc-200 p-3">{title}</h2>
      <div className="p-3">
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TaskColumn;
