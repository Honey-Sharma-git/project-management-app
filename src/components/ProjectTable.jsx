import { projectsData } from "../projectData";
import { TableHeaderData } from "./projectTable/TableHeaderData";
import { TableBodyData } from "./projectTable/TableBodyData";
import { useEffect, useState } from "react";
import { Alert } from "../utils/common";

export const ProjectTable = () => {
  const [projects, setProjects] = useState(null);

  async function getTableData() {
    try {
      const response = await fetch("http://192.168.0.105:8080/feed/posts");
      const data = await response.json();
      if (response.status === 200) {
        Alert(data.message, "success");
      } else {
        Alert(data.message, "warning");
      }
      console.log(data);
    } catch (error) {
      console.log("Error while getting table data:", error);
      Alert(error, "error");
    }
  }

  function sort(headerObj) {
    //This function needs to be exported to common.js
    console.log("sorting...", headerObj.isSorted);
    setProjects((prev) => {
      return prev.toSorted((a, b) => {
        if ("Live version" === headerObj.name) {
          if (headerObj.isSorted) {
            return Number(a.liveVersion) - Number(b.liveVersion);
          } else {
            return Number(b.liveVersion) - Number(a.liveVersion);
          }
        } else if ("UAT version" === headerObj.name) {
          if (headerObj.isSorted) {
            return Number(a.uatVersion) - Number(b.uatVersion);
          } else {
            return Number(b.uatVersion) - Number(a.uatVersion);
          }
        } else if ("Test version" === headerObj.name) {
          if (headerObj.isSorted) {
            return Number(a.testVersion) - Number(b.testVersion);
          } else {
            return Number(b.testVersion) - Number(a.testVersion);
          }
        } else if ("Project name" === headerObj.name) {
          let x = a.projName.toLowerCase();
          let y = b.projName.toLowerCase();
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
    getTableData();
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
