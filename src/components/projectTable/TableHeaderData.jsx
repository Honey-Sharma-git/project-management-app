import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
export const TableHeaderData = ({ sort }) => {
  const [header, setHeader] = useState([
    { id: 1, name: "Project name", isSorted: false },
    { id: 2, name: "Test version", isSorted: false },
    { id: 3, name: "UAT version", isSorted: false },
    { id: 4, name: "Live version", isSorted: false },
    { id: 6, name: "Edit details" },
    { id: 7, name: "Delete" },
  ]);
  function toggleSort(headerObj) {
    sort(headerObj);
    setHeader((prev) => {
      return prev.map((item) => {
        if (headerObj.id === item.id) {
          return { ...item, isSorted: !item.isSorted };
        } else {
          return { ...item };
        }
      });
    });
  }
  return (
    <tr>
      {header.map((item) => {
        return (
          <th key={item.id}>
            <div
              onClick={() => {
                toggleSort(item);
              }}
              className={`flex flex-row items-center gap-2 py-2 ${
                // For removing CSS on icon with id: 6,7
                item.id !== 6 &&
                item.id !== 7 &&
                "hover:text-[var(--text-color-gray)]"
              } `}
            >
              <span className="cursor-pointer">{item.name}</span>
              {/* For removing these icons on id:6,7 */}
              {item.id !== 6 && item.id !== 7 && (
                <span>
                  {item.isSorted ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              )}
            </div>
          </th>
        );
      })}
    </tr>
  );
};
