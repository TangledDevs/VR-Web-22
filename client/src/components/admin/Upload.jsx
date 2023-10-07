import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";

import { uploadBulkData } from "../../redux/adminSlice";

export default function Upload() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [studentsData, setStudentsData] = useState(null);

  const handleOpen = () => setOpen(!open);

  const handleFileChange = (e) => {
    setStudentsData(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData1 = new FormData();

    formData1.append("bulkUpload", studentsData);

    console.log(formData1.get("bulkUpload"));
    try {
      await dispatch(uploadBulkData(formData1));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Upload
      </Button>

      <Dialog size="xs" open={open} handler={handleOpen}>
        <form action="" onSubmit={handleSubmit}>
          <DialogHeader className="text-2xl">Upload Students Data</DialogHeader>
          <DialogBody className="space-y-2" divider>
            <Button variant="outlined">
              <a
                download
                href="https://vrweb22.s3.ap-south-1.amazonaws.com/students.xlsx"
              >
                Download Excel Template
              </a>
            </Button>
            <label className="block">
              <input
                type="file"
                name="bulkUpload"
                id="bulkUpload"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600"
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
