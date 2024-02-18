import styled from "@emotion/styled";
import { useHydration } from "../../context/HydrationContext";

const ThirstinessLevelText = styled("div")(({ color }) => ({
  color,
  textAlign: "right",
  fontStyle: "italic",
}));

function ThirstinessLevel() {
  const { thirstiness, thirstinessColor } = useHydration();
  return (
    <ThirstinessLevelText color={thirstinessColor}>
      {thirstiness}
    </ThirstinessLevelText>
  );
}

export default ThirstinessLevel;
