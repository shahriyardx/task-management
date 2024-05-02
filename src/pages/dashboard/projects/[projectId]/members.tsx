import DashboardLayout from "@/components/DashboardLayout";
import MemberCreateForm from "@/components/MemberCreateForm";
import MenuToggleButton from "@/components/MenuToggleButton";
import ProjectSelector from "@/components/ProjectSelector";
import { PrivateRoute } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { Avatar, Button, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import Column from "antd/es/table/Column";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

const ProjectMembers = () => {
  const [form] = useForm();
  const { projects, updateProject } = useProjects();
  const router = useRouter();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const project = useMemo(
    () => projects.find((project) => project.id === router.query.projectId),
    [projects, router.query.projectId]
  );

  const createMember = () => {
    form.submit();
  };

  const deleteMember = (username: string) => {
    if (!project) return;

    const newProject = { ...project };
    newProject.members = newProject.members.filter(
      (member) => member.username !== username
    );
    updateProject(project.id, newProject);
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <MenuToggleButton />
            Members{" "}
            <Button type="primary" onClick={() => setCreateModalOpen(true)}>
              Add new
            </Button>
          </h1>
          <ProjectSelector />
        </div>

        <div className="mt-5">
          <Table
            dataSource={
              project?.members.map((member, index) => ({
                ...member,
                index: index + 1,
              })) || []
            }
          >
            <Column title="SL" dataIndex="index" />
            <Column
              title="Avatar"
              render={(value) => (
                <Avatar
                  className="w-10 h-10 rounded-full"
                  key={value.username}
                  src={`https://i.pravatar.cc/150?u=${value.username}`}
                  alt={value.username}
                />
              )}
            />
            <Column title="Username" dataIndex="username" />
            <Column
              title="Action"
              render={(value) => {
                return (
                  <Button
                    type="primary"
                    onClick={() => deleteMember(value.username)}
                  >
                    Delete
                  </Button>
                );
              }}
            />
          </Table>
        </div>
        <Modal
          title="Add Member"
          open={createModalOpen}
          onOk={createMember}
          onCancel={() => setCreateModalOpen(false)}
        >
          {project && (
            <MemberCreateForm
              form={form}
              project={project}
              closeModal={() => setCreateModalOpen(false)}
            />
          )}
        </Modal>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default ProjectMembers;
