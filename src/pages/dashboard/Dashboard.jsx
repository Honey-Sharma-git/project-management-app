import { ProjectTable } from "../../components/ProjectTable";
import { Navbar } from "../../components/Navbar";
import { AddProjForm } from "../../components/AddProjForm";
import { useState } from "react";
export const Dashboard = () => {
  const [isAddProjFormShown, setIsAddProjFormShown] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40">
        <Navbar />
      </header>
      <main className="px-10 py-10 space-y-7">
        <button
          onClick={() => {
            setIsAddProjFormShown(true);
          }}
          className="bg-[var(--color-pink)] text-white cursor-pointer px-3 py-1 rounded-lg"
        >
          Add project
        </button>
        {isAddProjFormShown && (
          <AddProjForm setIsAddProjFormShown={setIsAddProjFormShown} />
        )}
        <ProjectTable />
      </main>
    </>
  );
};
