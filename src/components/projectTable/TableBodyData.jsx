import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";
export const TableBodyData = ({ data }) => {
  return (
    <tr className="border-b hover:bg-gray-100 ">
      <td className="p-2 py-4 font-medium">{data.name}</td>
      <td className="p-2 py-4">{data.version}</td>
      <td className="p-2 py-4">{data.uat}</td>
      <td className="p-2 py-4">
        <a
          className="text-[var(--link-color)] hover:underline"
          href={data.testLink}
        >
          {data.testLink}
        </a>
      </td>

      <td className="p-2 py-4">
        <a
          className="text-[var(--link-color)] hover:underline"
          href={data.liveLink}
        >
          {data.liveLink}
        </a>
      </td>
      <td className="p-2 py-4 text-lg text-[var(--btn-color-purple)] hover:text-[var(--color-teal)] cursor-pointer">
        <FaPencilAlt />
      </td>
      <td className="p-2 py-4 text-2xl text-[var(--btn-color-purple)] hover:text-[var(--color-teal)] cursor-pointer">
        <MdOutlineMoreVert />
      </td>
    </tr>
  );
};
