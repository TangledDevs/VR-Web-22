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
import { useDispatch } from "react-redux";
import { departments } from "../../constants";
import { toast } from "react-toastify";
import EditCoordinator from "./EditCoordinator";
import { useState } from "react";
import { deleteCoordinator, setCoordinator } from "../../redux/adminSlice";

const TABLE_HEAD = ["Coordinator", "Email", "Contact", "Department", "Action"];

const CoordinatorsTable = ({ data }) => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  return (
    <div>
      <Card className="shadow-none px-0">
        <CardBody className="overflow-auto px-0">
          <table className="w-full min-w-max table-auto text-left">
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
                ({ _id, image, name, email, contact, department }, index) => {
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
                          <IconButton
                            variant="text"
                            onClick={() => {
                              console.log(_id);
                              dispatch(setCoordinator({ id: _id }));

                              handleOpenEdit();
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Remove Coordinator">
                          <IconButton variant="text">
                            <TrashIcon
                              className="h-6 w-6 hover:text-red-500"
                              onClick={() =>
                                dispatch(deleteCoordinator({ id: _id }))
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
