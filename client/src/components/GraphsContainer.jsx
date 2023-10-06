/* eslint-disable no-unused-vars */
import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { data } from "../../utils/data";

const GraphsContainer = () => {
  const dataByYear = data.reduce((accumulator, student) => {
    const year = student.year_of_passing;

    if (!accumulator[year]) {
      accumulator[year] = 0;
    }

    accumulator[year] += 1;

    return accumulator;
  }, {});

  const years = Object.keys(dataByYear);
  const numberOfPlacementsByYear = years.map((year) => dataByYear[year]);

  const lineChartData = {
    labels: years,
    datasets: [
      {
        label: "Number of Placements",
        data: numberOfPlacementsByYear,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const dataByCompany = data.reduce((accumulator, student) => {
    const companyName = student.company_name;

    if (!accumulator[companyName]) {
      accumulator[companyName] = 0;
    }

    accumulator[companyName] += 1;

    return accumulator;
  }, {});

  const companyNames = Object.keys(dataByCompany);
  const numberOfPlacementsByCompany = companyNames.map(
    (companyName) => dataByCompany[companyName]
  );

  const barChartData = {
    labels: companyNames,
    datasets: [
      {
        label: "Number of Placements",
        data: numberOfPlacementsByCompany,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ctcValues = data.map((student) =>
    parseFloat(student.ctc.replace("LPA", ""))
  );

  const uniqueCtcValues = [...new Set(ctcValues)].sort();
  const ctcCounts = uniqueCtcValues.map(
    (ctc) => ctcValues.filter((value) => value === ctc).length
  );

  const dataByDepartment = data.reduce((accumulator, student) => {
    const department = student.department;

    if (!accumulator[department]) {
      accumulator[department] = 0;
    }

    accumulator[department] += 1;

    return accumulator;
  }, {});

  const departmentNames = Object.keys(dataByDepartment);
  const numberOfPlacementsByDepartment = departmentNames.map(
    (department) => dataByDepartment[department]
  );

  const options = {
    plugins: {
      legend: {
        display: true, // Set to true to display the legend
        position: "right", // You can change the legend position (top, bottom, left, right)
        labels: {
          fontColor: "black", // Set the font color for legend labels
        },
      },
      title: {
        display: true,
        text: "No of placements department wise",
      },
      datalabels: {
        // Enable datalabels plugin
        color: "black", // Font color for labels
        formatter: (value) => value, // Display the value as label
        align: "center",
        // backgroundColor: "#ccc",
        borderRadius: 3,
        font: {
          size: 18,
        },
      },
    },
  };

  const pieChartData = {
    labels: departmentNames,
    datasets: [
      {
        data: numberOfPlacementsByDepartment,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(0, 128, 0, 0.6)",
        ],
      },
    ],
  };

  const chartData = {
    labels: uniqueCtcValues.map((ctc) => ctc + " LPA"),
    datasets: [
      {
        data: ctcCounts,
        label: "No of offers",
        backgroundColor: ["rgba(255, 99, 132, 0.6)"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <section className="w-full bg-white rounded-md shadow-md p-4">
        <Line data={lineChartData} />
      </section>
      <section className="w-full bg-white rounded-md shadow-md p-4">
        <Bar data={barChartData} />
      </section>
      {/* <section className="w-full bg-white rounded-md shadow-md p-4">
        <Bar data={chartData} />
      </section> */}
      <section className="w-full bg-white rounded-md shadow-md p-4">
        <Pie
          data={pieChartData}
          options={options}
          plugins={[ChartDataLabels]}
        />
      </section>
    </div>
  );
};

export default GraphsContainer;
