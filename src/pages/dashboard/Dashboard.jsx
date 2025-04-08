import { ProjectTable } from "../../components/ProjectTable";
import { Navbar } from "../../components/Navbar";
import { AddProjForm } from "../../components/AddProjForm";
import { useState } from "react";
import { ProjEditDialog } from "../../components/projectTable/ProjEditDialog";
import { toggleProjForm } from "../../redux/slice/updateProjFormSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export const Dashboard = () => {
  const [isAddProjFormShown, setIsAddProjFormShown] = useState(false);
  const [isProjectAdded, setIsProjectAdded] = useState(false);
  const dispatch = useDispatch();
  const isUpdateDialogOpen = useSelector((state) => {
    return state.updateProjForm;
  });
  const userRole = localStorage.getItem("userRole");
  return (
    <>
      <header className="sticky top-0 z-40">
        <Navbar />
      </header>
      <main className="px-2 sm:px-5 md:px-5 py-10 space-y-7 relative min-h-screen">
        {userRole === "admin" && (
          <button
            onClick={() => {
              setIsAddProjFormShown(true);
            }}
            className="bg-[var(--color-pink)] text-white cursor-pointer px-3 py-1 rounded-lg hover:bg-[var(--color-hover-pink)]"
          >
            Add project
          </button>
        )}
        {isAddProjFormShown && (
          <AddProjForm
            setIsAddProjFormShown={setIsAddProjFormShown}
            setIsProjectAdded={setIsProjectAdded}
          />
        )}
        <ProjectTable
          isProjectAdded={isProjectAdded}
          setIsProjectAdded={setIsProjectAdded}
        />
        {isUpdateDialogOpen && <ProjEditDialog />}
      </main>
    </>
  );
};
