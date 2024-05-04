import React, { useState } from "react";
import Select from "react-select";


const Dropdown = ({options, setTrigger}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
      
      setTrigger(selectedOption.value);
    };
  
    return (
      <div>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder="Select an option"
        />
      </div>
    );
                                                                                                                                                                                                                       
}

export default Dropdown;
