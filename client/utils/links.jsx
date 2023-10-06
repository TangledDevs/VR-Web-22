import { GrUserManager } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent, PiSuitcaseSimple } from "react-icons/pi";

export const links = {
  admin: [
    { icon: <LuLayoutDashboard size={24} />, text: "Home", href: "home" },
    { icon: <PiStudent size={24} />, text: "Students", href: "students" },
    {
      icon: <GrUserManager size={24} />,
      text: "Coordinators",
      href: "coordinators",
    },
    {
      icon: <PiSuitcaseSimple size={24} />,
      text: "Placements",
      href: "placements",
    },
  ],
  coordinator: [
    { icon: <LuLayoutDashboard size={24} />, text: "Home", href: "home" },
    { icon: <PiStudent size={24} />, text: "Students", href: "students" },
    {
      icon: <PiSuitcaseSimple size={24} />,
      text: "Placements",
      href: "placements",
    },
  ],
  //   student: [],
};
