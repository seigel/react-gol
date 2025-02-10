import { useContext, useEffect, useState } from "react";
import GenerationContext from "../context/GenerationContext.js";
import PropTypes from "prop-types";

const Atom = ({ state, updateState }) => {
  const [value, setValue] = useState(state() || false);
  const generation = useContext(GenerationContext);

  useEffect(() => {
    console.log("x");
    setValue(state());
  }, [generation, state]);

  const toggleValue = () => {
    setValue(!value);
    updateState(!value);
  };

  return (
    <div
      onClick={toggleValue}
      style={{
        backgroundColor: value ? "white" : "transparent",
        width: "1.4vw",
        height: "1.4vw",
        border: "0.2px solid",
        marginRight: 1,
      }}
    >
      &nbsp;
    </div>
  );
};
export default Atom;

Atom.propTypes = {
  state: PropTypes.bool,
  updateState: PropTypes.func,
};
