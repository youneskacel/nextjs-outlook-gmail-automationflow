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
  is_new: boolean;
}

interface Props {
  payload: Enquiry[];
}

interface Props {}

const StackedBarChart: FC<Props> = ({ payload }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    maintainAspectRatio: false,
  };

  const transformData = (data: Enquiry[]) => {
    const countByDateAndIsNew: Record<
      string,
      { newLeads: number; repeatLeads: number }
    > = {};

    data.forEach((item) => {
      const date = new Date(item.enquiry_date).toLocaleDateString();
      if (!countByDateAndIsNew[date]) {
        countByDateAndIsNew[date] = { newLeads: 0, repeatLeads: 0 };
      }
      if (item.is_new) {
        countByDateAndIsNew[date].newLeads++;
      } else {
        countByDateAndIsNew[date].repeatLeads++;
      }
    });

    const sortedDates = Object.keys(countByDateAndIsNew).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });

    const labels = sortedDates.map((date) => {
      const [day, month] = date.split("/");
      return `${parseInt(day)}/${parseInt(month)}`;
    });

    const newLeadsData = sortedDates.map(
      (date) => countByDateAndIsNew[date].newLeads
    );
    const repeatLeadsData = sortedDates.map(
      (date) => countByDateAndIsNew[date].repeatLeads
    );

    const datasets = [
      {
        label: "New leads",
        data: newLeadsData,
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
        borderWidth: 1,
      },
      {
        label: "Repeat leads",
        data: repeatLeadsData,
        backgroundColor: ["rgba(54, 162, 235, 0.5)"],
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
    }[];
  } = transformData(payload);

  return (
    <Box width="100%" height="100%" m={4}>
      <Bar data={whatIwant} options={options} />
    </Box>
  );
};

export default StackedBarChart;
