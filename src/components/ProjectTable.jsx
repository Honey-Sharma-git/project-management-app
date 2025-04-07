import { TableHeaderData } from "./projectTable/TableHeaderData";
import { TableBodyData } from "./projectTable/TableBodyData";
import { useEffect, useState } from "react";
import { Alert } from "../utils/common";
import { msgTime } from "../utils/constants";
import { useSelector } from "react-redux";
export const ProjectTable = ({ isProjectAdded, setIsProjectAdded }) => {
  const [projects, setProjects] = useState(null);
  //For updating table data after modification
  const isFormUpdated = useSelector((state) => {
    return state.updateProjForm;
  });
  async function getTableData() {
    try {
      const response = await fetch("http://192.168.0.105:8080/feed/posts");
      const data = await response.json();
      if (response.status === 200) {
        setProjects(data.posts);
      } else {
        Alert(data.message, "warning", msgTime.VERY_LONG);
      }
    } catch (error) {
      console.log("Error while getting table data:", error);
      Alert(error, "error", msgTime.LONG);
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
  }, [isProjectAdded, isFormUpdated]);

  return (
    <div className="max-h-78 overflow-auto shadow-2xl rounded-2xl border">
      <table className="text-left w-full p-1 text-sm">
        <thead className="shadow-lg font-bold sticky text-white top-0 bg-[var(--color-sky)]">
          <TableHeaderData sort={sort} />
        </thead>
        {projects ? (
          <tbody>
            {projects.map((data, index) => {
              return (
                <TableBodyData
                  key={index}
                  data={data}
                  setIsProjectAdded={setIsProjectAdded}
                />
              );
            })}
            {!projects.length && (
              <tr>
                <td colSpan={6} className="text-center">
                  No record found
                </td>
              </tr>
            )}
          </tbody>
        ) : (
          <tfoot className="text-center text-xl">
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};
