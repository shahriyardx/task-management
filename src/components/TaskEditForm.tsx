import React from "react";
import type { FormProps } from "antd";
import { Select, Form, Input, FormInstance, DatePicker } from "antd";
import { Project, Task } from "@/types";
import dayjs from "dayjs";
import { useProjects } from "@/hooks/useProjects";

type FieldType = {
  title: string;
  deadline: Date;
  members: Array<string>;
};

const TaskEditForm = ({
  project,
  task,
  form,
  closeModal,
}: {
  task: Task;
  form: FormInstance;
  project: Project;
  closeModal: () => void;
}) => {
  const { updateProject } = useProjects();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const newProject = { ...project };
    project.tasks.map((t) => {
      if (t.id === task.id) {
        task.title = values.title;
        task.members = values.members.map((member) => ({
          username: member,
        }));
        task.deadline = dayjs(values.deadline).toDate();
      }
    });
    values.members.forEach((member) => addMember(member));
    updateProject(project.id, newProject);
    closeModal();
  };

  const addMember = (member: string) => {
    if (project.members.find((m) => m.username === member)) return;
    const newProject = { ...project };
    newProject.members.push({ username: member });
    updateProject(project.id, newProject);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: "auto" }}
      initialValues={task}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item<FieldType>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Deadline"
        name="deadline"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <DatePicker
          showTime
          placeholder="Select deadline"
          defaultValue={dayjs(new Date())}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Members"
        name="members"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Select
          mode="tags"
          placeholder="Select members"
          defaultValue={task.members.map((m) => m.username)}
          options={project.members.map((member) => ({
            label: member.username,
            value: member.username,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default TaskEditForm;
