import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getViewsapi } from "../services/api";

const ViewsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [chartWidth, setChartWidth] = useState("100%");
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getViewsapi();
        const data = res.data;

        let aggregatedData = {};

        data.forEach((item) => {
          item.template.views.forEach((view) => {
            const date = new Date(view.timestamp).toISOString().split("T")[0];
            aggregatedData[date] =
              (aggregatedData[date] || 0) + Math.round(view.views);
          });
        });

        const labels = Object.keys(aggregatedData).sort();
        const viewsData = labels.map((date) => aggregatedData[date]);

        const newWidth = labels.length > 10 ? `${labels.length * 30}px` : "100%";
        setChartWidth(newWidth);

        setChartOptions({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Views Over Time",
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  if (value % 1 === 0) {
                    return value;
                  }
                },
              },
            },
          },
          transitions: {
            show: {
              animations: {
                x: {
                  from: 0
                },
                y: {
                  from: 0
                }
              }
            },
            hide: {
              animations: {
                x: {
                  to: 0
                },
                y: {
                  to: 0
                }
              }
            }
          }
        });

        setChartData({
          labels,
          datasets: [
            {
              data: viewsData,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              borderWidth: 1,
              pointRadius: 3,
              pointHoverRadius: 5,
              pointBackgroundColor: "#007bff",
              pointHoverBackgroundColor: "#007bff",
              fill: {
                target: 'origin',
                below: '#007bff'
              }
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div ref={chartContainerRef} style={{ width: chartWidth, minWidth: "600px", height: "200px" }}>
      {chartData ? (<Line data={chartData} options={chartOptions} />) : (<p>Loading...</p>)}
    </div>
  );
};

export default ViewsChart;
