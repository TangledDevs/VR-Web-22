/* eslint-disable react/prop-types */
import { links } from "../../utils/links";

const Sidebar = ({ role }) => {
  return (
    <aside className="w-24 h-screen fixed px-2 bg-white border-r border-r-blue-gray-50">
      {links[role].map((link, index) => (
        <div
          key={index}
          className="w-20 h-20 flex flex-col gap-[2px] items-center justify-center cursor-pointer hover:bg-blue-gray-50"
        >
          {link.icon}
          <div className="text-xs">{link.text}</div>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
