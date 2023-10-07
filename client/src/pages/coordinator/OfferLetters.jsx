
import {
  Card,
  Typography,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyDeptPlacements } from "../../redux/coordinatorSlice";

const TABLE_HEAD = ["Student", "Company", "Role", "Offer letter", "Actions"];

export function OfferLetters() {
  const dispatch = useDispatch();
  const { placements, isLoading } = useSelector((state) => state.coordinator);
  useEffect(()=>{
    dispatch(getMyDeptPlacements());
  },[])
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
            {placements.map(
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

                </tr>
              )
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
export default OfferLetters;
