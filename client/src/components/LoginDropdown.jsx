import {
  Popover,
  PopoverHandler,
  PopoverContent,
  List,
  ListItem,
} from "@material-tailwind/react";

export default function LoginDropdown() {
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <img
          src="https://storage.googleapis.com/file-transfer-application/studentdummy%20image.jpg"
          alt=""
          className="rounded-full h-10 w-10 cursor-pointer"
        />
      </PopoverHandler>
      <PopoverContent className="w-72">
        <List className="p-0">
          <a href="#" className="text-initial">
            <ListItem>Profile</ListItem>
          </a>
          <a href="#" className="text-initial">
            <ListItem>Settings</ListItem>
          </a>
          <a href="#" className="text-initial">
            <ListItem>Logout</ListItem>
          </a>
        </List>
      </PopoverContent>
    </Popover>
  );
}
