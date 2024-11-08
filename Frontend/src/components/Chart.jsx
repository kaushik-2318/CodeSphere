import { useState, useEffect } from "react";
import { ChartsXAxis, ChartsYAxis, LinePlot, ChartContainer, ChartsGrid, ChartsTooltip, } from "@mui/x-charts";
import { format } from "date-fns";
import { getViewsapi } from "../services/api";

const sumViewsByDateOrMonth = (posts, aggregateByMonth) => {
  const dateViewsMap = {};

  posts.forEach((post) => {
    if (post.template && post.template.length > 0) {
      post.template.forEach((template) => {
        if (template.views && template.views.length > 0) {
          template.views.forEach((view) => {
            let date;
            if (aggregateByMonth) {
              date = format(new Date(view.timestamp), "yyyy-MM");
            } else {
              date = new Date(view.timestamp).toISOString().split("T")[0];
            }
            dateViewsMap[date] = (dateViewsMap[date] || 0) + view.views;
          });
        }
      });
    }
  });

  return Object.entries(dateViewsMap)
    .map(([date, views]) => ({
      date: aggregateByMonth ? new Date(date + "-01") : new Date(date),
      views: Number(views) || 0,
    }))
    .sort((a, b) => a.date - b.date);
};

const Chart = () => {
  const [overallViewsData, setOverallViewsData] = useState([]);
  const [viewsData, setViewsData] = useState([]);

  const getViews = () => {
    getViewsapi()
      .then((res) => {
        console.log(res.data);
        setViewsData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error("Error", error.message);
        }
      });
  };

  useEffect(() => {
    getViews();
  }, []);

  useEffect(() => {
    try {
      const firstDate =
        viewsData.length > 0 ? new Date(viewsData[0].template[0]?.views[0]?.timestamp) : null;
      const lastDate =
        viewsData.length > 0
          ? new Date(
            viewsData[viewsData.length - 1].template[0]?.views[
              viewsData[viewsData.length - 1].template[0]?.views.length - 1
            ].timestamp
          )
          : null;

      const dateRangeInDays =
        lastDate && firstDate ? (lastDate - firstDate) / (1000 * 60 * 60 * 24) : 0;

      const aggregateByMonth = dateRangeInDays > 30;

      const data = sumViewsByDateOrMonth(viewsData, aggregateByMonth);
      setOverallViewsData(data);
    } catch (error) {
      console.error("Error processing views data:", error);
    }
  }, [viewsData]);

  const chartData = overallViewsData;
  const sortedChartData = [...chartData].sort((a, b) => a.date - b.date);

  const firstDate =
    sortedChartData.length > 0 ? new Date(sortedChartData[0].date) : null;
  const lastDate =
    sortedChartData.length > 0
      ? new Date(sortedChartData[sortedChartData.length - 1].date)
      : null;

  const dateRangeInDays =
    lastDate && firstDate ? (lastDate - firstDate) / (1000 * 60 * 60 * 24) : 0;

  const xAxisLabelFormat = dateRangeInDays > 30 ? "MM/yyyy" : "dd/MM/yyyy";
  const tickCount =
    dateRangeInDays > 365
      ? 6
      : dateRangeInDays > 30
        ? 12
        : sortedChartData.length;

  return (
    <div>
      {sortedChartData.length > 0 ? (
        <ChartContainer
          width={882}
          height={200}
          series={[
            {
              data: sortedChartData.map((item) => item.views),
              type: "line",
              label: "Views",
              color: "#8884d8",
            },
          ]}
          sx={{
            "& .MuiChartsAxis-tickContainer": {
              "& .MuiChartsAxis-tickLabel": {
                fill: "white",
              },
            },
            "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
              stroke: "white",
            },
            "& .MuiChartsAxis-left .MuiChartsAxis-line": {
              stroke: "white",
            },
            "& .MuiChartsAxis-left .MuiChartsAxis-label": {
              fill: "white",
            },
            "& .MuiChartsGrid-line": {
              stroke: "rgba(255, 0, 0, 0.2)",
            },
          }}
          xAxis={[
            {
              data: sortedChartData.map((item) =>
                format(item.date, xAxisLabelFormat)
              ),
              scaleType: "band",
              tickCount: tickCount,
            },
          ]}
        >
          <ChartsYAxis />
          <ChartsXAxis />
          <LinePlot />
          <ChartsGrid vertical horizontal />
          <ChartsTooltip trigger="item" />
        </ChartContainer>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Chart;
