import { useEffect, useState } from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { useHydration } from "../../context/HydrationContext";
import { useUser } from "../../context/UserContext";

import { Tooltip } from "react-tooltip";

import styled from "@emotion/styled";

const StatisticHeading = styled("h2")(({ color }) => ({
  color: color,
  cursor: "pointer",
  display: "inline",
}));

const StatisticLabel = styled("p")(({ color }) => ({
  color: "rgba(0, 0, 0, 0.87)",
  fontWeight: "400",
  fontSize: "12px",
}));

export default function SimpleCharts() {
  const { statistics, resetLogPool } = useHydration();
  const { token } = useUser();

  const [headingColor, setHeadingColor] = useState();

  const percentages = Object.values(statistics);
  const hours = Object.keys(statistics).map((hour) => {
    let prefix = "";
    if (hour > 12) {
      prefix = "pm";
      hour = (hour % 12) + " " + prefix;
    } else {
      prefix = "am";
      hour = hour + " " + prefix;
    }
    return hour;
  });
  const isStatistics = !(percentages.length === 1 && hours[0] === "0 am");
  if (!isStatistics) {
    hours[0] = "No statistics yet!";
    percentages[0] = "-.-";
  }

  useEffect(() => {
    if (isStatistics) {
      setHeadingColor("var(--water)");
    } else {
      setHeadingColor("var(--gray)");
    }
  }, [isStatistics]);

  return (
    token && (
      <>
        <Tooltip id="statistics-tooltip" />
        <StatisticHeading color={headingColor}>Statistics</StatisticHeading>
        {isStatistics ? (
          <BarChart
            tooltip={{ trigger: "axis" }}
            xAxis={[
              {
                id: "hours",
                data: hours,
                scaleType: "band",
                valueFormatter: (value) => value ?? 0, // Default value when value is falsy
              },
            ]}
            series={[
              {
                data: percentages,
                valueFormatter: (value) => "%" + value,
              },
            ]}
            width={300}
            height={300}
          />
        ) : (
          <StatisticLabel>No statistics yet!</StatisticLabel>
        )}
        <button
          data-tooltip-id="statistics-tooltip"
          data-tooltip-content="Double click to reset statistics!"
          onDoubleClick={resetLogPool} // Change onClick to onDoubleClick
          style={{ width: "100%", height: "40px" }}
          disabled={!isStatistics}
        >
          RESET
        </button>
      </>
    )
  );
}
