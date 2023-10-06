import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Select,
  Input,
  Option,
} from "@material-tailwind/react";
import AddCoordinator from "./AddCoordinator";
import { useEffect, useState } from "react";
import CoordinatorsTable from "./CoordinatorsTable";
import { handleCoordinatorSearch } from "../../../utils/search";
import { departments } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoordinators } from "../../redux/adminSlice";
import Loading from "../Loading";

export default function Coordinators() {
  const { coordinators, isLoading } = useSelector((state) => state["admin"]);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("ALL");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchCoordinators = async () => {
      await dispatch(getAllCoordinators());
    };
    fetchCoordinators();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card className="h-full w-full shadow-none">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" className="text-black">
              Coordinators List
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={handleOpen}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
              Coordinator
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="shadow-none px-0">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row px-4">
          <div className="w-7">
            <Select label="Filter By Dept" onChange={(e) => setDepartment(e)}>
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
              onChange={(e) => setQuery(e.target.value)}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <CoordinatorsTable
          data={handleCoordinatorSearch(query, department, coordinators)}
        />
      </CardBody>

      <AddCoordinator open={open} handleOpen={handleOpen} />
    </Card>
  );
}
