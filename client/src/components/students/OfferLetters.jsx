import { Card, Typography, CardBody, Chip } from "@material-tailwind/react";
import Upload from "./Upload";

const TABLE_HEAD = [
  "Company",
  "Role",
  "Ctc",
  "Placement Date",
  "Status",
  "Action",
];

const TABLE_ROWS = [
  {
    company: "Microsoft",
    role: "Software Engineer",
    ctc: 10,
    status: "Valid",
    placementDate: "15-08-2023",
  },
  {
    company: "Apple",
    role: "iOS Developer",
    ctc: 9,
    status: "Valid",
    placementDate: "12-09-2023",
  },
  {
    company: "Amazon",
    role: "Cloud Architect",
    ctc: 11,
    status: "InValid",
    placementDate: "18-07-2023",
  },
  {
    company: "Facebook",
    role: "Data Scientist",
    ctc: 12,
    status: "Valid",
    placementDate: "05-10-2023",
  },
  {
    company: "Netflix",
    role: "Frontend Developer",
    ctc: 8,
    status: "InValid",
    placementDate: "20-06-2023",
  },
];
export default function OfferLetters() {
  return (
    <Card className="h-full w-full">
      <CardBody className="overflow-auto px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors "
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ company, role, placementDate, ctc, status }, index) => (
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
                  <td className={"p-4 border-b border-blue-gray-50"}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={status}
                        color={status === "Valid" ? "green" : "red"}
                      />
                    </div>
                  </td>

                  <td className="p-4">{status === "InValid" && <Upload />}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
