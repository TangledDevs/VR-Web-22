import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Layout as AdminLayout } from "./pages/admin/Layout";
import { Layout as CoordinatorLayout } from "./pages/coordinator/Layout";
import { Layout as StudentLayout } from "./pages/student/Layout";
import DashboardTable from "./components/DashboardTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route path="/" element={<Dashboard />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="students" element={<DashboardTable />} />
          {/* <Route path="/placements" element={<Placements />} /> */}
          {/* <Route path="/companies" element={<Companies />} /> */}
          {/* <Route path="/coordinators" element={<Coordinators />} /> */}
          {/* <Route path="/reports" element={<Reports />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>

        {/* Co-ordinator routes */}
        <Route path="/coordinator" element={<CoordinatorLayout />}></Route>

        {/* Student routes */}
        <Route path="/student" element={<StudentLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
