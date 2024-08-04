import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProgrammesList from "./pages/admin-dashboard/ProgrammesList";
import ProgrammesCreate from "./pages/admin-dashboard/ProgrammesCreate";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProgrammesList />} />
        <Route path="/admin/create" element={<ProgrammesCreate />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
