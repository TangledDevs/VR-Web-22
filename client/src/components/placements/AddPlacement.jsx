/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { departments } from "../../constants";
import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddPlacement = ({ open, handleOpen }) => {
  const { students } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  if (!students) {
    dispatch();
  }
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");

  const filteredPeople =
    query === ""
      ? students
      : students.filter((student) => {
          return student.toLowerCase().includes(query.toLowerCase());
        });

  const form = useForm();
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
  const handleAddPlacement = async (data) => {
    console.log(data);
  };
  return (
    <Dialog size="xs" open={open} handler={handleOpen}>
      <DialogHeader className="flex items-center justify-between">
        <p>Add new Student details</p>
        <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={handleOpen} />
      </DialogHeader>
      <DialogBody>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handleAddPlacement)}
        >
          <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Options>
              {filteredPeople.map((person) => (
                <Combobox.Option key={person} value={person}>
                  {person}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
          <Input
            type="text"
            label="Company"
            {...register("company", {
              required: {
                value: true,
                message: "Company name is required !",
              },
            })}
          />
          <Input
            type="text"
            label="Role"
            {...register("position", {
              required: {
                value: true,
                message: "Job Role is required !",
              },
            })}
          />
          <Select label="Select Department">
            {departments.slice(1).map((dept, index) => {
              return (
                <Option key={index} value={dept}>
                  {dept}
                </Option>
              );
            })}
          </Select>
          <Input
            type="text"
            label="CTC"
            {...register("ctc", {
              required: {
                value: true,
                message: "CTC is required !",
              },
              validate: {
                isNumber: (fieldValue) => {
                  return Number(fieldValue) || "Enter a valid number";
                },
                isPositive: (fieldValue) => {
                  return (
                    Number(fieldValue) > 0 || "CTC should be greater than zero"
                  );
                },
              },
            })}
          />
          <Input
            type="date"
            label="Placment Date"
            {...register("placementDate", {
              required: {
                value: true,
                message: "Placement Date is required !",
              },
              valueAsDate: true,
            })}
          />
          <Button type="submit" className="w-fit mx-auto">
            Add Placement
          </Button>
        </form>
      </DialogBody>
      <ToastContainer />
    </Dialog>
  );
};

export default AddPlacement;
