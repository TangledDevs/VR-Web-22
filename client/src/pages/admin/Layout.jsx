import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Sidebar />
        <main className="lg:ml-24 p-4 bg-[#F6F8FA]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
