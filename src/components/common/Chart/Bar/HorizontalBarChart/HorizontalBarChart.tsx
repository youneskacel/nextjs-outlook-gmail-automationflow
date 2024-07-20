import React, { FC } from "react";

import { Box } from "@chakra-ui/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Enquiry {
  id: number;
  enquiry_date: string;
}

interface Props {
  payload: Enquiry[];
}

const HorizontalBarChart: FC<Props> = ({ payload }) => {
  const transformData = (data: Enquiry[]) => {
    const countByDate: Record<string, number> = {};

    data.forEach((item) => {
      const date = new Date(item.enquiry_date).toLocaleDateString();
      countByDate[date] = (countByDate[date] || 0) + 1;
    });

    const sortedDates = Object.keys(countByDate).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });

    const labels = sortedDates.map((date) => {
      const [day, month] = date.split("/");
      return `${parseInt(day)}/${parseInt(month)}`;
    });

    const datasets = [
      {
        label: "Enquiries overtime",
        data: sortedDates.map((date) => countByDate[date]),
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
        borderWidth: 1,
      },
    ];

    const transformedData = {
      labels,
      datasets,
    };

    return transformedData;
  };

  const whatIwant: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  } = transformData(payload);

  return (
    <Box width="100%" height="100%" m={4}>
      <Bar data={whatIwant} options={{ maintainAspectRatio: false }} />
    </Box>
  );
};

export default HorizontalBarChart;
