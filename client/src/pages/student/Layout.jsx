import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
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
        <main className="lg:ml-24 p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
