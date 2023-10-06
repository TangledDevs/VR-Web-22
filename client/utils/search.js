export const handleCoordinatorSearch = (query,department, data) => {
  if(department !== "ALL")
  {
    data = data.filter((item)=>item.department === department);
  }
  if(!query)
  {
    return data;
  }
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return filteredData;
};

export const handleStudentSearch = (query, data) => {
  if (!query) {
    return data;
  }
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.rollNo.toLowerCase().includes(query.toLowerCase())
  );
  return filteredData;
};
