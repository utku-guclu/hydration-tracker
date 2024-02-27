import { styled } from "@mui/system";
import { useHydration } from "../../../context/HydrationContext";

const ThirstinessLevelText = styled("div")(({ color }) => ({
  color,
  textAlign: "center",
  fontStyle: "italic",
  fontSize: "20px",
  fontWeight: 600,
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
