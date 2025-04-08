import { FaTrashCan } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { Alert } from "../../utils/common";
import { msgTime } from "../../utils/constants";
import { getProjects } from "../../redux/slice/projectDataSlice";
import { toggleProjForm } from "../../redux/slice/updateProjFormSlice";
import { useDispatch } from "react-redux";
export const TableBodyData = ({ data, setIsProjectAdded }) => {
  const dispatch = useDispatch();
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
        Alert(resData.message, "success", msgTime.VERY_SHORT);
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
  const userRole = localStorage.getItem("userRole");

  return (
    <tr className="border-b hover:bg-gray-100 ">
      <td className="p-2 py-2 font-medium">{data.projName}</td>
      <td className="p-2 py-2">{data.testVersion}</td>
      <td className="p-2 py-2">{data.uatVersion}</td>
      <td className="p-2 py-2">{data.liveVersion}</td>
      {userRole === "admin" && (
        <td className="p-2 py-2 text-lg text-[var(--btn-color-purple)] hover:text-[var(--color-teal)] ">
          <button
            onClick={() => {
              dispatch(toggleProjForm());
              dispatch(getProjects(data));
            }}
            className="cursor-pointer"
          >
            <FaPencilAlt />
          </button>
        </td>
      )}
      {userRole === "admin" && (
        <td className="p-2 py-2 text-xl text-[var(--btn-color-purple)] hover:text-[var(--color-teal)] ">
          <button
            className="cursor-pointer"
            onClick={() => {
              const answer = window.confirm("Do you want to delete?");
              answer ? deleteProjData(data) : null;
            }}
          >
            <FaTrashCan />
          </button>
        </td>
      )}
    </tr>
  );
};
