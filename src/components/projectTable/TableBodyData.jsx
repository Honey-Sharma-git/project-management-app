import { FaTrashCan } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { Alert } from "../../utils/common";
import { msgTime } from "../../utils/constants";
export const TableBodyData = ({ data, setIsProjectAdded }) => {
  
  async function deleteProjData(data) {
    try {
      const response = await fetch(
        `http://192.168.0.105:8080/feed/post/${data._id}`,
        {
          method: "DELETE",
        }
      );
      const resData = await response.json();
      if (response.status === 200) {
        Alert(resData.message, "success", msgTime.SHORT);
        setIsProjectAdded((prev) => {
          return !prev;
        });
      } else {
        Alert(resData.message, "error", msgTime.VERY_LONG);
      }
    } catch (error) {
      console.log("Error while deleting:", error);
      Alert(error, "error", msgTime.VERY_LONG);
    }
  }

  return (
    <tr className="border-b hover:bg-gray-100 ">
      <td className="p-2 py-2 font-medium">{data.projName}</td>
      <td className="p-2 py-2">{data.testVersion}</td>
      <td className="p-2 py-2">{data.uatVersion}</td>
      <td className="p-2 py-2">{data.liveVersion}</td>
      <td className="p-2 py-2 text-lg text-[var(--btn-color-purple)] hover:text-[var(--color-teal)] cursor-pointer">
        <FaPencilAlt />
      </td>
      <td className="p-2 py-2 text-xl text-[var(--btn-color-purple)] hover:text-[var(--color-teal)] ">
        <button
          className="cursor-pointer"
          onClick={() => {
            deleteProjData(data);
          }}
        >
          <FaTrashCan />
        </button>
      </td>
    </tr>
  );
};
