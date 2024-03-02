export const handleCoordinatorSearch = (query, department, data) => {
  console.log(department);
  if (department !== "ALL") {
    data = data.filter((item) => item.department === department);
  }
  if (!query) {
    return data;
  }
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase())
  );
  return filteredData;
};

export const handleStudentSearch = (query, passoutYear, data, department) => {
  let filteredData = data;

  if (passoutYear === "ALL") {
    filteredData = data;
  } else {
    filteredData = data?.filter((item) => item.passoutYear === passoutYear);
  }
  if (department) {
    if (department !== "ALL") {
      filteredData = filteredData?.filter(
        (item) => item.department === department
      );
    }
  }

  if (!query) {
    return filteredData;
  }
  filteredData = filteredData?.filter(
    (item) =>
      item?.name.toLowerCase().includes(query?.toLowerCase()) ||
      item?.rollNo.toLowerCase().includes(query?.toLowerCase()) ||
      item?.email.toLowerCase().includes(query?.toLowerCase())
  );

  return filteredData;
};

export const handlePlacementSearch = (query, passoutYear, department, data) => {
  let filteredData = data;

  if (passoutYear === "ALL") {
    filteredData = data;
  } else {
    filteredData = data?.filter(
      (item) => item?.student?.passoutYear == passoutYear
    );
  }
  if (department) {
    if (department != "ALL") {
      filteredData = filteredData?.filter(
        (item) => item.department == department
      );
    }
  }

  if (!query) {
    return filteredData;
  }

  filteredData = filteredData?.filter(
    (item) =>
      item?.student?.name.toLowerCase().includes(query?.toLowerCase()) ||
      item?.student?.rollNo.toLowerCase().includes(query?.toLowerCase()) ||
      item?.student?.email.toLowerCase().includes(query?.toLowerCase()) ||
      item?.company.toLowerCase().includes(query.toLowerCase())
  );

  return filteredData;
};
