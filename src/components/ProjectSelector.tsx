import { useProjects } from "@/hooks/useProjects";
import { Select } from "antd";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

const ProjectSelector = () => {
  const router = useRouter();
  const { projects, updateProject, addActivity } = useProjects();
  const project = useMemo(
    () => projects.find((project) => project.id === router.query.projectId),
    [projects, router.query.projectId]
  );

  return (
    <>
      {project && (
        <Select
          className="w-[200px]"
          options={projects.map((p) => ({ label: p.title, value: p.id }))}
          onChange={(value) => {
            router.push(`/dashboard/projects/${value}/members`);
          }}
          defaultValue={project.id}
        />
      )}
    </>
  );
};

export default ProjectSelector;
