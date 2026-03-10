import { Line } from "@ant-design/charts";

const StockChart = () => {

  const data = [
    { date: "Mon", stock: 120 },
    { date: "Tue", stock: 132 },
    { date: "Wed", stock: 101 },
    { date: "Thu", stock: 134 },
    { date: "Fri", stock: 90 },
    { date: "Sat", stock: 230 },
    { date: "Sun", stock: 210 },
  ];

  const config = {
    data,
    xField: "date",
    yField: "stock",
    smooth: true,
    point: {
      size: 4,
      shape: "circle",
    },
  };

  return <Line {...config} />;
};

export default StockChart;