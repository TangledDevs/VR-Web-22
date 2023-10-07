import { Card, Typography, CardBody, Chip } from "@material-tailwind/react";
import Upload from "./Upload";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMyPlacementResults } from "../../redux/studentSlice";

const TABLE_HEAD = [
  "Company",
  "Role",
  "Ctc",
  "Placement Date",
  "Status",
  "Action",
];


export default function OfferLetters() {
  const dispatch = useDispatch();
  const { placements, isLoading } = useSelector((state) => state.student);
  const [uploadedOfferLetters, setUploadedOfferLetters] = useState([]);

  console.log(uploadedOfferLetters);

  useEffect(() => {
    dispatch(getMyPlacementResults());
    setUploadedOfferLetters(
      placements.filter((placement) => placement.offerLetter)
    );
  }, []);
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
            {uploadedOfferLetters.map(
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
