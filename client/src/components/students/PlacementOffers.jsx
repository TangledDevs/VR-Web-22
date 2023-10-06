import { Card, Typography } from "@material-tailwind/react";
// import { useState } from "react";
import Upload from "./Upload";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyPlacementResults } from "../../redux/studentSlice";

const TABLE_HEAD = ["Company", "Role", "Ctc", "Placement Date", "Action"];

const TABLE_ROWS = [
  {
    company: "Microsoft",
    role: "Software Engineer",
    ctc: 10,
    placementDate: "15-08-2023",
  },
  {
    company: "Apple",
    role: "iOS Developer",
    ctc: 9,
    placementDate: "12-09-2023",
  },
  {
    company: "Amazon",
    role: "Cloud Architect",
    ctc: 11,
    placementDate: "18-07-2023",
  },
  {
    company: "Facebook",
    role: "Data Scientist",
    ctc: 12,
    placementDate: "05-10-2023",
  },
  {
    company: "Netflix",
    role: "Frontend Developer",
    ctc: 8,
    placementDate: "20-06-2023",
  },
];

export default function PlacementOffers() {
  const dispatch = useDispatch();
  const { placements, isLoading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getMyPlacementResults());
  }, []);

  // const [open, setOpen] = useState(false);

  if (isLoading) return <h1>Loading...</h1>;
  // const handleOpen = () => setOpen(!open);
  return (
    <Card className="h-full w-full overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
          {placements.map(({ _id, company, role, placementDate, ctc }, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {company}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {role}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {ctc}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {placementDate}
                </Typography>
              </td>
              <td className="p-4">
                <Upload id={_id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
