import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
export const TableHeaderData = ({ sort }) => {
  const [header, setHeader] = useState([
    { id: 1, name: "Project name", isSorted: false },
    { id: 2, name: "Version", isSorted: false },
    { id: 3, name: "UAT", isSorted: false },
    { id: 4, name: "Live link", isSorted: false },
    { id: 5, name: "Test link", isSorted: false },
    { id: 6, name: "Edit details", isSorted: false },
    { id: 7, name: "More", isSorted: false },
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
              className="flex flex-row items-center gap-2 py-2"
            >
              <span className="cursor-pointer">{item.name}</span>
              <span>{item.isSorted ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
          </th>
        );
      })}
    </tr>
  );
};
