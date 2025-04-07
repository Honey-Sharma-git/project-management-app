import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggleProjForm } from "../../redux/slice/updateProjFormSlice";
export const ProjEditDialog = () => {
  const dispatch = useDispatch();
  const projectData = useSelector((state) => {
    return state.projectData;
  });

  return (
    <aside className="min-h-screen absolute inset-0 flex flex-col justify-center open-add-proj-form rounded-lg border shadow-xl bg-[var(--dialog-color-dark-navy)] text-white p-3 lg:p-5 2 lg:pb-13 ">
      <div
        onClick={() => {
          dispatch(toggleProjForm());
        }}
        className="text-2xl cursor-pointer flex flex-row justify-end"
      >
        <IoIosCloseCircleOutline />
      </div>
      <form>
        <fieldset className="border-gray-400 rounded-lg border-4 flex flex-row flex-wrap lg:flex-nowrap   gap-5 justify-between  items-center p-2 md:p-4">
          <legend className="font-bold text-xl">Add project details</legend>
          <div className="flex flex-col w-full lg:w-1/2 justify-center items-between gap-5">
            <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
              <label htmlFor="projName">Project name:</label>
              <input
                defaultValue={projectData.projName}
                className="p-2 rounded-md  w-full md:w-1/2 lg:w-2/3  bg-[var(--input-bg-color)]"
                type="text"
                name="projName"
                id="projName"
              />
            </div>
            <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
              <label htmlFor="liveVersion">Live version:</label>
              <input
                defaultValue={projectData.liveVersion}
                className="p-2 rounded-md  w-full md:w-1/2 lg:w-2/3 bg-[var(--input-bg-color)]"
                type="text"
                name="liveVersion"
                id="liveVersion"
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/2 justify-center items-between gap-5">
            <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
              <label htmlFor="testVersion">Test version:</label>
              <input
                className="p-2 rounded-md  w-full md:w-1/2 lg:w-2/3  bg-[var(--input-bg-color)]"
                defaultValue={projectData.testVersion}
                type="text"
                name="testVersion"
                id="testVersion"
              />
            </div>
            <div className="flex flex-row  flex-wrap gap-2  justify-between items-center">
              <label htmlFor="uatVersion">UAT version:</label>
              <input
                className="p-2 rounded-md  w-full md:w-1/2 lg:w-2/3  bg-[var(--input-bg-color)]"
                defaultValue={projectData.uatVersion}
                type="text"
                name="uatVersion"
                id="uatVersion"
              />
            </div>
          </div>
          <button className="text-white bg-[var(--btn-color-purple)] hover:bg-[var(--btn-hover-color-purple)] w-full lg:w-fit px-10 py-1  rounded-lg cursor-pointer">
            Update
          </button>
        </fieldset>
      </form>
    </aside>
  );
};
