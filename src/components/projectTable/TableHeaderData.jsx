import { FaSort } from "react-icons/fa6";
export const TableHeaderData = ({ tableHeaders }) => {
  return (
    <tr>
      {tableHeaders.map((header, index) => {
        return (
          <th key={index}>
            <div className="flex flex-row items-center gap-2 py-2 p-1">
              <span>{header}</span>
              <span className="text-sm">
                <FaSort />
              </span>
            </div>
          </th>
        );
      })}
    </tr>
  );
};
