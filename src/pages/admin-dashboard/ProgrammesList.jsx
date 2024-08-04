import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/Sidebar";
import TablesList from "./TablesList";

function ProgrammesList() {
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/programmes")
      .then((response) => response.json())
      .then((data) => setProgrammes(data))
      .catch((error) => console.error("Error fetching programmes:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/programmes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setProgrammes(programmes.filter((program) => program.id !== id));
        } else {
          console.error("Failed to delete programme");
        }
      })
      .catch((error) => console.error("Error deleting programme:", error));
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="w-full bg-white p-5 border">
        <h1 className="text-3xl font-extrabold pb-5">Programmes List</h1>
        <TablesList programmes={programmes} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default ProgrammesList;
