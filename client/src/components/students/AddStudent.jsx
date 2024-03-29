import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { genders, passoutYears } from "../../constants";
import { useDispatch } from "react-redux";
import { addStudent } from "../../redux/adminSlice";

const AddStudent = ({ open, handleOpen }) => {
  const dispatch = useDispatch();
  const form = useForm();
  const [department, setDepartment] = useState("");
  const [passoutYear, setPassOutYear] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, reset, clearErrors } = form;
  const { errors, isSubmitSuccessful } = formState;
  const errorMessages = Object.values(errors);
  if (errorMessages.length !== 0) {
    toast.error(errorMessages[0]?.message);
    clearErrors();
  }
  if (isSubmitSuccessful) {
    reset();
  }
  const handleAddStudent = async (data) => {
    data.department = department;
    data.passoutYear = passoutYear;
    data.gender = gender;
    setIsLoading(true);
    const response = await dispatch(addStudent(data));
    if (response.meta.requestStatus === "fulfilled") {
      handleOpen();
    }
    setIsLoading(false);
  };
  const departments = [
    "CSE",
    "IT",
    "MECH",
    "ECE",
    "EEE",
    "CIVIL",
    "AIDS",
    "AIML",
    "IOT",
    "CIC",
  ];
  return (
    <Dialog open={open} handler={handleOpen} size="lg">
      <DialogHeader className="flex items-center justify-between">
        <p>Add new Student details</p>
        <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={handleOpen} />
      </DialogHeader>
      <DialogBody>
        <form
          onSubmit={handleSubmit(handleAddStudent)}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 "
        >
          <Input
            label="Student Name"
            type="text"
            required
            {...register("name", {
              required: {
                value: true,
                message: "Student Name is required !",
              },
            })}
          />
          <Input
            label="Student Roll no"
            type="rollNo"
            required
            {...register("rollNo", {
              required: {
                value: true,
                message: "Student rollno is required",
              },
            })}
          />
          <Input
            label="Email"
            type="email"
            required
            {...register("email", {
              required: {
                value: true,
                message: "Student Email is required ",
              },
            })}
          />
          <Input
            label="Date of Birth"
            type="date"
            required
            {...register("dateOfBirth", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Student DOB is required !",
              },
            })}
          />
          <Input
            label="Student Contact"
            type="text"
            required
            {...register("contact", {
              required: {
                value: true,
                message: "Student contact is required !",
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
            label="Student Password"
            type="text"
            required
            {...register("password", {
              required: {
                value: true,
                message: "Student Password is required !",
              },
            })}
          />
          <Select label="Select Department" onChange={(e) => setDepartment(e)}>
            {departments.map((dept, index) => {
              return (
                <Option value={dept} key={index}>
                  {dept}
                </Option>
              );
            })}
          </Select>
          <Select label="Year of Passout" onChange={(e) => setPassOutYear(e)}>
            {passoutYears.map((year, index) => {
              return (
                <Option value={year} key={index}>
                  {year}
                </Option>
              );
            })}
          </Select>
          <Select label="Gender" onChange={(e) => setGender(e)}>
            {genders.map((year, index) => {
              return (
                <Option value={year} key={index}>
                  {year}
                </Option>
              );
            })}
          </Select>
          <div className="col-span-2">
            <Textarea
              label="Address"
              required
              {...register("address", {
                required: {
                  value: true,
                  message: "Student Addess is required ",
                },
              })}
            />
          </div>
          <Button type="submit" className="col-span-2 mx-auto w-fit">
            {isLoading ? "Adding..." : "Add Student"}
          </Button>
        </form>
      </DialogBody>
      <ToastContainer />
    </Dialog>
  );
};

export default AddStudent;
