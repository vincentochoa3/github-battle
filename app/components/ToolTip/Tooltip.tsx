import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import useHover from "../../hooks/useHover";
import { styles } from "./styles";

export default function Tooltip({
  text,
  children,
}: {
  text: ReactNode;
  children: ReactNode;
}) {
  const [hovering, attrs] = useHover();

  return (
    <div style={styles.container} {...(typeof attrs === "object" ? attrs : {})}>
      {hovering === true && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};
