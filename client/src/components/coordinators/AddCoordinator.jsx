/* eslint-disable react/prop-types */
import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { addCoordinator } from "../../redux/adminSlice";

const AddCoordinator = ({ open, handleOpen }) => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const { register, handleSubmit, formState, reset, clearErrors } = useForm();
  const { errors, isSubmitSuccessful } = formState;
  const errorMessages = Object.values(errors);
  if (errorMessages.length !== 0) {
    toast.error(errorMessages[0]?.message);
    clearErrors();
  }
  const addNewCoordinator = async (data) => {
    data.department = department;
    const response = await dispatch(addCoordinator(data));
    if (response.meta.requestStatus === "fulfilled") {
      handleOpen();
    } else {
      toast.error(response?.error?.data?.message);
    }
  };
  if (isSubmitSuccessful) {
    reset();
  }
  return (
    <Dialog open={open} handler={handleOpen} size="xs">
      <DialogHeader className="flex items-center justify-between">
        <p>Add New Coordinator</p>
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
            {...register("name", {
              required: {
                value: true,
                message: "Coordinator name is required !",
              },
            })}
          />
          <Select
            label="Department"
            onChange={(e) => setDepartment(e)}
            required
          >
            {departments.slice(1).map((dept, index) => {
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
            {...register("email", {
              required: {
                value: true,
                message: "Email is required !",
              },
            })}
          />
          <Input
            label="Coordinator Contact"
            type="text"
            required
            {...register("contact", {
              required: {
                value: true,
                message: "Coordinator contact is required !",
              },
              validate: {
                isvalid: (fieldValue) => {
                  return Number(fieldValue) || "Enter a valid contact number";
                },
                isValidLength: (fieldValue) => {
                  return (
                    fieldValue.length === 10 ||
                    "Contact number must be 10 digits"
                  );
                },
              },
            })}
          />

          <Input
            required
            type="text"
            label="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required !",
              },
            })}
          />
          <Button type="submit" className="w-fit mx-auto">
            Add coordinator
          </Button>
        </form>
        <ToastContainer />
      </DialogBody>
    </Dialog>
  );
};

export default AddCoordinator;
