import { useContext, useEffect, useState } from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { useHydration } from "../../../context/HydrationContext";
import { useUser } from "../../../context/UserContext";

import { Tooltip } from "react-tooltip";

import styled from "@emotion/styled";

import { ThemeContext } from "../../../context/Theme";

const StatisticHeading = styled("h2")(({ color }) => ({
  color,
  display: "inline",
  cursor: "pointer",
}));

const StatisticLabel = styled("p")(({ color }) => ({
  color,
  fontWeight: "400",
  fontSize: "12px",
  fontStyle: "italic",
}));

export default function SimpleCharts() {
  const [headingColor, setHeadingColor] = useState();

  const { statistics, resetLogPool } = useHydration();
  const { token } = useUser();
  const { theme } = useContext(ThemeContext);

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
      setHeadingColor(theme.statistics);
    } else {
      setHeadingColor(theme.idle);
    }
  }, [isStatistics, theme.statistics]);

  return (
    token && (
      <>
        <Tooltip id="statistics-tooltip" />
        <StatisticHeading
          data-tooltip-id="statistics-tooltip"
          data-tooltip-content="Double click to reset statistics!"
          onDoubleClick={() => resetLogPool()}
          color={headingColor}
        >
          Statistics
        </StatisticHeading>
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
          <StatisticLabel color={theme.secondaryStatistics}>
            No statistics yet!
          </StatisticLabel>
        )}
      </>
    )
  );
}
