import DashboardLayout from "@/components/DashboardLayout";
import MemberCreateForm from "@/components/MemberCreateForm";
import ProjectSelector from "@/components/ProjectSelector";
import { PrivateRoute } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { Button, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import Column from "antd/es/table/Column";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

const ProjectMembers = () => {
  const { projects, updateProject } = useProjects();
  const router = useRouter();

  const project = useMemo(
    () => projects.find((project) => project.id === router.query.projectId),
    [projects, router.query.projectId]
  );

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            Activities
          </h1>
          <ProjectSelector />
        </div>

        <div className="mt-5">
          <Table
            dataSource={
              project?.activities.map((activity, index) => ({
                ...activity,
                index: index + 1,
              })) || []
            }
          >
            <Column title="SL" dataIndex="index" />
            <Column title="Activity" dataIndex="description" />
            <Column
              title="Time"
              render={(value) => {
                return <span>{moment(value.time).fromNow()}</span>;
              }}
            />
          </Table>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default ProjectMembers;
