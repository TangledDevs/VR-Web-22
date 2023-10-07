/* eslint-disable react/prop-types */
import { Select, Option } from "@material-tailwind/react";

export default function DashboardDropdown({ label, values }) {
  return (
    <div className="w-72">
      <Select label={label}>
        {values?.map((option, index) => (
          <Option key={index}>{option}</Option>
        ))}
      </Select>
    </div>
  );
}
