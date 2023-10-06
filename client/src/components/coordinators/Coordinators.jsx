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
import { useState } from "react";
import CoordinatorsTable from "./CoordinatorsTable";
import { handleCoordinatorSearch } from "../../../utils/search";
import { departments } from "../../constants";
const TABLE_ROWS = [
  {
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "555-555-5555",
    department: "Marketing",
  },
  {
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    contact: "555-555-5556",
    department: "Sales",
  },
  {
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    contact: "555-555-5557",
    department: "Finance",
  },
  {
    image:
      "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Mary Davis",
    email: "mary.davis@example.com",
    contact: "555-555-5558",
    department: "HR",
  },
];

export default function Coordinators() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Card className="h-full w-full shadow-none">
      <CardHeader floated={false} shadow={false} className="rounded-none px-0">
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
      <CardBody className="px-3 shadow-none">
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
              onChange={(e) => setQuery(e.target.value)}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <CoordinatorsTable data={handleCoordinatorSearch(query, TABLE_ROWS)} />
      </CardBody>

      <AddCoordinator open={open} handleOpen={handleOpen} />
    </Card>
  );
}