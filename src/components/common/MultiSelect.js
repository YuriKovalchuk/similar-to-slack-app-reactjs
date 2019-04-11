import React from "react";
import PropTypes from "prop-types";

/* react-select component */
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";

const MultiSelect = ({ values, onChange }) => {
  return (
    <Select
      closeMenuOnSelect={false}
      components={makeAnimated()}
      isMulti
      options={values}
      onChange={onChange}
    />
  );
};

MultiSelect.propTypes = {
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

MultiSelect.defaultProps = {};

export default MultiSelect;
