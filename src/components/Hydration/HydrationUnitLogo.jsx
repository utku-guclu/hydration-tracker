/* HOOKS */
import { useHydration } from "../../context/HydrationContext";
import { useLocation } from "react-router";

/* ICONS */
import { LuGlassWater } from "react-icons/lu";
import { IoWaterOutline } from "react-icons/io5";

function HydrationUnitLogo() {
  const { switchUnit, isCup } = useHydration();

  return (
    /* Conditionally render icons only on the homepage */
    <>
      {isCup ? (
        <LuGlassWater className="water-icon" onClick={switchUnit} />
      ) : (
        <IoWaterOutline className="water-icon" onClick={switchUnit} />
      )}
    </>
  );
}

export default HydrationUnitLogo;
