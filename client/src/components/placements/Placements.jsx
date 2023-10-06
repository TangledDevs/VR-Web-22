import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import DashboardDropdown from "../DashboardDropdown";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";

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

const years = {
  label: "Passout Year",
  values: [2020, 2021, 2022, 2023, 2024, 2025],
};

const departments = {
  label: "Departments",
  values: [
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
  ],
};

export default function Placements() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className=" flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5">Campus Placement Details</Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              Upload Details
            </Button>
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={handleOpen}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Placement
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-auto px-0">
        <div className="flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="w-full md:w-72 ">
            <DashboardDropdown {...years} />
          </div>

          <div className="w-full md:w-72 ">
            <DashboardDropdown {...departments} />
          </div>

          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>

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
            {TABLE_ROWS.map(
              (
                {
                  image,
                  rollNo,
                  student,
                  email,
                  company,
                  role,
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
                        <Avatar src={image} alt={student} size="sm" />
                        <div className="flex flex-col">
                          <Typography variant="small" className="font-normal">
                            {student}
                          </Typography>
                          <Typography
                            variant="small"
                            className="font-normal opacity-70"
                          >
                            {rollNo}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {company}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {role}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {passoutYear}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {department}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {placementDate}
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
      </CardBody>
    </Card>
  );
}
