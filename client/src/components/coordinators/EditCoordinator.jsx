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
import { useDispatch, useSelector } from "react-redux";
import {  updateCoordinatorDetails } from "../../redux/adminSlice";

const EditCoordinator = ({ open, handleOpen,  }) => {
  const dispatch = useDispatch();
  const { coordinator } = useSelector((state) => state["admin"]);
  const [department, setDepartment] = useState(coordinator?.department);
  const { register, handleSubmit, formState, reset, clearErrors } = useForm();
  const { errors, isSubmitSuccessful } = formState;
  const errorMessages = Object.values(errors);
  if (errorMessages.length !== 0) {
    toast.error(errorMessages[0]?.message);
    clearErrors();
  }
  const handleEdit = async (data) => {
    data.department = department;
    data._id = coordinator._id;
    const response = await dispatch(updateCoordinatorDetails(data));
    console.log(response)
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
        <p>Edit Coordinator details</p>
        <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={handleOpen} />
      </DialogHeader>
      <DialogBody>
        <form
          onSubmit={handleSubmit(handleEdit)}
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
            defaultValue={coordinator?.email}
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
            defaultValue={coordinator?.contact}
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

          <Button type="submit" className="w-fit mx-auto">
            Update
          </Button>
        </form>
      </DialogBody>
      <ToastContainer />
    </Dialog>
  );
};

export default EditCoordinator;
