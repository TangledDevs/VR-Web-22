// import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect } from "react";

export const Layout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Sidebar role={"coordinator"} />
        <main className="lg:ml-24 p-4">
          {/* <Outlet /> */}
          Hello
        </main>
      </div>
    </>
  );
};

export default Layout;
