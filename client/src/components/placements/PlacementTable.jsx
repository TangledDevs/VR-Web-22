import { Avatar, Typography } from "@material-tailwind/react";
import React from "react";
import { formatDate } from "../../../utils/formatDate";
const TABLE_HEAD = [
  "student",
  "Email",
  "Company",
  "Role",
  "Department",
  "Passout Year",
  "Placed On",
];
const TABLE_ROWS = [
  {
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    student: "John Doe",
    rollNo: "20bq1a05p2",
    email: "john.doe@example.com",
    company: "ABC Corporation",
    role: "Software Engineer",
    department: "Engineering",
    passoutYear: 2022,
    placementDate: "2022-06-15",
  },
  {
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    student: "Jane Smith",
    rollNo: "20bq1a05p2",
    email: "jane.smith@example.com",
    company: "XYZ Tech",
    role: "Product Manager",
    department: "Product Management",
    passoutYear: 2021,
    placementDate: "2021-09-20",
  },
  {
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    student: "Bob Johnson",
    rollNo: "20bq1a05p2",
    email: "bob.johnson@example.com",
    company: "LMN Innovations",
    role: "Data Analyst",
    department: "Analytics",
    passoutYear: 2023,
    placementDate: "2023-05-10",
  },
];
const PlacementTable = ({ data }) => {
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
                student,

                company,
                position,
                department,
                passoutYear,
                placementDate,
              },
              index
            ) => {
              const isLast = index === TABLE_ROWS.length - 1;
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
                  {/* <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td> */}
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
