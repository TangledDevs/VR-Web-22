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
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import PlacementTable from "./PlacementTable";
import { handlePlacementSearch } from "../../../utils/search";
import { useDispatch, useSelector } from "react-redux";
import { getPlacements } from "../../redux/adminSlice";
import Loading from "../Loading";
import AddPlacement from "./AddPlacement";
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
  const { placements, isLoading } = useSelector((state) => state["admin"]);
  console.log(placements);
  const [query, setQuery] = useState("");
  const [passoutYear, setPassoutYear] = useState("");
  const [department, setDepartment] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchPlacements = async () => {
      const response = await dispatch(getPlacements());
    };
    fetchPlacements();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
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
              <UserPlusIcon
                strokeWidth={2}
                className="h-4 w-4"
                onClick={handleOpen}
              />{" "}
              Add Placement
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

        <PlacementTable
          data={handlePlacementSearch(
            query,
            passoutYear,
            department,
            placements
          )}
        />
      </CardBody>
      <AddPlacement open={open} handleOpen={handleOpen} />
    </Card>
  );
}
