import React, { useMemo } from "react";
import Sidebar from "./Sidebar";
import { useProjectsState } from "@/states/projects";
import { useRouter } from "next/router";
import { useSidebarState } from "@/states/sidebar";
import { Drawer } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { projects } = useProjectsState();
  const project = useMemo(
    () => projects.find((project) => project.id === router.query.projectId),
    [projects, router]
  );

	const { open, toggle, close } = useSidebarState()

  return (
    <div className="grid grid-cols-1 md:grid-cols-[378px,auto]">
      <div className="md:hidden">
        <Drawer
          title={project?.title}
          placement="left"
          closable={false}
          onClose={() => toggle()}
          open={open}
          size={"default"}
        >
          <Sidebar />
        </Drawer>
      </div>
      <div className="left-0 top-0 h-screen z-50 bg-white hidden md:block">
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
