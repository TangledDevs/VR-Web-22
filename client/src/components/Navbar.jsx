import { MdNotificationsNone } from "react-icons/md";

import LoginDropdown from "./LoginDropdown";

export function Navbar() {
  return (
    <div className="w-full bg-white z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:py-[18px] sm:px-6 lg:px-8 h-[87px]">
        <div className="inline-flex items-center space-x-2 cursor-pointer">
          {/* <img
            src={Logo}
            alt="Vaaradhi Logo"
            className="h-8 w-8 lg:h-11 lg:w-11"
          /> */}
          <span className="text-xl lg:text-2xl font-bold">Job Gateway</span>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <MdNotificationsNone size={35} className="text-3xl cursor-pointer" />
          <div className="">
            <LoginDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
