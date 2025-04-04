import { ProjectTable } from "../../components/ProjectTable";
import { Navbar } from "../../components/Navbar";
import { AddProjForm } from "../../components/AddProjForm";
import { useState } from "react";
import { ProjEditDialog } from "../../components/projectTable/ProjEditDialog";
export const Dashboard = () => {
  const [isAddProjFormShown, setIsAddProjFormShown] = useState(false);
  const [isProjectAdded, setIsProjectAdded] = useState(false);
  const [isProjEditDialogOpen, setIsProjEditDialogOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40">
        <Navbar />
      </header>
      <main className="px-10 py-10 space-y-7 relative">
        <button
          onClick={() => {
            setIsAddProjFormShown(true);
          }}
          className="bg-[var(--color-pink)] text-white cursor-pointer px-3 py-1 rounded-lg"
        >
          Add project
        </button>
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
        {isProjEditDialogOpen && (
          <ProjEditDialog setIsProjEditDialogOpen={setIsProjEditDialogOpen} />
        )}
      </main>
    </>
  );
};
