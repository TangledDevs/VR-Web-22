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
import PlacementTable from "./PlacementTable";
import { handlePlacementSearch } from "../../../utils/search";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents, getPlacements } from "../../redux/adminSlice";
import Loading from "../Loading";
import AddPlacement from "./AddPlacement";
import { getMyDeptPlacements } from "../../redux/coordinatorSlice";
import { useLocation } from "react-router-dom";
import PlacementUpload from "../admin/PlacementsUpload";

const years = {
  label: "Passout Year",
  values: ["ALL", 2020, 2021, 2022, 2023, 2024, 2025],
};

const departments = {
  label: "Departments",
  values: [
    "ALL",
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
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const { students } = useSelector((state) => state["admin"]);
  const paths = pathname.split("/");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (paths[1] === "coordinator") {
        await dispatch(getMyDeptPlacements());
      } else {
        await dispatch(getPlacements());
        await dispatch(getAllStudents());
      }
    };

    fetchData();
  }, []);

  const { placements, isLoading } = useSelector((state) => state[paths[1]]);

  const [passoutYear, setPassoutYear] = useState("ALL");
  const [department, setDepartment] = useState("ALL");

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        {paths[1] === "admin" && (
          <div className=" flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5">Campus Placement Details</Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <PlacementUpload />
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={handleOpen}
              >
                <UserPlusIcon
                  strokeWidth={2}
                  className="h-4 w-4"
                  onClick={handleOpen}
                />{" "}
                Add Placement
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
      <CardBody className="overflow-auto px-0 min-h-[20rem]">
        <div className="flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="w-72">
            <Select label={years.label} onChange={(e) => setPassoutYear(e)}>
              {years.values?.map((option, index) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>

          {paths[1] === "admin" && (
            <div className="w-full md:w-72 ">
              <Select
                label={departments.label}
                onChange={(e) => setDepartment(e)}
              >
                {departments.values?.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <PlacementTable
          data={handlePlacementSearch(
            query,
            passoutYear,
            department,
            placements
          )}
        />
      </CardBody>
      <AddPlacement open={open} handleOpen={handleOpen} students={students} />
    </Card>
  );
}
