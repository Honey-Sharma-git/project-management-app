import { msgTime } from "../utils/constants";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Alert } from "../utils/common";
export const AddProjForm = ({ setIsAddProjFormShown }) => {
  const [projectData, setProjectData] = useState({
    projName: "",
    liveVersion: "",
    testVersion: "",
    uatVersion: "",
  });

  function handleChange(e) {
    setProjectData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  async function postData(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://192.168.0.105:8080/feed/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...projectData,
          userId: localStorage.getItem("userId"),
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        Alert(data.message, "success", msgTime.SHORT);
      } else {
        Alert(data.message, "warning", msgTime.LONG);
      }
    } catch (error) {
      console.log("Error while fetching post API", error);
      Alert(data.message, "error", msgTime.VERY_LONG);
    }
  }

  return (
    <aside className="rounded-lg border shadow-xl bg-[var(--dialog-color-dark-navy)] text-white p-5 pb-13">
      <div
        onClick={() => {
          setIsAddProjFormShown(false);
        }}
        className="text-2xl cursor-pointer flex flex-row justify-end"
      >
        <IoIosCloseCircleOutline />
      </div>
      <form>
        <fieldset className="border-gray-400 rounded-lg border-4 flex flex-row justify-between items-center gap-30 p-5">
          <legend className="font-bold text-4xl">Add project details</legend>
          <div className="flex flex-col w-1/2 justify-center gap-5">
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="projName">Project name:</label>
              <input
                value={projectData.projName}
                onChange={handleChange}
                className="p-2 rounded-md  w-2/3 bg-[var(--input-bg-color)]"
                type="text"
                name="projName"
                id="projName"
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="liveVersion">Live version:</label>
              <input
                value={projectData.liveVersion}
                onChange={handleChange}
                className="p-2 rounded-md  w-2/3 bg-[var(--input-bg-color)]"
                type="text"
                name="liveVersion"
                id="liveVersion"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 justify-center gap-5">
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="testVersion">Test version:</label>
              <input
                value={projectData.testVersion}
                onChange={handleChange}
                className="p-2 rounded-md  w-2/3 bg-[var(--input-bg-color)]"
                type="text"
                name="testVersion"
                id="testVersion"
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="uatVersion">UAT version:</label>
              <input
                value={projectData.uatVersion}
                onChange={handleChange}
                className="p-2 rounded-md  w-2/3 bg-[var(--input-bg-color)]"
                type="text"
                name="uatVersion"
                id="uatVersion"
              />
            </div>
          </div>
          <button
            className="text-white bg-[var(--btn-color-purple)] hover:bg-[var(--btn-hover-color-purple)] px-10 py-1 rounded-lg cursor-pointer"
            onClick={postData}
          >
            Add
          </button>
        </fieldset>
      </form>
    </aside>
  );
};
