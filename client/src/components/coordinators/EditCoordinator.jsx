/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { departments } from "../../constants";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCoordinator = ({ open, handleOpen }) => {
  const [coordinator, setCoordinator] = useState({});
  const [department, setDepartment] = useState("");
  const { register, handleSubmit, formState, reset, clearErrors } = useForm();
  const { errors, isSubmitSuccessful } = formState;
  const errorMessages = Object.values(errors);
  if (errorMessages.length !== 0) {
    toast.error(errorMessages[0]?.message);
    clearErrors();
  }
  if (isSubmitSuccessful) {
    reset();
  }
  useEffect(() => {
    setCoordinator({});
  }, []);
  const addNewCoordinator = async (data) => {
    data.department = department;
    console.log(data);
  };
  return (
    <Dialog open={open} handler={handleOpen} size="xs">
      <DialogHeader className="flex items-center justify-between">
        <p>Edit details</p>
        <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={handleOpen} />
      </DialogHeader>
      <DialogBody>
        <form
          onSubmit={handleSubmit(addNewCoordinator)}
          className="flex flex-col gap-5"
        >
          <Input
            required
            label="Coordinator Name"
            type="text"
            defaultValue={coordinator?.name}
            {...register("name", {
              required: {
                value: true,
                message: "Coordinator name is required !",
              },
            })}
          />
          <Select
            label="Department"
            value={coordinator?.department}
            onChange={(e) => setDepartment(e)}
            required
          >
            {departments.map((dept, index) => {
              return (
                <Option value={dept} key={index}>
                  {dept}
                </Option>
              );
            })}
          </Select>
          <Input
            required
            type="email"
            label="Email"
            defaultValue={coordinator?.email}
            {...register("email", {
              required: {
                value: true,
                message: "Email is required !",
              },
            })}
          />

          <Button type="submit" className="w-fit mx-auto">
            Edit Details
          </Button>
        </form>
      </DialogBody>
      <ToastContainer />
    </Dialog>
  );
};

export default EditCoordinator;
