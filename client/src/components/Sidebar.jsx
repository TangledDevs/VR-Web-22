/* eslint-disable react/prop-types */
import { links } from "../../utils/links";
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <aside className="w-24 h-screen fixed px-2 bg-white border-r border-r-blue-gray-50">
      {links[role].map((link, index) => (
        <Link
          to={link.href}
          key={index}
          className="w-20 h-20 flex flex-col gap-[2px] items-center justify-center cursor-pointer hover:bg-blue-gray-50"
        >
          {link.icon}
          <div className="text-xs">{link.text}</div>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
