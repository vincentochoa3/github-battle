import React from "react";
import PropTypes from "prop-types";
import { styles } from "./styles";

export default function Loading({ text = "Loading", speed = 300 }) {
  const [content, setContent] = React.useState(text);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setContent((content) => {
        return content === `${text}...` ? text : `${content}.`;
      });
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return <p style={styles.content}>{content}</p>;
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};
