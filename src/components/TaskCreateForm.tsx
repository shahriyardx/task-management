import React from "react";
import type { FormProps } from "antd";
import { Select, Form, Input, FormInstance, DatePicker } from "antd";
import { Project } from "@/types";
import dayjs from "dayjs";
import { useProjects } from "@/hooks/useProjects";
import { createId } from "@paralleldrive/cuid2";

type FieldType = {
  title: string;
  deadline: Date;
  members: Array<string>;
};

const TaskCreateForm = ({
  project,
  form,
  closeModal,
}: {
  form: FormInstance;
  project: Project;
  closeModal: () => void;
}) => {
  const { updateProject } = useProjects();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const newProject = { ...project };
    project.tasks.push({
      title: values.title,
      members: values.members.map((m) => ({ username: m })),
      deadline: dayjs(values.deadline).toDate(),
      status: "to-do",
      id: createId(),
    });

    updateProject(project.id, newProject);
    closeModal();
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: "auto" }}
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
        rules={[{ required: true, message: "deadline is required" }]}
      >
        <DatePicker showTime placeholder="Select deadline" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Members"
        name="members"
        rules={[{ required: true, message: "select at-least one member" }]}
      >
        <Select
          mode="multiple"
          placeholder="Select members"
          options={project.members.map((member) => ({
            label: member.username,
            value: member.username,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default TaskCreateForm;
