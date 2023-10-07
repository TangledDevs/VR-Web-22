/* eslint-disable react/prop-types */
import { Avatar, IconButton, Typography } from "@material-tailwind/react";
import React from "react";
import { formatDate } from "../../../utils/formatDate";
import { Tooltip } from "chart.js";
import {
  CheckCircleIcon,
  CheckIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { validateOfferLetter } from "../../redux/coordinatorSlice";
import Loading from "../Loading";
const TABLE_HEAD = [
  "student",
  "Email",
  "Company",
  "Role",
  "Department",
  "Passout Year",
  "Placed On",
  "File",
  "Status",
  "Action",
];

const PlacementTable = ({ data }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state["coordinator"]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(
            (
              {
                _id,
                student,
                acceptanceStatus,
                company,
                position,
                offerLetterUrl,
                placementDate,
              },
              index
            ) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={student}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={student?.image}
                        alt={student?.name}
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal">
                          {student?.name || "NAME"}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal opacity-70"
                        >
                          {student?.rollNo || "RollNo"}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {student?.email || "Email"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {company}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {position}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {student?.department || "DEPT"}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {student?.passoutYear || "Passout year"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {formatDate(placementDate)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {offerLetterUrl ? (
                      <a href={offerLetterUrl}>View</a>
                    ) : (
                      <p>Not Uploaded</p>
                    )}
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {acceptanceStatus}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex justify-between">
                      <CheckCircleIcon
                        className="h-8 w-8 text-green-500 cursor-pointer"
                        onClick={() => {
                          dispatch(
                            validateOfferLetter({ id: _id, status: "Accepted" })
                          );
                        }}
                      />
                      <XCircleIcon
                        className="h-8 w-8 text-red-500 cursor-pointer"
                        onClick={() => {
                          dispatch(
                            validateOfferLetter({ id: _id, status: "Rejected" })
                          );
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlacementTable;
