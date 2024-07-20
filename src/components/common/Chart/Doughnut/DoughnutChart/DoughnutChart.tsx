import React, { FC } from "react";

import { Box } from "@chakra-ui/react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {}

const labels = [
  "REA website",
  "Domain",
  "Commercial Ready",
  "Facebook",
  "LinkedIn",
];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Cost",
      data: [3800, 2000, 3500, 1000, 1000],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart: FC<Props> = (props) => {
  return (
    <Box width="100%" height="100%" m={4}>
      <Doughnut data={data} options={{ maintainAspectRatio: false }} />
    </Box>
  );
};

export default DoughnutChart;
