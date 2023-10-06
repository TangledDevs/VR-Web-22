import LoginDropdown from "./LoginDropdown";
import NotificationsMenu from "./Notifications";

export function Navbar() {
  return (
    <div className="w-full fixed bg-white border-b h-20 border-b-blue-gray-50 z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-2 lg:py-[18px] sm:px-6 lg:px-8 h-[87px]">
        <div className="inline-flex items-center space-x-2 cursor-pointer">
          <span className="text-xl lg:text-2xl font-bold">Job Gateway</span>
        </div>
        <div className="flex justify-center items-center space-x-8">
          <NotificationsMenu />
          <LoginDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
