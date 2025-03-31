import { projectsData } from "../projectData";
import { useEffect, useState } from "react";
import { TableHeaderData } from "./projectTable/TableHeaderData";
import { TableBodyData } from "./projectTable/TableBodyData";
export const ProjectTable = () => {
  const [projects, setProjects] = useState(null);
  const tableHeaders = [
    "Project name",
    "Version",
    "UAT",
    "Test link",
    "Live link",
    "Edit details",
    "More",
  ];
  useEffect(() => {
    setProjects(projectsData);
  }, []);
  return (
    <div className="h-100 overflow-auto shadow-2xl rounded-2xl border">
      <table className="text-left w-full p-1">
        <thead className="shadow-lg font-bold sticky text-white top-0 bg-[var(--color-sky)]">
          <TableHeaderData tableHeaders={tableHeaders} />
        </thead>
        {projects ? (
          <tbody>
            {projects.map((data, index) => {
              return <TableBodyData key={index} data={data} />;
            })}
          </tbody>
        ) : (
          <tfoot>
            <tr>
              <td>Loading...</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};
