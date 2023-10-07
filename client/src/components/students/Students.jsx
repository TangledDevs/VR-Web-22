import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import DashboardDropdown from "../DashboardDropdown";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { getMyStudents } from "../../redux/coordinatorSlice";
import { getAllStudents } from "../../redux/adminSlice";
import StudentsTable from "../StudentsTable";
import { handleStudentSearch } from "../../../utils/search";

const years = {
  label: "Passout Year",
  values: [2020, 2021, 2022, 2023, 2024, 2025],
};

const departments = {
  label: "Departments",
  values: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"],
};
const Students = () => {
  const [passoutYear, setPassoutYear] = useState("");
  const [department, setDepartment] = useState("");
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  console.log(paths[1]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { isLoading, students } = useSelector((state) => state[paths[1]]);
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (paths[1] === "coordinator") {
        await dispatch(getMyStudents());
      } else {
        await dispatch(getAllStudents());
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  console.log(students);
  return (
    <Card>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className=" flex items-center justify-between gap-8 px-4">
          <div>
            <Typography variant="h5" color="blue-gray">
              Student list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Students
            </Typography>
          </div>
          {paths[1] === "admin" && (
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                Upload Details
              </Button>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleOpen}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add student
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardBody className="shadow-none px-3">
        <div className="flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="w-72">
            <Select label={"Passout Year"} onChange={(e) => setPassoutYear(e)}>
              {years.values?.map((option, index) => (
                <Option key={index}>{option}</Option>
              ))}
            </Select>
          </div>

          {paths[1] === "admin" && (
            <div className="w-72">
              <Select
                label={"Select Department"}
                onChange={(e) => setDepartment(e)}
              >
                {departments?.values?.map((option, index) => (
                  <Option key={index}>{option}</Option>
                ))}
              </Select>
            </div>
          )}

          <div className="w-full md:w-72">
            <Input
              onChange={(e) => setQuery(e.target.value)}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        {console.log(students.length)}

        <StudentsTable
          data={handleStudentSearch(query, passoutYear, students)}
        />
      </CardBody>
      <AddStudent open={open} handleOpen={handleOpen} />
    </Card>
  );
};

export default Students;
