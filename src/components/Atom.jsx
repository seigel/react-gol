import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Atom = ({ state, updateState, generation }) => {
  const [value, setValue] = useState(state() || false);

  useEffect(() => {
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
  state: PropTypes.func,
  updateState: PropTypes.func,
  generation: PropTypes.number,
};
