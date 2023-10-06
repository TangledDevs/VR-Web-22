import { GrUserManager } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent, PiSuitcaseSimple } from "react-icons/pi";

export const links = {
  admin: [
    { icon: <LuLayoutDashboard size={24} />, text: "Home" },
    { icon: <PiStudent size={24} />, text: "Students" },
    { icon: <GrUserManager size={24} />, text: "Coordinators" },
    { icon: <PiSuitcaseSimple size={24} />, text: "Placements" },
  ],
  coordinator: [
    { icon: <LuLayoutDashboard size={24} />, text: "Home" },
    { icon: <PiStudent size={24} />, text: "Students" },
    { icon: <PiSuitcaseSimple size={24} />, text: "Placements" },
  ],
  //   student: [],
};
