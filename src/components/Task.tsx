import type { Task } from "@/types";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }: { task: Task; index: number }) => {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`border p-2 grid grid-cols-[50px,auto] gap-3 ${
            snapshot.isDragging && "bg-green-300"
          }`}
        >
          <div className="aspect-square bg-red-500 rounded-md"></div>
          <div>
            <p>{task.title}</p>
            <p>{new Date(task.deadline || new Date()).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
