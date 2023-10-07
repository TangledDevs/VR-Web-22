export const handleCoordinatorSearch = (query, department, data) => {
  if (department !== "ALL") {
    data = data.filter((item) => item.department === department);
  }
  if (!query) {
    return data;
  }
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return filteredData;
};

export const handleStudentSearch = (query,passoutYear, data) => {
  let filteredData = data;
  console.log("passoutYear",passoutYear)
  if(Number(passoutYear))
  {
    filteredData = data?.filter((item)=>item.passoutYear == passoutYear);
  }
  console.log(filteredData)
  if (!query) {
    return filteredData;
  }
  filteredData = filteredData?.filter(
    (item) =>
      item?.name.toLowerCase().includes(query?.toLowerCase()) ||
      item?.rollNo.toLowerCase().includes(query?.toLowerCase())
  );
  console.log(filteredData)
  return filteredData;
};

export const handlePlacementSearch = (
  query,
  passoutYear,
  department,
  placements
) => {
  if (passoutYear) {
    placements = placements?.filter(
      (placement) => placement?.student?.passoutYear === passoutYear
    );
  }
  if (department) {
    placements = placements?.filter(
      (placement) => placement?.student?.department === department
    );
  }
  if (!query) {
    return placements;
  }
  placements = placements?.filter((placement) =>
    placement?.student?.name?.toLowerCase().includes(query.toLowerCase())
  );
  return placements;
};
