import { Task as TaskType } from "@/types";
import React, { ComponentProps } from "react";
import Task from "./Task";

type Props = ComponentProps<"div"> & {
  tasks: Array<TaskType>;
};

const TaskList = ({ tasks, children, ...props }: Props) => {
  return (
    <>
    <div>
      
    </div>
    {children}
    </>
  );
};

export default TaskList;
