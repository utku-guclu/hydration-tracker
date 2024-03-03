import { useContext } from "react";
import { ThemeContext } from "./Theme";

export default function InlineText({ children }) {
  const { theme } = useContext(ThemeContext);

  return <span style={{ color: theme.inlineText }}>{children}</span>;
}
