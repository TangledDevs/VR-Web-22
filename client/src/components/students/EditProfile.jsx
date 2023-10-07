import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/studentSlice";

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const handleOpen = () => setOpen(!open);

  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", profile);

    console.log(formData.get("file"));
    try {
      await dispatch(updateProfile(formData));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Update
      </Button>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <form action="" onSubmit={handleSubmit}>
          <DialogHeader className="text-2xl">Choose profile photo</DialogHeader>
          <DialogBody divider>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                name="file"
                id="profile"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600
    "
              />
            </label>
          </DialogBody>
          <DialogFooter className="gap-2">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              classNameName="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              type="submit"
              color="green"
              onClick={handleOpen}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
