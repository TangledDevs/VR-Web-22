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
  const [activeTab, setActiveTab] = useState("placementoffers");
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
        <div className="flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="student"
            className="h-60 w-60 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <p>{JSON.stringify(student)}</p>
          <p>Name : {student?.name}</p>
          <p>Roll No : 20BQ1A05P2</p>
          <p>Email : gnanachandra2003@gmail.com</p>
          <p>Department : CSE</p>
          <p>Contact : 9666498405</p>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <p>Date of Birth : 30-06-2003</p>
          <p>Passout Year : 2024</p>
          <p>Placed : YES</p>
          <p>Gender : MALE</p>
          <p>Address : Nehru Nagar 3rd line</p>
        </div>
      </div>
      <div className="mt-10">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "text-gray-900" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};
