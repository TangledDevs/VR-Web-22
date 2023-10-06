import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default function NotificationsMenu() {
  return (
    <Menu>
      <MenuHandler>
        <IconButton variant="text">
          <IoNotificationsOutline size={34} />
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2">
        <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
          <CheckCircleIcon className="w-8 h-8 text-green-500" />
          <div className="flex flex-col gap-1">
            <Typography variant="small" color="gray" className="font-normal">
              You&apos;re selected in Amazon
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <ClockIcon />
              13 minutes ago
            </Typography>
          </div>
        </MenuItem>
        <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
          <XCircleIcon className="w-8 h-8 text-red-500" />
          <div className="flex flex-col gap-1">
            <Typography variant="small" color="gray" className="font-normal">
              Your offer letter is invalid
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <ClockIcon />a hour ago
            </Typography>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
