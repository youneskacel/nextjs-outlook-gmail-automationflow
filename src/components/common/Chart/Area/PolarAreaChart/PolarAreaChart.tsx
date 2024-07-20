import React, { FC } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { chartColorGeneratorbyLabel } from "@/util/Chart/chartColorGeneratorbyLabel";
import { PolarArea } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface Enquiry {
  id: number;
  enquiry_source: string;
}

interface Props {
  payload: Enquiry[];
}

const PolarAreaChart: FC<Props> = ({ payload }) => {
  const transformData = (data: Enquiry[]) => {
    const transformedData = {
      labels: [] as string[],
      datasets: [
        {
          label: "Number of enquiries",
          data: [] as number[],
          backgroundColor: [] as string[],
          borderWidth: 1,
        },
      ],
    };

    const countBySource: Record<string, number> = {};

    data.forEach((item) => {
      const source = item.enquiry_source;
      countBySource[source] = (countBySource[source] || 0) + 1;
    });

    Object.keys(countBySource).forEach((source, index) => {
      transformedData.labels.push(source);
      transformedData.datasets[0].data.push(countBySource[source]);
      transformedData.datasets[0].backgroundColor.push(
        chartColorGeneratorbyLabel(source)
      );
    });

    return transformedData;
  };

  const chartData: {
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
      <PolarArea data={chartData} options={{ maintainAspectRatio: false }} />
    </Box>
  );
};

export default PolarAreaChart;
