import type { Task } from "@/types";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { EditFilled } from "@ant-design/icons";

const Task = ({
  task,
  index,
  showModal,
}: {
  task: Task;
  index: number;
  showModal: (task: Task) => void;
}) => {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`border px-4 py-3 flex justify-between gap-3 ${
            snapshot.isDragging && "bg-green-300"
          }`}
        >
          <div>
            <p>{task.title}</p>
            <p>{new Date(task.deadline || new Date()).toLocaleDateString()}</p>
          </div>

          <div>
            <button onClick={() => showModal(task)}>
              <EditFilled />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
