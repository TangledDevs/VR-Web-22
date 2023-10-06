import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Layout as AdminLayout } from "./pages/admin/Layout";
import { Layout as CoordinatorLayout } from "./pages/coordinator/Layout";
import { Layout as StudentLayout } from "./pages/student/Layout";
import Coordinators from "./components/coordinators/Coordinators";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="coordinators" element={<Coordinators />} />
        </Route>

        {/* Co-ordinator routes */}
        <Route path="/coordinator" element={<CoordinatorLayout />}></Route>

        {/* Student routes */}
        <Route path="/student" element={<StudentLayout />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
