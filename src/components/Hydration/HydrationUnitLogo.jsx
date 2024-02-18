/* HOOKS */
import { useHydration } from "../../context/HydrationContext";
import { useLocation } from "react-router";

/* ICONS */
import { LuGlassWater } from "react-icons/lu";
import { IoWaterOutline } from "react-icons/io5";


function HydrationUnitLogo() {
  const { switchUnit, isCup } = useHydration();
  const location = useLocation()
  return (
    <>
      {/* Conditionally render icons only on the homepage */}
      {location.pathname === "/" && (
        <>
          {isCup ? (
            <LuGlassWater className="water-icon" onClick={switchUnit} />
          ) : (
            <IoWaterOutline className="water-icon" onClick={switchUnit} />
          )}
        </>
      )}
    </>
  );
}

export default HydrationUnitLogo;