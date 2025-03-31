import { ProjectTable } from "../../components/ProjectTable";
import { Navbar } from "../../components/Navbar";
export const Dashboard = () => {
  return (
    <>
      <header className="sticky top-0 z-40">
        <Navbar />
      </header>
      <main className="px-10 py-10">
        <ProjectTable />
      </main>
    </>
  );
};
