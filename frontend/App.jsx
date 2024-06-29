import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ["January", "February", "March", "April"];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bar Chart Example",
    },
  },
};

const preProcess = (json) => {
  return {
    labels,
    datasets: [
      {
        label: "Dataset from Backend",
        data: json.results.map((r) => r.value),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
};

export const App = () => {
  const [data, setData] = useState();
  const [raw, setRaw] = useState();

  useEffect(() => {
    const effect = async () => {
      const response = await fetch("/api/data");

      const text = await response.text();

      console.log(text);

      const json = JSON.parse(text);

      setRaw(json);

      setData(preProcess(json));
    };

    effect().catch(console.error);
  }, []);

  return (
    <>
      <div className="chart-container">{data && <Bar options={options} data={data} />}</div>
      Raw (direct from backend):
      <pre>{JSON.stringify(raw, null, 2)}</pre>
      Processed (changed by the frontend for the chart):
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};
