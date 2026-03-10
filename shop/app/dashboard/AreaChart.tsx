import { Area } from "@ant-design/charts";

const AreaChart = () => {

  const data = [
    { date: "Mon", value: 30 },
    { date: "Tue", value: 40 },
    { date: "Wed", value: 35 },
    { date: "Thu", value: 50 },
    { date: "Fri", value: 49 },
    { date: "Sat", value: 60 },
    { date: "Sun", value: 70 },
  ];

  const config = {
    data,
    xField: "date",
    yField: "value",
    smooth: true,
    areaStyle: {
      fillOpacity: 0.4,
    },
  };

  return <Area {...config} />;
};

export default AreaChart;