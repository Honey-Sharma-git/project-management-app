import { FaTrashCan } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
export const TableBodyData = ({ data }) => {
  console.log("hello", data);
  return (
    <tr className="border-b hover:bg-gray-100 ">
      <td className="p-2 py-4 font-medium">{data.projName}</td>
      <td className="p-2 py-4">{data.testVersion}</td>
      <td className="p-2 py-4">{data.uatVersion}</td>
      <td className="p-2 py-4">{data.liveVersion}</td>
      <td className="p-2 py-4 text-lg text-[var(--btn-color-purple)] hover:text-[var(--color-teal)] cursor-pointer">
        <FaPencilAlt />
      </td>
      <td className="p-2 py-4 text-2xl text-[var(--btn-color-purple)] hover:text-[var(--color-teal)] cursor-pointer">
        <FaTrashCan />
      </td>
    </tr>
  );
};
