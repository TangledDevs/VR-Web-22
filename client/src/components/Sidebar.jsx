/* eslint-disable react/prop-types */
import { links } from "../../utils/links";
import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <aside className="w-24 h-screen fixed px-2 bg-white border-r border-r-blue-gray-50">
      <div className="">
        <div className="w-20 h-20 flex flex-col gap-[2px] items-center justify-center cursor-pointer hover:bg-blue-gray-50">
          <LuLayoutDashboard alt="home-icon" size={24} />
          <div className="text-xs">Home</div>
        </div>
        <div className="w-20 h-20 flex flex-col gap-[2px] items-center justify-center cursor-pointer hover:bg-blue-gray-50">
          <PiStudent alt="students" size={24} />
          <div className="text-xs">Students</div>
        </div>
        <div className="w-20 h-20 flex flex-col gap-[2px] items-center justify-center cursor-pointer hover:bg-blue-gray-50">
          <GrUserManager alt="home-icon" size={24} />
          <div className="text-xs">Coordinators</div>
        </div>
        <div className="w-20 h-20 flex flex-col gap-[2px] items-center justify-center cursor-pointer hover:bg-blue-gray-50">
          <PiSuitcaseSimple alt="home-icon" size={24} />
          <div className="text-xs">Placements</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
