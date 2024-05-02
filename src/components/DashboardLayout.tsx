import React, { useMemo } from "react";
import Sidebar from "./Sidebar";
import { useProjectsState } from "@/states/projects";
import { useRouter } from "next/router";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { projects } = useProjectsState();
  const project = useMemo(
    () => projects.find((project) => project.id === router.query.projectId),
    [projects, router]
  );

  return (
    <div className="grid grid-cols-[250px,auto]">
      <div>
        <h3 className="px-3 py-5 border-r font-bold border-b-2">
          {project?.title}
        </h3>
        <Sidebar />
      </div>
      <div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
