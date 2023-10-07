import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import DashboardDropdown from "./DashboardDropdown";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import AddStudent from "./students/AddStudent";
import Upload from "./admin/Upload";

const TABLE_HEAD = [
  "student",
  "Email",
  "Gender",
  "Department",
  "Passout Year",
  "Placed",
  "Placed On",
  "",
];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    rollNo: "20BQ1A05L5",
    email: "john@creative-tim.com",
    passoutYear: "2020",
    gender: "Male",
    branch: "CSE",
    isPlaced: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    rollNo: "20BQ1A05L5",
    email: "alexa@creative-tim.com",
    passoutYear: "2020",
    branch: "CSE",
    gender: "Male",
    isPlaced: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    rollNo: "20BQ1A05L5",
    gender: "Male",
    email: "laurent@creative-tim.com",
    passoutYear: "2020",
    branch: "CSE",
    isPlaced: true,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    rollNo: "20BQ1A05L5",
    gender: "Male",
    email: "michael@creative-tim.com",
    passoutYear: "2020",
    branch: "CSE",
    isPlaced: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    rollNo: "20BQ1A05L5",
    email: "richard@creative-tim.com",
    passoutYear: "2020",
    branch: "CSE",
    gender: "Male",
    isPlaced: true,
    date: "04/10/21",
  },
];

const years = {
  label: "Passout Year",
  values: [2020, 2021, 2022, 2023, 2024, 2025],
};

const placed = {
  label: "Placed",
  values: ["Yes", "No"],
};

const department = {
  label: "Departments",
  values: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"],
};

export default function DashboardTable() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className=" flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Student list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Student
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Upload />
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={handleOpen}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add student
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <div className="flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="w-full md:w-72 ">
            <DashboardDropdown {...years} />
          </div>
          <div className="w-full md:w-72 ">
            <DashboardDropdown {...placed} />
          </div>
          <div className="w-full md:w-72 ">
            <DashboardDropdown {...department} />
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
                    color="blue-gray"
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
                  img,
                  name,
                  rollNo,
                  email,
                  isPlaced,
                  passoutYear,
                  gender,
                  branch,
                  date,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {rollNo}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {gender}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {branch}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {passoutYear}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={isPlaced ? "true" : "false"}
                          color={isPlaced ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
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
      <AddStudent open={open} handleOpen={handleOpen} />
    </Card>
  );
}
