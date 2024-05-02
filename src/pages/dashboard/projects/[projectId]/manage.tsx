import DashboardLayout from "@/components/DashboardLayout";
import { PrivateRoute } from "@/hooks/useAuth";
import React, { useEffect, useMemo, useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useProjectsState } from "@/states/projects";
import { useRouter } from "next/router";
import ProjectSelector from "@/components/ProjectSelector";

type FieldType = {
  name: string;
};

const ManageProject = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = useForm();
  const router = useRouter();

  const { deleteProject, projects, updateProject } = useProjectsState();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (!project) return;

    const newProject = { ...project };
    newProject.title = values.name;

    updateProject(project?.id, newProject);
  };

  const project = useMemo(
    () => projects.find((project) => project.id === router.query.projectId),
    [projects, router]
  );

  useEffect(() => {
    if (project) {
      form.setFields([{ name: "name", value: project.title }]);
    }
  }, [project, form]);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold flex items-center gap-3">Manage</h1>

          <ProjectSelector />
        </div>

        <div className="mt-5">
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: "auto" }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is requried" }]}
            >
              <Input />
            </Form.Item>
          </Form>

          <div className="flex items-center gap-2 pt-5">
            <Button type="primary" onClick={() => form.submit()}>
              Update
            </Button>
            <Button type="primary" danger onClick={() => setModalOpen(true)}>
              Delete
            </Button>
          </div>
        </div>

        <Modal
          title="Add Member"
          open={modalOpen}
          onOk={() => {
            deleteProject(router.query.projectId as string);
            router.push("/dashboard/projects");
          }}
          onCancel={() => setModalOpen(false)}
        >
          Are you sure you want to deleet this project?
        </Modal>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default ManageProject;
