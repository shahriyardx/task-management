import React from "react";
import type { FormProps } from "antd";
import { Select, Form, Input, FormInstance, DatePicker } from "antd";
import { Project } from "@/types";
import { useProjects } from "@/hooks/useProjects";

type FieldType = {
  username: string;
};

const MemberCreateForm = ({
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
    project.members.push({ username: values.username });

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
        label="Username"
        name="username"
        rules={[{ required: true, message: "username is required" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default MemberCreateForm;
