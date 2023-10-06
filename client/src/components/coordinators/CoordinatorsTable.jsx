/* eslint-disable react/prop-types */
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Input,
  Typography,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Option,
  Card,
} from "@material-tailwind/react";
import { departments } from "../../constants";
import { toast } from "react-toastify";
import EditCoordinator from "./EditCoordinator";
import { useState } from "react";

const TABLE_HEAD = ["Coordinator", "Email", "Contact", "Department", "Action"];

const CoordinatorsTable = ({ data }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  return (
    <div>
      <Card>
        <CardBody className="overflow-auto px-4  mt-0">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-7">
              <Select label="Filter By Dept" value={"ALL"}>
                <Option value={"ALL"} key={99}>
                  {"ALL"}
                </Option>
                {departments.map((dept, index) => {
                  return (
                    <Option value={dept} key={index}>
                      {dept}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>

          <table className="w-full min-w-max table-auto text-left mt-10">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      className="font-normal leading-none text-black"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map(
                ({ image, name, email, contact, department }, index) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={image} alt={name} size="sm" />
                          <div className="flex flex-col">
                            <Typography variant="small" className="font-normal">
                              {name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <Typography variant="small" className="font-normal">
                            {email}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography variant="small" className="font-normal">
                            {contact}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography variant="small" className="font-normal">
                          {department}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit">
                          <IconButton variant="text" onClick={handleOpenEdit}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Remove Coordinator">
                          <IconButton variant="text">
                            <TrashIcon
                              className="h-6 w-6 hover:text-red-500"
                              onClick={() =>
                                toast.success("Coordinator Removed !")
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <EditCoordinator open={openEdit} handleOpen={handleOpenEdit} />
    </div>
  );
};

export default CoordinatorsTable;
