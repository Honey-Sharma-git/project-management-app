import { projectsData } from "../projectData";
import { useEffect, useState } from "react";
import { TableHeaderData } from "./projectTable/TableHeaderData";
import { TableBodyData } from "./projectTable/TableBodyData";
export const ProjectTable = () => {
  const [projects, setProjects] = useState(null);

  function sort(headerObj) {
    //This function needs to be exported to common.js
    console.log("sorting...", headerObj.isSorted);
    setProjects((prev) => {
      return prev.toSorted((a, b) => {
        if ("Version" === headerObj.name) {
          if (headerObj.isSorted) {
            return Number(a.version) - Number(b.version);
          } else {
            return Number(b.version) - Number(a.version);
          }
        } else if ("UAT" === headerObj.name) {
          if (headerObj.isSorted) {
            return Number(a.uat) - Number(b.uat);
          } else {
            return Number(b.uat) - Number(a.uat);
          }
        } else if ("Project name" === headerObj.name) {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x > y) {
            return headerObj.isSorted ? 1 : -1;
          }
          if (x < y) {
            return headerObj.isSorted ? -1 : 1;
          }
          return 0;
        } else if ("Live link" === headerObj.name) {
          let x = a.liveLink.toLowerCase();
          let y = b.liveLink.toLowerCase();
          if (x > y) {
            return headerObj.isSorted ? 1 : -1;
          }
          if (x < y) {
            return headerObj.isSorted ? -1 : 1;
          }
          return 0;
        } else if ("Test link" === headerObj.name) {
          let x = a.testLink.toLowerCase();
          let y = b.testLink.toLowerCase();
          if (x > y) {
            return headerObj.isSorted ? 1 : -1;
          }
          if (x < y) {
            return headerObj.isSorted ? -1 : 1;
          }
          return 0;
        }
      });
    });
  }

  useEffect(() => {
    setProjects(projectsData);
  }, []);
  return (
    <div className="h-100 overflow-auto shadow-2xl rounded-2xl border">
      <table className="text-left w-full p-1">
        <thead className="shadow-lg font-bold sticky text-white top-0 bg-[var(--color-sky)]">
          <TableHeaderData sort={sort} />
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
