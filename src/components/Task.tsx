import type { Task } from "@/types";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { EditFilled } from "@ant-design/icons";
import Image from "next/image";
import { Avatar } from "antd";

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
        <div className="border px-4 py-3">
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`flex justify-between gap-3 ${
              snapshot.isDragging && "bg-green-300"
            }`}
          >
            <div>
              <p>{task.title}</p>
            </div>

            <div>
              <button onClick={() => showModal(task)}>
                <EditFilled />
              </button>
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div>
              <Avatar.Group>
                {task.members.map((member) => (
                  <Avatar
                    className="w-10 h-10 rounded-full"
                    key={member.username}
                    src={`https://i.pravatar.cc/150?u=${member.username}`}
                    alt={member.username}
                  />
                ))}
              </Avatar.Group>
            </div>

            <p>{new Date(task.deadline || new Date()).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
