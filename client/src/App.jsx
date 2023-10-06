import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Layout as AdminLayout } from "./pages/admin/Layout";
import { Layout as CoordinatorLayout } from "./pages/coordinator/Layout";
import { Layout as StudentLayout } from "./pages/student/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}></Route>

        {/* Co-ordinator routes */}
        <Route path="/coordinator" element={<CoordinatorLayout />}></Route>

        {/* Student routes */}
        <Route path="/student" element={<StudentLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
