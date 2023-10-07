import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import PlacementOffers from "./PlacementOffers";
import OfferLetters from "./OfferLetters";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { myProfile } from "../../redux/studentSlice";
import EditProfile from "./EditProfile";

const data = [
  {
    label: "Placement Offers",
    value: "placementoffers",
    desc: <PlacementOffers />,
  },
  {
    label: "Offer Letters",
    value: "offerletters",
    desc: <OfferLetters />,
  },
];
export const Student = () => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const { student, user } = useSelector((state) => state.student);
  console.log(user);
  useEffect(() => {
    dispatch(myProfile());
  }, []);
  return (
    <div>
      <h2 className="text-center font-semibold text-lg mb-5">
        Student Details
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <div className="flex flex-col gap-y-4 justify-center items-center">
          <img src={student?.image} className="h-60 w-60 rounded-full" />
          <EditProfile />
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <p>Name: {student?.name}</p>
          <p>Roll No : {student?.rollNo}</p>
          <p>Email : {student?.email}</p>
          <p>Department : {student?.department}</p>
          <p>Contact : {student?.contact}</p>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <p>Date of Birth : {student?.dateOfBirth}</p>
          <p>Passout Year : {student?.passoutYear}</p>
          <p>Placed : {student?.isPlaced ? "Yes" : "No"}</p>
          <p>Gender : {student?.gender}</p>
          <p>Address : {student?.address}</p>
        </div>
      </div>
      <div className="mt-10">
        <PlacementOffers />
      </div>
    </div>
  );
};
