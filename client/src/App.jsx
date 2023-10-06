import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Layout as AdminLayout } from "./pages/admin/Layout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Layout as CoordinatorLayout } from "./pages/coordinator/Layout";
import { Layout as StudentLayout } from "./pages/student/Layout";
import Coordinators from "./components/coordinators/Coordinators";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardTable from "./components/DashboardTable";
import LoginForm from "./components/LoginForm";
import Placements from "./components/placements/Placements";
import { Student } from "./components/students/Student";
import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import OfferLetters from "./pages/coordinator/OfferLetters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<AdminDashboard />} />
          <Route path="coordinators" element={<Coordinators />} />
          <Route path="students" element={<DashboardTable />} />
          <Route path="placements" element={<Placements />} />

          {/* <Route path="/companies" element={<Companies />} /> */}
          {/* <Route path="/coordinators" element={<Coordinators />} /> */}
          {/* <Route path="/reports" element={<Reports />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>

        {/* Co-ordinator routes */}
        <Route path="/coordinator" element={<CoordinatorLayout />}>
          <Route path="home" element={<CoordinatorDashboard />} />
          <Route path="offerletters" element={<OfferLetters />} />
        </Route>

        {/* Student routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="home" element={<Student />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
